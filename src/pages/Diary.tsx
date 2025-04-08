import React, { useState } from 'react';
import { UserCircle, Calendar, Book, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Diary = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      
      toast({
        title: "Connected Successfully",
        description: "Your diary account has been connected.",
        variant: "default",
      });
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Logo size="sm" />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-primary"
        >
          Back to Home
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full glass-effect flex items-center justify-center">
                <UserCircle size={32} className="text-primary" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Connect Diary Account</h1>
            <p className="text-gray-600 max-w-sm mx-auto">
              Link your personal diary to access your entries across all Dew services.
            </p>
          </div>
          
          <Card className="border border-gray-100 shadow-sm bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your diary account credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConnect} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-200 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-200 focus:border-primary"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isConnecting}>
                  {isConnecting ? "Connecting..." : "Connect Account"}
                  {!isConnecting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-center text-sm text-gray-500">
                <a href="#reset" className="hover:text-primary underline underline-offset-4">Forgot password?</a>
              </div>
              <div className="text-center text-sm text-gray-500">
                Don't have an account? <a href="#signup" className="text-primary hover:underline">Create one</a>
              </div>
            </CardFooter>
          </Card>

          <div className="pt-4 space-y-4">
            <div className="flex justify-center space-x-8">
              <FeatureItem icon={<Calendar size={20} />} text="Sync calendar" />
              <FeatureItem icon={<Book size={20} />} text="All entries" />
              <FeatureItem icon={<Lock size={20} />} text="Private & secure" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="p-2 rounded-full bg-blue-50 mb-2">
        {icon}
      </div>
      <span className="text-xs text-gray-600">{text}</span>
    </div>
  );
};

export default Diary;
