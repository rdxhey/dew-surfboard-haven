
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

const Logo = ({ size = 'lg', className, animated = true, onClick }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-6xl md:text-7xl'
  };

  const content = (
    <>
      <div className={cn(
        'font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative z-10',
        sizeClasses[size],
        animated && 'hover:scale-105 transition-transform duration-300',
        className
      )}>
        DEW
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-indigo-500/20 to-purple-600/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full"></div>
    </>
  );

  if (onClick) {
    return (
      <div className="cursor-pointer relative group" onClick={onClick}>
        {content}
      </div>
    );
  }

  return (
    <Link to="/" className="cursor-pointer relative group">
      {content}
    </Link>
  );
};

export default Logo;
