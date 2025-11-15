import BaseLandingPage from "@/components/BaseLandingPage";
import { getVariationConfig } from "@/config/variations";

const LP2 = () => {
  const config = getVariationConfig('a', 'lp2');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  return <BaseLandingPage config={config} showVideo={false} showProblem={false} solutionVariant="concise" testimonialsVariant="mobilePrints" showBonus={false} ctaClassName="lp2-green" />;
};

export default LP2;
