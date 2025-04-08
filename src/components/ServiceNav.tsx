
import React from 'react';
import { UserCircle, Video, Image, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ServiceNavProps {
  className?: string;
}

const ServiceNav = ({ className }: ServiceNavProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `The ${feature} feature is coming soon. Stay tuned!`,
      variant: "default",
    });
  };
  
  return (
    <div className={cn('flex justify-center items-center gap-4 md:gap-6', className)}>
      <ServiceButton 
        icon={<Image size={20} />}
        label="Images"
        onClick={() => navigate('/search?type=images')}
      />
      <ServiceButton 
        icon={<UserCircle size={20} />}
        label="Diary Account"
        onClick={() => navigate('/diary')}
      />
      <ServiceButton 
        icon={<Sparkles size={20} />}
        label="Dew AI"
        onClick={() => navigate('/dew-ai')}
        isNew={true}
      />
      <ServiceButton 
        icon={<Video size={20} />}
        label="Eclipse"
        onClick={() => navigate('/eclipse')}
      />
    </div>
  );
};

interface ServiceButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isNew?: boolean;
}

const ServiceButton = ({ icon, label, href, onClick, isNew = false }: ServiceButtonProps) => {
  // If onClick is provided, use a button, otherwise use a Link
  const ButtonContent = (
    <>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-effect flex items-center justify-center button-transition group-hover:border-primary/20 group-hover:bg-white/90">
        <span className="text-gray-600 group-hover:text-primary transition-colors duration-300">
          {icon}
        </span>
      </div>
      <span className="mt-1 md:mt-2 text-xs md:text-sm text-gray-600 group-hover:text-primary transition-colors duration-300">
        {label}
      </span>
      
      {isNew && (
        <Badge 
          variant="default" 
          className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-[10px] py-0 px-1 h-4"
        >
          NEW
        </Badge>
      )}
    </>
  );

  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className="group flex flex-col items-center hover-lift relative cursor-pointer"
      >
        {ButtonContent}
      </button>
    );
  }

  return (
    <Link 
      to={href || "#"}
      className="group flex flex-col items-center hover-lift relative"
    >
      {ButtonContent}
    </Link>
  );
};

export default ServiceNav;
