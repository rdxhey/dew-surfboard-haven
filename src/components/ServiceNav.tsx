
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircleUser, Search, Image, FileText, SunMoon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

interface ServiceNavProps {
  className?: string;
}

const SERVICES = [
  {
    icon: <Image size={28} />,
    label: "Images",
    to: "/search?type=images",
  },
  {
    icon: <CircleUser size={28} />,
    label: "Diary Account",
    to: "/diary",
  },
  {
    icon: <Search size={28} />,
    label: "Dew Search",
    to: "/search?type=web",
  },
  {
    icon: <FileText size={28} />,
    label: "Dew AI",
    to: "/dew-ai",
    isNew: true,
  },
  {
    icon: <SunMoon size={28} />,
    label: "Eclipse",
    to: "/eclipse",
  },
];

const ServiceNav = ({ className }: ServiceNavProps) => {
  return (
    <div className={cn("flex justify-center items-center gap-3", className)}>
      <AppsMenu />
    </div>
  );
};

const AppsMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleServiceClick = (svc: typeof SERVICES[number]) => {
    // For placeholder future features, display toast
    if (svc.to) {
      navigate(svc.to);
    } else {
      toast({
        title: "Coming Soon",
        description: `The ${svc.label} feature is coming soon. Stay tuned!`,
        variant: "default",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Open apps menu"
          type="button"
          className="rounded-full w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-gray-100 shadow group border border-gray-200 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <Box size={22} className="text-gray-600 group-hover:text-primary transition-colors" />
            <span className="absolute text-[8px] font-bold text-gray-700">ABC</span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="p-4 bg-white rounded-2xl shadow-xl border border-gray-200 w-80 z-[1000]">
        <div className="grid grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => (
            <button
              key={svc.label}
              onClick={() => handleServiceClick(svc)}
              className="flex flex-col items-center hover:bg-gray-100/90 active:bg-gray-200 transition rounded-xl p-2 relative group focus:outline-none cursor-pointer"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 shadow-sm mb-1 group-hover:bg-white">
                {svc.icon}
                {svc.isNew && (
                  <Badge variant="default" className="absolute top-0 right-0 text-[10px] px-1 py-0 h-4 bg-gradient-to-r from-blue-500 to-indigo-500">NEW</Badge>
                )}
              </span>
              <span className="text-xs text-gray-700">{svc.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ServiceNav;
