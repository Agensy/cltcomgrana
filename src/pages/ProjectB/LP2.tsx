import BaseLandingPage from "@/components/BaseLandingPage";
import { getVariationConfig } from "@/config/variations";

const LP2 = () => {
  const config = getVariationConfig('b', 'lp2');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  return <BaseLandingPage config={config} />;
};

export default LP2;