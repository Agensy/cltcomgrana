import { useEffect, useState } from 'react';

const ClarityIndicator = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = () => {
      const ok = typeof (window as any)?.clarity === 'function';
      setActive(ok);
    };
    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mostrar em desenvolvimento ou quando explicitamente habilitado via env
  const showInPreview = (import.meta as any)?.env?.VITE_SHOW_CLARITY_BADGE === 'true';
  const shouldShow = (import.meta as any)?.env?.DEV || showInPreview;
  if (!shouldShow) return null;

  const base = 'fixed top-2 left-1/2 -translate-x-1/2 transform z-[10000] pointer-events-none text-xs px-2 py-1 rounded shadow';
  const color = active ? 'bg-green-600 text-white' : 'bg-red-600 text-white';

  return (
    <div className={`${base} ${color}`}>
      Clarity: {active ? 'ativo' : 'inativo'}
    </div>
  );
};

export default ClarityIndicator;