import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


// Lazy loading dos componentes para code splitting
const IndexA = lazy(() => import("./pages/CLTCOMGRANA-A/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Project A Pages - Lazy loading
const ProjectA_LP1 = lazy(() => import("./pages/ProjectA/LP1"));
const ProjectA_LP2 = lazy(() => import("./pages/ProjectA/LP2"));
const ProjectA_LP3 = lazy(() => import("./pages/ProjectA/LP3"));
const ProjectA_ThankYou = lazy(() => import("./pages/ProjectA/ThankYou"));

// Project B Pages - Lazy loading
const ProjectB_LP1 = lazy(() => import("./pages/ProjectB/LP1"));
const ProjectB_LP2 = lazy(() => import("./pages/ProjectB/LP2"));
const ProjectB_LP3 = lazy(() => import("./pages/ProjectB/LP3"));
const ProjectB_ThankYou = lazy(() => import("./pages/ProjectB/ThankYou"));

// Leads Dashboard
const LeadsPage = lazy(() => import("./pages/LeadsPage"));

// Checkout Page
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

// Componente de loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<ProjectA_LP1 />} />
            
            {/* Project A Routes */}
            <Route path="/cltcomgrana-a" element={<IndexA />} />
            <Route path="/a/lp1" element={<ProjectA_LP1 />} />
            <Route path="/a/lp2" element={<ProjectA_LP2 />} />
            <Route path="/a/lp3" element={<ProjectA_LP3 />} />
            <Route path="/a/obrigado" element={<ProjectA_ThankYou />} />
            
            {/* Project B Routes */}
            <Route path="/b/lp1" element={<ProjectB_LP1 />} />
            <Route path="/b/lp2" element={<ProjectB_LP2 />} />
            <Route path="/b/lp3" element={<ProjectB_LP3 />} />
            <Route path="/b/obrigado" element={<ProjectB_ThankYou />} />
            <Route path="/b/checkout" element={<CheckoutPage />} />
            
            <Route path="/termos-de-uso" element={<TermsOfService />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            
            {/* Leads Dashboard - Protegido por autenticação */}
            <Route path="/leads" element={
              <ProtectedRoute>
                <LeadsPage />
              </ProtectedRoute>
            } />

            {/* 404 - Página não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
