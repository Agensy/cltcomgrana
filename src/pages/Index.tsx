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
import BackgroundWrapper from "@/components/BackgroundWrapper";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BackgroundWrapper>
        <ProblemSection />
        <StorySection />
        <SolutionSection />
        <ForWhoSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <BonusSection />
        <FinalOfferSection />
        <BenefitsSection />
        <FAQSection />
        <GuaranteeSection />
        <SocialProofSection />
        <LeadForm />
      </BackgroundWrapper>
    </main>
  );
};

export default Index;
