import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Mic, 
  Eye, 
  Brain, 
  Keyboard, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  Target,
  Type
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const Demo = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoText, setDemoText] = useState('Welcome to AssistEd! This is a demonstration of our accessible learning platform.');

  const features = [
    {
      id: 'tts',
      title: 'Text-to-Speech',
      description: 'Hear content read aloud with natural voices',
      icon: Volume2,
      demo: () => speakText(demoText),
      color: 'bg-blue-500'
    },
    {
      id: 'stt',
      title: 'Speech-to-Text',
      description: 'Convert your voice to text instantly',
      icon: Mic,
      demo: () => startSpeechRecognition(),
      color: 'bg-green-500'
    },
    {
      id: 'voice',
      title: 'Voice Commands',
      description: 'Control the platform with your voice',
      icon: Mic,
      demo: () => demonstrateVoiceCommands(),
      color: 'bg-purple-500'
    },
    {
      id: 'captions',
      title: 'Live Captions',
      description: 'Real-time speech-to-text captions',
      icon: Eye,
      demo: () => showLiveCaptions(),
      color: 'bg-orange-500'
    },
    {
      id: 'simplify',
      title: 'Text Simplification',
      description: 'Make complex content easier to understand',
      icon: Brain,
      demo: () => demonstrateSimplification(),
      color: 'bg-red-500'
    },
    {
      id: 'accessibility',
      title: 'Accessibility Settings',
      description: 'Customize the interface for your needs',
      icon: Keyboard,
      demo: () => demonstrateAccessibility(),
      color: 'bg-indigo-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentFeature(prev => (prev + 1) % features.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, features.length]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDemoText(transcript);
      speakText(`You said: ${transcript}`);
    };

    recognition.start();
  };

  const demonstrateVoiceCommands = () => {
    speakText('Voice commands activated. Try saying: increase font size, high contrast, or read page.');
    
    // Simulate voice command execution
    setTimeout(() => {
      document.body.classList.add('large-text');
      speakText('Font size increased. Voice commands are working!');
    }, 2000);
  };

  const showLiveCaptions = () => {
    speakText('Live captions are now active. Your speech will appear as text on screen.');
    
    // Create floating caption display
    const captionDiv = document.createElement('div');
    captionDiv.id = 'demo-captions';
    captionDiv.innerHTML = `
      <div style="
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-size: 18px;
        z-index: 1000;
        max-width: 600px;
        text-align: center;
      ">
        🎤 Live Captions Active<br/>
        <small>Speak now to see captions appear here...</small>
      </div>
    `;
    
    document.body.appendChild(captionDiv);
    
    setTimeout(() => {
      if (document.getElementById('demo-captions')) {
        document.getElementById('demo-captions')?.remove();
      }
    }, 8000);
  };

  const demonstrateSimplification = () => {
    const complexText = 'The implementation of comprehensive accessibility features requires sophisticated technological infrastructure and meticulous attention to diverse user requirements.';
    const simplifiedText = 'Setting up complete accessibility features needs smart technology and careful attention to different user needs.';
    
    setDemoText(complexText);
    speakText('Here is complex text: ' + complexText);
    
    setTimeout(() => {
      setDemoText(simplifiedText);
      speakText('Now simplified: ' + simplifiedText);
    }, 3000);
  };

  const demonstrateAccessibility = () => {
    speakText('Demonstrating accessibility features. Watch the interface change.');
    
    // Cycle through different accessibility modes
    const modes = [
      () => document.body.classList.add('high-contrast'),
      () => document.body.classList.add('large-text'),
      () => document.body.classList.add('dyslexia-friendly'),
      () => document.body.classList.add('focus-mode')
    ];
    
    let modeIndex = 0;
    const interval = setInterval(() => {
      // Remove all classes first
      document.body.classList.remove('high-contrast', 'large-text', 'dyslexia-friendly', 'focus-mode');
      
      // Apply current mode
      modes[modeIndex]();
      
      modeIndex = (modeIndex + 1) % modes.length;
      
      if (modeIndex === 0) {
        clearInterval(interval);
        setTimeout(() => {
          document.body.classList.remove('high-contrast', 'large-text', 'dyslexia-friendly', 'focus-mode');
          speakText('Accessibility demonstration complete.');
        }, 2000);
      }
    }, 2000);
  };

  const toggleDemo = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentFeature(0);
    setDemoText('Welcome to AssistEd! This is a demonstration of our accessible learning platform.');
    document.body.classList.remove('high-contrast', 'large-text', 'dyslexia-friendly', 'focus-mode');
    
    if (document.getElementById('demo-captions')) {
      document.getElementById('demo-captions')?.remove();
    }
  };

  const currentFeatureData = features[currentFeature];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Interactive Demo
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Experience the power of assistive technology in action. 
              See how our tools make learning accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Controls */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Demo Controls</CardTitle>
              <CardDescription className="text-center">
                Control the automated demonstration or try features manually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={toggleDemo}
                  variant={isPlaying ? "destructive" : "default"}
                  size="lg"
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  {isPlaying ? 'Pause Demo' : 'Start Auto Demo'}
                </Button>
                
                <Button 
                  onClick={resetDemo}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Square className="h-5 w-5" />
                  Reset Demo
                </Button>
              </div>
              
              {isPlaying && (
                <div className="text-center">
                  <Badge variant="outline" className="text-sm">
                    Auto-playing feature {currentFeature + 1} of {features.length}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current Feature Showcase */}
      <section className="py-12 bg-gradient-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Feature</h2>
            <p className="text-xl text-muted-foreground">
              {isPlaying ? 'Automatically cycling through features' : 'Click a feature to try it'}
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className={`w-20 h-20 ${currentFeatureData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <currentFeatureData.icon className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">{currentFeatureData.title}</CardTitle>
              <CardDescription className="text-lg">
                {currentFeatureData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo Text Display */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <Label className="text-sm font-medium mb-2 block">Demo Text:</Label>
                <p className="text-lg">{demoText}</p>
              </div>

              {/* Try Feature Button */}
              <div className="text-center">
                <Button 
                  onClick={currentFeatureData.demo}
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Try {currentFeatureData.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All Available Features</h2>
            <p className="text-xl text-muted-foreground">
              Explore each feature individually or let the demo cycle through them
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    currentFeature === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setCurrentFeature(index);
                    setIsPlaying(false);
                  }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-2`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.demo();
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Try Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline"
              onClick={() => document.body.classList.toggle('high-contrast')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Toggle High Contrast
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => document.body.classList.toggle('large-text')}
              className="flex items-center gap-2"
            >
              <Type className="h-4 w-4" />
              Toggle Large Text
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => document.body.classList.toggle('focus-mode')}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Toggle Focus Mode
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Experience Full Accessibility?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Navigate to our Assistive Tools page to explore all features in detail
            </p>
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => window.location.href = '/assistive-tools'}
              className="flex items-center gap-2 mx-auto"
            >
              Explore All Tools
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Demo;
