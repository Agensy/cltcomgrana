import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const useGTM = (shouldLoad: boolean = false, containerId?: string) => {
  const isLoadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!shouldLoad || !containerId) return;

    // Evita carregar o mesmo container múltiplas vezes
    if (isLoadedRef.current.has(containerId)) return;

    // Verifica se o script já foi carregado
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtm.js?id=${containerId}"]`
    );
    
    if (!existingScript) {
      // Inicializa dataLayer se não existir
      window.dataLayer = window.dataLayer || [];
      
      // Adiciona o script do GTM
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
      document.head.appendChild(script);

      // Adiciona noscript fallback
      const existingNoscript = document.querySelector(`noscript iframe[src*="googletagmanager.com/ns.html?id=${containerId}"]`);
      if (!existingNoscript) {
        const noscript = document.createElement('noscript');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
        iframe.height = '0';
        iframe.width = '0';
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        noscript.appendChild(iframe);
        document.body.appendChild(noscript);
      }

      // Push inicial do GTM
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
    }

    isLoadedRef.current.add(containerId);
  }, [shouldLoad, containerId]);

  // Função para enviar eventos customizados
  const pushEvent = (eventName: string, parameters?: any) => {
    if (window.dataLayer && isLoadedRef.current.has(containerId || '')) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      });
    }
  };

  return { 
    pushEvent, 
    isLoaded: containerId ? isLoadedRef.current.has(containerId) : false 
  };
};