
import React from 'react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Github, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Footer = ({ className, style }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `The ${feature} section is coming soon. Stay tuned!`,
      variant: "default",
    });
  };
  
  return (
    <footer className={cn('text-sm text-gray-500 py-6 animate-fade-in', className)} style={style}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mb-4 sm:mb-0">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink onClick={() => handleComingSoon('Privacy Policy')}>Privacy</FooterLink>
          <FooterLink onClick={() => handleComingSoon('Terms of Service')}>Terms</FooterLink>
          <FooterLink onClick={() => handleComingSoon('Help Center')}>Help Center</FooterLink>
          <FooterLink 
            onClick={() => {
              toast({
                title: "Thanks for your feedback!",
                description: "We appreciate your interest. Feedback features will be available soon.",
                variant: "default",
              });
            }}
            className="flex items-center"
          >
            <Heart size={12} className="mr-1 text-red-400" /> Feedback
          </FooterLink>
        </div>
        
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex gap-4 mb-2">
            <FooterLink 
              onClick={() => handleComingSoon('GitHub Repository')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Github size={16} />
            </FooterLink>
            <FooterLink 
              onClick={() => handleComingSoon('Twitter Page')}
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
