import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mic, 
  MicOff, 
  Square, 
  Settings,
  Zap,
  Heart,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Palette,
  Type,
  Keyboard,
  MousePointer,
  Brain,
  Languages,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  description: string;
  category: string;
  isActive: boolean;
}

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [autoExecute, setAutoExecute] = useState(true);
  const [feedbackVolume, setFeedbackVolume] = useState(0.7);
  const [lastCommand, setLastCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [recognitionConfidence, setRecognitionConfidence] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' }
  ];

  const defaultCommands: VoiceCommand[] = [
    {
      id: '1',
      phrase: 'start listening',
      action: 'start_recognition',
      description: 'Begin voice command recognition',
      category: 'control',
      isActive: true
    },
    {
      id: '2',
      phrase: 'stop listening',
      action: 'stop_recognition',
      description: 'Stop voice command recognition',
      category: 'control',
      isActive: true
    },
    {
      id: '3',
      phrase: 'increase font size',
      action: 'font_size_up',
      description: 'Make text larger',
      category: 'accessibility',
      isActive: true
    },
    {
      id: '4',
      phrase: 'decrease font size',
      action: 'font_size_down',
      description: 'Make text smaller',
      category: 'accessibility',
      isActive: true
    },
    {
      id: '5',
      phrase: 'high contrast',
      action: 'toggle_contrast',
      description: 'Toggle high contrast mode',
      category: 'accessibility',
      isActive: true
    },
    {
      id: '6',
      phrase: 'dark mode',
      action: 'toggle_theme',
      description: 'Switch between light and dark themes',
      category: 'accessibility',
      isActive: true
    },
    {
      id: '7',
      phrase: 'read page',
      action: 'read_content',
      description: 'Read the current page content',
      category: 'navigation',
      isActive: true
    },
    {
      id: '8',
      phrase: 'go home',
      action: 'navigate_home',
      description: 'Navigate to the home page',
      category: 'navigation',
      isActive: true
    },
    {
      id: '9',
      phrase: 'go back',
      action: 'navigate_back',
      description: 'Go to the previous page',
      category: 'navigation',
      isActive: true
    },
    {
      id: '10',
      phrase: 'scroll up',
      action: 'scroll_up',
      description: 'Scroll the page upward',
      category: 'navigation',
      isActive: true
    },
    {
      id: '11',
      phrase: 'scroll down',
      action: 'scroll_down',
      description: 'Scroll the page downward',
      category: 'navigation',
      isActive: true
    },
    {
      id: '12',
      phrase: 'focus mode',
      action: 'toggle_focus',
      description: 'Toggle distraction-free focus mode',
      category: 'productivity',
      isActive: true
    },
    {
      id: '13',
      phrase: 'mute audio',
      action: 'toggle_audio',
      description: 'Mute or unmute audio feedback',
      category: 'audio',
      isActive: true
    },
    {
      id: '14',
      phrase: 'help',
      action: 'show_help',
      description: 'Show available voice commands',
      category: 'help',
      isActive: true
    }
  ];

  const [commands, setCommands] = useState<VoiceCommand[]>(defaultCommands);

  useEffect(() => {
    // Load saved commands from localStorage
    const saved = localStorage.getItem('voiceCommands');
    if (saved) {
      setCommands(JSON.parse(saved));
    }
  }, []);

  const saveCommands = () => {
    localStorage.setItem('voiceCommands', JSON.stringify(commands));
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
      speakFeedback('Voice commands activated. I am listening.');
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
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        const command = finalTranscript.toLowerCase().trim();
        setLastCommand(command);
        setCommandHistory(prev => [command, ...prev.slice(0, 9)]);
        
        if (autoExecute) {
          executeCommand(command);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        speakFeedback('No speech detected. Please try again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    speakFeedback('Voice commands deactivated.');
  };

  const executeCommand = (command: string) => {
    const matchedCommand = commands.find(cmd => 
      cmd.isActive && command.includes(cmd.phrase.toLowerCase())
    );

    if (matchedCommand) {
      performAction(matchedCommand.action, matchedCommand.phrase);
      speakFeedback(`Executing: ${matchedCommand.description}`);
    } else {
      speakFeedback('Command not recognized. Say help for available commands.');
    }
  };

  const performAction = (action: string, phrase: string) => {
    switch (action) {
      case 'start_recognition':
        if (!isListening) startListening();
        break;
      case 'stop_recognition':
        if (isListening) stopListening();
        break;
      case 'font_size_up':
        increaseFontSize();
        break;
      case 'font_size_down':
        decreaseFontSize();
        break;
      case 'toggle_contrast':
        toggleHighContrast();
        break;
      case 'toggle_theme':
        toggleTheme();
        break;
      case 'read_content':
        readPageContent();
        break;
      case 'navigate_home':
        navigateToHome();
        break;
      case 'navigate_back':
        window.history.back();
        break;
      case 'scroll_up':
        window.scrollBy(0, -300);
        break;
      case 'scroll_down':
        window.scrollBy(0, 300);
        break;
      case 'toggle_focus':
        toggleFocusMode();
        break;
      case 'toggle_audio':
        toggleAudioFeedback();
        break;
      case 'show_help':
        showHelp();
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const increaseFontSize = () => {
    const root = document.documentElement;
    const currentSize = parseInt(getComputedStyle(root).fontSize) || 16;
    root.style.fontSize = `${Math.min(currentSize + 2, 24)}px`;
  };

  const decreaseFontSize = () => {
    const root = document.documentElement;
    const currentSize = parseInt(getComputedStyle(root).fontSize) || 16;
    root.style.fontSize = `${Math.max(currentSize - 2, 12)}px`;
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const readPageContent = () => {
    const mainContent = document.querySelector('main') || document.body;
    const text = mainContent.textContent || '';
    speakFeedback(text.substring(0, 200) + '...');
  };

  const navigateToHome = () => {
    window.location.href = '/home';
  };

  const toggleFocusMode = () => {
    document.body.classList.toggle('focus-mode');
  };

  const toggleAudioFeedback = () => {
    setFeedbackVolume(prev => prev > 0 ? 0 : 0.7);
  };

  const showHelp = () => {
    const helpText = `Available commands: ${commands.filter(c => c.isActive).map(c => c.phrase).join(', ')}`;
    speakFeedback(helpText);
  };

  const speakFeedback = (text: string) => {
    if (feedbackVolume === 0) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = feedbackVolume;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCommand = (commandId: string) => {
    setCommands(prev => prev.map(cmd => 
      cmd.id === commandId ? { ...cmd, isActive: !cmd.isActive } : cmd
    ));
  };

  const addCustomCommand = () => {
    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      phrase: 'custom command',
      action: 'custom_action',
      description: 'Custom voice command',
      category: 'custom',
      isActive: true
    };
    setCommands(prev => [...prev, newCommand]);
  };

  const removeCommand = (commandId: string) => {
    setCommands(prev => prev.filter(cmd => cmd.id !== commandId));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'control': return <Mic className="h-4 w-4" />;
      case 'accessibility': return <Eye className="h-4 w-4" />;
      case 'navigation': return <MousePointer className="h-4 w-4" />;
      case 'productivity': return <Brain className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'help': return <Zap className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'control': return 'bg-blue-100 text-blue-800';
      case 'accessibility': return 'bg-green-100 text-green-800';
      case 'navigation': return 'bg-purple-100 text-purple-800';
      case 'productivity': return 'bg-orange-100 text-orange-800';
      case 'audio': return 'bg-pink-100 text-pink-800';
      case 'help': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Commands
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={addCustomCommand}
              className="text-green-600 hover:text-green-700"
            >
              <CheckCircle className="h-4 w-4" />
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
                  id="auto-execute"
                  checked={autoExecute}
                  onCheckedChange={setAutoExecute}
                />
                <Label htmlFor="auto-execute" className="text-sm">Auto-execute</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Advanced Settings:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Feedback Volume: {Math.round(feedbackVolume * 100)}%</Label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={feedbackVolume}
                  onChange={(e) => setFeedbackVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Audio Feedback</Label>
                <Switch
                  checked={feedbackVolume > 0}
                  onCheckedChange={(checked) => setFeedbackVolume(checked ? 0.7 : 0)}
                />
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

        {/* Status Indicators */}
        {isListening && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Listening for voice commands...</span>
            {recognitionConfidence > 0 && (
              <Badge variant="outline">
                Confidence: {Math.round(recognitionConfidence * 100)}%
              </Badge>
            )}
          </div>
        )}

        {/* Last Command */}
        {lastCommand && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Last Command:</Label>
            <p className="text-sm text-muted-foreground mt-1">"{lastCommand}"</p>
          </div>
        )}

        {/* Command History */}
        {commandHistory.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Recent Commands:</Label>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {commandHistory.map((cmd, index) => (
                <div key={index} className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  "{cmd}"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Commands */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Available Commands:</Label>
            <Button variant="outline" size="sm" onClick={saveCommands}>
              Save Changes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commands.map((command) => (
              <div key={command.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(command.category)}
                    <Badge className={getCategoryColor(command.category)}>
                      {command.category}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{command.phrase}</p>
                  <p className="text-xs text-muted-foreground">{command.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Switch
                    checked={command.isActive}
                    onCheckedChange={() => toggleCommand(command.id)}
                  />
                  {command.category === 'custom' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCommand(command.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Voice Command Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Use natural language like "increase font size"</li>
            <li>• Say "help" to hear all available commands</li>
            <li>• Commands work best in quiet environments</li>
            <li>• You can customize and add new commands</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCommands;