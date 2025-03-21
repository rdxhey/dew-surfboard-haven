
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Smartphone, Laptop, Search, Code, Lock, Rocket, BarChart } from 'lucide-react';
import Footer from '@/components/Footer';

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");

  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-md bg-white/90 dark:bg-black/90 border-b border-gray-200 dark:border-gray-800 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
            <ChevronLeft size={18} />
            <span>Back to Dew Search</span>
          </Link>
          <h1 className="text-xl font-semibold">About Dairy Inc.</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className={`max-w-4xl mx-auto ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          <Tabs defaultValue="mission" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="search">What is Search?</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="cool-again">Making Search Cool Again</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mission" className="space-y-6">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              
              <section className="prose prose-lg max-w-none dark:prose-invert">
                <p>At Dairy Inc., we believe that search should be a delightful experience. Our mission is to provide a clean, fast, and intuitive search engine that respects your privacy while delivering the most relevant results.</p>
                
                <div className="my-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
                  <h3 className="text-xl font-semibold mb-2">Our Core Values</h3>
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Search size={20} />
                      </div>
                      <div>
                        <strong>Simplicity.</strong> We believe in clean, uncluttered interfaces that put your search needs first.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Lock size={20} />
                      </div>
                      <div>
                        <strong>Privacy.</strong> Your search data belongs to you. We don't track, store, or sell your personal information.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Code size={20} />
                      </div>
                      <div>
                        <strong>Innovation.</strong> We're constantly exploring new ways to improve the search experience.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Rocket size={20} />
                      </div>
                      <div>
                        <strong>Speed.</strong> We understand that time is valuable, so we aim to deliver results lightning fast.
                      </div>
                    </li>
                  </ul>
                </div>
                
                <p>Founded in 2023, Dairy Inc. has grown from a small startup to a beloved search alternative that users around the world count on daily. Our team is passionate about creating a search experience that prioritizes people over profits.</p>
                
                <blockquote className="italic border-l-4 border-primary pl-4 my-6">
                  "We're not just building another search engine; we're reimagining what search can be in the modern web."
                  <footer className="text-right mt-2">— Dairy Inc. Founder</footer>
                </blockquote>
              </section>
            </TabsContent>
            
            <TabsContent value="search" className="space-y-6">
              <h2 className="text-3xl font-bold mb-4 text-primary">What is Search?</h2>
              
              <section className="prose prose-lg max-w-none dark:prose-invert">
                <p>Search is the gateway to human knowledge. It's how we navigate the vast ocean of information that is the internet. But search is more than just typing keywords and getting links—it's about finding answers, discovering new perspectives, and connecting with the world around us.</p>
                
                <h3 className="text-xl font-semibold mt-6">The Evolution of Search</h3>
                <p>Search engines have evolved dramatically over the past few decades. From basic keyword matching to sophisticated algorithms that understand context, intent, and even emotion, search technology continues to advance at a rapid pace.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
                    <h4 className="font-bold mb-2">Then</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Simple keyword matching</li>
                      <li>Basic ranking algorithms</li>
                      <li>Text-only results</li>
                      <li>Limited understanding of queries</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-bold mb-2">Now</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Context-aware results</li>
                      <li>Natural language processing</li>
                      <li>Multimedia content</li>
                      <li>Personalized experiences</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-900">
                    <h4 className="font-bold mb-2">Future</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Predictive search</li>
                      <li>Visual and voice search</li>
                      <li>Integrated AI assistants</li>
                      <li>Immersive search experiences</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-6">How Dew Search is Different</h3>
                <p>At Dairy Inc., we believe that the best search experience is one that respects your intelligence. We don't hide results behind ads, manipulate rankings for profit, or track your every move. Instead, we focus on delivering the most relevant, useful information as quickly and clearly as possible.</p>
                
                <p>Our unique approach combines cutting-edge technology with human-centered design principles to create a search experience that feels both powerful and personal.</p>
                
                <div className="my-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
                  <h3 className="text-xl font-semibold mb-2">Key Features of Dew Search</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <BarChart size={20} />
                      </div>
                      <div>
                        <strong>Clean Results.</strong> No sponsored links cluttering your view, just pure organic results.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Lock size={20} />
                      </div>
                      <div>
                        <strong>Privacy-First.</strong> We don't track or store your personal search history.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Rocket size={20} />
                      </div>
                      <div>
                        <strong>Lightning Fast.</strong> Optimized for speed, even on slower connections.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Code size={20} />
                      </div>
                      <div>
                        <strong>Intelligent Understanding.</strong> Our algorithms understand context and intent.
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="platforms" className="space-y-6">
              <h2 className="text-3xl font-bold mb-4 text-primary">Dew Search Across Platforms</h2>
              
              <section className="prose prose-lg max-w-none dark:prose-invert">
                <p>Experience the magic of Dew Search on any device. Our platform is designed to work seamlessly whether you're on a phone, tablet, or computer.</p>
                
                <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* iPhone Platform */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-100 dark:border-blue-900 transition-transform duration-500 group-hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-48 h-96 bg-black rounded-[3rem] border-[6px] border-gray-800 relative overflow-hidden shadow-xl">
                          <div className="absolute top-0 w-24 h-6 bg-black rounded-b-xl left-1/2 transform -translate-x-1/2"></div>
                          <div className="w-full h-full bg-white p-2 overflow-hidden">
                            <div className="animate-float">
                              <div className="w-full h-6 bg-primary rounded-full mb-4"></div>
                              <div className="w-3/4 h-4 bg-gray-200 rounded-full mb-3"></div>
                              <div className="w-full h-10 bg-gray-100 rounded-lg mb-4"></div>
                              <div className="space-y-2">
                                <div className="w-full h-20 bg-blue-50 rounded-lg"></div>
                                <div className="w-full h-20 bg-blue-50 rounded-lg"></div>
                                <div className="w-full h-20 bg-blue-50 rounded-lg"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mt-4">iPhone</h3>
                      <p className="text-center text-sm mt-2">Optimized for one-handed navigation and gesture controls, making search on-the-go a breeze.</p>
                    </div>
                  </div>
                  
                  {/* Android Platform */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-xl border border-green-100 dark:border-green-900 transition-transform duration-500 group-hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-48 h-96 bg-gray-800 rounded-2xl border-[6px] border-gray-700 relative overflow-hidden shadow-xl">
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full"></div>
                          <div className="w-full h-full bg-white p-2 overflow-hidden">
                            <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                              <div className="w-full h-6 bg-green-500 rounded-full mb-4"></div>
                              <div className="w-3/4 h-4 bg-gray-200 rounded-full mb-3"></div>
                              <div className="w-full h-10 bg-gray-100 rounded-lg mb-4"></div>
                              <div className="space-y-2">
                                <div className="w-full h-20 bg-green-50 rounded-lg"></div>
                                <div className="w-full h-20 bg-green-50 rounded-lg"></div>
                                <div className="w-full h-20 bg-green-50 rounded-lg"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mt-4">Android</h3>
                      <p className="text-center text-sm mt-2">Customizable and versatile, with deep integration into your Android ecosystem.</p>
                    </div>
                  </div>
                  
                  {/* Windows Laptop Platform */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-6 rounded-xl border border-purple-100 dark:border-purple-900 transition-transform duration-500 group-hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-64 h-44 bg-gray-800 rounded-lg border-[4px] border-gray-700 relative overflow-hidden shadow-xl">
                          <div className="w-full h-full bg-white p-2">
                            <div className="animate-float" style={{ animationDelay: '1s' }}>
                              <div className="w-full h-4 bg-purple-500 rounded-full mb-2"></div>
                              <div className="w-3/4 h-3 bg-gray-200 rounded-full mb-2"></div>
                              <div className="w-full h-6 bg-gray-100 rounded-lg mb-2"></div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="h-10 bg-purple-50 rounded-lg"></div>
                                <div className="h-10 bg-purple-50 rounded-lg"></div>
                                <div className="h-10 bg-purple-50 rounded-lg"></div>
                                <div className="h-10 bg-purple-50 rounded-lg"></div>
                              </div>
                            </div>
                          </div>
                          <div className="w-72 h-2 bg-gray-700 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                        <div className="w-72 h-8 bg-gray-700 rounded-b-lg mt-0"></div>
                      </div>
                      <h3 className="text-xl font-bold text-center mt-4">Windows Laptop</h3>
                      <p className="text-center text-sm mt-2">Full-featured with keyboard shortcuts and a research-optimized interface for productive searching.</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-6">Cross-Platform Features</h3>
                <p>No matter which device you use, Dew Search offers a consistent and delightful experience with features like:</p>
                
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li><strong>Synchronized Searches:</strong> Start a search on your phone and continue on your laptop seamlessly.</li>
                  <li><strong>Responsive Design:</strong> Automatically adapts to your screen size and orientation.</li>
                  <li><strong>Device-Specific Optimizations:</strong> Touch-friendly on mobile, keyboard-focused on desktop.</li>
                  <li><strong>Offline Capabilities:</strong> Save search results for later, even without an internet connection.</li>
                </ul>
                
                <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900 my-8">
                  <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="mb-4">We're working on exciting new platform-specific features:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold">Voice Search 2.0</h4>
                      <p className="text-sm mt-1">Enhanced natural language understanding across all devices.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold">AR Search Overlay</h4>
                      <p className="text-sm mt-1">Point your camera at objects to search for related information.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold">Gesture Controls</h4>
                      <p className="text-sm mt-1">Navigate search results with intuitive gestures on touchscreens.</p>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="cool-again" className="space-y-6">
              <h2 className="text-3xl font-bold mb-4 text-primary">Making Search Cool Again</h2>
              
              <section className="prose prose-lg max-w-none dark:prose-invert">
                <p>Remember when search engines were exciting? When Google and Yahoo first arrived, they revolutionized how we accessed information. They were clean, fast, and focused on delivering the best results—not the most profitable ones.</p>

                <div className="my-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border border-orange-100 dark:border-orange-900">
                  <h3 className="text-xl font-semibold mb-4">What Happened to Search?</h3>
                  <div className="space-y-4">
                    <p>Over time, major search engines have lost their way:</p>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>
                        <strong>Ads Everywhere:</strong> The first several results are often paid placements, pushing organic results below the fold.
                      </li>
                      <li>
                        <strong>Cluttered Interfaces:</strong> What began as clean, simple designs have become crowded with widgets, promotions, and distractions.
                      </li>
                      <li>
                        <strong>Privacy Concerns:</strong> Your search history is tracked, analyzed, and monetized through targeted advertising.
                      </li>
                      <li>
                        <strong>SEO Gaming:</strong> Results are increasingly dominated by content optimized for algorithms rather than humans.
                      </li>
                      <li>
                        <strong>Filter Bubbles:</strong> Personalization algorithms show you what they think you want to see, limiting exposure to diverse perspectives.
                      </li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="italic border-l-4 border-primary pl-4 my-6">
                  "Google was fresh and cool but now they suck in everything. We're here to make search cool again."
                  <footer className="text-right mt-2">— Dairy Inc. Team</footer>
                </blockquote>
                
                <h3 className="text-xl font-semibold mt-8">Our Revolution</h3>
                <p>At Dairy Inc., we're not just building another search engine—we're leading a revolution to make search exciting again:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-100 dark:border-indigo-900 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-lg mb-3">Back to Basics</h4>
                    <p>We're returning to what made search great in the first place: simplicity, speed, and relevance. Our clean interface puts the focus where it belongs—on finding exactly what you're looking for.</p>
                  </div>
                  
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-lg mb-3">Beyond Profit</h4>
                    <p>While other search engines optimize for maximum ad revenue, we optimize for maximum user satisfaction. This means better results, fewer ads, and a more enjoyable search experience overall.</p>
                  </div>
                  
                  <div className="p-6 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-lg mb-3">Genuine Innovation</h4>
                    <p>We're not just copying what others have done—we're exploring new ways to make search more intuitive, more helpful, and more delightful. From our voice search to our "I'm Feeling Right" button, we're bringing fun back to search.</p>
                  </div>
                  
                  <div className="p-6 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-900 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-lg mb-3">People-Powered</h4>
                    <p>We believe that the best search experience comes from understanding real human needs, not just analyzing data. That's why we actively involve our community in shaping the future of Dew Search.</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-8">Join the Movement</h3>
                <p>We're on a mission to make search cool again, just like Google and Yahoo once did. But we can't do it alone. Every search you make with Dew helps us improve and grow our service.</p>
                
                <div className="my-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-lg border border-rose-100 dark:border-rose-900 text-center">
                  <h3 className="text-xl font-semibold mb-4">Ready to rediscover the joy of search?</h3>
                  <Link to="/" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">Try Dew Search Now</Link>
                  <p className="mt-4 text-sm">No tracking. No filter bubbles. Just great search results.</p>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
