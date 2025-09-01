import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Captions, 
  Mic, 
  MicOff, 
  Square, 
  Settings,
  Download,
  Share2,
  Eye,
  Type,
  Palette,
  Languages,
  Clock,
  Zap,
  Save,
  Trash2,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

interface CaptionLine {
  id: string;
  text: string;
  timestamp: Date;
  confidence: number;
  language: string;
}

const LiveCaptioning = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [captionHistory, setCaptionHistory] = useState<CaptionLine[]>([]);
  const [currentCaption, setCurrentCaption] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [maxLines, setMaxLines] = useState(5);
  const [fontSize, setFontSize] = useState(18);
  const [textColor, setTextColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.8);
  const [position, setPosition] = useState('bottom');
  const [recognitionConfidence, setRecognitionConfidence] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const captionDisplayRef = useRef<HTMLDivElement>(null);

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
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' }
  ];

  const positions = [
    { id: 'top', name: 'Top', description: 'Display captions at top of screen' },
    { id: 'bottom', name: 'Bottom', description: 'Display captions at bottom of screen' },
    { id: 'center', name: 'Center', description: 'Display captions in center' },
    { id: 'overlay', name: 'Overlay', description: 'Floating overlay captions' }
  ];

  const textColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Yellow', value: '#ffff00' },
    { name: 'Green', value: '#00ff00' },
    { name: 'Blue', value: '#00ffff' },
    { name: 'Red', value: '#ff0000' }
  ];

  const backgroundColors = [
    { name: 'Black', value: '#000000' },
    { name: 'Dark Blue', value: '#000080' },
    { name: 'Dark Green', value: '#006400' },
    { name: 'Dark Red', value: '#800000' },
    { name: 'Transparent', value: 'transparent' }
  ];

  useEffect(() => {
    // Load caption history from localStorage
    const saved = localStorage.getItem('captionHistory');
    if (saved) {
      setCaptionHistory(JSON.parse(saved));
    }
  }, []);

  const saveCaptionHistory = (newHistory: CaptionLine[]) => {
    setCaptionHistory(newHistory);
    localStorage.setItem('captionHistory', JSON.stringify(newHistory));
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    const recognition = recognitionRef.current;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setIsListening(true);
      setIsPaused(false);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          setRecognitionConfidence(confidence);
          
          if (finalTranscript.trim()) {
            addCaptionLine(finalTranscript.trim(), confidence);
          }
        } else {
          interimTranscript += transcript;
        }
      }

      // Show interim results
      if (interimTranscript) {
        setCurrentCaption(interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        setCurrentCaption('No speech detected. Please try speaking again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setIsPaused(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsPaused(false);
    setCurrentCaption('');
  };

  const pauseListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsPaused(true);
    setCurrentCaption('Captioning paused...');
  };

  const resumeListening = () => {
    if (isPaused) {
      startListening();
    }
  };

  const addCaptionLine = (text: string, confidence: number) => {
    const newCaption: CaptionLine = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      confidence,
      language: selectedLanguage
    };

    const newHistory = [newCaption, ...captionHistory].slice(0, maxLines * 2);
    saveCaptionHistory(newHistory);
    setCurrentCaption(text);
  };

  const clearCaptions = () => {
    setCaptionHistory([]);
    setCurrentCaption('');
    saveCaptionHistory([]);
  };

  const downloadCaptions = () => {
    if (captionHistory.length === 0) return;
    
    const content = captionHistory
      .map(caption => `[${caption.timestamp.toLocaleTimeString()}] ${caption.text}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions-${new Date().toISOString().slice(0, 19)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareCaptions = () => {
    if (captionHistory.length === 0) return;
    
    const content = captionHistory
      .map(caption => caption.text)
      .join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'Live Captions from AssistEd',
        text: content
      });
    } else {
      navigator.clipboard.writeText(content);
      alert('Captions copied to clipboard!');
    }
  };

  const toggleCaptionDisplay = () => {
    const display = document.getElementById('caption-display');
    if (display) {
      display.style.display = display.style.display === 'none' ? 'block' : 'none';
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'overlay':
        return 'top-4 right-4';
      default:
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Captions className="h-5 w-5 text-primary" />
            Live Captioning
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleCaptionDisplay}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">Max Lines: {maxLines}</Label>
                <Slider
                  value={[maxLines]}
                  onValueChange={(value) => setMaxLines(value[0])}
                  max={10}
                  min={3}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="text-sm">Font Size: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  max={32}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="text-sm">Opacity: {Math.round(opacity * 100)}%</Label>
                <Slider
                  value={[opacity]}
                  onValueChange={(value) => setOpacity(value[0])}
                  max={1}
                  min={0.3}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.id}>
                        <div>
                          <div className="font-medium">{pos.name}</div>
                          <div className="text-xs text-muted-foreground">{pos.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm">Text Color</Label>
                <Select value={textColor} onValueChange={setTextColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {textColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: color.value }}
                          />
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm">Background Color</Label>
                <Select value={backgroundColor} onValueChange={setBackgroundColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {backgroundColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: color.value }}
                          />
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
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
            Start Captioning
          </Button>
          
          <Button 
            onClick={pauseListening} 
            variant="outline" 
            disabled={!isListening || isPaused}
            size="lg"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          
          <Button 
            onClick={resumeListening} 
            variant="outline" 
            disabled={!isPaused}
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            Resume
          </Button>
          
          <Button 
            onClick={stopListening} 
            variant="destructive" 
            disabled={!isListening && !isPaused}
            size="lg"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        {/* Status Indicators */}
        {isListening && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live captioning active...</span>
            {recognitionConfidence > 0 && (
              <Badge variant="outline">
                Confidence: {Math.round(recognitionConfidence * 100)}%
              </Badge>
            )}
          </div>
        )}

        {isPaused && (
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Captioning paused</span>
          </div>
        )}

        {/* Current Caption Display */}
        {currentCaption && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Current Caption:</Label>
            <p className="text-lg font-medium mt-2">{currentCaption}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
          <Button variant="outline" size="sm" onClick={clearCaptions} disabled={captionHistory.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCaptions} disabled={captionHistory.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={shareCaptions} disabled={captionHistory.length === 0}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Caption History */}
        {captionHistory.length > 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Caption History:</Label>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {captionHistory.slice(0, maxLines).map((caption) => (
                <div key={caption.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">
                      {languages.find(l => l.code === caption.language)?.name || caption.language}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {caption.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{caption.text}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3" />
                    <span>Confidence: {Math.round(caption.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Caption Display (Floating) */}
        <div
          id="caption-display"
          className={`fixed z-50 max-w-2xl ${getPositionStyles()}`}
          style={{
            fontSize: `${fontSize}px`,
            color: textColor,
            backgroundColor: backgroundColor === 'transparent' ? 'rgba(0,0,0,0.8)' : backgroundColor,
            opacity: opacity,
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: isListening || isPaused ? 'block' : 'none'
          }}
        >
          <div className="text-center">
            {currentCaption || 'Waiting for speech...'}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Live Captioning Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Speak clearly and at a moderate pace for best accuracy</li>
            <li>• Use in quiet environments to minimize background noise</li>
            <li>• Captions appear in real-time as you speak</li>
            <li>• Adjust position and styling in advanced settings</li>
            <li>• Captions are automatically saved and can be downloaded</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCaptioning;