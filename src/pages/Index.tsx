
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import ServiceNav from '@/components/ServiceNav';
import Footer from '@/components/Footer';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would redirect to search results
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
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
          className={`mb-8 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.2s' }}
        >
          <Logo />
        </div>
        
        <div 
          className={`w-full max-w-xl px-4 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} 
          style={{ transitionDelay: '0.3s' }}
        >
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer 
        className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} 
        style={{ transitionDelay: '0.4s', transitionDuration: '0.5s' }} 
      />
    </div>
  );
};

export default Index;
