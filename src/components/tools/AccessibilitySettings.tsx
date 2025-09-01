import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Ear, 
  Brain, 
  Keyboard, 
  Settings,
  Save,
  RotateCcw,
  Palette,
  Type,
  Volume2,
  Zap,
  Accessibility
} from 'lucide-react';

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    dyslexiaFriendly: false,
    reducedMotion: false,
    focusIndicators: true,
    fontSize: 16,
    lineSpacing: 1.5,
    theme: 'auto',
    screenReader: false,
    volume: 0.7,
    keyboardOnly: false,
    voiceControl: false,
    readingGuides: false,
    focusMode: false,
    primaryLanguage: 'en'
  });

  const [activeTab, setActiveTab] = useState('visual');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'asl', name: 'American Sign Language', flag: '🤟' }
  ];

  const themes = [
    { id: 'auto', name: 'Auto', description: 'Follows system preference' },
    { id: 'light', name: 'Light', description: 'Bright background' },
    { id: 'dark', name: 'Dark', description: 'Dark background' },
    { id: 'high-contrast', name: 'High Contrast', description: 'Maximum contrast' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    setHasUnsavedChanges(false);
  };

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      dyslexiaFriendly: false,
      reducedMotion: false,
      focusIndicators: true,
      fontSize: 16,
      lineSpacing: 1.5,
      theme: 'auto',
      screenReader: false,
      volume: 0.7,
      keyboardOnly: false,
      voiceControl: false,
      readingGuides: false,
      focusMode: false,
      primaryLanguage: 'en'
    };
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  const tabs = [
    { id: 'visual', name: 'Visual', icon: Eye },
    { id: 'audio', name: 'Audio', icon: Ear },
    { id: 'navigation', name: 'Navigation', icon: Keyboard },
    { id: 'cognitive', name: 'Cognitive', icon: Brain }
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-primary" />
            Accessibility Settings
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetSettings}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={saveSettings}
              disabled={!hasUnsavedChanges}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Visual Settings Tab */}
        {activeTab === 'visual' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Visual Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Basic Visual Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="text-sm">High Contrast Mode</Label>
                    <Switch
                      id="high-contrast"
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="large-text" className="text-sm">Large Text</Label>
                    <Switch
                      id="large-text"
                      checked={settings.largeText}
                      onCheckedChange={(checked) => updateSetting('largeText', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dyslexia-friendly" className="text-sm">Dyslexia-Friendly Font</Label>
                    <Switch
                      id="dyslexia-friendly"
                      checked={settings.dyslexiaFriendly}
                      onCheckedChange={(checked) => updateSetting('dyslexiaFriendly', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion" className="text-sm">Reduced Motion</Label>
                    <Switch
                      id="reduced-motion"
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="focus-indicators" className="text-sm">Focus Indicators</Label>
                    <Switch
                      id="focus-indicators"
                      checked={settings.focusIndicators}
                      onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Typography Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Typography
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Font Size: {settings.fontSize}px</Label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSetting('fontSize', value[0])}
                      max={24}
                      min={12}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Line Spacing: {settings.lineSpacing}</Label>
                    <Slider
                      value={[settings.lineSpacing]}
                      onValueChange={(value) => updateSetting('lineSpacing', value[0])}
                      max={2.5}
                      min={1.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme.id} value={theme.id}>
                            <div>
                              <div className="font-medium">{theme.name}</div>
                              <div className="text-xs text-muted-foreground">{theme.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audio Settings Tab */}
        {activeTab === 'audio' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Ear className="h-5 w-5" />
                  Audio Features
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="screen-reader" className="text-sm">Screen Reader Support</Label>
                    <Switch
                      id="screen-reader"
                      checked={settings.screenReader}
                      onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Volume Control
                </h3>
                
                <div>
                  <Label className="text-sm">Master Volume: {Math.round(settings.volume * 100)}%</Label>
                  <Slider
                    value={[settings.volume]}
                    onValueChange={(value) => updateSetting('volume', value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Settings Tab */}
        {activeTab === 'navigation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Navigation Methods
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="keyboard-only" className="text-sm">Keyboard Only Navigation</Label>
                    <Switch
                      id="keyboard-only"
                      checked={settings.keyboardOnly}
                      onCheckedChange={(checked) => updateSetting('keyboardOnly', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-control" className="text-sm">Voice Control</Label>
                    <Switch
                      id="voice-control"
                      checked={settings.voiceControl}
                      onCheckedChange={(checked) => updateSetting('voiceControl', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Available Methods
                </h3>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tab navigation (keyboard)</li>
                    <li>• Arrow key navigation</li>
                    <li>• Voice commands</li>
                    <li>• Switch control</li>
                    <li>• Eye tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cognitive Support Tab */}
        {activeTab === 'cognitive' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Learning Support
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reading-guides" className="text-sm">Reading Guides</Label>
                    <Switch
                      id="reading-guides"
                      checked={settings.readingGuides}
                      onCheckedChange={(checked) => updateSetting('readingGuides', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="focus-mode" className="text-sm">Focus Mode</Label>
                    <Switch
                      id="focus-mode"
                      checked={settings.focusMode}
                      onCheckedChange={(checked) => updateSetting('focusMode', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Available Features
                </h3>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reading line guides</li>
                    <li>• Text highlighting</li>
                    <li>• Progress indicators</li>
                    <li>• Break reminders</li>
                    <li>• Simplified navigation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Accessibility Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Start with one setting at a time to find what works best for you</li>
            <li>• High contrast mode works well in bright environments</li>
            <li>• Dyslexia-friendly fonts can improve reading speed and accuracy</li>
            <li>• Keyboard navigation is essential for screen reader users</li>
            <li>• Save your settings to maintain consistency across sessions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
