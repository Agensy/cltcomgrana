import BaseLandingPage from "@/components/BaseLandingPage";
import { getVariationConfig } from "@/config/variations";

const LP1 = () => {
  const config = getVariationConfig('a', 'lp1');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  return <BaseLandingPage config={config} />;
};

export default LP1;