import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Volume2, 
  Eye, 
  Mic, 
  Heart, 
  Settings, 
  ArrowRight,
  Headphones,
  Captions,
  MessageCircle,
  Gamepad2,
  Monitor
} from 'lucide-react';

interface AccessibilityOption {
  id: string;
  title: string;
  description: string;
  tagline: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
}

const AccessibilitySelector = () => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [hoveredMode, setHoveredMode] = useState<string>('');
  const navigate = useNavigate();

  const accessibilityOptions: AccessibilityOption[] = [
    {
      id: 'audio',
      title: 'Audio Guidance Mode',
      description: 'Navigate and learn through rich audio experiences',
      tagline: 'Hear and navigate with ease',
      icon: Volume2,
      gradient: 'bg-gradient-primary',
      features: ['Voice navigation', 'Audio descriptions', 'Screen reader optimized', 'Sound cues']
    },
    {
      id: 'visual',
      title: 'Visual Support Mode',
      description: 'Enhanced with captions, visual signs, and clear layouts',
      tagline: 'See learning come alive',
      icon: Eye,
      gradient: 'bg-gradient-secondary',
      features: ['Live captions', 'Visual indicators', 'High contrast', 'Sign language support']
    },
    {
      id: 'voice',
      title: 'Voice Assistance Mode',
      description: 'Communicate naturally through speech-to-text technology',
      tagline: 'Express yourself in your way',
      icon: Mic,
      gradient: 'bg-gradient-accent',
      features: ['Speech-to-text', 'Voice commands', 'Audio feedback', 'Natural interaction']
    },
    {
      id: 'easy',
      title: 'Easy Learning Mode',
      description: 'Simplified interfaces with gamified, step-by-step guidance',
      tagline: 'Learn at your rhythm',
      icon: Heart,
      gradient: 'bg-gradient-primary',
      features: ['Simplified design', 'Step-by-step guides', 'Gamification', 'Patient pacing']
    },
    {
      id: 'standard',
      title: 'Standard Mode',
      description: 'Fully accessible experience following WCAG 2.1 guidelines',
      tagline: 'Accessible for everyone',
      icon: Settings,
      gradient: 'bg-gradient-secondary',
      features: ['WCAG 2.1 compliant', 'Keyboard navigation', 'Focus indicators', 'Semantic HTML']
    }
  ];

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    // Store the selected mode in localStorage for persistence
    localStorage.setItem('accessibilityMode', modeId);
    
    // Navigate to home with the selected mode
    setTimeout(() => {
      navigate(`/home?mode=${modeId}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose How You'd Like to Experience AssistEd
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We adapt the platform to your strengths. Select the mode that feels most comfortable for you.
          </p>
        </div>

        {/* Accessibility Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {accessibilityOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedMode === option.id;
            const isHovered = hoveredMode === option.id;
            
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-glow ${
                  isSelected ? 'ring-2 ring-primary shadow-glow scale-105' : 'hover:shadow-large'
                } ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredMode(option.id)}
                onMouseLeave={() => setHoveredMode('')}
                onClick={() => handleModeSelect(option.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${option.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    isHovered ? 'scale-110 shadow-glow' : ''
                  }`}>
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {option.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 text-center">
                    {option.description}
                  </p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="text-center animate-fade-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/accessibility-info')}
              className="flex items-center space-x-2"
            >
              <Monitor className="h-5 w-5" />
              <span>Learn About Accessibility Features</span>
            </Button>
            <Button
              variant="soft"
              size="lg"
              onClick={() => handleModeSelect('standard')}
              className="flex items-center space-x-2"
            >
              <span>Continue with Standard Mode</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            You can change your accessibility preferences anytime in settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySelector;