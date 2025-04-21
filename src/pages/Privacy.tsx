
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Privacy = () => {
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
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        
        <div className="space-y-6 text-gray-700">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Privacy Matters</h2>
            <p className="mb-4">
              At Dew Inc., we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
            </p>
            <p>
              Last updated: April 21, 2025
            </p>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Search queries and results you click on</li>
              <li>Device information such as browser type and operating system</li>
              <li>IP address and approximate location (country or city level)</li>
              <li>Cookies and similar technologies for functionality and personalization</li>
            </ul>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and improve our search services</li>
              <li>To personalize your search experience</li>
              <li>To maintain the security of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Privacy Controls</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access and download your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of personalized search results</li>
              <li>Manage cookie preferences</li>
            </ul>
          </section>
        </div>
        
        <div className="text-center mt-10 text-sm text-gray-500">
          <p>© 2025 Dew Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
