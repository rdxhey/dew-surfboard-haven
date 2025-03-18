
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

const Search = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'web';

  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (newQuery: string) => {
    console.log('Searching for:', newQuery);
    // In a real app, this would trigger a new search
  };

  return (
    <div className="min-h-screen flex flex-col py-4 px-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className={`flex items-center gap-4 ${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} style={{ transitionDuration: '0.5s' }}>
          <Logo size="sm" />
          <SearchBar onSearch={handleSearch} initialValue={query} className="w-[500px]" />
        </div>
        
        <div className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} style={{ transitionDuration: '0.5s', transitionDelay: '0.2s' }}>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-600 hover:text-primary text-sm">Home</a>
            <a href="/search?type=web" className={`text-sm ${type === 'web' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>Web</a>
            <a href="/search?type=images" className={`text-sm ${type === 'images' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>Images</a>
          </div>
        </div>
      </div>
      
      {/* Search Results Content */}
      <div className={`flex-1 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
        {type === 'images' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 rounded w-2/5 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="text-center text-gray-500 mt-8">
          <p>Showing search results for: {query || 'empty query'}</p>
          <p>Type: {type === 'images' ? 'Image Search' : 'Web Search'}</p>
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

export default Search;
