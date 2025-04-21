
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState<string>('general');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter your feedback message",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log({
      feedbackType,
      email,
      message
    });
    
    // Show success message
    toast({
      title: "Feedback received",
      description: "Thank you for your feedback! We appreciate your input.",
      variant: "default",
    });
    
    // Reset form
    setFeedbackType('general');
    setEmail('');
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">We'd love to hear from you</h2>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve Dew Search and provide a better experience for everyone.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="font-medium text-gray-700">What type of feedback do you have?</div>
              
              <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare size={16} className="text-blue-500" />
                    General Feedback
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestion" id="suggestion" />
                  <Label htmlFor="suggestion" className="flex items-center gap-2 cursor-pointer">
                    <ThumbsUp size={16} className="text-green-500" />
                    Feature Suggestion
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bug" id="bug" />
                  <Label htmlFor="bug" className="flex items-center gap-2 cursor-pointer">
                    <Bug size={16} className="text-red-500" />
                    Report an Issue
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email (optional)</Label>
              <Input 
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">We'll only use this to follow up on your feedback if needed.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-700">Your feedback</Label>
              <Textarea 
                id="message"
                placeholder="Tell us what you think or describe the issue you're experiencing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] w-full"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">Submit Feedback</Button>
          </form>
        </div>
        
        <div className="text-center mt-10 text-sm text-gray-500">
          <p>Thank you for helping us improve Dew Search!</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
