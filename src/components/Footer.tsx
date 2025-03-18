
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('text-sm text-gray-500 py-6 animate-fade-in', className)}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex gap-6 mb-4 sm:mb-0">
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#privacy">Privacy</FooterLink>
          <FooterLink href="#terms">Terms</FooterLink>
        </div>
        <div>
          <p>© {new Date().getFullYear()} Diary Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <a 
    href={href} 
    className="hover:text-primary transition-colors duration-200"
  >
    {children}
  </a>
);

export default Footer;
