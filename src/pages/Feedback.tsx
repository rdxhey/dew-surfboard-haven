
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import ServiceNav from '@/components/ServiceNav';

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback. We appreciate your input!",
        variant: "default",
      });
      setIsSubmitting(false);
      setFeedback('');
      setEmail('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <header className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
        <ServiceNav />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 max-w-3xl">
        <div className="mb-8 flex items-center gap-2">
          <MessageSquare className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Send Feedback</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <p className="text-gray-600 mb-6">
            We value your opinion and are constantly working to improve our services.
            Please share your thoughts, suggestions, or report any issues you've encountered.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Feedback Type</h3>
              <RadioGroup 
                value={feedbackType} 
                onValueChange={setFeedbackType}
                className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestion" id="suggestion" />
                  <Label htmlFor="suggestion" className="flex items-center gap-1">
                    <ThumbsUp size={16} className="text-blue-500" />
                    Suggestion
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="issue" id="issue" />
                  <Label htmlFor="issue" className="flex items-center gap-1">
                    <ThumbsDown size={16} className="text-red-500" />
                    Report an Issue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tell us what you think or describe the issue you're experiencing..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide your email if you'd like us to follow up with you.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!feedback.trim() || isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
        
        <div className="text-center text-gray-600 text-sm">
          <p className="mb-2">Your feedback helps us improve Dew for everyone.</p>
          <p>
            Need immediate assistance?{' '}
            <button 
              onClick={() => navigate('/help-center')}
              className="text-primary hover:underline focus:outline-none"
            >
              Visit our Help Center
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
