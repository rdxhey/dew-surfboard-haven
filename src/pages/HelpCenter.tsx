
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Search, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Footer from '@/components/Footer';
import ServiceNav from '@/components/ServiceNav';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqItems = [
    {
      question: "How do I change my search preferences?",
      answer: "You can change your search preferences by clicking on the Settings icon in the top right corner of the search results page. From there, you can customize your search experience including SafeSearch filters, results per page, and more."
    },
    {
      question: "How do I clear my search history?",
      answer: "To clear your search history, go to your Account page by clicking on your profile picture. Navigate to 'Activity Controls' and select 'Clear Search History.' You can choose to delete all history or select a specific time range."
    },
    {
      question: "How does Dew Search differ from other search engines?",
      answer: "Dew Search combines traditional web search with AI-powered insights to deliver more relevant results. We also prioritize privacy, using advanced anonymization techniques to protect your personal data while still providing personalized results."
    },
    {
      question: "How do I create a Dew account?",
      answer: "To create a Dew account, click on the 'Sign Up' button in the top right corner of any Dew page. You can sign up using your email, or connect with existing Google or Facebook accounts for a seamless experience."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "If you encounter inappropriate content in your search results, click the three dots next to the result and select 'Report.' Fill in the report form with relevant details, and our team will review it promptly in accordance with our community guidelines."
    }
  ];
  
  // Filter FAQ items based on search query
  const filteredFaqs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;
  
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
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 max-w-4xl">
        <div className="mb-8 flex items-center gap-2">
          <HelpCircle className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Help Center</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>

        {/* Quick Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <h3 className="font-medium mb-1">Contact Support</h3>
              <p className="text-sm text-gray-500">Get help from our team</p>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Search className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium mb-1">Search Guides</h3>
              <p className="text-sm text-gray-500">Learn advanced search tips</p>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-3 rounded-full mb-3">
                <Info className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-medium mb-1">About Dew</h3>
              <p className="text-sm text-gray-500">Learn about our mission</p>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm border">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{searchQuery}". Try a different search term.
              </div>
            )}
          </Accordion>
        </div>

        {/* Still Need Help Section */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Still Need Help?</h3>
          <p className="text-gray-600 mb-4">Our support team is here to assist you with any questions or concerns.</p>
          <Button className="bg-primary hover:bg-primary/90">Contact Support</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
