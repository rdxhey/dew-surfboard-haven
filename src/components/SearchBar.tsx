
import React, { useState, useRef } from 'react';
import { Search, Mic, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ className, onSearch, initialValue = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent, type: 'web' | 'images' = 'web') => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}&type=${type}`);
      }
    }
  };

  const handleImageSearch = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, this would upload the image and search
      // For now, we'll just navigate to the image search page
      navigate('/search?q=image_search&type=images');
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    
    // This is just a mockup of voice recognition
    // In a real app, you would use the Web Speech API
    setTimeout(() => {
      setQuery('voice search example');
      setIsListening(false);
      
      // Auto-submit after voice input
      if (onSearch) {
        onSearch('voice search example');
      } else {
        navigate('/search?q=voice_search_example&type=web');
      }
    }, 2000);
  };

  return (
    <div className={cn('search-container', className)}>
      <form 
        onSubmit={(e) => handleSearch(e)}
        className={cn(
          'relative rounded-full transition-all duration-300',
          isFocused ? 'shadow-[0_1px_8px_rgba(32,33,36,0.24)]' : 'shadow-[0_1px_6px_rgba(32,33,36,0.18)]'
        )}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search the web"
          className="search-input pr-24"
          aria-label="Search"
        />
        
        <div className="absolute right-0 top-0 h-full flex items-center pr-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <button
            type="button"
            onClick={handleImageSearch}
            className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
            aria-label="Image search"
            title="Search by image"
          >
            <Camera size={20} />
          </button>
          
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`h-10 w-10 flex items-center justify-center transition-colors ${isListening ? 'text-primary animate-pulse' : 'text-gray-500 hover:text-primary'}`}
            aria-label="Voice search"
            title="Search by voice"
            disabled={isListening}
          >
            <Mic size={20} />
          </button>
          
          <button
            type="submit"
            className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
            aria-label="Submit search"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
