
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Search, Image, FileText, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpCenter = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">How can we help you?</h2>
          <p className="text-gray-600 mb-6">
            Find answers to common questions about using Dew Search and other Dew services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="h-auto py-4 justify-start gap-3" onClick={() => navigate('/search?type=web')}>
              <Search className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">Dew Search</div>
                <div className="text-xs text-gray-500">Learn how to search effectively</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 justify-start gap-3" onClick={() => navigate('/search?type=images')}>
              <Image className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">Dew Images</div>
                <div className="text-xs text-gray-500">Find the perfect images</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 justify-start gap-3" onClick={() => navigate('/dew-ai')}>
              <FileText className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">Dew AI</div>
                <div className="text-xs text-gray-500">Get help with AI assistant</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 justify-start gap-3" onClick={() => navigate('/eclipse')}>
              <SunMoon className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">Eclipse</div>
                <div className="text-xs text-gray-500">Customize your experience</div>
              </div>
            </Button>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              How do I perform a basic search?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              To perform a basic search, simply type your query in the search box on the Dew homepage and press Enter or click the search button. You'll be presented with a list of relevant results.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              How do I search for images?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              To search for images, click on "Dew Images" button on the homepage, or select the Images tab after performing a search. You can also directly go to the Images section by clicking on the Images icon in the app menu.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              What is Dew AI and how do I use it?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              Dew AI is our intelligent assistant that provides direct answers to your questions. To use it, simply ask a question in the search box. For complex questions, Dew AI will generate a comprehensive response with sources. You can also access Dew AI directly from the app menu.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              How do I manage my privacy settings?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              To manage your privacy settings, visit your account settings page. From there, you can control what data is collected, how it's used, and opt out of personalized search results if desired. For more details, please review our Privacy Policy.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              How do I report a technical issue?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              If you encounter a technical issue, please visit our Feedback page and select "Report an issue" from the dropdown menu. Provide as much detail as possible, including what you were doing when the issue occurred and any error messages you received.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="text-center mt-10 text-sm text-gray-500">
          <p>Couldn't find what you were looking for? <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/feedback')}>Contact us</Button></p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
