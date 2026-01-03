/// <reference types="vite/client" />

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: any;
    _fbq: any;
    __fbq_initialized_ids?: Set<string>;
  }
}

export {};
