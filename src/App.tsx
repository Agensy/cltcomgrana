import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexA from "./pages/CLTCOMGRANA-A/Index";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Project A Pages
import ProjectA_LP1 from "./pages/ProjectA/LP1";
import ProjectA_LP2 from "./pages/ProjectA/LP2";
import ProjectA_LP3 from "./pages/ProjectA/LP3";

// Project B Pages
import ProjectB_LP1 from "./pages/ProjectB/LP1";
import ProjectB_LP2 from "./pages/ProjectB/LP2";
import ProjectB_LP3 from "./pages/ProjectB/LP3";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Definição do gradiente SVG global */}
      <svg className="gradient-defs" aria-hidden="true">
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#EB5F2E', stopOpacity: 1 }} />
            <stop offset="30%" style={{ stopColor: '#FF8C42', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#FFD93D', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FF9F4A', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexA />} />
          
          {/* Project A Routes */}
          <Route path="/a/lp1" element={<ProjectA_LP1 />} />
          <Route path="/a/lp2" element={<ProjectA_LP2 />} />
          <Route path="/a/lp3" element={<ProjectA_LP3 />} />
          
          {/* Project B Routes */}
          <Route path="/b/lp1" element={<ProjectB_LP1 />} />
          <Route path="/b/lp2" element={<ProjectB_LP2 />} />
          <Route path="/b/lp3" element={<ProjectB_LP3 />} />
          
          <Route path="/termos-de-uso" element={<TermsOfService />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
