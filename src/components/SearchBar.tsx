
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ className, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={cn('search-container', className)}>
      <form 
        onSubmit={handleSearch} 
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
          className="search-input pr-12"
          aria-label="Search"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
          aria-label="Submit search"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
