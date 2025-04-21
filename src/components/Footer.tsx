
import React from 'react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Github, Twitter } from 'lucide-react';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Footer = ({ className, style }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  return (
    <footer className={cn('text-sm text-gray-500 py-6 animate-fade-in', className)} style={style}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mb-4 sm:mb-0">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/privacy">Privacy</FooterLink>
          <FooterLink onClick={() => navigate('/privacy')}>Terms</FooterLink>
          <FooterLink to="/help-center">Help Center</FooterLink>
          <FooterLink 
            to="/feedback"
            className="flex items-center"
          >
            <Heart size={12} className="mr-1 text-red-400" /> Feedback
          </FooterLink>
        </div>
        
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex gap-4 mb-2">
            <FooterLink 
              onClick={() => navigate('/about')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Github size={16} />
            </FooterLink>
            <FooterLink 
              onClick={() => navigate('/about')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Twitter size={16} />
            </FooterLink>
          </div>
          <p className="text-xs text-gray-400">
            © {currentYear} Dew Inc. All rights reserved.
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
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const FooterLink = ({ href, to, onClick, children, className }: FooterLinkProps) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn("hover:text-primary hover:underline transition-colors duration-200 cursor-pointer", className)}
      >
        {children}
      </button>
    );
  }
  
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
      href={href || "#"} 
      className={cn("hover:text-primary hover:underline transition-colors duration-200", className)}
    >
      {children}
    </a>
  );
};

export default Footer;
