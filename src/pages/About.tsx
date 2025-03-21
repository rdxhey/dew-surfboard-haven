
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Globe, Lightbulb, Info, Target, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animate content appearance
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          size="sm"
          className="flex items-center text-primary hover:bg-primary/10"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to DEW
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          About DEW
          <span className="ml-2 text-sm md:text-lg font-normal text-gray-500">
            Diving into the future of search
          </span>
        </h1>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto transition-all duration-500 ease-in-out transform">
          <div
            className={`bg-white rounded-xl shadow-md overflow-hidden transition-opacity duration-700 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center p-8 text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Reimagining Search
                </h2>
                <p className="text-lg md:text-xl text-blue-100">
                  Connecting humanity to knowledge, one drop at a time
                </p>
              </div>
            </div>

            <Tabs
              defaultValue="mission"
              value={activeTab}
              onValueChange={setActiveTab}
              className="p-6"
            >
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="mission" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Our Mission</span>
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">What is Search?</span>
                </TabsTrigger>
                <TabsTrigger value="technology" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Technology</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Our Team</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="mission"
                className="bg-blue-50/50 rounded-lg p-6 animate-fadeIn"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Globe className="h-24 w-24 text-white" />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-2xl font-bold text-blue-800">Our Mission</h3>
                    <p className="text-gray-700">
                      At Dairy Inc., we believe that access to information is a fundamental right. 
                      Our mission is to organize the world's information and make it universally 
                      accessible and useful through our revolutionary DEW search engine.
                    </p>
                    <p className="text-gray-700">
                      Like dewdrops that nourish the earth, we aim to provide refreshing clarity 
                      in a sea of information. We're committed to creating a search experience 
                      that is intuitive, accurate, and respectful of user privacy.
                    </p>
                    <p className="text-gray-700">
                      We strive to be more than just a search engine – we want to be the bridge 
                      that connects people to the knowledge they seek, empowering individuals to 
                      learn, grow, and make informed decisions.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="search"
                className="bg-blue-50/50 rounded-lg p-6 animate-fadeIn"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Search className="h-24 w-24 text-white" />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-2xl font-bold text-blue-800">What is Search?</h3>
                    <p className="text-gray-700">
                      Search is the art and science of finding information in a vast sea of data. 
                      It's about understanding human intent, processing language, and delivering 
                      the most relevant answers to questions both simple and complex.
                    </p>
                    <p className="text-gray-700">
                      Great search isn't just about matching keywords – it's about understanding context, 
                      anticipating needs, and connecting users with information that truly helps them. 
                      At DEW, we're pioneering new approaches to search that are more intuitive and helpful.
                    </p>
                    <p className="text-gray-700">
                      In a world overflowing with information, effective search is the compass that 
                      guides us through the noise to find what matters most. It's the invisible 
                      infrastructure that makes the internet truly usable.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="technology"
                className="bg-blue-50/50 rounded-lg p-6 animate-fadeIn"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Lightbulb className="h-24 w-24 text-white" />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-2xl font-bold text-blue-800">Our Technology</h3>
                    <p className="text-gray-700">
                      DEW's search technology is built on three core principles: speed, accuracy, and insight. 
                      Our proprietary algorithms analyze billions of web pages to find exactly what you're 
                      looking for in milliseconds.
                    </p>
                    <p className="text-gray-700">
                      We've pioneered advanced natural language processing that understands queries the way 
                      humans naturally ask questions. Our semantic search capabilities go beyond keywords 
                      to grasp the true intent behind your searches.
                    </p>
                    <p className="text-gray-700">
                      The heart of DEW is our Hyper-Relevance Engine™, which continuously learns from user 
                      interactions to improve results. And with features like "I'm Feeling Right," we're 
                      adding a touch of serendipity to discovery.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="team"
                className="bg-blue-50/50 rounded-lg p-6 animate-fadeIn"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Users className="h-24 w-24 text-white" />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-2xl font-bold text-blue-800">Our Team</h3>
                    <p className="text-gray-700">
                      The DEW team brings together visionaries, engineers, and information scientists united 
                      by a common goal: to build the world's most helpful search engine. Our diverse team spans 
                      the globe, bringing perspectives from all walks of life.
                    </p>
                    <p className="text-gray-700">
                      Led by our founder Dr. Emma Waters, a pioneer in information retrieval theory, our team 
                      combines deep technical expertise with a profound understanding of human curiosity and 
                      how people seek knowledge.
                    </p>
                    <p className="text-gray-700">
                      We believe that the best search experiences come from teams that value both technical 
                      excellence and human empathy. Every DEW team member is dedicated to understanding the 
                      questions behind your questions.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature cards */}
            <FeatureCard
              icon={<Book className="h-8 w-8 text-blue-600" />}
              title="Knowledge First"
              description="We believe information should be accessible to everyone, regardless of where they are or what device they use."
              delay={0.1}
              show={showContent}
            />
            <FeatureCard
              icon={<Target className="h-8 w-8 text-blue-600" />}
              title="Privacy Focused"
              description="Your searches are yours alone. We're committed to industry-leading privacy practices."
              delay={0.2}
              show={showContent}
            />
            <FeatureCard
              icon={<Info className="h-8 w-8 text-blue-600" />}
              title="Constantly Evolving"
              description="Search is never 'solved.' We're always improving, learning, and adapting to serve you better."
              delay={0.3}
              show={showContent}
            />
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden transition-opacity duration-700 ease-in-out transform">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Why DEW Is Different</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  In a world of search engines that try to be everything to everyone, DEW takes a different approach. 
                  We focus on delivering the most relevant results with minimal distractions. Our clean interface puts 
                  the focus where it belongs: on your search journey.
                </p>
                <p className="text-gray-700">
                  We're also committed to sustainability – both digital and environmental. That's why we created DEWSS, 
                  our water conservation game, to raise awareness about preserving Earth's most precious resource.
                </p>
                <p className="text-gray-700">
                  With features like our seasonal Dewdols and our "I'm Feeling Right" surprise discovery tool, we're 
                  bringing a sense of delight back to search. Because finding what you're looking for should be not just 
                  efficient, but enjoyable.
                </p>
                <p className="text-gray-700">
                  But most importantly, we believe search is about empowering people. Whether you're researching for school, 
                  exploring a new hobby, or making an important life decision, DEW is here to help you find your way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer className="mt-8" />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  show: boolean;
}

const FeatureCard = ({ icon, title, description, delay, show }: FeatureCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-500 ease-in-out transform ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: `${delay}s`,
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-blue-100 p-3">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default About;
