import { useEffect, useRef } from 'react';

interface CustomScriptConfig {
  src?: string;
  innerHTML?: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  attributes?: Record<string, string>;
  onLoad?: () => void;
  onError?: (error: Event) => void;
}

export const useCustomScript = (
  shouldLoad: boolean = false, 
  config: CustomScriptConfig
) => {
  const isLoadedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!shouldLoad || isLoadedRef.current) return;

    const { src, innerHTML, id, async = true, defer = false, attributes = {}, onLoad, onError } = config;

    // Verifica se o script já existe (por src ou id)
    const existingScript = id 
      ? document.getElementById(id) as HTMLScriptElement
      : src 
        ? document.querySelector(`script[src="${src}"]`) as HTMLScriptElement
        : null;

    if (existingScript) {
      isLoadedRef.current = true;
      scriptRef.current = existingScript;
      onLoad?.();
      return;
    }

    // Cria novo script
    const script = document.createElement('script');
    
    if (src) script.src = src;
    if (innerHTML) script.innerHTML = innerHTML;
    if (id) script.id = id;
    if (async) script.async = true;
    if (defer) script.defer = true;

    // Adiciona atributos customizados
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    // Event listeners
    if (onLoad) {
      script.onload = () => {
        isLoadedRef.current = true;
        onLoad();
      };
    } else {
      script.onload = () => {
        isLoadedRef.current = true;
      };
    }

    if (onError) {
      script.onerror = onError;
    }

    // Adiciona ao DOM
    document.head.appendChild(script);
    scriptRef.current = script;

    // Cleanup
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [shouldLoad, config.src, config.innerHTML, config.id]);

  return { 
    isLoaded: isLoadedRef.current,
    scriptElement: scriptRef.current
  };
};