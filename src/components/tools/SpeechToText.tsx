import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Square, 
  Download,
  Settings,
  Clock,
  Zap,
  Heart,
  Share2,
  FileText,
  Languages,
  Volume2,
  Save,
  Trash2,
  Play
} from 'lucide-react';

interface TranscriptionResult {
  id: string;
  text: string;
  timestamp: Date;
  confidence: number;
  language: string;
}

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isContinuous, setIsContinuous] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionResult[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fix: Add type for SpeechRecognition to avoid TS error
  type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
    ? typeof window.webkitSpeechRecognition
    : typeof window.SpeechRecognition;

  const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Portuguese (BR)', flag: '🇧🇷' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' }
  ];

  useEffect(() => {
    // Load transcription history from localStorage
    const saved = localStorage.getItem('sttHistory');
    if (saved) {
      setTranscriptionHistory(JSON.parse(saved));
    }
  }, []);

  const saveHistory = (newHistory: TranscriptionResult[]) => {
    setTranscriptionHistory(newHistory);
    localStorage.setItem('sttHistory', JSON.stringify(newHistory));
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    const recognition = recognitionRef.current;
    recognition.continuous = isContinuous;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + ' ' + finalTranscript);
        setInterimTranscript('');
        
        // Auto-save if enabled
        if (autoSave) {
          const newResult: TranscriptionResult = {
            id: Date.now().toString(),
            text: finalTranscript,
            timestamp: new Date(),
            confidence: 0.9, // Placeholder confidence
            language: selectedLanguage
          };
          const newHistory = [newResult, ...transcriptionHistory].slice(0, 50); // Keep last 50
          saveHistory(newHistory);
        }
      } else {
        setInterimTranscript(interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        alert('No speech detected. Please try speaking again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
  };

  const saveTranscript = () => {
    if (!transcript.trim()) return;
    
    const newResult: TranscriptionResult = {
      id: Date.now().toString(),
      text: transcript,
      timestamp: new Date(),
      confidence: 0.9,
      language: selectedLanguage
    };
    
    const newHistory = [newResult, ...transcriptionHistory].slice(0, 50);
    saveHistory(newHistory);
    
    // Download as text file
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${new Date().toISOString().slice(0, 19)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteHistoryItem = (id: string) => {
    const newHistory = transcriptionHistory.filter(item => item.id !== id);
    saveHistory(newHistory);
  };

  const loadHistoryItem = (text: string) => {
    setTranscript(text);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('sttFavorites') || '[]');
    if (!isFavorite) {
      favorites.push(transcript);
    } else {
      const index = favorites.indexOf(transcript);
      if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('sttFavorites', JSON.stringify(favorites));
  };

  const shareTranscript = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Speech-to-Text Transcript',
        text: transcript
      });
    } else {
      navigator.clipboard.writeText(transcript);
      alert('Transcript copied to clipboard!');
    }
  };

  const samplePrompts = [
    'Tell me about your learning goals',
    'Describe a challenging concept you want to understand',
    'Explain your preferred learning style',
    'Share an academic question you have'
  ];

  const loadSamplePrompt = (prompt: string) => {
    setTranscript(prompt);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Speech-to-Text Converter
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className={isFavorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={shareTranscript}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Sample Prompts */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Sample Prompts:</Label>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSamplePrompt(prompt)}
                className="text-xs"
              >
                {prompt.slice(0, 30)}...
              </Button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Language:</Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Settings:</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="continuous"
                  checked={isContinuous}
                  onCheckedChange={setIsContinuous}
                />
                <Label htmlFor="continuous" className="text-sm">Continuous</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
                <Label htmlFor="auto-save" className="text-sm">Auto-save</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Advanced Settings:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Recognition Mode:</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="dictation">Dictation</SelectItem>
                    <SelectItem value="conversation">Conversation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Audio Quality:</Label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Faster)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High (Slower)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            onClick={startListening} 
            disabled={isListening}
            className="flex-1 max-w-xs group"
            size="lg"
            variant="default"
          >
            <Mic className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Start Listening
          </Button>
          
          <Button 
            onClick={stopListening} 
            variant="destructive" 
            disabled={!isListening}
            size="lg"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        {/* Status Indicator */}
        {isListening && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Listening... Speak now!</span>
            {interimTranscript && <Badge variant="outline">Processing...</Badge>}
          </div>
        )}

        {/* Transcript Display */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Transcript:</Label>
          <div className="relative">
            <Textarea
              value={transcript + (interimTranscript ? ' ' + interimTranscript : '')}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your speech will appear here..."
              className="min-h-32 resize-none"
            />
            {interimTranscript && (
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                Processing...
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{transcript.length} characters</span>
            <span>Words: {transcript.split(/\s+/).filter(word => word.length > 0).length}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
          <Button variant="outline" size="sm" onClick={saveTranscript} disabled={!transcript.trim()}>
            <Save className="h-4 w-4 mr-2" />
            Save & Download
          </Button>
          <Button variant="outline" size="sm" onClick={clearTranscript} disabled={!transcript.trim()}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={shareTranscript} disabled={!transcript.trim()}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Transcription History */}
        {transcriptionHistory.length > 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Recent Transcriptions:</Label>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {transcriptionHistory.slice(0, 10).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.text}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.timestamp.toLocaleString()}</span>
                      <Languages className="h-3 w-3" />
                      <span>{languages.find(l => l.code === item.language)?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadHistoryItem(item.text)}
                      className="h-8 w-8 p-0"
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteHistoryItem(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Pro Tips for Better Recognition
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Use a quiet environment with minimal background noise</li>
            <li>• Position your microphone close to your mouth</li>
            <li>• Use continuous mode for longer speeches</li>
            <li>• Choose the correct language for better accuracy</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechToText;
