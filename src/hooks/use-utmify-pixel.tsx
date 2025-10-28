import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Permite definir pixelId por página/variação sem quebrar chamadas existentes
export const useUtmifyPixel = (shouldLoad: boolean = false, pixelId?: string) => {
  const location = useLocation();
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Verifica se estamos em uma rota do projeto B
    const isProjectB = location.pathname.startsWith('/b/');
    
    if (!isProjectB || !shouldLoad || isLoadedRef.current) {
      return;
    }

    // Verifica se o script já foi carregado
    const existingScript = document.querySelector('script[src*="utmify.com.br"]');
    if (existingScript) {
      isLoadedRef.current = true;
      return;
    }

    // Carrega o script após um pequeno delay para não bloquear a renderização inicial
    const loadUtmifyScript = () => {
      // Define o pixelId globalmente (parametrizado com fallback)
      const defaultId = (import.meta as any)?.env?.VITE_UTMIFY_PIXEL_DEFAULT || "68e562a4c37ceae05c2d9a64";
      (window as any).pixelId = pixelId || defaultId;

      // Cria e adiciona o script do Utmify
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("defer", "");
      script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      
      // Adiciona o script ao head
      document.head.appendChild(script);
      isLoadedRef.current = true;
    };

    const timeoutId = setTimeout(loadUtmifyScript, 100);

    // Cleanup function para remover o script quando necessário
    return () => {
      clearTimeout(timeoutId);
      const scriptToRemove = document.querySelector('script[src*="utmify.com.br"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Remove o pixelId quando sair das páginas do projeto B
      delete (window as any).pixelId;
      isLoadedRef.current = false;
    };
  }, [location.pathname, shouldLoad, pixelId]);
};