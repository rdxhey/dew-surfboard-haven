
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplet, Cloud, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DewssGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [waterLevel, setWaterLevel] = useState(100);
  const [gameTime, setGameTime] = useState(60); // Extended game time
  const [difficulty, setDifficulty] = useState('medium'); // Added difficulty level
  const [drops, setDrops] = useState<{ id: number; x: number; y: number; caught: boolean; size: number }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastDropTime = useRef(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const timeCounterRef = useRef<NodeJS.Timeout | null>(null);
  
  const difficultySettings = {
    easy: { dropSpeed: 2, dropRate: 0.4, waterDecrease: 0.3, missedPenalty: 1 },
    medium: { dropSpeed: 3, dropRate: 0.6, waterDecrease: 0.5, missedPenalty: 2 },
    hard: { dropSpeed: 4, dropRate: 0.7, waterDecrease: 0.6, missedPenalty: 3 }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setWaterLevel(100);
    setGameTime(60); // Extended game time
    setDrops([]);
    lastDropTime.current = Date.now();
    
    if (timeCounterRef.current) clearInterval(timeCounterRef.current);
    timeCounterRef.current = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(() => {
      const settings = difficultySettings[difficulty as keyof typeof difficultySettings];
      if (Math.random() > (1 - settings.dropRate)) {
        createDrop();
      }
      
      setWaterLevel(level => Math.max(0, level - settings.waterDecrease));
      
      if (waterLevel <= 0) {
        endGame();
      }
    }, 300);
    
    startAnimation();
  };

  const endGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (timeCounterRef.current) clearInterval(timeCounterRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  const createDrop = () => {
    if (!gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const x = Math.random() * (gameArea.width - 30);
    const size = Math.random() > 0.8 ? 'large' : 'normal';
    
    setDrops(prevDrops => [
      ...prevDrops,
      {
        id: Date.now(),
        x,
        y: 0,
        caught: false,
        size: size === 'large' ? 10 : 8
      }
    ]);
  };

  const catchDrop = (id: number) => {
    // Find the drop to check its size for bonus points
    const caughtDrop = drops.find(drop => drop.id === id);
    const bonus = caughtDrop?.size === 10 ? 2 : 1; // Bonus points for larger drops
    
    setDrops(prevDrops => 
      prevDrops.map(drop => 
        drop.id === id ? { ...drop, caught: true } : drop
      )
    );
    setScore(score => score + bonus);
    setWaterLevel(level => Math.min(100, level + (bonus * 5)));
  };

  const updateDrops = () => {
    const settings = difficultySettings[difficulty as keyof typeof difficultySettings];
    setDrops(prevDrops => 
      prevDrops
        .map(drop => ({
          ...drop,
          y: drop.y + settings.dropSpeed,
          caught: drop.caught
        }))
        .filter(drop => {
          if (drop.caught) return false;
          
          if (drop.y > (gameAreaRef.current?.clientHeight || 400)) {
            setWaterLevel(level => Math.max(0, level - settings.missedPenalty));
            return false;
          }
          
          return true;
        })
    );
  };

  const startAnimation = () => {
    const animate = () => {
      updateDrops();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
  };

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (timeCounterRef.current) clearInterval(timeCounterRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <Card className="max-w-3xl mx-auto shadow-lg animate-fade-up">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Droplet className="h-6 w-6 animate-bounce" />
          DEWSS: Every Drop Counts
          <Droplet className="h-6 w-6 animate-bounce" />
        </CardTitle>
        <CardDescription className="text-blue-100 text-center">
          Catch falling water drops to conserve water! Let too many drops fall and your water level will deplete.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-lg">Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-lg">Time: {gameTime}s</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Water Level</span>
            <span>{waterLevel}%</span>
          </div>
          <Progress value={waterLevel} className="h-2" />
        </div>
        
        <div 
          ref={gameAreaRef}
          className="relative h-64 bg-gradient-to-b from-blue-50 to-blue-100 rounded-md border border-blue-200 overflow-hidden mb-4"
          style={{ touchAction: 'none' }}
        >
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                {score > 0 ? `Game Over! You saved ${score} drops!` : 'Ready to save water?'}
              </h3>
              
              {!isPlaying && (
                <div className="flex gap-2 mb-4">
                  <Button 
                    onClick={() => changeDifficulty('easy')}
                    className={`${difficulty === 'easy' ? 'bg-green-600' : 'bg-gray-200 text-gray-700'}`}
                    size="sm"
                  >
                    Easy
                  </Button>
                  <Button 
                    onClick={() => changeDifficulty('medium')}
                    className={`${difficulty === 'medium' ? 'bg-blue-600' : 'bg-gray-200 text-gray-700'}`}
                    size="sm"
                  >
                    Medium
                  </Button>
                  <Button 
                    onClick={() => changeDifficulty('hard')}
                    className={`${difficulty === 'hard' ? 'bg-red-600' : 'bg-gray-200 text-gray-700'}`}
                    size="sm"
                  >
                    Hard
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={startGame}
                className="animate-pulse bg-blue-600 hover:bg-blue-700"
              >
                {score > 0 ? 'Play Again' : 'Start Game'}
              </Button>
            </div>
          )}
          
          {isPlaying && drops.map(drop => (
            <button
              key={drop.id}
              className="absolute p-0 bg-transparent border-none cursor-pointer"
              style={{ 
                left: `${drop.x}px`, 
                top: `${drop.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => catchDrop(drop.id)}
            >
              <Droplet 
                className={`text-blue-500 animate-bounce ${drop.size === 10 ? 'h-10 w-10' : 'h-8 w-8'}`}
              />
            </button>
          ))}
        </div>
        
        {isPlaying && (
          <div className="text-center mb-4">
            <span className="text-sm text-gray-600">
              Tip: Larger drops are worth more points! Try to catch them for a water level boost.
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex flex-col text-center text-sm text-gray-600">
        <p>Every drop of water you catch helps conserve our planet's most precious resource!</p>
        <p className="mt-1">A DEW environmental initiative</p>
      </CardFooter>
    </Card>
  );
};

export default DewssGame;
