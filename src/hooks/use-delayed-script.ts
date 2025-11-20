import { useEffect, useRef } from 'react';

interface UseDelayedScriptOptions {
    enabled: boolean;
    delay?: number; // delay in milliseconds
    onUserInteraction?: boolean; // load on first user interaction
}

/**
 * Hook para carregar scripts de forma lazy (atrasada)
 * Reduz o impacto no carregamento inicial da página
 */
export const useDelayedScript = (
    scriptLoader: () => void,
    options: UseDelayedScriptOptions
) => {
    const { enabled, delay = 3000, onUserInteraction = false } = options;
    const loadedRef = useRef(false);

    useEffect(() => {
        if (!enabled || loadedRef.current) return;

        const loadScript = () => {
            if (loadedRef.current) return;
            loadedRef.current = true;
            scriptLoader();
        };

        if (onUserInteraction) {
            // Carregar após primeira interação do usuário
            const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
            const handler = () => {
                loadScript();
                events.forEach(event => document.removeEventListener(event, handler));
            };

            events.forEach(event => document.addEventListener(event, handler, { once: true, passive: true }));

            return () => {
                events.forEach(event => document.removeEventListener(event, handler));
            };
        } else {
            // Carregar após delay
            const timer = setTimeout(loadScript, delay);
            return () => clearTimeout(timer);
        }
    }, [enabled, delay, onUserInteraction, scriptLoader]);
};
