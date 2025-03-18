
import React from 'react';
import { cn } from '@/lib/utils';

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
    <div className={cn('font-bold tracking-tighter animate-fade-in', sizeClasses[size], className)}>
      <span className="text-primary">D</span>
      <span className="text-primary opacity-90">e</span>
      <span className="text-primary opacity-80">w</span>
    </div>
  );
};

export default Logo;
