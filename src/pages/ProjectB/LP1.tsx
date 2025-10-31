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
import { useGTM } from "@/hooks/use-gtm";

const LP1 = () => {
  const config = getVariationConfig('b', 'lp1');
  
  // Inicializa o Clarity
  useClarity();
  
  // Inicializa o GTM
  const { pushEvent } = useGTM(true, 'GTM-K8BN9FDK');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

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