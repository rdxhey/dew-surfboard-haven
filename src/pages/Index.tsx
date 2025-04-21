
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import ServiceNav from '@/components/ServiceNav';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Info, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useResponsiveValues } from '@/hooks/use-mobile';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [isRightAnimating, setIsRightAnimating] = useState(false);
  const [showFeatureCards, setShowFeatureCards] = useState(false);
  const navigate = useNavigate();
  const { spacing, text, breakpoint } = useResponsiveValues();

  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    // Show feature cards with a delay after the main content loads
    const featuresTimer = setTimeout(() => {
      setShowFeatureCards(true);
    }, 1200);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(featuresTimer);
    };
  }, []);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    navigate(`/search?q=${encodeURIComponent(query)}&type=web`);
  };

  const handleFeelingRight = () => {
    setIsRightAnimating(true);
    
    // Add a delay before navigation to allow animation to play
    setTimeout(() => {
      navigate('/dewdols');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-4 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-blue-50/60 to-white">
      {/* Top Navigation */}
      <div 
        className={`flex justify-end py-4 z-50 ${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`}
        style={{ transitionDuration: '0.5s' }}
      >
        <ServiceNav />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 -mt-16 md:-mt-20 relative">
        <div 
          className={`mb-6 md:mb-8 ${loaded ? 'animate-fade-in' : 'opacity-0'}`} 
          style={{ transitionDelay: '0.2s', transitionDuration: '0.5s' }}
        >
          <Logo className="drop-shadow-lg hover:drop-shadow-xl transition-all duration-500" />
        </div>
        
        <div 
          className={`w-full max-w-xl px-4 relative ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.3s' }}
        >
          <SearchBar onSearch={handleSearch} />
          
          {/* Subtle glow effect under the search bar */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-blue-100/0 via-blue-300/30 to-blue-100/0 blur-md rounded-full"></div>
        </div>
        
        <div 
          className={`flex gap-4 mt-4 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.4s' }}
        >
          <button 
            onClick={() => navigate('/search?type=web')}
            className="py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            Dew Search
          </button>
          <button 
            onClick={() => navigate('/search?type=images')}
            className="py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            Dew Images
          </button>
        </div>
        
        <div 
          className={`mt-2 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.5s' }}
        >
          <Button 
            onClick={handleFeelingRight}
            variant="ghost" 
            size="sm" 
            className={`group text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 relative overflow-hidden ${isRightAnimating ? 'animate-bounce' : ''}`}
            disabled={isRightAnimating}
          >
            <Sparkles size={16} className={`mr-2 ${isRightAnimating ? 'animate-spin' : 'group-hover:animate-pulse'}`} /> 
            I'm Feeling Right
            {isRightAnimating && (
              <span className="absolute inset-0 animate-pulse bg-primary/10 rounded-md"></span>
            )}
          </Button>
        </div>

        {/* Feature Cards Section */}
        {showFeatureCards && (
          <div className={`w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 ${spacing.container} animate-fade-in`}>
            <FeatureCard 
              icon={<TrendingUp className="text-blue-500" size={20} />}
              title="Intelligent Results"
              description="Our advanced algorithms deliver the most relevant search results tailored just for you."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Lightbulb className="text-yellow-500" size={20} />}
              title="Dew AI"
              description="Experience next-level search with our built-in AI assistant that understands your needs."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Info className="text-green-500" size={20} />}
              title="Privacy First"
              description="Your searches are private. We prioritize your data security with every query."
              delay={0.3}
            />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer 
        className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} 
        style={{ transitionDelay: '0.5s', transitionDuration: '0.5s' }} 
      />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <Card className="p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm bg-white/80" 
      style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center mb-2">
        <div className="mr-2 p-2 bg-gray-50 rounded-full">{icon}</div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </Card>
  );
};

export default Index;
