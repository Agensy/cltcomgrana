import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <GuaranteeSection />
      <LeadForm />
    </main>
  );
};

export default Index;
