
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Logo size="sm" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="relative">
            <h1 className="text-8xl font-bold text-blue-500/20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
            </div>
          </div>

          <p className="text-gray-600 max-w-sm mx-auto">
            We couldn't find the page you're looking for. It might have been moved, 
            deleted, or perhaps it never existed.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => location(-1)} 
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft size={18} /> Go Back
            </Button>
            <Button 
              onClick={() => location('/')}
              className="gap-2"
            >
              <Home size={18} /> Return Home
            </Button>
          </div>

          <div className="text-sm text-gray-500 mt-8">
            <p>Looking for something specific? Try searching on our homepage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
