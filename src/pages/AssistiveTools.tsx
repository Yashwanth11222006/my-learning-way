import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TextToSpeech from '@/components/tools/TextToSpeech';
import VoiceCommands from '@/components/tools/VoiceCommands';
import LiveCaptioning from '@/components/tools/LiveCaptioning';
import TextSimplifier from '@/components/tools/TextSimplifier';
import SpeechToText from '@/components/tools/SpeechToText'; // Added SpeechToText import
import AccessibilitySettings from '@/components/tools/AccessibilitySettings'; // Added AccessibilitySettings import
import SignLanguageTranslator from '@/components/SignLanguageTranslator'; // Added SignLanguageTranslator import
import SignLanguageDetector from '@/components/SignLanguageDetector'; // Added SignLanguageDetector import
import AdvancedSignLanguageDetector from '@/components/AdvancedSignLanguageDetector'; // Added AdvancedSignLanguageDetector import
import { 
  Volume2, 
  Eye, 
  Mic, 
  FileText, 
  Captions, 
  Headphones,
  MessageSquare,
  Palette,
  Keyboard,
  MousePointer,
  Brain,
  Settings,
  Play,
  Download,
  Star,
  Users,
  CheckCircle,
  Hand
} from 'lucide-react';

const AssistiveTools = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toolCategories = [
    { id: 'all', label: 'All Tools', count: 15 },
    { id: 'audio', label: 'Audio & Voice', count: 4 },
    { id: 'visual', label: 'Visual Support', count: 6 },
    { id: 'cognitive', label: 'Cognitive Aids', count: 3 },
    { id: 'navigation', label: 'Navigation', count: 2 }
  ];

  const assistiveTools = [
    {
      id: 'live-captioning',
      title: 'Live Captioning',
      description: 'Transform spoken words into text instantly with AI-powered real-time captions',
      category: 'visual',
      icon: Captions,
      features: ['Real-time transcription', 'Multiple languages', 'Customizable display', 'Export options'],
      rating: 4.9,
      users: '2.3M',
      status: 'popular',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'text-to-speech',
      title: 'Text-to-Speech',
      description: 'Hear your lessons in natural voices with adjustable speed and language options',
      category: 'audio',
      icon: Volume2,
      features: ['Natural voices', 'Speed control', '50+ languages', 'Offline support'],
      rating: 4.8,
      users: '1.8M',
      status: 'featured',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'voice-commands',
      title: 'Voice Commands',
      description: 'Navigate and control the platform using natural speech commands',
      category: 'audio',
      icon: Mic,
      features: ['Hands-free navigation', 'Custom commands', 'Voice shortcuts', 'Multi-language'],
      rating: 4.7,
      users: '950K',
      status: 'new',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'text-simplifier',
      title: 'Text Simplifier',
      description: 'Make complex ideas easier to understand with AI-powered text simplification',
      category: 'cognitive',
      icon: FileText,
      features: ['Smart simplification', 'Reading levels', 'Key concepts', 'Visual aids'],
      rating: 4.9,
      users: '1.2M',
      status: 'popular',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'sign-language-translator',
      title: 'Sign Language Translator',
      description: 'Convert text to sign language with visual guides and step-by-step instructions',
      category: 'visual',
      icon: Hand,
      features: ['Multiple sign languages', 'Visual guides', 'Playback controls', 'Export options'],
      rating: 4.9,
      users: '1.1M',
      status: 'new',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'sign-language-detector',
      title: 'Sign Language Detector',
      description: 'Use camera to detect sign language gestures and convert them to text in real-time',
      category: 'visual',
      icon: Eye,
      features: ['Camera detection', 'Real-time conversion', 'Multiple languages', 'Confidence scoring'],
      rating: 4.8,
      users: '850K',
      status: 'new',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'advanced-sign-detector',
      title: 'Advanced Sign Detector',
      description: 'Professional-grade sign language detection with MediaPipe integration and advanced analytics',
      category: 'visual',
      icon: Brain,
      features: ['MediaPipe integration', 'Advanced analytics', 'Performance metrics', 'Multi-hand tracking'],
      rating: 4.9,
      users: '650K',
      status: 'featured',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'sign-visuals',
      title: 'Sign Language Support',
      description: 'Watch lessons explained through visual sign language interpretation',
      category: 'visual',
      icon: Eye,
      features: ['ASL & BSL support', 'HD video quality', 'Adjustable speed', 'Picture-in-picture'],
      rating: 4.8,
      users: '645K',
      status: 'featured',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'focus-mode',
      title: 'Focus Enhancement',
      description: 'Minimize distractions with customizable focus modes and attention aids',
      category: 'cognitive',
      icon: Brain,
      features: ['Distraction blocking', 'Progress tracking', 'Break reminders', 'Customizable UI'],
      rating: 4.6,
      users: '890K',
      status: 'new',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'keyboard-nav',
      title: 'Keyboard Navigation',
      description: 'Full platform access using only keyboard shortcuts and navigation',
      category: 'navigation',
      icon: Keyboard,
      features: ['Tab navigation', 'Custom shortcuts', 'Skip links', 'Focus indicators'],
      rating: 4.7,
      users: '1.1M',
      status: 'essential',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'color-contrast',
      title: 'Color & Contrast Tools',
      description: 'Adjust colors, contrast, and themes for optimal visual accessibility',
      category: 'visual',
      icon: Palette,
      features: ['High contrast modes', 'Color filters', 'Dark/light themes', 'Custom palettes'],
      rating: 4.8,
      users: '1.5M',
      status: 'popular',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'screen-reader',
      title: 'Screen Reader Optimization',
      description: 'Enhanced compatibility with popular screen reading software',
      category: 'audio',
      icon: Headphones,
      features: ['NVDA support', 'JAWS compatible', 'ARIA labels', 'Semantic structure'],
      rating: 4.9,
      users: '750K',
      status: 'essential',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'mouse-alternatives',
      title: 'Mouse Alternatives',
      description: 'Switch control, eye tracking, and other pointer alternatives',
      category: 'navigation',
      icon: MousePointer,
      features: ['Switch control', 'Eye tracking', 'Head tracking', 'Dwell clicking'],
      rating: 4.5,
      users: '320K',
      status: 'specialized',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'study-assistant',
      title: 'Cognitive Study Assistant',
      description: 'AI-powered learning companion that adapts to your cognitive needs',
      category: 'cognitive',
      icon: Brain,
      features: ['Personalized pacing', 'Memory aids', 'Concept mapping', 'Progress insights'],
      rating: 4.7,
      users: '680K',
      status: 'featured',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'communication-board',
      title: 'Communication Board',
      description: 'Symbol-based communication tools for non-verbal interaction',
      category: 'audio',
      icon: MessageSquare,
      features: ['Symbol library', 'Custom boards', 'Voice output', 'Quick phrases'],
      rating: 4.6,
      users: '290K',
      status: 'specialized',
      gradient: 'bg-gradient-accent'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      popular: { variant: 'default' as const, label: '🔥 Popular' },
      featured: { variant: 'secondary' as const, label: '⭐ Featured' },
      new: { variant: 'destructive' as const, label: '🆕 New' },
      essential: { variant: 'outline' as const, label: '🎯 Essential' },
      specialized: { variant: 'secondary' as const, label: '🔧 Specialized' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.featured;
  };

  const filteredTools = selectedCategory === 'all' 
    ? assistiveTools 
    : assistiveTools.filter(tool => tool.category === selectedCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Tools Designed for Your Comfort
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Technology that adjusts to you. Discover assistive tools that make learning 
              accessible, comfortable, and empowering for every type of learner.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {toolCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Demo */}
      <section className="py-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Try Our Tools Live</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of assistive technology with these interactive demos
            </p>
          </div>

          <Tabs defaultValue="text-to-speech" className="w-full">
            <TabsList className="grid w-full grid-cols-9 max-w-7xl mx-auto mb-8">
              <TabsTrigger value="text-to-speech" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span className="hidden sm:inline">Text-to-Speech</span>
              </TabsTrigger>
              <TabsTrigger value="speech-to-text" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Speech-to-Text</span>
              </TabsTrigger>
              <TabsTrigger value="voice-commands" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Voice Commands</span>
              </TabsTrigger>
              <TabsTrigger value="live-captioning" className="flex items-center gap-2">
                <Captions className="h-4 w-4" />
                <span className="hidden sm:inline">Live Captions</span>
              </TabsTrigger>
              <TabsTrigger value="text-simplifier" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Text Simplifier</span>
              </TabsTrigger>
              <TabsTrigger value="sign-language-translator" className="flex items-center gap-2">
                <Hand className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Language Translator</span>
              </TabsTrigger>
              <TabsTrigger value="sign-language-detector" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Detector</span>
              </TabsTrigger>
              <TabsTrigger value="advanced-sign-detector" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced Detector</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility-settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex justify-center">
              <TabsContent value="text-to-speech">
                <TextToSpeech />
              </TabsContent>
              <TabsContent value="speech-to-text">
                <SpeechToText />
              </TabsContent>
              <TabsContent value="voice-commands">
                <VoiceCommands />
              </TabsContent>
              <TabsContent value="live-captioning">
                <LiveCaptioning />
              </TabsContent>
              <TabsContent value="text-simplifier">
                <TextSimplifier />
              </TabsContent>
              <TabsContent value="sign-language-translator">
                <SignLanguageTranslator />
              </TabsContent>
              <TabsContent value="sign-language-detector">
                <SignLanguageDetector />
              </TabsContent>
              <TabsContent value="advanced-sign-detector">
                <AdvancedSignLanguageDetector />
              </TabsContent>
              <TabsContent value="accessibility-settings">
                <AccessibilitySettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Tools Library</h2>
            <p className="text-xl text-muted-foreground">
              Discover all available assistive tools and features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => {
              const Icon = tool.icon;
              const statusBadge = getStatusBadge(tool.status);
              
              return (
                <Card 
                  key={tool.id}
                  className="group hover:shadow-large transition-all duration-300 hover:scale-105 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 ${tool.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <Badge {...statusBadge}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold">{tool.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{tool.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{tool.users}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 group"
                        onClick={() => {
                          if (tool.id === 'sign-language-translator') {
                            window.location.href = '/sign-language';
                          } else if (tool.id === 'sign-language-detector') {
                            // Switch to the detector tab in the interactive tools section
                            const detectorTab = document.querySelector('[value="sign-language-detector"]') as HTMLElement;
                            if (detectorTab) {
                              detectorTab.click();
                              // Scroll to the interactive tools section
                              document.querySelector('[data-tabs]')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else if (tool.id === 'advanced-sign-detector') {
                            // Switch to the advanced detector tab in the interactive tools section
                            const advancedDetectorTab = document.querySelector('[value="advanced-sign-detector"]') as HTMLElement;
                            if (advancedDetectorTab) {
                              advancedDetectorTab.click();
                              // Scroll to the interactive tools section
                              document.querySelector('[data-tabs]')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            // Default behavior for other tools
                            console.log(`Opening ${tool.title}`);
                          }
                        }}
                      >
                        <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        {tool.id === 'sign-language-translator' ? 'Open Translator' : 
                         tool.id === 'sign-language-detector' ? 'Try Detector' :
                         tool.id === 'advanced-sign-detector' ? 'Try Advanced' : 'Try Now'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Need Help Choosing the Right Tools?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Our accessibility specialists are here to help you find the perfect combination 
              of tools for your unique learning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl">
                Get Personalized Recommendations
              </Button>
              <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AssistiveTools;