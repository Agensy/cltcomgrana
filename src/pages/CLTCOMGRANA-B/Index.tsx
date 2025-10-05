import HeroSection from "@/components/HeroSectionB";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import ForWhoSection from "@/components/ForWhoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import BonusSection from "@/components/BonusSection";
import FAQSection from "@/components/FAQSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FinalOfferSection from "@/components/FinalOfferSection";
import LeadForm from "@/components/LeadForm";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BackgroundWrapper>
        <ProblemSection />
        <SolutionSection />
        <ForWhoSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <BonusSection />
        <FinalOfferSection />
        <BenefitsSection />
        <FAQSection />
        <GuaranteeSection />
        <LeadForm />
      </BackgroundWrapper>
      <Footer />
    </main>
  );
};

export default Index;
