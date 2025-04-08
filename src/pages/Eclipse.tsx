
import React from 'react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Eclipse = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col py-4 px-6 bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Logo size="sm" onClick={() => navigate('/')} className="cursor-pointer" />
          <h1 className="text-2xl font-bold text-primary flex items-center">
            Eclipse <Video className="ml-2 text-blue-500" size={18} />
          </h1>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto">
        <Card className="w-full p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to Eclipse</h2>
            <p className="text-gray-600">Your premium video streaming platform</p>
          </div>
          
          <div className="aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <Video size={64} className="text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Stream Anywhere"
              description="Watch your favorite content on any device, anytime, anywhere."
            />
            <FeatureCard
              title="High Definition"
              description="Enjoy crystal clear HD and 4K streaming with adaptive quality."
            />
            <FeatureCard
              title="Exclusive Content"
              description="Access exclusive Eclipse originals not available anywhere else."
            />
          </div>
          
          <div className="mt-8 text-center">
            <Button className="px-8">Start Watching</Button>
          </div>
        </Card>
      </div>
      
      <Footer className="mt-10" />
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default Eclipse;
