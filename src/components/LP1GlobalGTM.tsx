import { useEffect } from 'react';
import { useGTM } from '@/hooks/use-gtm';

// Inicializador global de GTM para o subdomínio LP1
// - Carrega GTM (GTM-K8BN9FDK) em todas as páginas quando o host for lp1.cltcomgrana.com.br
// - Aplica um stub de fbq antes para evitar que o GTM injete Facebook Pixel no subdomínio
const LP1GlobalGTM = () => {
  const isLP1Host = typeof window !== 'undefined'
    && /(^|\.)lp1\.cltcomgrana\.com\.br$/i.test(window.location.hostname);

  // Teardown/stub de Facebook Pixel antes de carregar GTM
  useEffect(() => {
    if (!isLP1Host) return;
    try {
      (window as any).fbq = function() {};
      (window as any)._fbq = (window as any).fbq;

      document.querySelectorAll('script[src*="fbevents.js"]').forEach((s) => {
        s.parentElement?.removeChild(s);
      });

      document.querySelectorAll('noscript img[src*="facebook.com/tr"]').forEach((img) => {
        img.parentElement?.remove();
      });
    } catch {}
  }, [isLP1Host]);

  // GTM global para LP1
  useGTM(isLP1Host, 'GTM-K8BN9FDK');

  return null;
};

export default LP1GlobalGTM;