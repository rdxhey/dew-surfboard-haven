
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DewssGame from '@/components/DewssGame';

const Dewdols = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedDewdol, setSelectedDewdol] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

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
    // In a real app, this would show the specific dewdol in detail
  };

  const toggleGame = () => {
    setShowGame(prev => !prev);
    // Scroll to game section when opening
    if (!showGame) {
      setTimeout(() => {
        document.getElementById('dewss-game-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost" 
          size="sm"
          className="flex items-center text-primary hover:bg-primary/10"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to DEW
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Dewdols
          <span className="ml-2 text-sm md:text-lg font-normal text-gray-500">Special Edition Logos</span>
        </h1>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-center md:text-left text-gray-600">
                Dewdols are special versions of the DEW logo created to celebrate holidays, 
                anniversaries, and remarkable individuals. Explore our collection below!
              </p>
              
              <Button 
                onClick={toggleGame}
                variant="outline" 
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 hover:shadow-lg transition-all"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-green-400 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative z-10 flex items-center">
                  <Star size={16} className="mr-2 animate-pulse" />
                  {showGame ? 'Hide DEWSS Game' : 'Play DEWSS Game'}
                </span>
              </Button>
            </div>
          </div>
          
          {showGame && (
            <div id="dewss-game-section" className="mb-12 animate-fade-in">
              <DewssGame />
            </div>
          )}
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
            {dewdols.map((dewdol, index) => (
              <div 
                key={dewdol.id}
                className={cn(
                  "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1",
                  selectedDewdol === dewdol.id && "ring-2 ring-primary",
                  loaded && "animate-fade-up"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleDewdolClick(dewdol.id)}
              >
                <div className={`h-48 bg-gradient-to-br ${dewdol.color} flex items-center justify-center p-4`}>
                  <div className="text-4xl font-bold text-white">DEW</div>
                  {/* This would be replaced with actual custom logo designs */}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{dewdol.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {dewdol.date}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{dewdol.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-gray-500 text-sm">
        <p>Want to suggest a Dewdol? <a href="#" className="text-primary hover:underline">Contact us</a></p>
        <p className="mt-2">© 2023 DEW • All Dewdols are created with <Star size={14} className="inline text-primary mx-1" /> by our team</p>
      </footer>
    </div>
  );
};

export default Dewdols;
