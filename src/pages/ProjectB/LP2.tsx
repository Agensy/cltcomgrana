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
import { useFacebookPixel } from "@/hooks/use-facebook-pixel";
import { useLazyScripts } from "@/hooks/use-lazy-scripts";

const LP2 = () => {
  const config = getVariationConfig('b', 'lp2');
  // Carrega Facebook Pixel quando a Hero estiver carregada
  const { heroLoaded } = useLazyScripts();
  const fbEnv = (import.meta as any)?.env || {};
  const fbPixelIds = fbEnv.VITE_FACEBOOK_PIXEL_B_LP2 || fbEnv.VITE_FACEBOOK_PIXEL_IDS;
  useFacebookPixel(heroLoaded, fbPixelIds);
  
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

export default LP2;