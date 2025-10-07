import BaseLandingPage from "@/components/BaseLandingPage";
import { getVariationConfig } from "@/config/variations";

const LP3 = () => {
  const config = getVariationConfig('a', 'lp3');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  return <BaseLandingPage config={config} />;
};

export default LP3;