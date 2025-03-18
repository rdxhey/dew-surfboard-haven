
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
      <div className={cn('font-bold tracking-tighter', sizeClasses[size], className)}>
        <span className="text-primary">D</span>
        <span className="text-gray-800">ew</span>
      </div>
    </Link>
  );
};

export default Logo;
