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
  Accessibility,
  GraduationCap,
  Calculator,
  Microscope,
  Palette,
  Music,
  Globe2,
  Brain,
  Code,
  Atom
} from 'lucide-react';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  format: string;
  level: string;
  duration: string;
  rating: number;
  students: string;
  languages: string[];
  accessibility: string[];
  features: string[];
  price: string;
  gradient: string;
  subject: string;
  ageGroup?: string;
  category?: string;
}

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [activeSection, setActiveSection] = useState('primary');

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

  const educationSections = [
    { id: 'primary', label: 'Primary School (1st-5th)', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'middle', label: 'Middle School (5th-10th)', icon: GraduationCap, color: 'bg-green-500' },
    { id: 'intermediate', label: 'Intermediate (11th-12th)', icon: Calculator, color: 'bg-purple-500' },
    { id: 'higher', label: 'Higher Education', icon: Microscope, color: 'bg-red-500' }
  ];

  // Primary School Resources (1st to 5th class)
  const primarySchoolResources: LearningResource[] = [
    {
      id: 'basic-math',
      title: 'Fun with Numbers',
      description: 'Interactive math games and activities for young learners',
      format: 'interactive',
      level: 'beginner',
      duration: '2 hours',
      rating: 4.9,
      students: '45K',
      languages: ['English', 'Hindi', 'Spanish'],
      accessibility: ['Voice guidance', 'Large buttons', 'Color coding'],
      features: ['Math games', 'Progress tracking', 'Rewards system'],
      price: 'Free',
      gradient: 'bg-gradient-to-r from-blue-400 to-blue-600',
      subject: 'Mathematics',
      ageGroup: '6-10 years'
    },
    {
      id: 'reading-adventures',
      title: 'Reading Adventures',
      description: 'Phonics and reading comprehension for early learners',
      format: 'video',
      level: 'beginner',
      duration: '3 hours',
      rating: 4.8,
      students: '38K',
      languages: ['English', 'Hindi', 'French'],
      accessibility: ['Audio narration', 'Visual cues', 'Slow pace'],
      features: ['Story books', 'Reading exercises', 'Vocabulary games'],
      price: 'Free',
      gradient: 'bg-gradient-to-r from-green-400 to-green-600',
      subject: 'Language Arts',
      ageGroup: '6-10 years'
    },
    {
      id: 'science-explorer',
      title: 'Science Explorer',
      description: 'Simple science experiments and nature discovery',
      format: 'interactive',
      level: 'beginner',
      duration: '4 hours',
      rating: 4.7,
      students: '32K',
      languages: ['English', 'Hindi', 'Spanish'],
      accessibility: ['Visual experiments', 'Audio explanations', 'Safe activities'],
      features: ['Virtual experiments', 'Nature videos', 'Quiz games'],
      price: 'Free',
      gradient: 'bg-gradient-to-r from-purple-400 to-purple-600',
      subject: 'Science',
      ageGroup: '6-10 years'
    },
    {
      id: 'art-creativity',
      title: 'Art & Creativity',
      description: 'Drawing, painting, and creative expression activities',
      format: 'interactive',
      level: 'beginner',
      duration: '2 hours',
      rating: 4.6,
      students: '28K',
      languages: ['English', 'Hindi', 'French'],
      accessibility: ['Voice instructions', 'Step-by-step', 'Color assistance'],
      features: ['Digital drawing', 'Art tutorials', 'Gallery showcase'],
      price: 'Free',
      gradient: 'bg-gradient-to-r from-pink-400 to-pink-600',
      subject: 'Arts',
      ageGroup: '6-10 years'
    }
  ];

  // Middle School Resources (5th to 10th class)
  const middleSchoolResources: LearningResource[] = [
    {
      id: 'algebra-basics',
      title: 'Algebra Basics',
      description: 'Introduction to algebraic concepts and problem solving',
      format: 'video',
      level: 'beginner',
      duration: '8 hours',
      rating: 4.8,
      students: '67K',
      languages: ['English', 'Hindi', 'Spanish'],
      accessibility: ['Step-by-step solutions', 'Visual aids', 'Practice problems'],
      features: ['Video lessons', 'Practice worksheets', 'Progress tests'],
      price: 'Free',
      gradient: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
      subject: 'Mathematics',
      ageGroup: '11-15 years'
    },
    {
      id: 'english-grammar',
      title: 'English Grammar Mastery',
      description: 'Comprehensive grammar lessons and writing skills',
      format: 'interactive',
      level: 'intermediate',
      duration: '12 hours',
      rating: 4.7,
      students: '54K',
      languages: ['English', 'Hindi'],
      accessibility: ['Grammar checkers', 'Writing prompts', 'Feedback system'],
      features: ['Grammar exercises', 'Essay writing', 'Vocabulary building'],
      price: '$19',
      gradient: 'bg-gradient-to-r from-teal-400 to-teal-600',
      subject: 'Language Arts',
      ageGroup: '11-15 years'
    },
    {
      id: 'physics-fundamentals',
      title: 'Physics Fundamentals',
      description: 'Basic physics concepts through interactive simulations',
      format: 'interactive',
      level: 'intermediate',
      duration: '10 hours',
      rating: 4.6,
      students: '42K',
      languages: ['English', 'Hindi', 'Spanish'],
      accessibility: ['3D simulations', 'Audio explanations', 'Visual demonstrations'],
      features: ['Virtual labs', 'Concept videos', 'Problem sets'],
      price: '$29',
      gradient: 'bg-gradient-to-r from-orange-400 to-orange-600',
      subject: 'Physics',
      ageGroup: '11-15 years'
    },
    {
      id: 'computer-basics',
      title: 'Computer Basics & Coding',
      description: 'Introduction to computers and basic programming',
      format: 'interactive',
      level: 'beginner',
      duration: '15 hours',
      rating: 4.9,
      students: '78K',
      languages: ['English', 'Hindi', 'Spanish'],
      accessibility: ['Screen reader support', 'Keyboard navigation', 'High contrast'],
      features: ['Coding exercises', 'Project building', 'Debugging practice'],
      price: 'Free',
      gradient: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
      subject: 'Computer Science',
      ageGroup: '11-15 years'
    }
  ];

  // Intermediate Resources (11th-12th class)
  const intermediateResources: LearningResource[] = [
    {
      id: 'advanced-mathematics',
      title: 'Advanced Mathematics',
      description: 'Calculus, trigonometry, and advanced mathematical concepts',
      format: 'video',
      level: 'advanced',
      duration: '20 hours',
      rating: 4.8,
      students: '45K',
      languages: ['English', 'Hindi'],
      accessibility: ['Detailed explanations', 'Step-by-step solutions', 'Practice problems'],
      features: ['Video lectures', 'Problem sets', 'Mock tests'],
      price: '$49',
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-700',
      subject: 'Mathematics',
      ageGroup: '16-18 years'
    },
    {
      id: 'chemistry-lab',
      title: 'Chemistry Laboratory',
      description: 'Virtual chemistry experiments and molecular modeling',
      format: 'interactive',
      level: 'intermediate',
      duration: '18 hours',
      rating: 4.7,
      students: '38K',
      languages: ['English', 'Hindi'],
      accessibility: ['3D molecular models', 'Audio descriptions', 'Safety guidelines'],
      features: ['Virtual experiments', 'Molecular modeling', 'Chemical equations'],
      price: '$39',
      gradient: 'bg-gradient-to-r from-green-500 to-green-700',
      subject: 'Chemistry',
      ageGroup: '16-18 years'
    },
    {
      id: 'biology-advanced',
      title: 'Advanced Biology',
      description: 'Cell biology, genetics, and human anatomy',
      format: 'video',
      level: 'intermediate',
      duration: '16 hours',
      rating: 4.6,
      students: '35K',
      languages: ['English', 'Hindi'],
      accessibility: ['3D anatomy models', 'Audio descriptions', 'Visual aids'],
      features: ['3D models', 'Microscopic views', 'Interactive diagrams'],
      price: '$44',
      gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
      subject: 'Biology',
      ageGroup: '16-18 years'
    },
    {
      id: 'english-literature',
      title: 'English Literature Analysis',
      description: 'Critical analysis of classic and contemporary literature',
      format: 'text',
      level: 'advanced',
      duration: '14 hours',
      rating: 4.5,
      students: '32K',
      languages: ['English'],
      accessibility: ['Text-to-speech', 'Reading guides', 'Analysis tools'],
      features: ['Literary analysis', 'Essay writing', 'Discussion forums'],
      price: '$34',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-700',
      subject: 'Literature',
      ageGroup: '16-18 years'
    }
  ];

  // Higher Education Resources (Engineering/Medical)
  const higherEducationResources: LearningResource[] = [
    {
      id: 'engineering-mathematics',
      title: 'Engineering Mathematics',
      description: 'Advanced calculus, linear algebra, and differential equations',
      format: 'video',
      level: 'advanced',
      duration: '30 hours',
      rating: 4.9,
      students: '25K',
      languages: ['English', 'Hindi'],
      accessibility: ['Detailed derivations', 'Step-by-step solutions', 'Practice problems'],
      features: ['Video lectures', 'Problem sets', 'Engineering applications'],
      price: '$79',
      gradient: 'bg-gradient-to-r from-red-500 to-red-700',
      subject: 'Engineering',
      category: 'Core Engineering'
    },
    {
      id: 'medical-anatomy',
      title: 'Medical Anatomy & Physiology',
      description: 'Comprehensive human anatomy and physiological systems',
      format: 'interactive',
      level: 'advanced',
      duration: '40 hours',
      rating: 4.8,
      students: '18K',
      languages: ['English'],
      accessibility: ['3D anatomy models', 'Audio descriptions', 'Medical terminology'],
      features: ['3D models', 'Virtual dissection', 'Clinical correlations'],
      price: '$99',
      gradient: 'bg-gradient-to-r from-pink-500 to-pink-700',
      subject: 'Medical',
      category: 'Pre-Medical'
    },
    {
      id: 'computer-science',
      title: 'Advanced Computer Science',
      description: 'Data structures, algorithms, and software engineering',
      format: 'interactive',
      level: 'advanced',
      duration: '35 hours',
      rating: 4.7,
      students: '22K',
      languages: ['English', 'Hindi'],
      accessibility: ['Code highlighting', 'Audio explanations', 'Debugging tools'],
      features: ['Coding challenges', 'Project building', 'Algorithm visualization'],
      price: '$89',
      gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
      subject: 'Computer Science',
      category: 'Engineering'
    },
    {
      id: 'biochemistry',
      title: 'Biochemistry Fundamentals',
      description: 'Molecular biology, metabolism, and cellular processes',
      format: 'video',
      level: 'advanced',
      duration: '25 hours',
      rating: 4.6,
      students: '15K',
      languages: ['English'],
      accessibility: ['3D molecular models', 'Audio descriptions', 'Visual aids'],
      features: ['Molecular modeling', 'Metabolic pathways', 'Clinical applications'],
      price: '$69',
      gradient: 'bg-gradient-to-r from-teal-500 to-teal-700',
      subject: 'Biochemistry',
      category: 'Medical'
    }
  ];

  const getResourcesBySection = (section: string) => {
    switch (section) {
      case 'primary':
        return primarySchoolResources;
      case 'middle':
        return middleSchoolResources;
      case 'intermediate':
        return intermediateResources;
      case 'higher':
        return higherEducationResources;
      default:
        return primarySchoolResources;
    }
  };

  const currentResources = getResourcesBySection(activeSection);

  const filteredResources = currentResources.filter(resource => {
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
              Learning Resources by Age & Level
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Discover age-appropriate learning resources designed for different educational stages. 
              From primary school to higher education, find content that matches your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Education Level Navigation */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {educationSections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'default' : 'outline'}
                  onClick={() => setActiveSection(section.id)}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300 ${
                    activeSection === section.id ? section.color : ''
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium text-center">{section.label}</span>
                </Button>
              );
            })}
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

      {/* Section Info */}
      <section className="py-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {educationSections.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-muted-foreground">
                {activeSection === 'primary' && 'Foundational learning for young minds (Ages 6-10)'}
                {activeSection === 'middle' && 'Building core skills and knowledge (Ages 11-15)'}
                {activeSection === 'intermediate' && 'Advanced concepts and exam preparation (Ages 16-18)'}
                {activeSection === 'higher' && 'Specialized education for engineering and medical fields'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">
                Showing {filteredResources.length} of {currentResources.length} resources
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
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
                    {/* Subject and Age/Category */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="secondary" className="text-xs">
                        {resource.subject}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {resource.ageGroup || resource.category}
                      </span>
                    </div>

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
              our library to meet diverse learning needs across all age groups.
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