import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Video, 
  Headphones, 
  FileText, 
  Globe, 
  Search,
  Filter,
  Star,
  Clock,
  Download,
  Play,
  Users,
  Award,
  Zap,
  Heart,
  Languages,
  Accessibility
} from 'lucide-react';

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const resourceFormats = [
    { id: 'all', label: 'All Formats', icon: BookOpen },
    { id: 'ebook', label: 'E-books', icon: BookOpen },
    { id: 'video', label: 'Video Courses', icon: Video },
    { id: 'audio', label: 'Audio Content', icon: Headphones },
    { id: 'interactive', label: 'Interactive', icon: Zap },
    { id: 'text', label: 'Text Guides', icon: FileText }
  ];

  const difficultyLevels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const learningResources = [
    {
      id: 'web-dev-basics',
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript with accessible coding tutorials',
      format: 'video',
      level: 'beginner',
      duration: '24 hours',
      rating: 4.9,
      students: '125K',
      languages: ['English', 'Spanish', 'French'],
      accessibility: ['Captions', 'Audio descriptions', 'Screen reader'],
      features: ['Hands-on projects', 'Code challenges', 'Mentor support'],
      price: 'Free',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'data-science',
      title: 'Data Science for Everyone',
      description: 'Accessible introduction to data analysis and visualization',
      format: 'interactive',
      level: 'beginner',
      duration: '16 hours',
      rating: 4.8,
      students: '89K',
      languages: ['English', 'Mandarin', 'Hindi'],
      accessibility: ['Voice navigation', 'Simplified UI', 'Step-by-step'],
      features: ['Real datasets', 'Visual tools', 'Interactive exercises'],
      price: '$49',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Essentials',
      description: 'Master online marketing with accessible learning materials',
      format: 'ebook',
      level: 'intermediate',
      duration: '12 hours',
      rating: 4.7,
      students: '67K',
      languages: ['English', 'Portuguese', 'German'],
      accessibility: ['Text-to-speech', 'Large fonts', 'High contrast'],
      features: ['Case studies', 'Templates', 'Certification'],
      price: '$29',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'ux-design',
      title: 'Accessible UX Design',
      description: 'Learn to create inclusive digital experiences for all users',
      format: 'video',
      level: 'intermediate',
      duration: '20 hours',
      rating: 4.9,
      students: '156K',
      languages: ['English', 'Japanese', 'Korean'],
      accessibility: ['Sign language', 'Captions', 'Audio descriptions'],
      features: ['Design tools', 'Portfolio projects', 'Industry mentors'],
      price: '$79',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'financial-literacy',
      title: 'Personal Finance Made Simple',
      description: 'Easy-to-understand financial planning and budgeting',
      format: 'audio',
      level: 'beginner',
      duration: '8 hours',
      rating: 4.6,
      students: '234K',
      languages: ['English', 'Spanish', 'French', 'Arabic'],
      accessibility: ['Audio-only', 'Transcript', 'Simplified language'],
      features: ['Budgeting tools', 'Calculators', 'Action plans'],
      price: 'Free',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'communication-skills',
      title: 'Effective Communication',
      description: 'Build confidence in verbal and non-verbal communication',
      format: 'interactive',
      level: 'beginner',
      duration: '10 hours',
      rating: 4.8,
      students: '98K',
      languages: ['English', 'Spanish', 'Italian'],
      accessibility: ['Voice practice', 'Visual cues', 'Feedback tools'],
      features: ['Practice scenarios', 'Peer feedback', 'Progress tracking'],
      price: '$39',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'project-management',
      title: 'Agile Project Management',
      description: 'Learn modern project management with accessible frameworks',
      format: 'text',
      level: 'advanced',
      duration: '15 hours',
      rating: 4.7,
      students: '78K',
      languages: ['English', 'German', 'Dutch'],
      accessibility: ['Structured content', 'Visual aids', 'Summary notes'],
      features: ['Templates', 'Case studies', 'Certification'],
      price: '$59',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'creative-writing',
      title: 'Creative Writing Workshop',
      description: 'Express yourself through accessible creative writing exercises',
      format: 'text',
      level: 'beginner',
      duration: '12 hours',
      rating: 4.5,
      students: '145K',
      languages: ['English', 'French', 'Spanish'],
      accessibility: ['Writing prompts', 'Voice input', 'Grammar support'],
      features: ['Peer reviews', 'Publishing tips', 'Community feedback'],
      price: '$25',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'mental-health',
      title: 'Mental Health Awareness',
      description: 'Understanding and supporting mental wellness in learning',
      format: 'video',
      level: 'beginner',
      duration: '6 hours',
      rating: 4.9,
      students: '312K',
      languages: ['English', 'Spanish', 'Portuguese', 'Hindi'],
      accessibility: ['Gentle pacing', 'Captions', 'Trigger warnings'],
      features: ['Self-assessment', 'Resources', 'Support network'],
      price: 'Free',
      gradient: 'bg-gradient-accent'
    }
  ];

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || resource.format === selectedFormat;
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
    
    return matchesSearch && matchesFormat && matchesLevel;
  });

  const getFormatIcon = (format: string) => {
    const icons = {
      video: Video,
      ebook: BookOpen,
      audio: Headphones,
      interactive: Zap,
      text: FileText
    };
    return icons[format as keyof typeof icons] || BookOpen;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Accessible Knowledge for Everyone
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Discover learning resources designed for all learning styles and abilities. 
              From audio courses to interactive tutorials, find content that works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search courses, topics, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Format Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {resourceFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <Button
                    key={format.id}
                    variant={selectedFormat === format.id ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat(format.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{format.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {difficultyLevels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? 'secondary' : 'outline'}
                  onClick={() => setSelectedLevel(level.id)}
                  size="sm"
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredResources.length} of {learningResources.length} resources
            </p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => {
              const FormatIcon = getFormatIcon(resource.format);
              
              return (
                <Card 
                  key={resource.id}
                  className="group hover:shadow-large transition-all duration-300 hover:scale-105 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${resource.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <FormatIcon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={resource.price === 'Free' ? 'secondary' : 'outline'}
                          className="mb-2"
                        >
                          {resource.price}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {resource.level}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold mb-2">{resource.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{resource.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{resource.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{resource.duration}</span>
                      </div>
                    </div>

                    {/* Accessibility Features */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Accessibility className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Accessibility Features:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resource.accessibility.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Languages className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Available in:</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {resource.languages.join(', ')}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Includes:</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {resource.features.join(' • ')}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4">
                      <Button variant="hero" size="sm" className="flex-1 group">
                        <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        Start Learning
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
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

          {filteredResources.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No resources found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more learning resources.
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
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Request custom content or suggest new resources. We're constantly expanding 
              our library to meet diverse learning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl">
                Request Custom Content
              </Button>
              <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Suggest a Resource
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LearningResources;