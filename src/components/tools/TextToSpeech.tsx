import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Download,
  Settings,
  Mic,
  Clock,
  Zap,
  Heart,
  Share2
} from 'lucide-react';

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to AssistEd! This is our enhanced text-to-speech feature that helps make content more accessible. You can adjust the voice, speed, and pitch to suit your preferences.');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('default');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        setSelectedVoice(voices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoice]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice
      if (selectedVoice !== 'default') {
        const voice = availableVoices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
      }
      
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      utterance.volume = volume[0];
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onpause = () => setIsPaused(true);
      utterance.onresume = () => setIsPaused(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('ttsFavorites') || '[]');
    if (!isFavorite) {
      favorites.push(text);
    } else {
      const index = favorites.indexOf(text);
      if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('ttsFavorites', JSON.stringify(favorites));
  };

  const downloadAudio = () => {
    // This would integrate with a TTS service for actual audio download
    alert('Audio download feature would integrate with a TTS service like Google Cloud TTS or Amazon Polly');
  };

  const shareText = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Text from AssistEd TTS',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    }
  };

  const sampleTexts = [
    'Hello! Welcome to AssistEd. This is a sample text to test the text-to-speech feature.',
    'Learning should be accessible to everyone. Our tools help make that possible.',
    'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.',
    'Mathematics is the language of the universe. Let\'s explore it together with accessible tools.'
  ];

  const loadSampleText = (sample: string) => {
    setText(sample);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Enhanced Text-to-Speech
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
            <Button variant="ghost" size="sm" onClick={shareText}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Sample Texts */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Samples:</Label>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSampleText(sample)}
                className="text-xs"
              >
                Sample {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Text to speak:</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            className="min-h-32 resize-none"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{text.length} characters</span>
            <span>Estimated time: {Math.ceil(text.length / 150)} seconds</span>
          </div>
        </div>

        {/* Basic Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Voice:</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Voice</SelectItem>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Speed: {rate[0]}x</Label>
            <Slider
              value={rate}
              onValueChange={setRate}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Pitch: {pitch[0]}x</Label>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Advanced Controls */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Advanced Settings:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Volume: {Math.round(volume[0] * 100)}%</Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Voice Info:</Label>
                {selectedVoice !== 'default' && availableVoices.find(v => v.name === selectedVoice) && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Language: {availableVoices.find(v => v.name === selectedVoice)?.lang}</div>
                    <div>Local: {availableVoices.find(v => v.name === selectedVoice)?.localService ? 'Yes' : 'No'}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Playback Controls */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            onClick={speak} 
            disabled={isPlaying && !isPaused} 
            className="flex-1 max-w-xs group"
            size="lg"
          >
            <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            {isPaused ? 'Resume' : 'Speak'}
          </Button>
          
          <Button 
            onClick={pause} 
            variant="outline" 
            disabled={!isPlaying}
            size="lg"
          >
            <Pause className="h-4 w-4 mr-2" />
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          
          <Button 
            onClick={stop} 
            variant="outline" 
            disabled={!isPlaying}
            size="lg"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
          <Button variant="outline" size="sm" onClick={downloadAudio}>
            <Download className="h-4 w-4 mr-2" />
            Download Audio
          </Button>
          <Button variant="outline" size="sm" onClick={shareText}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Text
          </Button>
        </div>

        {/* Status Indicators */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Playing audio...</span>
            {isPaused && <Badge variant="outline">Paused</Badge>}
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Pro Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use slower speeds (0.5x-0.8x) for complex content</li>
            <li>• Adjust pitch to make voices more comfortable</li>
            <li>• Save frequently used text as favorites</li>
            <li>• Try different voices for variety</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;