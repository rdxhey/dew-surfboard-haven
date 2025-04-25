
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Dewdols from "./pages/Dewdols";
import About from "./pages/About";
import Diary from "./pages/Diary";
import DewAI from "./pages/DewAI";
import Eclipse from "./pages/Eclipse";
import Privacy from "./pages/Privacy";
import HelpCenter from "./pages/HelpCenter";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dewdols" element={<Dewdols />} />
          <Route path="/about" element={<About />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/dew-ai" element={<DewAI />} />
          <Route path="/eclipse" element={<Eclipse />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
