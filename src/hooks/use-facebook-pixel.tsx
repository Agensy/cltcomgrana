import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const useFacebookPixel = (shouldLoad: boolean = false) => {
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!shouldLoad || isLoadedRef.current) {
      return;
    }

    // Verifica se o script já foi carregado
    const existingScript = document.querySelector('script[src*="fbevents.js"]');
    if (existingScript) {
      isLoadedRef.current = true;
      return;
    }

    // Carrega o Facebook Pixel de forma assíncrona
    const loadFacebookPixel = () => {
      // Inicializa a função fbq
      if (!window.fbq) {
        (function(f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
          if (f.fbq) return;
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = true;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = true;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', undefined, undefined, undefined);
      }

      // Inicializa o pixel com o ID
      window.fbq('init', '1148863280512739');
      window.fbq('track', 'PageView');

      // Adiciona o noscript fallback se não existir
      if (!document.querySelector('noscript img[src*="facebook.com/tr"]')) {
        const noscript = document.createElement('noscript');
        const img = document.createElement('img');
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';
        img.src = 'https://www.facebook.com/tr?id=1148863280512739&ev=PageView&noscript=1';
        noscript.appendChild(img);
        document.body.appendChild(noscript);
      }

      isLoadedRef.current = true;
    };

    // Carrega o script após um pequeno delay para não bloquear a renderização inicial
    const timeoutId = setTimeout(loadFacebookPixel, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldLoad]);

  // Função para disparar eventos customizados do Facebook
  const trackEvent = (eventName: string, parameters?: any) => {
    if (window.fbq && isLoadedRef.current) {
      window.fbq('track', eventName, parameters);
    }
  };

  return { trackEvent, isLoaded: isLoadedRef.current };
};