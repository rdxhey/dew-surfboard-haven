
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DewssGame from '@/components/DewssGame';
import { useIsMobile } from '@/hooks/use-mobile';

const Dewdols = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedDewdol, setSelectedDewdol] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [activeTab, setActiveTab] = useState<'collection' | 'game'>('collection');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const dewdols = [
    { id: 1, name: "Earth Day", description: "Celebrating our planet with an eco-friendly DEW design", date: "April 22", color: "from-green-400 to-green-600" },
    { id: 2, name: "Summer Solstice", description: "The longest day deserves the brightest DEW", date: "June 21", color: "from-yellow-400 to-orange-500" },
    { id: 3, name: "New Year", description: "Ring in the new year with a sparkling DEW logo", date: "January 1", color: "from-blue-500 to-purple-600" },
    { id: 4, name: "Lunar Landing", description: "One small step for DEW, one giant leap for search engines", date: "July 20", color: "from-gray-500 to-gray-700" },
    { id: 5, name: "Valentine's Day", description: "Share your love for DEW on this special day", date: "February 14", color: "from-pink-400 to-red-500" },
    { id: 6, name: "Halloween", description: "A spooky twist on the DEW logo that's hauntingly beautiful", date: "October 31", color: "from-orange-500 to-purple-700" }
  ];

  const handleDewdolClick = (id: number) => {
    setSelectedDewdol(id === selectedDewdol ? null : id);
  };

  const toggleGame = () => {
    setShowGame(prev => !prev);
    setActiveTab('game');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 p-3 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost" 
          size="sm"
          className="flex items-center text-primary hover:bg-primary/10"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span className={isMobile ? "sr-only" : ""}>Back to DEW</span>
        </Button>
        <h1 className="text-xl md:text-3xl font-bold text-primary truncate">
          Dewdols
          <span className="ml-2 text-xs md:text-lg font-normal text-gray-500 hidden md:inline">Special Edition Logos</span>
        </h1>
        <div className="w-10 md:w-24"></div> {/* Spacer for centering */}
      </header>
      
      <main className="flex-1 p-3 md:p-6">
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-center md:text-left text-gray-600 text-sm md:text-base">
                Dewdols are special versions of the DEW logo created to celebrate holidays, 
                anniversaries, and remarkable individuals. Explore our collection below!
              </p>
              
              <Button 
                onClick={toggleGame}
                variant="outline" 
                className="w-full md:w-auto group relative overflow-hidden bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 hover:shadow-lg transition-all"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-green-400 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative z-10 flex items-center">
                  <Star size={16} className="mr-2 animate-pulse" />
                  {showGame && activeTab === 'game' ? 'Back to Collection' : 'Play DEWSS Game'}
                </span>
              </Button>
            </div>
          </div>
          
          {/* Tabs for Mobile */}
          {isMobile && (
            <div className="mb-4">
              <Tabs 
                defaultValue="collection"
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as 'collection' | 'game')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="collection">Collection</TabsTrigger>
                  <TabsTrigger value="game">DEWSS Game</TabsTrigger>
                </TabsList>
                <TabsContent value="collection">
                  <DewdolsGrid 
                    dewdols={dewdols} 
                    loaded={loaded} 
                    selectedDewdol={selectedDewdol} 
                    handleDewdolClick={handleDewdolClick} 
                  />
                </TabsContent>
                <TabsContent value="game">
                  <div className="animate-fade-in">
                    <DewssGame />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Desktop Layout */}
          {!isMobile && (
            <>
              {showGame && (
                <div id="dewss-game-section" className="mb-8 animate-fade-in">
                  <DewssGame />
                </div>
              )}
              
              <DewdolsGrid 
                dewdols={dewdols} 
                loaded={loaded} 
                selectedDewdol={selectedDewdol} 
                handleDewdolClick={handleDewdolClick} 
              />
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-4 md:py-6 text-center text-gray-500 text-xs md:text-sm">
        <p>Want to suggest a Dewdol? <a href="#" className="text-primary hover:underline">Contact us</a></p>
        <p className="mt-2">© 2023 DEW • All Dewdols are created with <Star size={14} className="inline text-primary mx-1" /> by our team</p>
      </footer>
    </div>
  );
};

// Extracted DewdolsGrid component for better code organization
const DewdolsGrid = ({ 
  dewdols, 
  loaded, 
  selectedDewdol, 
  handleDewdolClick 
}: { 
  dewdols: any[], 
  loaded: boolean, 
  selectedDewdol: number | null, 
  handleDewdolClick: (id: number) => void 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 md:gap-6 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
      {dewdols.map((dewdol, index) => (
        <DewdolCard 
          key={dewdol.id}
          dewdol={dewdol}
          index={index}
          isSelected={selectedDewdol === dewdol.id}
          onClick={() => handleDewdolClick(dewdol.id)}
        />
      ))}
    </div>
  );
};

// Extracted DewdolCard component
const DewdolCard = ({ 
  dewdol, 
  index, 
  isSelected, 
  onClick 
}: { 
  dewdol: any, 
  index: number, 
  isSelected: boolean, 
  onClick: () => void 
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1",
        isSelected && "ring-2 ring-primary",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div className={`h-36 md:h-48 bg-gradient-to-br ${dewdol.color} flex items-center justify-center p-4`}>
        <div className="text-3xl md:text-4xl font-bold text-white">DEW</div>
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">{dewdol.name}</h3>
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{dewdol.date}</span>
          </div>
        </div>
        <p className="text-gray-600 text-xs md:text-sm line-clamp-2">{dewdol.description}</p>
      </div>
    </div>
  );
};

export default Dewdols;
