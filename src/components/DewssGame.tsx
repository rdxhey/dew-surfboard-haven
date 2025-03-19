
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WaterDropIcon, CloudIcon, LeafIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DewssGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [waterLevel, setWaterLevel] = useState(100);
  const [gameTime, setGameTime] = useState(30);
  const [drops, setDrops] = useState<{ id: number; x: number; y: number; caught: boolean }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastDropTime = useRef(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const timeCounterRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setWaterLevel(100);
    setGameTime(30);
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
      if (Math.random() > 0.7) {
        createDrop();
      }
      
      // Water level decreases over time
      setWaterLevel(level => Math.max(0, level - 0.5));
      
      // End game if water level reaches 0
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
    
    setDrops(prevDrops => [
      ...prevDrops,
      {
        id: Date.now(),
        x,
        y: 0,
        caught: false
      }
    ]);
  };

  const catchDrop = (id: number) => {
    setDrops(prevDrops => 
      prevDrops.map(drop => 
        drop.id === id ? { ...drop, caught: true } : drop
      )
    );
    setScore(score => score + 1);
    setWaterLevel(level => Math.min(100, level + 5));
  };

  const updateDrops = () => {
    setDrops(prevDrops => 
      prevDrops
        .map(drop => ({
          ...drop,
          y: drop.y + 3,
          caught: drop.caught
        }))
        .filter(drop => {
          // Remove drops that fall off screen or are caught
          if (drop.caught) return false;
          
          if (drop.y > (gameAreaRef.current?.clientHeight || 400)) {
            // Water wasted
            setWaterLevel(level => Math.max(0, level - 2));
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
          <WaterDropIcon className="h-6 w-6 animate-bounce" />
          DEWSS: Every Drop Counts
          <WaterDropIcon className="h-6 w-6 animate-bounce" />
        </CardTitle>
        <CardDescription className="text-blue-100 text-center">
          Catch falling water drops to conserve water! Let too many drops fall and your water level will deplete.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <LeafIcon className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-lg">Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudIcon className="h-5 w-5 text-blue-500" />
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
          className="relative h-64 bg-gradient-to-b from-blue-50 to-blue-100 rounded-md border border-blue-200 overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {score > 0 ? `Game Over! You saved ${score} drops!` : 'Ready to save water?'}
              </h3>
              <Button 
                onClick={startGame}
                className="animate-pulse bg-blue-600 hover:bg-blue-700"
              >
                {score > 0 ? 'Play Again' : 'Start Game'}
              </Button>
            </div>
          )}
          
          {drops.map(drop => (
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
              <WaterDropIcon 
                className="h-8 w-8 text-blue-500 animate-bounce"
              />
            </button>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex flex-col text-center text-sm text-gray-600">
        <p>Every drop of water you catch helps conserve our planet's most precious resource!</p>
        <p className="mt-1">A DEW environmental initiative</p>
      </CardFooter>
    </Card>
  );
};

export default DewssGame;
