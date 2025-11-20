import React, { useState } from 'react';
import { useGTM } from '@/hooks/use-gtm';
import { useCustomScript } from '@/hooks/use-custom-script';
import { useFacebookPixel } from '@/hooks/use-facebook-pixel';
import { useUtmifyPixel } from '@/hooks/use-utmify-pixel';
import { useDelayedScript } from '@/hooks/use-delayed-script';

interface PageSpecificScriptsProps {
  page: string;
  project?: 'A' | 'B';
  variation?: string;
  shouldLoad?: boolean;
}

const PageSpecificScripts: React.FC<PageSpecificScriptsProps> = ({
  page,
  project,
  variation,
  shouldLoad = true
}) => {
  // Estado para controlar carregamento lazy de scripts não-críticos
  const [loadHotjar, setLoadHotjar] = useState(false);
  const [loadLinkedIn, setLoadLinkedIn] = useState(false);

  // Configuração dinâmica baseada na página
  const getScriptConfig = () => {
    const env = (import.meta as any)?.env || {};

    // Chaves específicas por página/projeto/variação
    const pageKey = page.toUpperCase().replace(/[^A-Z0-9]/g, '_');
    const projectKey = project ? `_${project}` : '';
    const variationKey = variation ? `_${variation.toUpperCase()}` : '';

    return {
      gtmContainer: env[`VITE_GTM_CONTAINER${projectKey}${variationKey}_${pageKey}`] ||
        env[`VITE_GTM_CONTAINER${projectKey}`] ||
        env.VITE_GTM_CONTAINER_DEFAULT,

      facebookPixel: env[`VITE_FACEBOOK_PIXEL${projectKey}${variationKey}_${pageKey}`] ||
        env[`VITE_FACEBOOK_PIXEL${projectKey}${variationKey}`] ||
        env.VITE_FACEBOOK_PIXEL_IDS,

      utmifyPixel: env[`VITE_UTMIFY_PIXEL${projectKey}${variationKey}_${pageKey}`] ||
        env[`VITE_UTMIFY_PIXEL${projectKey}${variationKey}`] ||
        env.VITE_UTMIFY_PIXEL_DEFAULT,

      customScript: env[`VITE_CUSTOM_SCRIPT${projectKey}${variationKey}_${pageKey}`],
      hotjarId: env[`VITE_HOTJAR_ID${projectKey}${variationKey}_${pageKey}`],
      linkedinPixel: env[`VITE_LINKEDIN_PIXEL${projectKey}${variationKey}_${pageKey}`]
    };
  };

  const config = getScriptConfig();

  // GTM - Crítico, carregar imediatamente
  const { pushEvent: gtmPushEvent } = useGTM(shouldLoad && !!config.gtmContainer, config.gtmContainer);

  // Facebook Pixel - Crítico para conversões, carregar imediatamente
  const { trackEvent: fbTrackEvent } = useFacebookPixel(shouldLoad && !!config.facebookPixel, config.facebookPixel);

  // UTMify - Crítico para tracking, carregar imediatamente
  useUtmifyPixel(shouldLoad && !!config.utmifyPixel, config.utmifyPixel);

  // Hotjar - Não-crítico, carregar após interação do usuário
  useDelayedScript(
    () => setLoadHotjar(true),
    {
      enabled: shouldLoad && !!config.hotjarId,
      onUserInteraction: true
    }
  );

  // LinkedIn - Não-crítico, carregar após 3 segundos
  useDelayedScript(
    () => setLoadLinkedIn(true),
    {
      enabled: shouldLoad && !!config.linkedinPixel,
      delay: 3000
    }
  );

  // Hotjar (carrega apenas quando loadHotjar = true)
  useCustomScript(loadHotjar && !!config.hotjarId, {
    innerHTML: `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${config.hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `,
    id: `hotjar-${config.hotjarId}`
  });

  // LinkedIn Pixel (carrega apenas quando loadLinkedIn = true)
  useCustomScript(loadLinkedIn && !!config.linkedinPixel, {
    innerHTML: `
      _linkedin_partner_id = "${config.linkedinPixel}";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `,
    id: `linkedin-${config.linkedinPixel}`
  });

  useCustomScript(loadLinkedIn && !!config.linkedinPixel, {
    src: 'https://snap.licdn.com/li.lms-analytics/insight.min.js',
    id: 'linkedin-insight'
  });

  // Script customizado genérico
  useCustomScript(shouldLoad && !!config.customScript, {
    src: config.customScript,
    id: `custom-script-${page}`
  });

  // Funções para disparar eventos
  const trackPageView = () => {
    gtmPushEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page: page,
      project: project,
      variation: variation
    });

    fbTrackEvent('PageView');
  };

  const trackCustomEvent = (eventName: string, parameters?: any) => {
    gtmPushEvent(eventName, {
      ...parameters,
      page: page,
      project: project,
      variation: variation
    });

    fbTrackEvent(eventName, parameters);
  };

  // Auto-track page view quando scripts carregam
  React.useEffect(() => {
    if (shouldLoad) {
      const timer = setTimeout(trackPageView, 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldLoad, page, project, variation]);

  return null; // Componente invisível
};

export default PageSpecificScripts;