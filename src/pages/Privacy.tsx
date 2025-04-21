
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import ServiceNav from '@/components/ServiceNav';

const Privacy = () => {
  const navigate = useNavigate();
  
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
          <Shield className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </div>

        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              At Dew Inc., we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our services.
            </p>
            <p className="text-gray-600">
              Please read this privacy policy carefully. By accessing and using our services, 
              you acknowledge that you have read and understand this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect information about you in various ways, including:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, and other identifiers you voluntarily provide.</li>
              <li><strong>Usage Data:</strong> Information on how you access and use our services.</li>
              <li><strong>Device Information:</strong> Data about your device, including IP address, browser type, and operating system.</li>
              <li><strong>Cookies and Tracking:</strong> Data collected through cookies and similar tracking technologies.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages and updates</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Conduct research and analysis to improve our services</li>
              <li>Personalize your experience and deliver tailored content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. The updated version will be indicated by 
              an updated "Revised" date at the top of this page. We encourage you to review this privacy policy 
              frequently to be informed of how we are protecting your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions or concerns about this privacy policy, please contact us at:
              <br />
              <a href="mailto:privacy@dewinc.example.com" className="text-primary hover:underline">
                privacy@dewinc.example.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
