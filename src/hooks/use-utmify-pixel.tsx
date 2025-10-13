import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useUtmifyPixel = () => {
  const location = useLocation();

  useEffect(() => {
    // Verifica se estamos em uma rota do projeto B
    const isProjectB = location.pathname.startsWith('/b/');
    
    if (!isProjectB) {
      return;
    }

    // Verifica se o script já foi carregado
    const existingScript = document.querySelector('script[src*="utmify.com.br"]');
    if (existingScript) {
      return;
    }

    // Define o pixelId globalmente
    (window as any).pixelId = "68e562a4c37ceae05c2d9a64";

    // Cria e adiciona o script do Utmify
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("defer", "");
    script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    
    // Adiciona o script ao head
    document.head.appendChild(script);

    // Cleanup function para remover o script quando necessário
    return () => {
      const scriptToRemove = document.querySelector('script[src*="utmify.com.br"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Remove o pixelId quando sair das páginas do projeto B
      delete (window as any).pixelId;
    };
  }, [location.pathname]);
};