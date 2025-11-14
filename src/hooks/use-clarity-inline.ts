import { useEffect, useRef } from 'react';

export const useClarityInline = (projectId?: string) => {
  const initedRef = useRef(false);
  useEffect(() => {
    if (initedRef.current) return;
    if (!projectId) return;
    const w: any = window;
    const d = document;
    const a = 'clarity';
    if (typeof w[a] !== 'function') {
      w[a] = function () { (w[a].q = w[a].q || []).push(arguments); };
      const t = d.createElement('script');
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + projectId;
      const y = d.getElementsByTagName('script')[0];
      y.parentNode?.insertBefore(t, y);
    }
    initedRef.current = true;
  }, [projectId]);
};

