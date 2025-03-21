
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Footer = ({ className, style }: FooterProps) => {
  return (
    <footer className={cn('text-sm text-gray-500 py-6 animate-fade-in', className)} style={style}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex gap-6 mb-4 sm:mb-0">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink href="#privacy">Privacy</FooterLink>
          <FooterLink href="#terms">Terms</FooterLink>
        </div>
        <div>
          <p>© {new Date().getFullYear()} Dairy Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, to, children }: FooterLinkProps) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="hover:text-primary transition-colors duration-200"
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a 
      href={href} 
      className="hover:text-primary transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Footer;
