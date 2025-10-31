import { useGTM } from '@/hooks/use-gtm';

// Inicializador global de GTM para o subdomínio LP1
// - Carrega GTM (GTM-K8BN9FDK) em todas as páginas quando o host for lp1.cltcomgrana.com.br
const LP1GlobalGTM = () => {
  const isLP1Host = typeof window !== 'undefined'
    && /(^|\.)lp1\.cltcomgrana\.com\.br$/i.test(window.location.hostname);

  // GTM global para LP1
  useGTM(isLP1Host, 'GTM-K8BN9FDK');

  return null;
};

export default LP1GlobalGTM;