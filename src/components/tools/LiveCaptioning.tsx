import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Captions, Mic, MicOff, Download, Trash2 } from 'lucide-react';

const LiveCaptioning = () => {
  const [isListening, setIsListening] = useState(false);
  const [captions, setCaptions] = useState<Array<{ id: number; text: string; timestamp: string }>>([]);
  const [currentCaption, setCurrentCaption] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
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
          const newCaption = {
            id: Date.now(),
            text: finalTranscript.trim(),
            timestamp: new Date().toLocaleTimeString()
          };
          setCaptions(prev => [...prev, newCaption]);
          setCurrentCaption('');
        } else {
          setCurrentCaption(interimTranscript);
        }
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [captions, currentCaption]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const clearCaptions = () => {
    setCaptions([]);
    setCurrentCaption('');
  };

  const exportCaptions = () => {
    const content = captions.map(caption => 
      `[${caption.timestamp}] ${caption.text}`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Captions className="h-5 w-5 text-primary" />
          Live Captioning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "default"}
            className="flex-1"
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Captioning
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Captioning
              </>
            )}
          </Button>
          
          <Button
            onClick={clearCaptions}
            variant="outline"
            disabled={captions.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={exportCaptions}
            variant="outline"
            disabled={captions.length === 0}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={isListening ? "default" : "secondary"}>
            {isListening ? "🔴 Recording" : "⏸️ Stopped"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {captions.length} captions recorded
          </span>
        </div>

        <ScrollArea className="h-80 w-full border rounded-lg p-4" ref={scrollAreaRef}>
          <div className="space-y-3">
            {captions.map((caption) => (
              <div key={caption.id} className="flex gap-3">
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {caption.timestamp}
                </Badge>
                <p className="text-sm flex-1">{caption.text}</p>
              </div>
            ))}
            
            {currentCaption && (
              <div className="flex gap-3 opacity-70">
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {new Date().toLocaleTimeString()}
                </Badge>
                <p className="text-sm flex-1 italic">{currentCaption}</p>
              </div>
            )}
            
            {captions.length === 0 && !currentCaption && (
              <div className="text-center text-muted-foreground py-8">
                <Captions className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Start Captioning" to begin live transcription</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>💡 This feature uses your browser's speech recognition</p>
          <p>🎯 Best results with clear speech and minimal background noise</p>
          <p>📝 Captions are saved locally and can be exported</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCaptioning;