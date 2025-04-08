
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Video, Play, Film, Star, TrendingUp, Clock, Bookmark, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Eclipse = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  return (
    <div className="min-h-screen flex flex-col py-4 px-6 bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Logo size="sm" onClick={() => navigate('/')} className="cursor-pointer" />
          <h1 className="text-2xl font-bold text-primary flex items-center">
            Eclipse <Video className="ml-2 text-blue-500" size={18} />
          </h1>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center max-w-6xl mx-auto w-full">
        <div className="w-full mb-8">
          <Card className="w-full p-4 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <Badge className="mb-2 bg-blue-500 hover:bg-blue-600">Featured</Badge>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Universal Horizons</h2>
                  <p className="text-sm text-gray-300 mb-3">A journey through distant galaxies and cosmic phenomena</p>
                  <div className="flex gap-3">
                    <Button size="sm" className="gap-1">
                      <Play size={16} /> Watch Now
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Plus size={16} /> Add to List
                    </Button>
                  </div>
                </div>
              </div>
              <Video size={64} className="text-white/20" />
            </div>
            
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 mb-4">
                <CategoryButton 
                  label="All" 
                  active={selectedCategory === 'all'} 
                  onClick={() => setSelectedCategory('all')} 
                />
                <CategoryButton 
                  label="Movies" 
                  active={selectedCategory === 'movies'} 
                  onClick={() => setSelectedCategory('movies')} 
                />
                <CategoryButton 
                  label="Series" 
                  active={selectedCategory === 'series'} 
                  onClick={() => setSelectedCategory('series')} 
                />
                <CategoryButton 
                  label="Documentaries" 
                  active={selectedCategory === 'documentaries'} 
                  onClick={() => setSelectedCategory('documentaries')} 
                />
                <CategoryButton 
                  label="Kids" 
                  active={selectedCategory === 'kids'} 
                  onClick={() => setSelectedCategory('kids')} 
                />
              </div>
            </div>
          </Card>
        </div>
        
        <div className="w-full mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-blue-500" /> Trending Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VideoCard title="Cosmic Connections" category="Documentary" rating={4.8} />
            <VideoCard title="The Last Frontier" category="Sci-Fi" rating={4.5} />
            <VideoCard title="Ocean Mysteries" category="Educational" rating={4.7} />
            <VideoCard title="Digital Dreams" category="Tech" rating={4.6} />
          </div>
        </div>
        
        <div className="w-full mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Clock size={20} className="mr-2 text-blue-500" /> Continue Watching
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VideoCardProgress 
              title="Planet Earth III" 
              category="Nature" 
              progress={65} 
              thumbnail="https://via.placeholder.com/300x169/1a365d/ffffff?text=Planet+Earth+III"
            />
            <VideoCardProgress 
              title="Tech Frontiers" 
              category="Technology" 
              progress={23} 
              thumbnail="https://via.placeholder.com/300x169/1a4d8c/ffffff?text=Tech+Frontiers"
            />
          </div>
        </div>
        
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Bookmark size={20} className="mr-2 text-blue-500" /> Recommended For You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VideoCard title="The Mystery of Time" category="Science" rating={4.9} />
            <VideoCard title="Architectural Wonders" category="Documentary" rating={4.4} />
            <VideoCard title="Wildlife Chronicles" category="Nature" rating={4.7} />
            <VideoCard title="Future of AI" category="Technology" rating={4.8} />
          </div>
        </div>
        
        <div className="w-full mt-8 text-center">
          <Button className="px-8">Browse All Content</Button>
        </div>
      </div>
      
      <Footer className="mt-10" />
    </div>
  );
};

const CategoryButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
        active 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

const VideoCard = ({ title, category, rating }: { title: string; category: string; rating: number }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="aspect-video bg-gray-200 relative group-hover:brightness-75 transition-all">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="gap-1">
            <Play size={16} /> Play
          </Button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 truncate">{title}</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{category}</span>
          <span className="flex items-center text-yellow-500">
            <Star size={14} className="mr-1 fill-current" />
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

const VideoCardProgress = ({ 
  title, 
  category, 
  progress, 
  thumbnail 
}: { 
  title: string; 
  category: string; 
  progress: number;
  thumbnail: string;
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="aspect-video bg-gray-200 relative group-hover:brightness-75 transition-all" 
           style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="gap-1">
            <Play size={16} /> Resume
          </Button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 truncate">{title}</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{category}</span>
        </div>
        <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">{progress}% complete</div>
      </div>
    </div>
  );
};

export default Eclipse;
