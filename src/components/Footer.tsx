
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter } from 'lucide-react';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Footer = ({ className, style }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn('text-sm text-gray-500 py-6 animate-fade-in', className)} style={style}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mb-4 sm:mb-0">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink href="#privacy">Privacy</FooterLink>
          <FooterLink href="#terms">Terms</FooterLink>
          <FooterLink href="#help">Help Center</FooterLink>
          <FooterLink href="#feedback" className="flex items-center">
            <Heart size={12} className="mr-1 text-red-400" /> Feedback
          </FooterLink>
        </div>
        
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex gap-4 mb-2">
            <Link to="#github" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github size={16} />
            </Link>
            <Link to="#twitter" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter size={16} />
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            © {currentYear} Dairy Inc. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Making search cool again
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink = ({ href, to, children, className }: FooterLinkProps) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className={cn("hover:text-primary hover:underline transition-colors duration-200", className)}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a 
      href={href} 
      className={cn("hover:text-primary hover:underline transition-colors duration-200", className)}
    >
      {children}
    </a>
  );
};

export default Footer;
