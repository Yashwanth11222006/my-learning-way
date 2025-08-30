import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Heart, 
  Volume2, 
  Eye, 
  Mic, 
  GraduationCap, 
  Settings 
} from 'lucide-react';

interface NavbarProps {
  accessibilityMode: string;
}

const Navbar = ({ accessibilityMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { href: '/assistive-tools', label: 'Assistive Tools', icon: Heart },
    { href: '/resources', label: 'Learning Resources', icon: GraduationCap },
    { href: '/careers', label: 'Career Support', icon: Settings },
    { href: '/community', label: 'Community', icon: Heart },
    { href: '/success-stories', label: 'Success Stories', icon: GraduationCap },
  ];

  const getAccessibilityIcon = () => {
    switch (accessibilityMode) {
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'visual': return <Eye className="h-4 w-4" />;
      case 'voice': return <Mic className="h-4 w-4" />;
      case 'easy': return <Heart className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-md border-b border-border z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label="AssistEd Home"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AssistEd</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Accessibility Mode Indicator & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-primary-soft rounded-full">
              {getAccessibilityIcon()}
              <span className="text-xs font-medium text-primary capitalize">
                {accessibilityMode} Mode
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <div className="flex sm:hidden items-center space-x-2 px-3 py-2 bg-primary-soft rounded-lg mb-3">
              {getAccessibilityIcon()}
              <span className="text-sm font-medium text-primary capitalize">
                {accessibilityMode} Mode
              </span>
            </div>
            
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;