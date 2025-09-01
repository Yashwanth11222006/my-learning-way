import Layout from '@/components/Layout';
import SignLanguageTranslator from '@/components/SignLanguageTranslator';
import SignLanguageDetector from '@/components/SignLanguageDetector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Hand, 
  Languages, 
  Users, 
  Award, 
  BookOpen,
  Video,
  Headphones,
  Accessibility,
  Globe,
  Heart,
  Star,
  Eye
} from 'lucide-react';

const SignLanguagePage = () => {
  const features = [
    {
      icon: Languages,
      title: 'Multiple Sign Languages',
      description: 'Support for ASL, BSL, ISL, and more sign languages worldwide'
    },
    {
      icon: Video,
      title: 'Visual Learning',
      description: 'Step-by-step visual guides and hand shape demonstrations'
    },
    {
      icon: Headphones,
      title: 'Audio Support',
      description: 'Audio descriptions and pronunciation guides for each sign'
    },
    {
      icon: Accessibility,
      title: 'Accessibility First',
      description: 'Designed with accessibility features for all learners'
    }
  ];

  const benefits = [
    'Improve communication with deaf and hard-of-hearing individuals',
    'Learn sign language at your own pace with interactive lessons',
    'Practice with confidence using visual and audio feedback',
    'Access learning materials in multiple sign language variants',
    'Build vocabulary and fluency through structured learning'
  ];

  const handleTranslationComplete = (translation: any) => {
    console.log('Translation completed:', translation);
    // You can add analytics or additional processing here
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Hand className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Sign Language Translator
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Break down communication barriers with our advanced sign language translation tool. 
              Learn, practice, and master sign language with interactive visual guides.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                Multiple Languages
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Accessibility className="h-4 w-4 mr-2" />
                Accessible Design
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Video className="h-4 w-4 mr-2" />
                Visual Learning
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Sign Language Translator?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets accessibility to create the perfect learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

             {/* Translator Section */}
       <section className="py-16 bg-gradient-soft">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-foreground mb-4">
               Start Translating Now
             </h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Enter any text and watch it transform into sign language with detailed instructions
             </p>
           </div>
           
           <SignLanguageTranslator 
             initialText="Hello, how are you?"
             onTranslationComplete={handleTranslationComplete}
           />
         </div>
       </section>

       {/* Detector Section */}
       <section className="py-16 bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-foreground mb-4">
               Detect Sign Language with Camera
             </h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Use your camera to detect sign language gestures and convert them to text in real-time
             </p>
           </div>
           
           <SignLanguageDetector 
             onTextDetected={(text) => console.log('Detected text:', text)}
             onDetectionComplete={(detection) => console.log('Detection complete:', detection)}
           />
         </div>
       </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Benefits of Learning Sign Language
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-semibold">Inclusive Communication</h3>
                    <p className="text-primary-foreground/80">Connect with the deaf community</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-semibold">Professional Development</h3>
                    <p className="text-primary-foreground/80">Enhance your career opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-semibold">Personal Growth</h3>
                    <p className="text-primary-foreground/80">Develop empathy and understanding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources Integration */}
      <section className="py-16 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore More Learning Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover comprehensive learning materials for all age groups and skill levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Primary School</CardTitle>
                <CardDescription>
                  Age-appropriate sign language basics for young learners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Ages 6-10</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Middle School</CardTitle>
                <CardDescription>
                  Interactive lessons and practice exercises for teens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Ages 11-15</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Advanced Learning</CardTitle>
                <CardDescription>
                  Professional sign language courses and certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Ages 16+</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start Your Sign Language Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are breaking down communication barriers 
              and building inclusive communities through sign language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors">
                Start Learning Now
              </button>
              <button className="bg-transparent border border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors">
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignLanguagePage;
