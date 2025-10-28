import { useEffect, useState } from 'react';
import Clarity from '@microsoft/clarity';

const ClarityDebugPanel = () => {
  const showInPreview = (import.meta as any)?.env?.VITE_SHOW_CLARITY_DEBUG === 'true';
  const isDev = (import.meta as any)?.env?.DEV;
  const url = typeof window !== 'undefined' ? new URL(window.location.href) : null;
  const queryDebug = !!url && (url.searchParams.get('clarityDebug') === '1' || url.searchParams.get('debug') === 'clarity');
  const localDebug = typeof window !== 'undefined' && (window as any)?.localStorage?.getItem('showClarityDebug') === 'true';
  const globalDebug = typeof window !== 'undefined' && (window as any)?.__CLARITY_DEBUG__ === true;
  const shouldShow = isDev || showInPreview || queryDebug || localDebug || globalDebug;
  if (!shouldShow) return null;

  const [hasFn, setHasFn] = useState(false);
  const [hasId, setHasId] = useState(false);
  const [hasScript, setHasScript] = useState(false);
  const [lastEvent, setLastEvent] = useState('');

  const check = () => {
    const fn = typeof (window as any)?.clarity === 'function';
    const id = !!(import.meta as any)?.env?.VITE_CLARITY_PROJECT_ID;
    const script = !!document.querySelector('script[src*="clarity.ms"]');
    setHasFn(fn);
    setHasId(id);
    setHasScript(script);
  };

  useEffect(() => {
    check();
    const t = setInterval(check, 2000);
    return () => clearInterval(t);
  }, []);

  const sendTestEvent = () => {
    try {
      Clarity.event('DebugEvent');
      setLastEvent(`DebugEvent @ ${new Date().toLocaleTimeString()}`);
      console.log('[Clarity] DebugEvent enviado');
    } catch (e) {
      console.warn('[Clarity] falha ao enviar DebugEvent', e);
    }
  };

  const base = 'fixed top-2 left-1/2 -translate-x-1/2 z-[99999] text-xs rounded shadow-lg bg-white/90 backdrop-blur px-3 py-2 border pointer-events-auto';
  const ok = 'text-green-600';
  const bad = 'text-red-600';

  return (
    <div className={base}>
      <div className="font-semibold mb-1">Clarity Debug</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        <div>fn:</div><div className={hasFn ? ok : bad}>{String(hasFn)}</div>
        <div>projectId:</div><div className={hasId ? ok : bad}>{hasId ? 'definido' : 'indefinido'}</div>
        <div>script:</div><div className={hasScript ? ok : bad}>{String(hasScript)}</div>
        <div>event:</div><div>{lastEvent || '-'}</div>
      </div>
      <button onClick={sendTestEvent} className="mt-2 px-2 py-1 bg-neutral-800 text-white rounded">Enviar DebugEvent</button>
    </div>
  );
};

export default ClarityDebugPanel;