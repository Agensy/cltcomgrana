import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __fbq_initialized_ids?: Set<string>;
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
    // Se não houver variável de ambiente, inicializa ambos os pixels por padrão
    const envIdsRaw = (import.meta as any)?.env?.VITE_FACEBOOK_PIXEL_IDS || '1148863280512739,1597639481206943';
    const pixelIds = String(envIdsRaw)
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

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

      // Inicializa múltiplos pixels de forma idempotente
      if (!window.__fbq_initialized_ids) {
        window.__fbq_initialized_ids = new Set<string>();
      }

      pixelIds.forEach((id) => {
        if (!window.__fbq_initialized_ids!.has(id)) {
          window.fbq('init', id);
          window.__fbq_initialized_ids!.add(id);

          // Adiciona noscript fallback por pixel se não existir
          const existingNoscriptForId = document.querySelector(`noscript img[src*="facebook.com/tr?id=${id}"]`);
          if (!existingNoscriptForId) {
            const noscript = document.createElement('noscript');
            const img = document.createElement('img');
            img.height = 1;
            img.width = 1;
            img.style.display = 'none';
            img.src = `https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`;
            noscript.appendChild(img);
            document.body.appendChild(noscript);
          }
        }
      });

      // Dispara PageView para todos os pixels inicializados
      window.fbq('track', 'PageView');

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