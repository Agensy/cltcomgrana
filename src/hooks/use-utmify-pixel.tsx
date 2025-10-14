import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useUtmifyPixel = (shouldLoad: boolean = false) => {
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
      // Define o pixelId globalmente
      (window as any).pixelId = "68e562a4c37ceae05c2d9a64";

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
  }, [location.pathname, shouldLoad]);
};