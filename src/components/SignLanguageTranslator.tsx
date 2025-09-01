import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Languages, 
  Volume2, 
  Hand, 
  Copy, 
  Download,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Accessibility,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface SignLanguageTranslatorProps {
  initialText?: string;
  onTranslationComplete?: (translation: any) => void;
}

interface SignData {
  description: string;
  hand_shape: string;
  movement: string;
  facial_expression: string;
  landmarks: any[];
  confidence: number;
  is_placeholder?: boolean;
}

interface TranslationResult {
  success: boolean;
  original_text: string;
  target_language: string;
  translation: {
    signs: SignData[];
    landmarks: any[];
    video_data: any;
    text_sequence: string[];
  };
  metadata: {
    confidence: number;
    processing_time: number;
    sign_count: number;
    is_mock?: boolean;
  };
}

const SignLanguageTranslator = ({ initialText = '', onTranslationComplete }: SignLanguageTranslatorProps) => {
  const [inputText, setInputText] = useState(initialText);
  const [translatedSigns, setTranslatedSigns] = useState<SignData[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [translationSpeed, setTranslationSpeed] = useState(2000); // milliseconds
  const [selectedLanguage, setSelectedLanguage] = useState('asl'); // American Sign Language
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [supportedLanguages, setSupportedLanguages] = useState<any[]>([]);

  // API Configuration
  const API_BASE_URL = 'http://localhost:5001/api';

  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
    fetchSupportedLanguages();
    checkApiHealth();
  }, [initialText]);

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      if (data.status === 'healthy') {
        setApiStatus('success');
        setError(null);
      } else {
        setApiStatus('error');
        setError('Backend service is not healthy');
      }
    } catch (err) {
      setApiStatus('error');
      setError('Cannot connect to backend service');
    }
  };

  const fetchSupportedLanguages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      const data = await response.json();
      setSupportedLanguages(data.languages || []);
    } catch (err) {
      console.error('Failed to fetch supported languages:', err);
      // Fallback to default languages
      setSupportedLanguages([
        { code: 'asl', name: 'American Sign Language', flag: '🇺🇸' },
        { code: 'bsl', name: 'British Sign Language', flag: '🇬🇧' },
        { code: 'isl', name: 'Indian Sign Language', flag: '🇮🇳' },
        { code: 'auslan', name: 'Australian Sign Language', flag: '🇦🇺' }
      ]);
    }
  };

  const translateToSignLanguage = async (text: string) => {
    if (!text.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsTranslating(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language: selectedLanguage
        }),
      });

      const result: TranslationResult = await response.json();
      
      if (result.success) {
        setTranslatedSigns(result.translation.signs);
        setCurrentSignIndex(0);
        
        if (onTranslationComplete) {
          onTranslationComplete(result);
        }
      } else {
        setError('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setError('Failed to connect to translation service. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const playSignSequence = () => {
    if (translatedSigns.length === 0) return;
    
    setIsPlaying(true);
    setCurrentSignIndex(0);
    
    const playNextSign = (index: number) => {
      if (index >= translatedSigns.length) {
        setIsPlaying(false);
        return;
      }
      
      setCurrentSignIndex(index);
      
      setTimeout(() => {
        playNextSign(index + 1);
      }, translationSpeed);
    };
    
    playNextSign(0);
  };

  const pauseSignSequence = () => {
    setIsPlaying(false);
  };

  const resetSignSequence = () => {
    setIsPlaying(false);
    setCurrentSignIndex(0);
  };

  const copyTranslation = () => {
    const translationText = translatedSigns
      .map((sign, index) => `${index + 1}. ${sign.description}`)
      .join('\n');
    
    navigator.clipboard.writeText(translationText);
  };

  const downloadTranslation = () => {
    const translationData = {
      originalText: inputText,
      translatedSigns: translatedSigns,
      language: selectedLanguage,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(translationData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sign-translation-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Hand className="h-6 w-6 text-primary" />
            <span>Sign Language Translator</span>
            {apiStatus === 'success' && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {apiStatus === 'error' && (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </CardTitle>
          <CardDescription>
            Translate text to sign language with visual guides and animations
            {apiStatus === 'error' && (
              <span className="block text-red-500 mt-2">
                ⚠️ Using offline mode - Some features may be limited
              </span>
            )}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter text to translate:</label>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="h-20 resize-none"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {supportedLanguages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <Button 
              onClick={() => translateToSignLanguage(inputText)}
              disabled={!inputText.trim() || isTranslating}
              className="flex items-center space-x-2"
            >
              {isTranslating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Hand className="h-4 w-4" />
              )}
              <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Translation Results */}
      {translatedSigns.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sign Language Translation</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyTranslation}
                  className="flex items-center space-x-1"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTranslation}
                  className="flex items-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Playback Controls */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isPlaying ? pauseSignSequence : playSignSequence}
                  disabled={translatedSigns.length === 0}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span className="ml-1">{isPlaying ? 'Pause' : 'Play'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSignSequence}
                  disabled={translatedSigns.length === 0}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="ml-1">Reset</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <select
                  value={translationSpeed}
                  onChange={(e) => setTranslationSpeed(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={1000}>Fast</option>
                  <option value={2000}>Normal</option>
                  <option value={3000}>Slow</option>
                </select>
              </div>
            </div>

            {/* Signs Display */}
            <div className="grid gap-4">
              {translatedSigns.map((sign, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg transition-all duration-300 ${
                    currentSignIndex === index && isPlaying
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant={currentSignIndex === index && isPlaying ? 'default' : 'secondary'}>
                          Sign {index + 1}
                        </Badge>
                        {sign.is_placeholder && (
                          <Badge variant="outline" className="text-xs">
                            Placeholder
                          </Badge>
                        )}
                        <div className={`w-3 h-3 rounded-full ${getConfidenceColor(sign.confidence)}`} 
                             title={`Confidence: ${Math.round(sign.confidence * 100)}%`} />
                      </div>
                      
                      <h4 className="font-medium">{sign.description}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Hand Shape:</span> {sign.hand_shape}
                        </div>
                        <div>
                          <span className="font-medium">Movement:</span> {sign.movement}
                        </div>
                        <div>
                          <span className="font-medium">Expression:</span> {sign.facial_expression}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Hand className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing sign {currentSignIndex + 1} of {translatedSigns.length}
              </span>
              <span>
                {selectedLanguage.toUpperCase()} - {supportedLanguages.find(l => l.code === selectedLanguage)?.name}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Accessibility className="h-5 w-5" />
            <span>Accessibility Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Visual Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High contrast sign demonstrations</li>
                <li>• Step-by-step visual guides</li>
                <li>• Hand shape illustrations</li>
                <li>• Movement pattern animations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Audio Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audio descriptions of signs</li>
                <li>• Pronunciation guides</li>
                <li>• Timing cues for practice</li>
                <li>• Voice feedback for learning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignLanguageTranslator;
