export interface SubdomainConfig {
  key: string;
  hostPattern: RegExp;
  home: string; // path-style home resolver (e.g., 'b/lp1')
  blockGlobalScripts?: boolean;
  gtmContainer?: string;
}

// Mapeamento inicial de subdomínios. Expanda conforme necessário.
const SUBDOMAINS: SubdomainConfig[] = [
  {
    key: 'lp1',
    hostPattern: /(^|\.)lp1\.cltcomgrana\.com\.br$/i,
    home: 'b/lp1',
    blockGlobalScripts: true,
    gtmContainer: 'GTM-K8BN9FDK'
  }
];

export const getActiveSubdomain = (hostname?: string): string | undefined => {
  const host = hostname || (typeof window !== 'undefined' ? window.location.hostname : '');
  const match = SUBDOMAINS.find((s) => s.hostPattern.test(host));
  return match?.key;
};

export const getSubdomainHome = (fallback?: string): string | undefined => {
  const active = getActiveSubdomain();
  const cfg = SUBDOMAINS.find((s) => s.key === active);
  return cfg?.home || fallback;
};

export const shouldBlockGlobalScripts = (): boolean => {
  const active = getActiveSubdomain();
  const cfg = SUBDOMAINS.find((s) => s.key === active);
  return !!cfg?.blockGlobalScripts;
};

export const getSubdomainGTMContainer = (): string | undefined => {
  const active = getActiveSubdomain();
  const cfg = SUBDOMAINS.find((s) => s.key === active);
  return cfg?.gtmContainer;
};