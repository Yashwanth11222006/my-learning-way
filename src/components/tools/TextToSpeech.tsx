import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to AssistEd. This is our text-to-speech feature that helps make content more accessible.');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState('default');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          Text-to-Speech
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Text to speak:</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            className="min-h-32"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Voice:</label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Speed: {rate[0]}x</label>
            <Slider
              value={rate}
              onValueChange={setRate}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Pitch: {pitch[0]}x</label>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={speak} disabled={isPlaying} className="flex-1">
            <Play className="h-4 w-4 mr-2" />
            Speak
          </Button>
          <Button onClick={pause} variant="outline" disabled={!isPlaying}>
            <Pause className="h-4 w-4" />
          </Button>
          <Button onClick={stop} variant="outline" disabled={!isPlaying}>
            <Square className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;