
import React from 'react';
import { UserCircle, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceNavProps {
  className?: string;
}

const ServiceNav = ({ className }: ServiceNavProps) => {
  return (
    <div className={cn('flex justify-center items-center gap-6', className)}>
      <ServiceButton 
        icon={<UserCircle size={20} />}
        label="Diary Account"
        href="#account"
      />
      <ServiceButton 
        icon={<Video size={20} />}
        label="Eclipse"
        href="#eclipse"
      />
    </div>
  );
};

interface ServiceButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const ServiceButton = ({ icon, label, href }: ServiceButtonProps) => {
  return (
    <a 
      href={href}
      className="group flex flex-col items-center hover-lift"
    >
      <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center button-transition group-hover:border-primary/20">
        <span className="text-gray-600 group-hover:text-primary transition-colors duration-300">
          {icon}
        </span>
      </div>
      <span className="mt-2 text-sm text-gray-600 group-hover:text-primary transition-colors duration-300">
        {label}
      </span>
    </a>
  );
};

export default ServiceNav;
