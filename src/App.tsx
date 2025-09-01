import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccessibilitySelector from "@/components/AccessibilitySelector";
import Home from "@/pages/Home";
import AssistiveTools from "@/pages/AssistiveTools";
import LearningResources from "@/pages/LearningResources";
import Careers from "@/pages/Careers";
import Community from "@/pages/Community";
import SuccessStories from "@/pages/SuccessStories";
import SignLanguagePage from "@/pages/SignLanguagePage";
import Demo from "@/pages/Demo";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AccessibilitySelector />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assistive-tools" element={<AssistiveTools />} />
            <Route path="/sign-language" element={<SignLanguagePage />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/resources" element={<LearningResources />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/community" element={<Community />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
