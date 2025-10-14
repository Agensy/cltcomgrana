import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StorySection from "@/components/StorySection";
import SolutionSection from "@/components/SolutionSection";
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
import { VariationConfig } from "@/config/variations";
import { useUtmifyPixel } from "@/hooks/use-utmify-pixel";
import { useFacebookPixel } from "@/hooks/use-facebook-pixel";
import { useLazyScripts } from "@/hooks/use-lazy-scripts";

interface BaseLandingPageProps {
  config: VariationConfig;
}

const BaseLandingPage = ({ config }: BaseLandingPageProps) => {
  // Detecta quando a HeroSection foi carregada
  const { heroLoaded } = useLazyScripts();
  
  // Carrega os scripts apenas após a HeroSection estar carregada
  useUtmifyPixel(heroLoaded);
  useFacebookPixel(heroLoaded);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BackgroundWrapper>
        <ProblemSection />
        <StorySection />
        <SolutionSection />
        <ForWhoSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <BonusSection />
        <DynamicFinalOfferSection config={config} />
        <BenefitsSection />
        <FAQSection />
        <GuaranteeSection />
      </BackgroundWrapper>
      <Footer />
    </main>
  );
};

export default BaseLandingPage;