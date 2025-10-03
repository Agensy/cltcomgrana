import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StorySection from "@/components/StorySection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import ForWhoSection from "@/components/ForWhoSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <StorySection />
      <SolutionSection />
      <BenefitsSection />
      <ForWhoSection />
      <GuaranteeSection />
      <LeadForm />
    </main>
  );
};

export default Index;
