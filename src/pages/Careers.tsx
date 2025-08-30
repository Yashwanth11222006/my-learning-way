import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Search,
  Filter,
  Star,
  Building,
  Users,
  Award,
  Heart,
  BookOpen,
  FileUser,
  UserCheck,
  TrendingUp,
  Target,
  Zap,
  Globe
} from 'lucide-react';

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRemote, setSelectedRemote] = useState('all');

  const jobTypes = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'internship', label: 'Internships' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'volunteer', label: 'Volunteer' }
  ];

  const remoteOptions = [
    { id: 'all', label: 'All Locations' },
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'On-site' }
  ];

  const careerOpportunities = [
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      company: 'Inclusive Tech Solutions',
      location: 'Remote',
      type: 'full-time',
      salary: '$65,000 - $85,000',
      description: 'Build accessible web applications using modern frameworks',
      requirements: ['React/Vue.js', 'Accessibility standards', 'Team collaboration'],
      accessibility: ['Screen reader support', 'Flexible hours', 'Assistive tech provided'],
      posted: '2 days ago',
      applicants: 45,
      rating: 4.8,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'ux-designer',
      title: 'UX Designer (Accessibility Focus)',
      company: 'Design for All Studio',
      location: 'San Francisco, CA / Remote',
      type: 'full-time',
      salary: '$70,000 - $95,000',
      description: 'Create inclusive user experiences for diverse user groups',
      requirements: ['Figma/Sketch', 'Accessibility testing', 'User research'],
      accessibility: ['Voice interface tools', 'Color blind friendly', 'Flexible workspace'],
      posted: '1 week ago',
      applicants: 67,
      rating: 4.9,
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'content-writer',
      title: 'Accessible Content Writer',
      company: 'Global Education Platform',
      location: 'Remote',
      type: 'part-time',
      salary: '$25 - $40/hour',
      description: 'Write clear, accessible content for educational materials',
      requirements: ['Plain language writing', 'Educational background', 'SEO knowledge'],
      accessibility: ['Text-to-speech tools', 'Grammar assistance', 'Flexible deadlines'],
      posted: '3 days ago',
      applicants: 23,
      rating: 4.7,
      gradient: 'bg-gradient-accent'
    },
    {
      id: 'data-analyst',
      title: 'Junior Data Analyst',
      company: 'Accessibility Research Labs',
      location: 'Boston, MA',
      type: 'internship',
      salary: '$20/hour',
      description: 'Analyze user data to improve accessibility features',
      requirements: ['Python/R basics', 'Statistics knowledge', 'Learning mindset'],
      accessibility: ['Voice coding tools', 'Large monitors', 'Mentorship program'],
      posted: '5 days ago',
      applicants: 156,
      rating: 4.6,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'customer-success',
      title: 'Customer Success Specialist',
      company: 'AssistTech Solutions',
      location: 'Chicago, IL / Hybrid',
      type: 'full-time',
      salary: '$55,000 - $70,000',
      description: 'Support customers in implementing accessibility solutions',
      requirements: ['Communication skills', 'Problem solving', 'Empathy'],
      accessibility: ['Communication aids', 'Quiet workspace', 'Flexible schedule'],
      posted: '1 day ago',
      applicants: 89,
      rating: 4.8,
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'qa-tester',
      title: 'Accessibility QA Tester',
      company: 'Universal Design Corp',
      location: 'Remote',
      type: 'full-time',
      salary: '$50,000 - $65,000',
      description: 'Test software for accessibility compliance and usability',
      requirements: ['Testing experience', 'WCAG knowledge', 'Attention to detail'],
      accessibility: ['Screen readers provided', 'Ergonomic setup', 'Flexible hours'],
      posted: '4 days ago',
      applicants: 34,
      rating: 4.7,
      gradient: 'bg-gradient-accent'
    }
  ];

  const scholarships = [
    {
      title: 'Accessibility Innovation Scholarship',
      amount: '$10,000',
      deadline: 'March 15, 2024',
      description: 'For students developing accessibility technologies',
      eligibility: 'Undergraduate/Graduate students in Tech/Design'
    },
    {
      title: 'Inclusive Education Grant',
      amount: '$5,000',
      deadline: 'April 30, 2024',
      description: 'Supporting career transitions into accessible education',
      eligibility: 'Career changers entering education field'
    },
    {
      title: 'Diversity in Tech Fellowship',
      amount: '$15,000',
      deadline: 'May 20, 2024',
      description: 'Full scholarship for underrepresented groups in technology',
      eligibility: 'Underrepresented minorities in STEM'
    }
  ];

  const filteredOpportunities = careerOpportunities.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesRemote = selectedRemote === 'all' || 
                         (selectedRemote === 'remote' && job.location.includes('Remote')) ||
                         (selectedRemote === 'hybrid' && job.location.includes('Hybrid')) ||
                         (selectedRemote === 'onsite' && !job.location.includes('Remote') && !job.location.includes('Hybrid'));
    
    return matchesSearch && matchesType && matchesRemote;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Shape Your Future With Us
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Discover inclusive career opportunities, build your skills with accessible tools, 
              and connect with employers who value diversity and accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="group hover:shadow-large transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileUser className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Resume Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">Create accessible resumes with audio prompts</p>
                <Button variant="soft" size="sm" className="w-full">
                  Build Resume
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Mentorship</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect with inspiring professionals</p>
                <Button variant="soft" size="sm" className="w-full">
                  Find Mentor
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Skill Training</h3>
                <p className="text-sm text-muted-foreground mb-4">Learn job-ready skills with adaptive learning</p>
                <Button variant="soft" size="sm" className="w-full">
                  Start Training
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-large transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Scholarships</h3>
                <p className="text-sm text-muted-foreground mb-4">Explore financial aid for career growth</p>
                <Button variant="soft" size="sm" className="w-full">
                  View Scholarships
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <div className="flex flex-wrap gap-3 justify-center">
                {jobTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'default' : 'outline'}
                    onClick={() => setSelectedType(type.id)}
                    size="sm"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {remoteOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedRemote === option.id ? 'secondary' : 'outline'}
                    onClick={() => setSelectedRemote(option.id)}
                    size="sm"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Job Opportunities ({filteredOpportunities.length})
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="space-y-6">
            {filteredOpportunities.map((job, index) => (
              <Card 
                key={job.id}
                className="group hover:shadow-large transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 ${job.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Briefcase className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <Badge variant="secondary" className="capitalize">
                              {job.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">{job.description}</p>
                          
                          {/* Requirements */}
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-foreground">Requirements: </span>
                              <span className="text-muted-foreground">{job.requirements.join(' • ')}</span>
                            </div>
                            
                            {/* Accessibility Features */}
                            <div>
                              <span className="font-medium text-primary">Accessibility Support: </span>
                              <span className="text-muted-foreground">{job.accessibility.join(' • ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Stats & Actions */}
                    <div className="lg:w-64 space-y-4">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Posted:</span>
                          <span>{job.posted}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Applicants:</span>
                          <span>{job.applicants}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{job.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button variant="hero" className="w-full">
                          Apply Now
                        </Button>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No opportunities found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more career opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Scholarship Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Financial support designed for equity and inclusion in education and career development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scholarships.map((scholarship, index) => (
              <Card 
                key={scholarship.title}
                className="group hover:shadow-large transition-all duration-300 hover:scale-105 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default" className="bg-gradient-accent">
                      {scholarship.amount}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Due: {scholarship.deadline}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                  <CardDescription>{scholarship.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-foreground">Eligibility: </span>
                      <span className="text-muted-foreground">{scholarship.eligibility}</span>
                    </div>
                    <Button variant="hero" className="w-full">
                      Apply for Scholarship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our career support community and get personalized guidance from 
              accessibility-focused career counselors and mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl">
                Get Career Counseling
              </Button>
              <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Join Employer Network
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;