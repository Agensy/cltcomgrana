import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Clarity from '@microsoft/clarity';
import { getSubdomainClarityProjectId } from '@/config/subdomains';
import { useAuth } from '@/contexts/AuthContext';

// Inicializa Microsoft Clarity e acompanha mudanças de rota
export const useClarity = () => {
  const location = useLocation();
  const { user } = useAuth();
  const initedRef = useRef(false);

  // Inicialização única
  useEffect(() => {
    const subdomainId = getSubdomainClarityProjectId();
    const projectId = subdomainId || (import.meta as any)?.env?.VITE_CLARITY_PROJECT_ID;
    if (initedRef.current) return;

    try {
      // Suporte híbrido: se já houver snippet inline (window.clarity), não chamar init novamente
      const hasGlobalClarity = typeof (window as any)?.clarity === 'function';
      console.log('[Clarity] verificação inicial', {
        hasGlobalClarity,
        projectId: projectId ? `definido (${projectId ? 'subdomain' : 'env'})` : 'indefinido',
        mode: (import.meta as any)?.env?.MODE,
      });
      if (hasGlobalClarity) {
        initedRef.current = true;
      } else {
        if (!projectId) return;
        Clarity.init(projectId);
        console.log('[Clarity] init chamado com projectId');
        initedRef.current = true;
      }
      // Tag inicial de rota
      Clarity.setTag('route', location.pathname);
      console.log('[Clarity] tag de rota definida (init):', location.pathname);
    } catch (err) {
      console.error('Falha ao inicializar Microsoft Clarity:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tag de rota e evento em mudanças de pathname
  useEffect(() => {
    if (!initedRef.current) return;
    try {
      Clarity.setTag('route', location.pathname);
      Clarity.event('RouteChange');
      console.log('[Clarity] RouteChange:', location.pathname);
    } catch {}
  }, [location.pathname]);

  // Identify com e-mail quando autenticado
  useEffect(() => {
    if (!initedRef.current) return;
    const email = user?.email;
    if (email && user?.isAuthenticated) {
      try {
        Clarity.identify(email);
        Clarity.setTag('auth', 'true');
        console.log('[Clarity] identify chamado para:', email);
      } catch {}
    }
  }, [user?.email, user?.isAuthenticated]);
};