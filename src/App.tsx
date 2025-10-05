import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexA from "./pages/CLTCOMGRANA-A/Index";
import IndexB from "./pages/CLTCOMGRANA-B/Index";
import NotFound from "./pages/NotFound";

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
          <Route path="/variant-b" element={<IndexB />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
