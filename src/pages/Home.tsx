import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Heart,
  Star,
  TrendingUp,
  Globe,
  Award,
  BookOpen,
  MessageCircle,
  Target
} from 'lucide-react';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [accessibilityMode, setAccessibilityMode] = useState('standard');
  const [stats, setStats] = useState({
    learners: 0,
    courses: 0,
    careers: 0,
    success: 0
  });

  useEffect(() => {
    const mode = searchParams.get('mode') || localStorage.getItem('accessibilityMode') || 'standard';
    setAccessibilityMode(mode);
    
    // Animate statistics
    const targetStats = { learners: 300000000, courses: 5000, careers: 25000, success: 95 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        learners: Math.floor(targetStats.learners * progress),
        courses: Math.floor(targetStats.courses * progress),
        careers: Math.floor(targetStats.careers * progress),
        success: Math.floor(targetStats.success * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targetStats);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [searchParams]);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const quickActions = [
    {
      title: 'Start Learning',
      description: 'Access inclusive courses and resources',
      href: '/resources',
      icon: BookOpen,
      variant: 'hero' as const,
      gradient: 'bg-gradient-primary'
    },
    {
      title: 'Explore Tools',
      description: 'Discover assistive learning tools',
      href: '/assistive-tools',
      icon: Heart,
      variant: 'accent' as const,
      gradient: 'bg-gradient-accent'
    },
    {
      title: 'Build Careers',
      description: 'Find inclusive career opportunities',
      href: '/careers',
      icon: Briefcase,
      variant: 'success' as const,
      gradient: 'bg-gradient-secondary'
    },
    {
      title: 'Join Community',
      description: 'Connect with supportive learners',
      href: '/community',
      icon: MessageCircle,
      variant: 'soft' as const,
      gradient: 'bg-gradient-primary'
    }
  ];

  const impactStats = [
    { 
      label: 'Learners Worldwide', 
      value: formatNumber(stats.learners),
      suffix: '+',
      icon: Users,
      description: 'People who need inclusive education'
    },
    { 
      label: 'Accessible Courses', 
      value: formatNumber(stats.courses),
      suffix: '+',
      icon: GraduationCap,
      description: 'Courses adapted for all learning styles'
    },
    { 
      label: 'Career Opportunities', 
      value: formatNumber(stats.careers),
      suffix: '+',
      icon: Briefcase,
      description: 'Inclusive job placements'
    },
    { 
      label: 'Success Rate', 
      value: stats.success,
      suffix: '%',
      icon: TrendingUp,
      description: 'Learner achievement rate'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      mode: "Audio Guidance Mode",
      quote: "The audio navigation helped me learn coding concepts in a way that worked perfectly for me.",
      achievement: "Landed dream job at tech startup"
    },
    {
      name: "Marcus Rodriguez",
      role: "Digital Designer",
      mode: "Visual Support Mode",
      quote: "Visual learning tools and captions made complex design principles so much clearer.",
      achievement: "Started own design agency"
    },
    {
      name: "Priya Patel",
      role: "Business Analyst",
      mode: "Easy Learning Mode",
      quote: "Step-by-step guidance helped me master data analysis at my own pace.",
      achievement: "Promoted to senior analyst"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              AssistEd
            </h1>
            <p className="text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-medium">
              Empowering Every Way of Learning
            </p>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12">
              Choose your path. Learn without limits. We create inclusive education 
              and career opportunities that adapt to your unique strengths.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    to={action.href}
                    className="group animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full bg-card/80 backdrop-blur-sm border-primary-foreground/20 hover:bg-card/90 transition-all duration-300 hover:scale-105 hover:shadow-glow">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 ${action.gradient} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Creating Global Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Together, we're building a world where every learner can thrive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.label}
                  className="text-center group hover:shadow-large transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Every Journey Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from learners who found their path with AssistEd
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="group hover:shadow-large transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-primary">Mode: </span>
                      <span className="text-muted-foreground">{testimonial.mode}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-success">Achievement: </span>
                      <span className="text-muted-foreground">{testimonial.achievement}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/success-stories">
              <Button variant="hero" size="lg" className="group">
                Read More Success Stories
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join millions of learners who are discovering their potential with inclusive, 
              accessible education tailored to their unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button variant="secondary" size="xl" className="group">
                  Start Learning Today
                  <GraduationCap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link to="/assistive-tools">
                <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Explore Accessibility Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;