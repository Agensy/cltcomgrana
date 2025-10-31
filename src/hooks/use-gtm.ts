import { useEffect, useRef } from 'react';

export const useGTM = (shouldLoad: boolean = false, containerId?: string) => {
  const isLoadedRef = useRef<Set<string>>(new Set());

  // Detecta se GTM já está presente na página (inserido globalmente ou por outro componente)
  const hasGtmPresent = () => {
    const id = containerId || '';
    if (!id || typeof document === 'undefined') return false;
    const script = !!document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${id}"]`);
    const gtmObj = typeof (window as any)?.google_tag_manager === 'object' && !!(window as any).google_tag_manager[id];
    return script || gtmObj;
  };

  useEffect(() => {
    if (!shouldLoad || !containerId) return;

    // Evita carregar o mesmo container múltiplas vezes
    if (isLoadedRef.current.has(containerId)) {
      return;
    }

    // Inicializa dataLayer ANTES de verificar scripts existentes
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      // Push inicial do GTM
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
    }

    // Verifica se o script já foi carregado
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtm.js?id=${containerId}"]`
    );
    
    if (existingScript) {
      isLoadedRef.current.add(containerId);
      return;
    }
    
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

    isLoadedRef.current.add(containerId);
  }, [shouldLoad, containerId]);

  // Marcar como carregado quando GTM já está presente, mesmo que shouldLoad=false
  useEffect(() => {
    if (!containerId) return;
    if (hasGtmPresent()) {
      isLoadedRef.current.add(containerId);
    }
  }, [containerId]);

  // Função para enviar eventos customizados
  const pushEvent = (eventName: string, parameters?: any) => {
    const id = containerId || '';
    (window as any).dataLayer = (window as any).dataLayer || [];
    const canPush = isLoadedRef.current.has(id) || hasGtmPresent();
    if (canPush) {
      (window as any).dataLayer.push({
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