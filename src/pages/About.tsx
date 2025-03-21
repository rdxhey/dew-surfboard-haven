
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Globe, Lightbulb, Info, Target, Users, Book, Smartphone, Laptop, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
              <TabsList className="grid grid-cols-5 mb-8">
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
                <TabsTrigger value="platforms" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="hidden sm:inline">Platforms</span>
                </TabsTrigger>
              </TabsList>

              {/* Mission tab content */}
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

              {/* Search tab content */}
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

              {/* Technology tab content */}
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

              {/* Team tab content */}
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

              {/* Platforms tab content - NEW SECTION */}
              <TabsContent
                value="platforms"
                className="bg-blue-50/50 rounded-lg p-6 animate-fadeIn"
              >
                <h3 className="text-2xl font-bold text-blue-800 mb-6">DEW on All Platforms</h3>
                <p className="text-gray-700 mb-8">
                  DEW works seamlessly across all your devices, providing a consistent and intuitive search 
                  experience whether you're on your phone, tablet, or computer. See how DEW adapts to different 
                  platforms while maintaining the same powerful search capabilities:
                </p>

                <Carousel className="w-full mb-8">
                  <CarouselContent>
                    {/* Mobile experience */}
                    <CarouselItem className="md:basis-1/2">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl h-full">
                        <div className="flex flex-col items-center">
                          <Smartphone className="h-12 w-12 text-blue-600 mb-4 animate-float" />
                          <h4 className="text-xl font-semibold text-blue-800 mb-3">Mobile Experience</h4>
                          <div className="relative w-52 h-96 bg-gray-800 rounded-3xl p-2 shadow-xl mx-auto overflow-hidden">
                            <div className="absolute top-0 w-24 h-6 bg-gray-800 rounded-b-xl left-1/2 transform -translate-x-1/2 z-10"></div>
                            <div className="h-full w-full bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden flex flex-col">
                              <div className="h-10 bg-blue-500 flex items-center justify-center">
                                <p className="text-white text-xs font-medium">DEW Mobile</p>
                              </div>
                              <div className="p-2 flex-1 flex flex-col">
                                <div className="mb-2 w-full h-8 bg-white rounded-full shadow-sm flex items-center px-2">
                                  <Search className="h-3 w-3 text-blue-500 mr-1" />
                                  <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="flex-1 space-y-1.5 overflow-hidden">
                                  <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
                                  <div className="h-5 w-11/12 bg-gray-100 rounded animate-pulse" style={{animationDelay: "0.1s"}}></div>
                                  <div className="h-5 w-10/12 bg-gray-100 rounded animate-pulse" style={{animationDelay: "0.2s"}}></div>
                                  <div className="h-10 w-full bg-blue-50 rounded-lg mt-2"></div>
                                  <div className="h-10 w-full bg-blue-50 rounded-lg"></div>
                                  <div className="h-10 w-full bg-blue-50 rounded-lg"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-4 text-center text-sm">
                            On mobile, DEW optimizes for touchscreens with larger buttons, simplified results,
                            and voice search capabilities designed for on-the-go information seeking.
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                    
                    {/* Desktop experience */}
                    <CarouselItem className="md:basis-1/2">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl h-full">
                        <div className="flex flex-col items-center">
                          <Laptop className="h-12 w-12 text-purple-600 mb-4 animate-float" />
                          <h4 className="text-xl font-semibold text-purple-800 mb-3">Desktop Experience</h4>
                          <div className="relative w-64 h-44 bg-gray-800 rounded-lg p-2 shadow-xl mx-auto overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-br from-blue-50 to-white rounded overflow-hidden flex flex-col">
                              <div className="h-5 bg-gray-200 flex items-center px-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                              </div>
                              <div className="p-2 flex-1 flex flex-col">
                                <div className="mb-2 flex justify-center">
                                  <div className="w-40 h-6 bg-white rounded-full shadow-sm flex items-center px-2">
                                    <Search className="h-3 w-3 text-blue-500 mr-1" />
                                    <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-1 overflow-hidden">
                                  <div className="col-span-2 h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" style={{animationDelay: "0.1s"}}></div>
                                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" style={{animationDelay: "0.2s"}}></div>
                                  <div className="col-span-2 h-6 w-full bg-blue-50 rounded-lg mt-1"></div>
                                  <div className="col-span-2 h-6 w-full bg-blue-50 rounded-lg"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-4 text-center text-sm">
                            The desktop version provides a full-featured experience with advanced filters, 
                            side panels for deeper exploration, and keyboard shortcuts for power users.
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                    
                    {/* Tablet/Windows experience */}
                    <CarouselItem className="md:basis-1/2">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl h-full">
                        <div className="flex flex-col items-center">
                          <Monitor className="h-12 w-12 text-green-600 mb-4 animate-float" />
                          <h4 className="text-xl font-semibold text-green-800 mb-3">Windows Experience</h4>
                          <div className="relative w-64 h-44 bg-blue-800 rounded-lg shadow-xl mx-auto overflow-hidden border-2 border-blue-600">
                            <div className="h-6 bg-blue-700 flex items-center justify-between px-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-sm bg-white mr-2"></div>
                                <p className="text-white text-xs">DEW for Windows</p>
                              </div>
                              <div className="flex space-x-2">
                                <div className="w-3 h-3 text-white">−</div>
                                <div className="w-3 h-3 text-white">□</div>
                                <div className="w-3 h-3 text-white">×</div>
                              </div>
                            </div>
                            <div className="p-2 bg-white flex-1 flex flex-col h-[calc(100%-24px)]">
                              <div className="flex justify-center mb-2">
                                <div className="w-40 h-6 bg-blue-100 rounded flex items-center px-2">
                                  <Search className="h-3 w-3 text-blue-700 mr-1" />
                                  <div className="h-2 w-24 bg-blue-200 rounded-full"></div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-1 flex-1">
                                <div className="bg-blue-50 p-1 rounded text-xs text-center">Images</div>
                                <div className="bg-blue-50 p-1 rounded text-xs text-center">News</div>
                                <div className="bg-blue-50 p-1 rounded text-xs text-center">Maps</div>
                                <div className="col-span-3 h-4 w-full bg-gray-100 rounded-sm animate-pulse"></div>
                                <div className="col-span-3 h-4 w-11/12 bg-gray-100 rounded-sm animate-pulse" style={{animationDelay: "0.1s"}}></div>
                                <div className="col-span-3 h-4 w-10/12 bg-gray-100 rounded-sm animate-pulse" style={{animationDelay: "0.2s"}}></div>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-4 text-center text-sm">
                            The Windows app integrates with the operating system, allowing for instant search 
                            from the taskbar and custom Windows-specific features like file searching and PC settings access.
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="static transform-none mx-2 bg-blue-100 hover:bg-blue-200" />
                    <CarouselNext className="static transform-none mx-2 bg-blue-100 hover:bg-blue-200" />
                  </div>
                </Carousel>

                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                  <h4 className="text-xl font-bold text-red-600 mb-4">Why Google's Search Has Declined</h4>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Google was once a breath of fresh air in the search world – clean, fast, and focused on delivering the 
                      most relevant results. But over time, things have changed:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-red-800 mb-2">Prioritizing Ads Over Results</h5>
                        <p className="text-gray-600 text-sm">
                          Today's Google search results are dominated by paid placements, pushing organic results further down 
                          the page and making it harder to find genuine information.
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-red-800 mb-2">Cluttered User Experience</h5>
                        <p className="text-gray-600 text-sm">
                          The once-clean interface has become crowded with features, widgets, and distractions that detract 
                          from the core search experience.
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-red-800 mb-2">Privacy Concerns</h5>
                        <p className="text-gray-600 text-sm">
                          Google's business model relies on collecting vast amounts of user data, raising serious privacy 
                          concerns and eroding trust in the platform.
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-red-800 mb-2">Gaming The System</h5>
                        <p className="text-gray-600 text-sm">
                          SEO-optimized content often ranks higher than genuinely useful information, resulting in 
                          formulaic content designed to please algorithms rather than users.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 pt-2">
                      At DEW, we're building something different – a search engine that respects your privacy, 
                      prioritizes genuine information over paid placements, and delivers a clean, focused 
                      experience that puts you in control of your information journey.
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
