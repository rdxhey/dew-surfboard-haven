
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import ServiceNav from '@/components/ServiceNav';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [isRightAnimating, setIsRightAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
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
    <div className="min-h-screen flex flex-col justify-between py-4 px-6 overflow-hidden">
      {/* Top Navigation */}
      <div 
        className={`flex justify-end py-4 ${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`}
        style={{ transitionDuration: '0.5s' }}
      >
        <ServiceNav />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
        <div 
          className={`mb-8 ${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} 
          style={{ transitionDelay: '0.2s', transitionDuration: '0.5s' }}
        >
          <Logo />
        </div>
        
        <div 
          className={`w-full max-w-xl px-4 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.3s' }}
        >
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div 
          className={`flex gap-4 mt-6 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.4s' }}
        >
          <button 
            onClick={() => navigate('/search?type=web')}
            className="py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
          >
            Dew Search
          </button>
          <button 
            onClick={() => navigate('/search?type=images')}
            className="py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
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
            <Sparkles size={16} className={`mr-1 ${isRightAnimating ? 'animate-spin' : 'group-hover:animate-pulse'}`} /> 
            I'm Feeling Right
            {isRightAnimating && (
              <span className="absolute inset-0 animate-pulse bg-primary/10 rounded-md"></span>
            )}
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <Footer 
        className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} 
        style={{ transitionDelay: '0.5s', transitionDuration: '0.5s' }} 
      />
    </div>
  );
};

export default Index;
