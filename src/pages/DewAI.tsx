
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const DewAI = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col py-4 px-6 bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Logo size="sm" onClick={() => navigate('/')} className="cursor-pointer" />
          <h1 className="text-2xl font-bold text-primary flex items-center">
            Dew AI <Sparkles className="ml-2 text-yellow-500" size={18} />
            <Badge className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-500">NEW</Badge>
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
            <h2 className="text-3xl font-bold mb-4">Welcome to Dew AI</h2>
            <p className="text-gray-600">Your intelligent assistant powered by advanced artificial intelligence</p>
          </div>
          
          <div className="flex mb-8">
            <Input
              className="flex-1 mr-2"
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button className="gap-2">
              <Sparkles size={16} /> Ask Dew AI
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Smart Answers"
              description="Get intelligent responses to all your questions using our advanced AI technology."
            />
            <FeatureCard
              title="Learn Anything"
              description="From math problems to historical facts, Dew AI helps you learn and discover."
            />
            <FeatureCard
              title="Create Content"
              description="Generate ideas, write essays, or create poetry with AI assistance."
            />
            <FeatureCard
              title="Personal Assistant"
              description="Let Dew AI help organize your life, set reminders, and provide recommendations."
            />
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

export default DewAI;
