import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import ForWhoSection from "@/components/ForWhoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import DynamicFinalOfferSection from "@/components/DynamicFinalOfferSection";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Footer from "@/components/Footer";
import WhatsAppHelpButton from "@/components/WhatsAppHelpButton";
import Lp2VTurbVideo from "@/components/Lp2VTurbVideo";
import { getVariationConfig } from "@/config/variations";
import { useFacebookPixel } from "@/hooks/use-facebook-pixel";
import { useLazyScripts } from "@/hooks/use-lazy-scripts";
import { useClarityInline } from "@/hooks/use-clarity-inline";

const Ricardo = () => {
  const config = getVariationConfig('c', 'ricardo');
  const { heroLoaded } = useLazyScripts();
  const fbEnv = (import.meta as any)?.env || {};
  const fbPixelIds = fbEnv.VITE_FACEBOOK_PIXEL_C_RICARDO || fbEnv.VITE_FACEBOOK_PIXEL_IDS;
  useFacebookPixel(heroLoaded, fbPixelIds);
  useClarityInline('tx61eiszrq');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <Lp2VTurbVideo />
      <BackgroundWrapper>
        <StorySection />
        <SolutionSection variant="concise" />
        <TestimonialsSection variant="mobilePrints" />
        <HowItWorksSection />
        <DynamicFinalOfferSection config={config} ctaClassName="lp2-green" />
        <BenefitsSection />
        <ForWhoSection />
        <FAQSection />
        <GuaranteeSection />
      </BackgroundWrapper>
      <WhatsAppHelpButton />
      <Footer />
    </main>
  );
};

export default Ricardo;


