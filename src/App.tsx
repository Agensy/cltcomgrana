import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ClarityInitializer from "@/components/ClarityInitializer";
import GtagInitializer from "@/components/GtagInitializer";
import ClarityIndicator from "@/components/ClarityIndicator";
import ClarityDebugPanel from "@/components/ClarityDebugPanel";
import LP1GlobalGTM from "@/components/LP1GlobalGTM";
import { getSubdomainHome, shouldBlockGlobalScripts } from "@/config/subdomains";


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
const ProjectB_PreLP1 = lazy(() => import("./pages/ProjectB/PreLP1"));
const ProjectB_PreLP2 = lazy(() => import("./pages/ProjectB/PreLP2"));
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

// Componente para renderizar scripts condicionalmente
const ConditionalScripts = () => {
  const location = useLocation();
  const DEFAULT_HOME = (import.meta as any)?.env?.VITE_DEFAULT_HOME as string | undefined;
  const isLP1Home = DEFAULT_HOME === 'b/lp1' && location.pathname === '/';
  const blockBySubdomain = shouldBlockGlobalScripts();
  
  // Não carrega scripts globais nas páginas /b/lp1 e /b/lp2
  // e também quando LP1 é a homepage do subdomínio
  // e quando o subdomínio ativo exige bloqueio
  if (location.pathname === '/b/lp1' || location.pathname === '/b/lp2' || isLP1Home || blockBySubdomain) {
    return null;
  }
  
  return (
    <>
      <GtagInitializer />
      <ClarityInitializer />
      <ClarityIndicator />
      <ClarityDebugPanel />
    </>
  );
};

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
        {/* GTM global para o subdomínio LP1 */}
        <LP1GlobalGTM />
        <ConditionalScripts />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {(() => {
              const DEFAULT_HOME = (import.meta as any)?.env?.VITE_DEFAULT_HOME as string | undefined;
              const resolveHome = (home?: string) => {
                switch (home) {
                  case 'a/lp1': return <ProjectA_LP1 />;
                  case 'a/lp2': return <ProjectA_LP2 />;
                  case 'a/lp3': return <ProjectA_LP3 />;
                  case 'b/lp1': return <ProjectB_LP1 />;
                  case 'b/lp2': return <ProjectB_LP2 />;
                  case 'b/lp3': return <ProjectB_LP3 />;
                  case 'b/pre-lp1': return <ProjectB_PreLP1 />;
                  case 'b/pre-lp2': return <ProjectB_PreLP2 />;
                  default: return <ProjectA_LP1 />;
                }
              };
              const HOME_BY_SUBDOMAIN = getSubdomainHome(DEFAULT_HOME);
              return <Route path="/" element={resolveHome(HOME_BY_SUBDOMAIN)} />;
            })()}
            
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
          <Route path="/b/pre-lp1" element={<ProjectB_PreLP1 />} />
          <Route path="/b/pre-lp2" element={<ProjectB_PreLP2 />} />
            {/* Alias para Pre-LP1 dentro do subdomínio LP1 (e geral) */}
            <Route path="/pre-lp1" element={<ProjectB_PreLP1 />} />
            <Route path="/pre-lp2" element={<ProjectB_PreLP2 />} />
            <Route path="/b/obrigado" element={<ProjectB_ThankYou />} />
            {/* Alias para Thank You dentro do subdomínio LP1 */}
            <Route path="/obrigado" element={<ProjectB_ThankYou />} />
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
