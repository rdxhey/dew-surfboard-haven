
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'lg', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <Link to="/" className="cursor-pointer">
      <div className={cn('font-bold tracking-tighter overflow-hidden bg-primary rounded-md', sizeClasses[size], className)}>
        <div className="flex items-center text-white p-1">
          <span className="font-bold">D</span>
          <span className="font-light">e</span>
          <span className="font-light">w</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
