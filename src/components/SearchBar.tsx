
import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ className, onSearch, initialValue = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 5)); // Keep only the 5 most recent
        }
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  }, []);

  // Save search to recent searches
  const saveToRecentSearches = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    try {
      const updatedSearches = [
        searchQuery, 
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error("Failed to save recent searches:", error);
    }
  };

  const handleSearch = (e: React.FormEvent, type: 'web' | 'images' = 'web') => {
    e.preventDefault();
    if (query.trim()) {
      saveToRecentSearches(query);
      
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}&type=${type}`);
      }
    }
  };

  const handleImageSearch = () => {
    setIsImageSearchActive(true);
    // Add animation and delay before showing file input
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 300);
    
    // Reset the animation state after some time
    setTimeout(() => {
      setIsImageSearchActive(false);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "Image Search",
        description: "Image search functionality coming soon!",
      });
      
      // In a real implementation, this would upload the image and search
      // For now, we'll just navigate to the image search page
      navigate('/search?q=image_search&type=images');
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    
    // This is a mockup of voice recognition since we can't use the actual Web Speech API in this demo
    toast({
      title: "Listening...",
      description: "Say something to search",
    });
    
    setTimeout(() => {
      const mockVoiceQuery = "voice search example";
      setQuery(mockVoiceQuery);
      
      // Auto-submit after voice input with a delay
      setTimeout(() => {
        setIsListening(false);
        toast({
          title: "Voice recognized",
          description: `Searching for "${mockVoiceQuery}"`,
        });
        
        if (onSearch) {
          onSearch(mockVoiceQuery);
        } else {
          navigate(`/search?q=${encodeURIComponent(mockVoiceQuery)}&type=web`);
        }
      }, 300);
    }, 2000);
  };

  const handleAiAssist = () => {
    toast({
      title: "Dew AI Assistant",
      description: "Let me help you find what you're looking for!",
    });
    navigate('/dew-ai');
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTimeout(() => {
      setShowAiSuggestion(query.length > 0);
    }, 300);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking them
    setTimeout(() => {
      setIsFocused(false);
      setShowAiSuggestion(false);
    }, 200);
  };

  const handleSelectRecentSearch = (search: string) => {
    setQuery(search);
    if (onSearch) {
      onSearch(search);
    } else {
      navigate(`/search?q=${encodeURIComponent(search)}&type=web`);
    }
  };

  return (
    <div className={cn('search-container relative', className)}>
      <form 
        onSubmit={(e) => handleSearch(e)}
        className={cn(
          'relative rounded-full transition-all duration-300',
          isFocused ? 'shadow-[0_2px_10px_rgba(32,33,36,0.28)]' : 'shadow-[0_1px_6px_rgba(32,33,36,0.18)]'
        )}
      >
        <input
          ref={searchInputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search the web"
          className="w-full h-12 px-5 pr-28 rounded-full border-none focus:outline-none focus:ring-0"
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
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleImageSearch}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center text-gray-500 transition-all duration-300 rounded-full hover:shadow-sm",
                    isImageSearchActive ? "bg-primary/10 text-primary animate-pulse scale-110" : "hover:text-primary hover:bg-gray-100"
                  )}
                  aria-label="Image search"
                >
                  <Camera size={18} className={cn(
                    "transition-transform duration-300",
                    isImageSearchActive && "animate-bounce"
                  )} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Search by image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center transition-all duration-300 rounded-full hover:shadow-sm", 
                    isListening 
                      ? "bg-primary/20 text-primary scale-110" 
                      : "text-gray-500 hover:text-primary hover:bg-gray-100"
                  )}
                  aria-label="Voice search"
                  disabled={isListening}
                >
                  <Mic size={18} className={cn(
                    "transition-transform duration-300",
                    isListening && "animate-pulse"
                  )} />
                  {isListening && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-primary/30"></span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Search by voice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="submit"
                  className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-100 transition-all duration-300 rounded-full hover:shadow-sm"
                  aria-label="Submit search"
                >
                  <Search size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>

      {/* Search suggestions dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="mb-2">
              <div className="px-4 py-1 text-xs text-gray-500">Recent searches</div>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => handleSelectRecentSearch(search)}
                >
                  <Search size={14} className="text-gray-400 mr-2" />
                  <span className="text-sm">{search}</span>
                </div>
              ))}
              <div className="border-b border-gray-100 my-1"></div>
            </div>
          )}
          
          {/* AI suggestion */}
          {query.length > 0 && showAiSuggestion && (
            <div 
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer group"
              onClick={handleAiAssist}
            >
              <Sparkles size={16} className="text-primary mr-2 group-hover:animate-pulse" />
              <span className="text-sm text-gray-800">Try Dew AI for more accurate results</span>
            </div>
          )}
          
          <div className="px-4 py-1 text-xs text-gray-500 border-t border-gray-100 mt-1">
            Press Enter to search or try voice search
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
