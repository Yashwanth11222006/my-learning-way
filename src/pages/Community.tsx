import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Phone, 
  Bot,
  Search,
  Plus,
  Star,
  Clock,
  MapPin,
  Globe,
  BookOpen,
  UserPlus,
  MessageSquare,
  Headphones,
  Video,
  Calendar,
  Award,
  HandHeart,
  Lightbulb
} from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const communityTabs = [
    { id: 'forums', label: 'Discussion Forums', icon: MessageCircle },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'volunteer', label: 'Volunteer Hub', icon: HandHeart },
    { id: 'support', label: 'Support Center', icon: Heart }
  ];

  const forumTopics = [
    {
      id: 'accessibility-tips',
      title: 'Accessibility Learning Tips',
      description: 'Share and discover effective accessibility techniques',
      posts: 342,
      members: 15600,
      lastActivity: '2 hours ago',
      featured: true,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'career-advice',
      title: 'Inclusive Career Guidance',
      description: 'Get advice on building accessible career paths',
      posts: 289,
      members: 12400,
      lastActivity: '1 hour ago',
      featured: true,
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'tech-support',
      title: 'Assistive Technology',
      description: 'Troubleshoot and share assistive tech solutions',
      posts: 156,
      members: 8900,
      lastActivity: '30 minutes ago',
      featured: false,
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'success-stories',
      title: 'Success Celebrations',
      description: 'Share your achievements and milestones',
      posts: 234,
      members: 11200,
      lastActivity: '5 hours ago',
      featured: false,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'study-help',
      title: 'Study Support',
      description: 'Get help with courses and learning challenges',
      posts: 567,
      members: 18700,
      lastActivity: '15 minutes ago',
      featured: true,
      gradient: 'bg-gradient-secondary'
    }
  ];

  const studyGroups = [
    {
      id: 'web-dev-accessibility',
      name: 'Accessible Web Development',
      members: 45,
      description: 'Learning web development with accessibility best practices',
      nextMeeting: 'Tomorrow, 7:00 PM',
      type: 'Virtual',
      level: 'Intermediate',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'ux-inclusive-design',
      name: 'Inclusive UX Design Circle',
      members: 32,
      description: 'Designing user experiences for everyone',
      nextMeeting: 'Friday, 6:30 PM',
      type: 'Hybrid',
      level: 'Beginner',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'data-science-basics',
      name: 'Data Science for All',
      members: 28,
      description: 'Accessible approach to data analysis and visualization',
      nextMeeting: 'Saturday, 2:00 PM',
      type: 'Virtual',
      level: 'Beginner',
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'career-transition',
      name: 'Career Change Support',
      members: 67,
      description: 'Supporting each other through career transitions',
      nextMeeting: 'Wednesday, 7:30 PM',
      type: 'Virtual',
      level: 'All Levels',
      gradient: 'bg-gradient-primary'
    }
  ];

  const volunteerOpportunities = [
    {
      id: 'mentor-program',
      title: 'Become a Mentor',
      description: 'Guide new learners on their accessibility journey',
      commitment: '2 hours/week',
      skills: ['Communication', 'Patience', 'Experience sharing'],
      impact: '500+ learners supported',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'content-review',
      title: 'Content Accessibility Reviewer',
      description: 'Help improve course materials for better accessibility',
      commitment: '3 hours/week',
      skills: ['Accessibility knowledge', 'Attention to detail'],
      impact: '200+ courses improved',
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'tech-support',
      title: 'Technical Support Volunteer',
      description: 'Assist community members with assistive technology',
      commitment: '4 hours/week',
      skills: ['Technical skills', 'Problem solving', 'Assistive tech'],
      impact: '1000+ support tickets resolved',
      gradient: 'bg-gradient-accent'
    }
  ];

  const supportResources = [
    {
      title: '24/7 Helpline',
      description: 'Immediate support for learning and accessibility needs',
      contact: '1-800-ASSIST',
      availability: 'Always available',
      icon: Phone,
      gradient: 'bg-gradient-primary'
    },
    {
      title: 'AI Learning Assistant',
      description: 'Get instant help with accessibility features and learning',
      contact: 'Chat now',
      availability: 'Instant response',
      icon: Bot,
      gradient: 'bg-gradient-secondary'
    },
    {
      title: 'Crisis Support Network',
      description: 'Mental health and crisis intervention resources',
      contact: 'crisis@assisted.edu',
      availability: 'Immediate response',
      icon: Heart,
      gradient: 'bg-gradient-accent'
    }
  ];

  const renderForums = () => (
    <div className="space-y-6">
      {/* New Post Form */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Start a New Discussion</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="What would you like to discuss?"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <Textarea
            placeholder="Share your thoughts, questions, or experiences..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={3}
          />
          <Button variant="hero">
            <MessageSquare className="h-4 w-4" />
            Post Discussion
          </Button>
        </CardContent>
      </Card>

      {/* Forum Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forumTopics.map((topic, index) => (
          <Card 
            key={topic.id}
            className={`group hover:shadow-large transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-up ${
              topic.featured ? 'ring-2 ring-primary/20' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${topic.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                {topic.featured && (
                  <Badge variant="default">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{topic.posts} posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{topic.members.toLocaleString()} members</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <Clock className="h-4 w-4" />
                  <span>Last activity: {topic.lastActivity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search study groups by topic, skill level, or meeting time..."
          className="pl-10"
        />
      </div>

      {/* Study Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyGroups.map((group, index) => (
          <Card 
            key={group.id}
            className="group hover:shadow-large transition-all duration-300 hover:scale-105 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${group.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <Badge variant="outline" className="capitalize">
                  {group.level}
                </Badge>
              </div>
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Next meeting: {group.nextMeeting}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{group.type}</span>
                </div>
              </div>
              <Button variant="hero" className="w-full">
                Join Study Group
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Group CTA */}
      <Card className="border-dashed border-2 border-primary/30 bg-primary-soft/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Start Your Own Study Group</h3>
          <p className="text-muted-foreground mb-6">
            Can't find the perfect group? Create one and invite others to learn together.
          </p>
          <Button variant="hero">
            Create Study Group
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderVolunteer = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Be the Change You Want to See</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our volunteer community and help make education more accessible for everyone. 
          Every contribution, big or small, makes a difference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {volunteerOpportunities.map((opportunity, index) => (
          <Card 
            key={opportunity.id}
            className="group hover:shadow-large transition-all duration-300 hover:scale-105 animate-fade-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader>
              <div className={`w-12 h-12 ${opportunity.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4`}>
                <HandHeart className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              <CardDescription>{opportunity.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Time Commitment:</span>
                  <span className="text-muted-foreground">{opportunity.commitment}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Skills Needed:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {opportunity.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{opportunity.impact}</span>
                </div>
              </div>
              <Button variant="hero" className="w-full">
                Apply to Volunteer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">We're Here to Help</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get immediate support, find resources, and connect with our care team. 
          No one learns alone at AssistEd.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <Card 
              key={resource.title}
              className="group hover:shadow-large transition-all duration-300 hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${resource.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-primary">{resource.contact}</div>
                  <div className="text-muted-foreground">{resource.availability}</div>
                </div>
                <Button variant="hero" className="w-full">
                  Get Support
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Frequently Asked Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">How do I access assistive technology support?</h4>
              <p className="text-muted-foreground text-sm">
                Visit our Assistive Tools hub or contact our 24/7 helpline for immediate technical assistance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Can I get personalized learning recommendations?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! Our AI assistant can provide customized course suggestions based on your accessibility preferences.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Are there scholarships available for learners with disabilities?</h4>
              <p className="text-muted-foreground text-sm">
                Absolutely. Check our Career Support section for current scholarship opportunities and application deadlines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'forums': return renderForums();
      case 'groups': return renderGroups();
      case 'volunteer': return renderVolunteer();
      case 'support': return renderSupport();
      default: return renderForums();
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              A Community That Cares
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Connect, learn, and grow together in our inclusive community. Share experiences, 
              get support, and help others on their accessibility journey.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-background sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {communityTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 bg-gradient-soft min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderTabContent()}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Connect with thousands of learners, mentors, and supporters who believe 
              that everyone deserves access to quality education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl">
                Join Discussion Forums
              </Button>
              <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Find Study Groups
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;