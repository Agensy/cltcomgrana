import { useEffect, useState, useRef } from 'react';

export const useLazyScripts = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Função para detectar quando a HeroSection foi carregada
    const detectHeroLoad = () => {
      // Aguarda um pouco para garantir que o DOM foi renderizado
      setTimeout(() => {
        const heroSection = document.querySelector('section[class*="min-h-screen"]');
        
        if (heroSection) {
          // Cria um observer para detectar quando a HeroSection está visível
          observerRef.current = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                  // HeroSection está visível, pode carregar os scripts
                  setHeroLoaded(true);
                  // Para de observar após detectar
                  if (observerRef.current) {
                    observerRef.current.disconnect();
                  }
                }
              });
            },
            {
              threshold: 0.1, // Dispara quando 10% da HeroSection está visível
              rootMargin: '0px 0px -10% 0px' // Margem para disparar um pouco antes
            }
          );

          observerRef.current.observe(heroSection);
        } else {
          // Fallback: se não encontrar a HeroSection, carrega após 2 segundos
          setTimeout(() => setHeroLoaded(true), 2000);
        }
      }, 500); // Aguarda 500ms para o DOM estar pronto
    };

    detectHeroLoad();

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { heroLoaded };
};