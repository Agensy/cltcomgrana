import { useEffect } from "react";
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
import { getVariationConfig } from "@/config/variations";
import { useClarity } from "@/hooks/use-clarity";

const LP1 = () => {
  const config = getVariationConfig('b', 'lp1');
  
  // Inicializa o Clarity
  useClarity();
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  // Implementa apenas o GTM GTM-K8BN9FDK
  useEffect(() => {
    // Inicializa o dataLayer se não existir
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Adiciona o evento inicial do GTM
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Carrega o script do GTM
    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-K8BN9FDK';
      document.head.appendChild(script);
    }

    // Adiciona o noscript iframe do GTM
    const existingNoscript = document.querySelector('noscript iframe[src*="googletagmanager.com/ns.html"]');
    if (!existingNoscript) {
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-K8BN9FDK';
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, []);

  return (
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
  );
};

export default LP1;