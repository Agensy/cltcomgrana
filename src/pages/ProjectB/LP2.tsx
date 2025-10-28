import BaseLandingPage from "@/components/BaseLandingPage";
import { getVariationConfig } from "@/config/variations";
import { useEffect } from "react";

const LP2 = () => {
  const config = getVariationConfig('b', 'lp2');
  
  if (!config) {
    return <div>Configuração não encontrada</div>;
  }

  // Instala scripts específicos da LP2: UTMify (latest.js) e Back Redirect
  useEffect(() => {
    // Script de back redirect
    const link = 'https://meubackredirect.com.br';
    let urlBackRedirect = link.trim();
    urlBackRedirect = urlBackRedirect + (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') + document.location.search.replace('?', '').toString();

    // Empurra estados para interceptar o back
    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);

    const onPopState = () => {
      console.log('onpopstate', urlBackRedirect);
      setTimeout(() => {
        location.href = urlBackRedirect;
      }, 1);
    };

    window.addEventListener('popstate', onPopState);

    // Script UTMify latest.js com prevent-subids (escopo LP2)
    const existingUtmsScript = document.querySelector('script[data-utmify-from="lp2"]');
    if (!existingUtmsScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-utmify-prevent-subids', '');
      script.setAttribute('data-utmify-from', 'lp2');
      document.head.appendChild(script);
    }

    return () => {
      window.removeEventListener('popstate', onPopState);
      const scriptToRemove = document.querySelector('script[data-utmify-from="lp2"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return <BaseLandingPage config={config} />;
};

export default LP2;