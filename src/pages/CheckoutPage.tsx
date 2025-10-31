import React, { useEffect, useState } from 'react';
import { getVariationConfig } from '@/config/variations';
import { useFacebookPixel } from '@/hooks/use-facebook-pixel';
import Clarity from '@microsoft/clarity';

const CheckoutPage: React.FC = () => {
  // Força o carregamento do Facebook Pixel ao montar o Checkout
  useFacebookPixel(true);
  // Captura dados da URL
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || '';
  const email = params.get('email') || '';
  const phone = params.get('phone') || '';

  // Recupera dados salvos do checkout
  let checkoutData: any = null;
  try {
    const stored = localStorage.getItem('checkoutData');
    checkoutData = stored ? JSON.parse(stored) : null;
  } catch {
    checkoutData = null;
  }

  // Resolve a variação/config com base nos dados salvos
  const project = (checkoutData?.project || '').toString().toLowerCase();
  const slug = (checkoutData?.slug || '').toString();
  const config = project && slug ? getVariationConfig(project, slug) : null;

  // URL base do checkout (variação ou fallback)
  const baseUrl = config?.checkout.checkoutUrl || 'https://pay.hotmart.com/K102191894H';

  // Monta a URL final uma única vez para evitar reloads/flicker no iframe
  const [finalUrl] = useState(() => {
    try {
      const url = new URL(baseUrl);

      // Anexa UTMs a partir dos dados salvos ou da config
      const utm = checkoutData?.utmParams || config?.checkout.utmParams;
      if (utm) {
        Object.entries(utm).forEach(([k, v]) => {
          if (v) url.searchParams.set(k, String(v));
        });
      }

      // Anexa dados do usuário (se existirem). Alguns checkouts podem ignorar.
      if (name) url.searchParams.set('name', name);
      if (email) url.searchParams.set('email', email);
      if (phone) url.searchParams.set('phone', phone);

      return url.toString();
    } catch {
      return baseUrl;
    }
  });

  useEffect(() => {
    try {
      const measurementId = (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID;
      const variation = (checkoutData?.variation || config?.id || 'unknown').toString();
      const project = (checkoutData?.project || config?.project || 'unknown').toString();
      if (
        measurementId &&
        typeof window !== 'undefined' &&
        typeof window.gtag === 'function'
      ) {
        window.gtag('event', 'InitiateCheckout', {
          project,
          variation,
          page_path: window.location.pathname,
          send_to: measurementId,
        });
      }
    } catch {}

    // Sempre envia para o GTM via dataLayer
    try {
      const variation = (checkoutData?.variation || config?.id || 'unknown').toString();
      const project = (checkoutData?.project || config?.project || 'unknown').toString();
      if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'InitiateCheckout',
          project,
          variation,
          page_path: window.location.pathname,
        });
      }
    } catch {}

    try {
      const variation = (checkoutData?.variation || config?.id || 'unknown').toString();
      const project = (checkoutData?.project || config?.project || 'unknown').toString();
      Clarity.setTag('project', project);
      Clarity.setTag('variation', variation);
      Clarity.event('InitiateCheckout');
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      <iframe
        src={finalUrl}
        className="w-full h-full border-0"
        title="Checkout"
        allow="payment; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
};

export default CheckoutPage;