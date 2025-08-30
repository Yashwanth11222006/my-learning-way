import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  const commands = [
    { phrase: 'go home', action: 'Navigate to home page', color: 'bg-primary' },
    { phrase: 'show tools', action: 'Open assistive tools', color: 'bg-secondary' },
    { phrase: 'read page', action: 'Read current page aloud', color: 'bg-accent' },
    { phrase: 'stop reading', action: 'Stop text-to-speech', color: 'bg-destructive' },
    { phrase: 'scroll down', action: 'Scroll page down', color: 'bg-primary' },
    { phrase: 'scroll up', action: 'Scroll page up', color: 'bg-secondary' },
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          handleCommand(transcript.toLowerCase().trim());
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

  const handleCommand = (command: string) => {
    const matchedCommand = commands.find(cmd => 
      command.includes(cmd.phrase.toLowerCase())
    );

    if (matchedCommand) {
      setLastCommand(`Executed: ${matchedCommand.action}`);
      
      // Execute the actual command
      switch (matchedCommand.phrase) {
        case 'go home':
          window.location.href = '/';
          break;
        case 'show tools':
          window.location.href = '/assistive-tools';
          break;
        case 'read page':
          readPageContent();
          break;
        case 'stop reading':
          window.speechSynthesis.cancel();
          break;
        case 'scroll down':
          window.scrollBy(0, 300);
          break;
        case 'scroll up':
          window.scrollBy(0, -300);
          break;
      }
    } else {
      setLastCommand(`Command not recognized: "${command}"`);
    }
  };

  const readPageContent = () => {
    const content = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(content.slice(0, 500));
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Voice Commands
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className="w-full"
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-5 w-5 mr-2" />
                Start Voice Commands
              </>
            )}
          </Button>
        </div>

        {isListening && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Listening...</p>
            <p className="font-medium">{transcript || 'Say a command...'}</p>
          </div>
        )}

        {lastCommand && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm font-medium text-success">{lastCommand}</p>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-3">Available Commands:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commands.map((command, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-mono">"{command.phrase}"</span>
                <Badge variant="secondary" className="text-xs">
                  {command.action}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>💡 Tip: Speak clearly and wait for the command to be recognized before saying the next one.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCommands;