import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StorySection from "@/components/StorySection";
import SolutionSection from "@/components/SolutionSection";
import VideoProofSection from "@/components/VideoProofSection";
import BenefitsSection from "@/components/BenefitsSection";
import ForWhoSection from "@/components/ForWhoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BonusSection from "@/components/BonusSection";
import FAQSection from "@/components/FAQSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import DynamicFinalOfferSection from "@/components/DynamicFinalOfferSection";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Footer from "@/components/Footer";
import WhatsAppHelpButton from "@/components/WhatsAppHelpButton";
import ClarityIndicator from "@/components/ClarityIndicator";
import ClarityDebugPanel from "@/components/ClarityDebugPanel";
import { getVariationConfig } from "@/config/variations";
import { useClarity } from "@/hooks/use-clarity";
import { useGTM } from "@/hooks/use-gtm";
import { useEffect } from "react";

const LP1 = () => {
  const config = getVariationConfig('b', 'lp1');
  
  // Inicializa o Clarity
  useClarity();
  
  // Teardown do Facebook Pixel na LP1
  // Garante que, mesmo vindo de outra rota, o Pixel seja desativado aqui
  useEffect(() => {
    // Define um stub de fbq antes do GTM para impedir reinit
    try {
      (window as any).fbq = function() {};
      (window as any)._fbq = (window as any).fbq;
      (window as any).__fbq_initialized_ids = new Set<string>();

      // Remove scripts já inseridos do Facebook Pixel
      document.querySelectorAll('script[src*="fbevents.js"]').forEach((s) => {
        s.parentElement?.removeChild(s);
      });

      // Remove noscript fallback de pixels existentes
      document.querySelectorAll('noscript img[src*="facebook.com/tr"]').forEach((img) => {
        img.parentElement?.remove();
      });
    } catch {}
  }, []);
  
  // Inicializa o GTM local apenas quando NÃO estiver no subdomínio LP1
  const isLP1Host = typeof window !== 'undefined' && /(^|\.)lp1\.cltcomgrana\.com\.br$/i.test(window.location.hostname);
  const { pushEvent } = useGTM(!isLP1Host, 'GTM-K8BN9FDK');

  // Emite page_view via GTM quando GTM está disponível (global no LP1)
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        pushEvent('page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page: 'b/lp1',
          project: 'B',
          variation: 'lp1'
        });
      }, 1000);
      return () => clearTimeout(timer);
    } catch {}
  }, [pushEvent]);
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  return (
    <>
      {/* GTM noscript fallback (conforme gtm.txt) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K8BN9FDK"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      {/* Indicadores de Clarity em desenvolvimento para verificação rápida */}
      {(import.meta as any)?.env?.DEV && (
        <>
          <ClarityIndicator />
          <ClarityDebugPanel />
        </>
      )}

      <main className="min-h-screen bg-background">
      <HeroSection />
      <VideoProofSection />
      <BackgroundWrapper>
        <ProblemSection />
        <StorySection />
        <SolutionSection />
        <ForWhoSection />
        <HowItWorksSection />
        <BonusSection />
        <DynamicFinalOfferSection config={config} />
        <BenefitsSection />
        <TestimonialsSection />
        <FAQSection />
        <GuaranteeSection />
      </BackgroundWrapper>
      <WhatsAppHelpButton />
      <Footer />
    </main>
    </>
  );
};

export default LP1;