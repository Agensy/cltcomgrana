import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StorySection from "@/components/StorySection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import ForWhoSection from "@/components/ForWhoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import BonusSection from "@/components/BonusSection";
import FAQSection from "@/components/FAQSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import SocialProofSection from "@/components/SocialProofSection";
import FinalOfferSection from "@/components/FinalOfferSection";
import LeadForm from "@/components/LeadForm";
import mainBg from "@/assets/main-background.webp";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <div className="relative">
        {/* Unified Background */}
        <div className="absolute inset-0">
          <img 
            src={mainBg} 
            alt="" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Overlay for smooth transitions */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
        </div>
        
        {/* All sections with spacing */}
        <div className="relative space-y-8 md:space-y-12">
          <ProblemSection />
          <StorySection />
          <SolutionSection />
          <ForWhoSection />
          <HowItWorksSection />
          <BeforeAfterSection />
          <BonusSection />
          <BenefitsSection />
          <FAQSection />
          <GuaranteeSection />
          <SocialProofSection />
          <FinalOfferSection />
          <LeadForm />
        </div>
      </div>
    </main>
  );
};

export default Index;
