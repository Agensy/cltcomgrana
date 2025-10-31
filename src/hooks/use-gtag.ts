import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const useGtag = () => {
  const location = useLocation();
  const initedRef = useRef(false);

  // Carrega e inicializa GA4 uma única vez
  useEffect(() => {
    const measurementId = (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID;
    if (!measurementId || initedRef.current) return;

    // Evita script duplicado
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }

    // Inicialização básica
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    // Desativa page_view automático para SPA; vamos emitir em mudanças de rota
    gtag('config', measurementId, { send_page_view: false });

    initedRef.current = true;
  }, []);

  // Emite page_view em mudanças de rota
  useEffect(() => {
    if (!initedRef.current || typeof window.gtag !== 'function') return;
    try {
      const measurementId = (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID;
      if (!measurementId) return;
      // page_view recomendada para SPA
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
        send_to: measurementId,
      });
    } catch {}
  }, [location.pathname]);
};