
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
    <div className="min-h-screen flex flex-col justify-between py-4 px-6">
      {/* Top Navigation */}
      <div className={`flex justify-end py-4 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <ServiceNav />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
        <div className={`mb-8 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ transitionDelay: '0.1s' }}>
          <Logo />
        </div>
        
        <div className={`w-full max-w-xl px-4 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer className={`${loaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ transitionDelay: '0.4s' }} />
    </div>
  );
};

export default Index;
