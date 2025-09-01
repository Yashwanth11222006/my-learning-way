import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  FileText, 
  Brain, 
  Download,
  Settings,
  Zap,
  Heart,
  Share2,
  Copy,
  BookOpen,
  Target,
  Languages,
  Eye,
  Lightbulb,
  Save,
  RotateCcw,
  Bookmark,
  Volume2
} from 'lucide-react';

interface SimplifiedText {
  id: string;
  original: string;
  simplified: string;
  level: string;
  timestamp: Date;
  wordCount: number;
  readingTime: number;
}

const TextSimplifier = () => {
  const [originalText, setOriginalText] = useState('');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [simplificationHistory, setSimplificationHistory] = useState<SimplifiedText[]>([]);
  const [autoSimplify, setAutoSimplify] = useState(false);
  const [includeDefinitions, setIncludeDefinitions] = useState(true);
  const [includeExamples, setIncludeExamples] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [lineSpacing, setLineSpacing] = useState([1.5]);

  const simplificationLevels = [
    { 
      id: 'elementary', 
      name: 'Elementary', 
      description: 'Simple words, short sentences',
      grade: 'K-3',
      color: 'bg-green-100 text-green-800'
    },
    { 
      id: 'intermediate', 
      name: 'Intermediate', 
      description: 'Clear language, moderate complexity',
      grade: '4-6',
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      id: 'advanced', 
      name: 'Advanced', 
      description: 'Original complexity with clarity',
      grade: '7+',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const sampleTexts = [
    {
      title: 'Scientific Concept',
      text: 'Photosynthesis is the process by which plants convert light energy into chemical energy through a series of complex biochemical reactions involving chlorophyll, carbon dioxide, and water molecules, ultimately producing glucose and oxygen as byproducts.'
    },
    {
      title: 'Historical Event',
      text: 'The Industrial Revolution was a period of major industrialization and innovation during the late 18th and early 19th centuries. The Industrial Revolution began in Great Britain and quickly spread throughout the world, transforming largely agricultural societies into industrial ones.'
    },
    {
      title: 'Mathematical Problem',
      text: 'To solve a quadratic equation in the form ax² + bx + c = 0, you can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. This formula provides the exact solutions for any quadratic equation, regardless of whether the roots are real or complex numbers.'
    },
    {
      title: 'Literary Analysis',
      text: 'Metaphor is a figure of speech that makes an implicit, implied, or hidden comparison between two things that are unrelated, but which share some common characteristics. It is a form of figurative language that goes beyond the literal meaning of words to create new meaning.'
    }
  ];

  const loadSampleText = (text: string) => {
    setOriginalText(text);
    setSimplifiedText('');
  };

  const simplifyText = async () => {
    if (!originalText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const simplified = generateSimplifiedText(originalText, selectedLevel);
      setSimplifiedText(simplified);
      
      // Save to history
      const newResult: SimplifiedText = {
        id: Date.now().toString(),
        original: originalText,
        simplified: simplified,
        level: selectedLevel,
        timestamp: new Date(),
        wordCount: simplified.split(/\s+/).length,
        readingTime: Math.ceil(simplified.split(/\s+/).length / 200) // 200 words per minute
      };
      
      setSimplificationHistory(prev => [newResult, ...prev.slice(0, 19)]);
      setIsProcessing(false);
    }, 2000);
  };

  const generateSimplifiedText = (text: string, level: string): string => {
    // This is a simplified version - in production, this would call an AI service
    let simplified = text;
    
    if (level === 'elementary') {
      // Replace complex words with simpler alternatives
      const replacements: { [key: string]: string } = {
        'photosynthesis': level === 'elementary' ? 'how plants make food' : 'the process plants use to make food',
        'convert': 'change',
        'chemical energy': 'food energy',
        'biochemical': 'body chemistry',
        'chlorophyll': 'green plant color',
        'molecules': 'tiny parts',
        'byproducts': 'things made',
        'industrialization': level === 'elementary' ? 'making things in factories' : 'the growth of industry',
        'innovation': 'new ideas',
        'agricultural': 'farming',
        'quadratic': 'square number',
        'formula': 'math rule',
        'roots': 'answers',
        'complex': 'complicated',
        'metaphor': level === 'elementary' ? 'word picture' : 'a comparison between unlike things',
        'figurative': 'not real',
        'implicit': 'hidden',
        'characteristics': 'features'
      };
      
      Object.entries(replacements).forEach(([complex, simple]) => {
        simplified = simplified.replace(new RegExp(complex, 'gi'), simple);
      });
      
      // Break long sentences
      simplified = simplified.replace(/\. /g, '.\n\n');
    } else if (level === 'intermediate') {
      // Moderate simplification
      const replacements: { [key: string]: string } = {
        'photosynthesis': 'the process plants use to make food',
        'biochemical reactions': 'chemical processes',
        'industrialization': 'the growth of industry',
        'quadratic equation': 'a math problem with x²',
        'metaphor': 'a comparison between unlike things'
      };
      
      Object.entries(replacements).forEach(([complex, simple]) => {
        simplified = simplified.replace(new RegExp(complex, 'gi'), simple);
      });
    }
    
    return simplified;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show feedback
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetText = () => {
    setOriginalText('');
    setSimplifiedText('');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('textSimplifierFavorites') || '[]');
    if (!isFavorite) {
      favorites.push({ original: originalText, simplified: simplifiedText, level: selectedLevel });
    } else {
      const index = favorites.findIndex((fav: any) => fav.original === originalText);
      if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('textSimplifierFavorites', JSON.stringify(favorites));
  };

  const shareText = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Simplified Text from AssistEd',
        text: `Original: ${originalText}\n\nSimplified (${selectedLevel}): ${simplifiedText}`
      });
    } else {
      navigator.clipboard.writeText(`Original: ${originalText}\n\nSimplified (${selectedLevel}): ${simplifiedText}`);
      alert('Text copied to clipboard!');
    }
  };

  const getCurrentLevel = () => simplificationLevels.find(level => level.id === selectedLevel);

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Text Simplifier
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
          <Label className="text-sm font-medium">Sample Texts:</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleTexts.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSampleText(sample.text)}
                className="text-xs h-auto p-2 text-left"
              >
                <div className="font-medium">{sample.title}</div>
                <div className="text-muted-foreground truncate">{sample.text.slice(0, 60)}...</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Simplification Level:</Label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {simplificationLevels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    <div className="flex items-center gap-2">
                      <Badge className={level.color}>{level.grade}</Badge>
                      <span>{level.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {getCurrentLevel() && (
              <p className="text-xs text-muted-foreground">{getCurrentLevel()?.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Options:</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-simplify"
                  checked={autoSimplify}
                  onCheckedChange={setAutoSimplify}
                />
                <Label htmlFor="auto-simplify" className="text-sm">Auto-simplify</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-definitions"
                  checked={includeDefinitions}
                  onCheckedChange={setIncludeDefinitions}
                />
                <Label htmlFor="include-definitions" className="text-sm">Include definitions</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Display:</Label>
            <div className="space-y-2">
              <div>
                <Label className="text-xs">Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-xs">Line Spacing: {lineSpacing[0]}</Label>
                <Slider
                  value={lineSpacing}
                  onValueChange={setLineSpacing}
                  max={2.5}
                  min={1.0}
                  step={0.1}
                  className="w-full"
                />
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
                <Label className="text-sm">Language Style:</Label>
                <Select defaultValue="academic">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Include Examples:</Label>
                <Switch
                  id="include-examples"
                  checked={includeExamples}
                  onCheckedChange={setIncludeExamples}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Action */}
        <div className="flex justify-center">
          <Button 
            onClick={simplifyText} 
            disabled={!originalText.trim() || isProcessing}
            className="group"
            size="lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Simplifying...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Simplify Text
              </>
            )}
          </Button>
        </div>

        {/* Text Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Text */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Original Text:</Label>
            <Textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste or type complex text here..."
              className="min-h-64 resize-none"
              style={{ fontSize: `${fontSize[0]}px`, lineHeight: lineSpacing[0] }}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{originalText.length} characters</span>
              <span>{originalText.split(/\s+/).filter(word => word.length > 0).length} words</span>
              <span>~{Math.ceil(originalText.split(/\s+/).filter(word => word.length > 0).length / 200)} min read</span>
            </div>
          </div>

          {/* Simplified Text */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Simplified Text:</Label>
            <div className="relative">
              <Textarea
                value={simplifiedText}
                onChange={(e) => setSimplifiedText(e.target.value)}
                placeholder="Simplified text will appear here..."
                className="min-h-64 resize-none bg-green-50 border-green-200"
                style={{ fontSize: `${fontSize[0]}px`, lineHeight: lineSpacing[0] }}
              />
              {simplifiedText && (
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {getCurrentLevel()?.name}
                  </Badge>
                </div>
              )}
            </div>
            {simplifiedText && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{simplifiedText.length} characters</span>
                <span>{simplifiedText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                <span>~{Math.ceil(simplifiedText.split(/\s+/).filter(word => word.length > 0).length / 200)} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {simplifiedText && (
          <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(simplifiedText)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Simplified
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadText(simplifiedText, 'simplified-text.txt')}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadText(originalText + '\n\n---\n\n' + simplifiedText, 'original-and-simplified.txt')}>
              <Save className="h-4 w-4 mr-2" />
              Save Both
            </Button>
            <Button variant="outline" size="sm" onClick={resetText}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        )}

        {/* Simplification History */}
        {simplificationHistory.length > 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Recent Simplifications:</Label>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {simplificationHistory.slice(0, 5).map((item) => (
                <div key={item.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={simplificationLevels.find(l => l.id === item.level)?.color}>
                      {item.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 line-clamp-2">
                    {item.original}
                  </p>
                  <p className="text-sm font-medium line-clamp-2">
                    {item.simplified}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>{item.wordCount} words</span>
                    <span>{item.readingTime} min read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            How to Use Text Simplifier
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Choose the appropriate simplification level for your audience</li>
            <li>• Use elementary level for young learners or complex concepts</li>
            <li>• Intermediate level works well for most educational content</li>
            <li>• Advanced level maintains complexity while improving clarity</li>
            <li>• Adjust font size and spacing for better readability</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextSimplifier;