import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Wand2, Copy, CheckCircle } from 'lucide-react';

const TextSimplifier = () => {
  const [inputText, setInputText] = useState('The implementation of comprehensive accessibility features requires sophisticated technological infrastructure and meticulous attention to diverse user requirements.');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [level, setLevel] = useState('elementary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const simplificationRules = {
    elementary: {
      label: 'Elementary (Age 6-11)',
      description: 'Very simple words and short sentences'
    },
    middle: {
      label: 'Middle School (Age 12-14)',
      description: 'Simple words with some complexity'
    },
    high: {
      label: 'High School (Age 15-18)',
      description: 'Clear language with moderate vocabulary'
    },
    adult: {
      label: 'Adult Simplified',
      description: 'Professional but accessible language'
    }
  };

  const simplifyText = async () => {
    setIsProcessing(true);
    
    // Simulate text simplification processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple text simplification logic
    let simplified = inputText;
    
    const complexWords: Record<string, string> = {
      'implementation': level === 'elementary' ? 'putting in place' : 'setting up',
      'comprehensive': level === 'elementary' ? 'complete' : 'full',
      'accessibility': level === 'elementary' ? 'easy to use' : 'usable by everyone',
      'sophisticated': level === 'elementary' ? 'smart' : 'advanced',
      'technological': level === 'elementary' ? 'computer' : 'tech',
      'infrastructure': level === 'elementary' ? 'systems' : 'framework',
      'meticulous': level === 'elementary' ? 'careful' : 'detailed',
      'diverse': level === 'elementary' ? 'different' : 'varied',
      'requirements': level === 'elementary' ? 'needs' : 'needs'
    };
    
    // Replace complex words
    Object.entries(complexWords).forEach(([complex, simple]) => {
      const regex = new RegExp(complex, 'gi');
      simplified = simplified.replace(regex, simple);
    });
    
    // Simplify sentence structure for elementary level
    if (level === 'elementary') {
      simplified = simplified
        .replace(/requires/g, 'needs')
        .replace(/and meticulous attention to/g, '. We must also think about')
        .replace(/The implementation of/g, 'Setting up');
      
      // Break into shorter sentences
      simplified = simplified.replace(/requires (.+) and (.+)/g, 'needs $1. It also needs $2');
    }
    
    setSimplifiedText(simplified);
    setIsProcessing(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(simplifiedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getReadabilityScore = (text: string) => {
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    if (avgWordsPerSentence < 10) return { score: 'Easy', color: 'bg-success' };
    if (avgWordsPerSentence < 15) return { score: 'Medium', color: 'bg-warning' };
    return { score: 'Hard', color: 'bg-destructive' };
  };

  const inputReadability = getReadabilityScore(inputText);
  const outputReadability = simplifiedText ? getReadabilityScore(simplifiedText) : null;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Text Simplifier
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Simplification Level:</label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(simplificationRules).map(([key, rule]) => (
                <SelectItem key={key} value={key}>
                  <div>
                    <div className="font-medium">{rule.label}</div>
                    <div className="text-xs text-muted-foreground">{rule.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Text */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Original Text:</label>
              <Badge className={inputReadability.color}>
                {inputReadability.score}
              </Badge>
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter complex text to simplify..."
              className="min-h-32"
            />
          </div>

          {/* Output Text */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Simplified Text:</label>
              {outputReadability && (
                <Badge className={outputReadability.color}>
                  {outputReadability.score}
                </Badge>
              )}
            </div>
            <div className="relative">
              <Textarea
                value={simplifiedText}
                readOnly
                placeholder="Simplified text will appear here..."
                className="min-h-32 pr-12"
              />
              {simplifiedText && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        <Button 
          onClick={simplifyText} 
          disabled={!inputText || isProcessing}
          className="w-full"
          size="lg"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isProcessing ? 'Simplifying...' : 'Simplify Text'}
        </Button>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Replaces complex words with simpler alternatives</li>
            <li>• Breaks down long sentences into shorter ones</li>
            <li>• Adjusts vocabulary to match the selected reading level</li>
            <li>• Maintains the original meaning while improving clarity</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextSimplifier;