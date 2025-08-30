import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Play, 
  Heart, 
  Share2, 
  BookOpen, 
  Briefcase, 
  Award, 
  TrendingUp,
  Users,
  Globe,
  Lightbulb,
  Target,
  ArrowRight,
  MessageCircle,
  Calendar,
  MapPin,
  Volume2,
  Eye,
  Mic,
  Gamepad2,
  Settings
} from 'lucide-react';

const SuccessStories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');

  const categories = [
    { id: 'all', label: 'All Stories', count: 156 },
    { id: 'career', label: 'Career Success', count: 67 },
    { id: 'education', label: 'Educational Growth', count: 45 },
    { id: 'technology', label: 'Tech Innovation', count: 28 },
    { id: 'community', label: 'Community Impact', count: 16 }
  ];

  const accessibilityModes = [
    { id: 'all', label: 'All Modes', icon: Settings },
    { id: 'audio', label: 'Audio Guidance', icon: Volume2 },
    { id: 'visual', label: 'Visual Support', icon: Eye },
    { id: 'voice', label: 'Voice Assistance', icon: Mic },
    { id: 'easy', label: 'Easy Learning', icon: Heart },
    { id: 'standard', label: 'Standard Mode', icon: Settings }
  ];

  const successStories = [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      role: 'Senior Software Developer',
      company: 'TechForward Inc.',
      location: 'San Francisco, CA',
      category: 'career',
      accessibilityMode: 'audio',
      achievement: 'Promoted to Senior Developer in 8 months',
      journey: 'From retail worker to tech leader using audio-guided coding courses',
      quote: "The audio navigation system helped me learn programming concepts in a way that worked perfectly for my learning style. I could focus on understanding logic while listening to code explanations.",
      challengeOvercome: 'Visual processing difficulties with traditional coding tutorials',
      toolsUsed: ['Text-to-speech', 'Audio code walkthroughs', 'Voice-guided IDE'],
      impact: '• Led accessibility improvements for company website\n• Mentors 15+ new developers\n• Speaks at tech conferences about inclusive coding',
      timeline: '18 months',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      videoTestimonial: true,
      featured: true,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'marcus-rodriguez',
      name: 'Marcus Rodriguez',
      role: 'UX Design Lead',
      company: 'Inclusive Design Studio',
      location: 'Austin, TX',
      category: 'career',
      accessibilityMode: 'visual',
      achievement: 'Started own design agency with $500K revenue',
      journey: 'Transitioned from graphic design to UX using visual learning tools',
      quote: "Visual learning tools and live captions made complex design principles crystal clear. I could see design patterns in a way that finally made sense to me.",
      challengeOvercome: 'Hearing difficulties in traditional design workshops',
      toolsUsed: ['Live captions', 'Visual design patterns', 'Interactive prototyping'],
      impact: '• Designed accessible apps used by 2M+ people\n• Trained 50+ designers in inclusive practices\n• Won "Accessibility Innovation Award" 2023',
      timeline: '24 months',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      videoTestimonial: true,
      featured: true,
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'priya-patel',
      name: 'Priya Patel',
      role: 'Senior Business Analyst',
      company: 'Global Finance Corp',
      location: 'London, UK',
      category: 'career',
      accessibilityMode: 'easy',
      achievement: 'Promoted to senior analyst role with 40% salary increase',
      journey: 'Mastered data analysis through step-by-step adaptive learning',
      quote: "The easy learning mode broke down complex data concepts into manageable steps. I could learn at my own pace without feeling overwhelmed.",
      challengeOvercome: 'Learning anxiety and information processing challenges',
      toolsUsed: ['Step-by-step tutorials', 'Interactive dashboards', 'Personalized pacing'],
      impact: '• Improved company reporting efficiency by 35%\n• Created accessible training for 200+ employees\n• Leads data literacy initiatives',
      timeline: '15 months',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      videoTestimonial: false,
      featured: true,
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'james-watson',
      name: 'James Watson',
      role: 'Accessibility Consultant',
      company: 'Independent',
      location: 'Remote',
      category: 'technology',
      accessibilityMode: 'voice',
      achievement: 'Built successful consulting practice helping 50+ companies',
      journey: 'Used voice assistance to learn accessibility standards and consulting',
      quote: "Voice commands and speech-to-text allowed me to interact with learning materials naturally. I could focus on understanding rather than struggling with interfaces.",
      challengeOvercome: 'Limited mobility affecting traditional computer interaction',
      toolsUsed: ['Voice commands', 'Speech-to-text', 'AI learning assistant'],
      impact: '• Made 50+ websites accessible to millions\n• Trained 500+ developers in accessibility\n• Created open-source accessibility tools',
      timeline: '20 months',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      videoTestimonial: true,
      featured: false,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'maria-gonzalez',
      name: 'Maria Gonzalez',
      role: 'Special Education Teacher',
      company: 'Central Elementary',
      location: 'Phoenix, AZ',
      category: 'education',
      accessibilityMode: 'visual',
      achievement: 'Transformed classroom with 95% student improvement rate',
      journey: 'Enhanced teaching methods using accessible educational tools',
      quote: "The visual support tools showed me new ways to present information. My students with different learning needs finally had equal access to education.",
      challengeOvercome: 'Reaching students with diverse learning needs effectively',
      toolsUsed: ['Visual aids', 'Interactive lessons', 'Multi-sensory tools'],
      impact: '• 95% of students met learning goals (up from 60%)\n• Trained 100+ teachers in inclusive methods\n• Developed accessible curriculum used statewide',
      timeline: '12 months',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      videoTestimonial: false,
      featured: false,
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'david-kim',
      name: 'David Kim',
      role: 'Digital Marketing Manager',
      company: 'Growth Innovations',
      location: 'Seattle, WA',
      category: 'career',
      accessibilityMode: 'standard',
      achievement: 'Increased company revenue by $2M through accessible marketing',
      journey: 'Learned inclusive marketing strategies through accessible courses',
      quote: "Standard accessible design made complex marketing concepts clear and actionable. The structured approach helped me build comprehensive strategies.",
      challengeOvercome: 'Understanding complex marketing analytics and strategy',
      toolsUsed: ['Structured lessons', 'Clear navigation', 'Comprehensive resources'],
      impact: '• Generated $2M additional revenue\n• Made marketing accessible to broader audience\n• Leads inclusive marketing certification program',
      timeline: '16 months',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      videoTestimonial: true,
      featured: false,
      gradient: 'bg-gradient-accent'
    }
  ];

  const communityImpactStats = [
    { label: 'Lives Changed', value: '50,000+', icon: Users },
    { label: 'Countries Reached', value: '85', icon: Globe },
    { label: 'Success Stories', value: '12,000+', icon: Star },
    { label: 'Community Mentors', value: '2,500+', icon: Heart }
  ];

  const filteredStories = successStories.filter(story => {
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    const matchesMode = selectedMode === 'all' || story.accessibilityMode === selectedMode;
    return matchesCategory && matchesMode;
  });

  const getAccessibilityIcon = (mode: string) => {
    const icons = {
      audio: Volume2,
      visual: Eye,
      voice: Mic,
      easy: Heart,
      standard: Settings
    };
    return icons[mode as keyof typeof icons] || Settings;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Every Journey Matters
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Real stories from learners who found their path with AssistEd. Discover how 
              accessible education transformed lives, careers, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityImpactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Category Filters */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Filter by Category:</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
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

            {/* Accessibility Mode Filters */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Filter by Accessibility Mode:</h3>
              <div className="flex flex-wrap gap-3">
                {accessibilityModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <Button
                      key={mode.id}
                      variant={selectedMode === mode.id ? 'secondary' : 'outline'}
                      onClick={() => setSelectedMode(mode.id)}
                      className="flex items-center space-x-2"
                      size="sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{mode.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Success Stories ({filteredStories.length})
            </h2>
          </div>

          <div className="space-y-12">
            {filteredStories.map((story, index) => {
              const AccessibilityIcon = getAccessibilityIcon(story.accessibilityMode);
              
              return (
                <Card 
                  key={story.id}
                  className={`group hover:shadow-glow transition-all duration-500 animate-fade-up ${
                    story.featured ? 'ring-2 ring-primary/30 shadow-large' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Story Content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-16 h-16 ${story.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <Star className="h-8 w-8 text-primary-foreground" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-foreground">{story.name}</h3>
                              <p className="text-lg text-primary font-medium">{story.role}</p>
                              <div className="flex items-center space-x-4 text-muted-foreground mt-1">
                                <span className="flex items-center space-x-1">
                                  <Briefcase className="h-4 w-4" />
                                  <span>{story.company}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{story.location}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {story.featured && (
                              <Badge variant="default">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <AccessibilityIcon className="h-3 w-3" />
                              <span className="capitalize">{story.accessibilityMode} Mode</span>
                            </Badge>
                          </div>
                        </div>

                        {/* Achievement Banner */}
                        <div className="bg-gradient-soft p-4 rounded-lg border border-primary/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">Key Achievement</span>
                          </div>
                          <p className="text-lg font-medium text-primary">{story.achievement}</p>
                        </div>

                        {/* Quote */}
                        <blockquote className="border-l-4 border-primary pl-6 py-2">
                          <p className="text-lg italic text-muted-foreground mb-3">
                            "{story.quote}"
                          </p>
                          <cite className="text-sm font-medium text-foreground">— {story.name}</cite>
                        </blockquote>

                        {/* Journey Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                              <Target className="h-4 w-4" />
                              <span>Challenge Overcome</span>
                            </h4>
                            <p className="text-muted-foreground">{story.challengeOvercome}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                              <Lightbulb className="h-4 w-4" />
                              <span>Tools Used</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {story.toolsUsed.map((tool, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Impact */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>Impact Created</span>
                          </h4>
                          <div className="bg-success-soft p-4 rounded-lg">
                            <pre className="text-sm text-muted-foreground whitespace-pre-line font-sans">
                              {story.impact}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Timeline */}
                        <Card className="bg-gradient-soft border-primary/20">
                          <CardContent className="p-4 text-center">
                            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">{story.timeline}</div>
                            <div className="text-sm text-muted-foreground">Learning Journey</div>
                          </CardContent>
                        </Card>

                        {/* Video Testimonial */}
                        {story.videoTestimonial && (
                          <Card className="bg-gradient-primary text-primary-foreground">
                            <CardContent className="p-4 text-center">
                              <Play className="h-8 w-8 mx-auto mb-3" />
                              <div className="font-semibold mb-2">Video Testimonial</div>
                              <Button variant="secondary" size="sm" className="w-full">
                                Watch Story
                              </Button>
                            </CardContent>
                          </Card>
                        )}

                        {/* Actions */}
                        <div className="space-y-3">
                          <Button variant="hero" className="w-full">
                            <Heart className="h-4 w-4" />
                            Inspire Others
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4" />
                              Share
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-20">
              <Star className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No stories found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your filters to discover more inspiring success stories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their lives through accessible education. 
              Your journey starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl">
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SuccessStories;