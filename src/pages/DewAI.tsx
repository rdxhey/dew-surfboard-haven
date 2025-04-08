
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Sparkles, SendHorizonal, Settings, User, Laugh, BrainCircuit, Search, Palette, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DewAI = () => {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user message
    setMessages([...messages, {role: 'user', content: query}]);
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai', 
        content: `I'm Dew AI, your intelligent assistant. You asked: "${query}". This is a demo response to simulate AI interaction.`
      }]);
      setIsThinking(false);
      setQuery('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col py-4 px-6 bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="w-full p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <BrainCircuit size={48} className="text-blue-200 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Welcome to Dew AI</h3>
                    <p className="text-gray-500 max-w-md">Ask me anything and I'll provide intelligent, helpful responses powered by advanced AI.</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-blue-500 text-white ml-4 rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 mr-4 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 mr-4 rounded-tl-none">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="gap-2" disabled={isThinking}>
                  <SendHorizonal size={16} />
                  Send
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="w-full p-4 border shadow bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <Settings size={16} className="mr-2 text-blue-500" />
                AI Skills
              </h3>
              <div className="space-y-2">
                <SkillBadge icon={<Search size={14} />} label="Search Assistance" />
                <SkillBadge icon={<MessageCircle size={14} />} label="Conversation" />
                <SkillBadge icon={<Palette size={14} />} label="Creative Writing" />
                <SkillBadge icon={<Laugh size={14} />} label="Humor & Fun" />
              </div>
            </Card>
            
            <Card className="w-full p-4 border shadow bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <User size={16} className="mr-2 text-blue-500" />
                Example Questions
              </h3>
              <div className="space-y-2 text-sm">
                <QuestionSuggestion 
                  question="What's the weather like today?" 
                  onClick={() => {
                    setQuery("What's the weather like today?");
                  }}
                />
                <QuestionSuggestion 
                  question="Tell me a fun fact about space." 
                  onClick={() => {
                    setQuery("Tell me a fun fact about space.");
                  }}
                />
                <QuestionSuggestion 
                  question="Help me plan a dinner menu." 
                  onClick={() => {
                    setQuery("Help me plan a dinner menu.");
                  }}
                />
                <QuestionSuggestion 
                  question="What are your capabilities?" 
                  onClick={() => {
                    setQuery("What are your capabilities?");
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
        
        <Card className="w-full p-6 border-0 shadow-sm bg-white/60 backdrop-blur-sm">
          <h3 className="font-medium text-gray-800 mb-3">Why Choose Dew AI?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

const SkillBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  return (
    <div className="flex items-center py-1">
      <span className="bg-blue-100 p-1 rounded-full mr-2">{icon}</span>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
};

const QuestionSuggestion = ({ question, onClick }: { question: string; onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="block w-full text-left p-2 hover:bg-blue-50 rounded-md transition-colors text-gray-700"
    >
      "{question}"
    </button>
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
