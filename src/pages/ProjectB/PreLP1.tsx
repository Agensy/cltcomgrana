import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Shield, ArrowRight, Play, Volume2 } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { getVariationConfig } from "@/config/variations";
import Clarity from "@microsoft/clarity";

const PreLP1 = () => {
  const config = getVariationConfig('b', 'lp1');
  const navigate = useNavigate();
  const [ctaVisible, setCtaVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const gestureHandledRef = useRef(false);
  const [simProgress, setSimProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setCtaVisible(true);
      try { Clarity.event('PreLP1_CTA_Shown'); } catch {}
    }, 60000);
    return () => clearTimeout(t);
  }, []);

  const buildCheckoutUrl = useMemo(() => {
    return () => {
      try {
        const url = new URL(config?.checkout.checkoutUrl || '');
        const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
        const hasWindow = typeof window !== 'undefined';
        const searchParams = hasWindow ? new URLSearchParams(window.location.search) : null;
        keys.forEach((key) => {
          const fromQuery = searchParams?.get(key);
          const fallback = (config?.checkout.utmParams as any)?.[key];
          const value = fromQuery || fallback;
          if (value) url.searchParams.set(key, value);
        });
        return url.toString();
      } catch {
        return config?.checkout.checkoutUrl || '';
      }
    };
  }, [config]);

  const handleCTA = () => {
    try { Clarity.event('PreLP1_CTA_Click'); } catch {}
    const target = buildCheckoutUrl();
    if (target) {
      window.location.href = target;
    }
  };

  // PandaVideo embed com autoplay e controles do player
  const hlsUrl = "https://b-vz-1e7e0b7e-27c.tv.pandavideo.com.br/cb55e144-797f-41e5-9b4f-d4deb0676802/playlist.m3u8";

  // Inicializa HLS: nativo (Safari) ou via hls.js
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const setupVideoProps = () => {
      v.autoplay = true;
      v.controls = false; // retirar barra de controle nativa
      v.muted = false;
      (v as any).playsInline = true;
      v.preload = 'auto';
    };
    const tryPlay = () => {
      setupVideoProps();
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    };

    const canNative = v.canPlayType('application/vnd.apple.mpegURL');
    if (canNative) {
      v.src = hlsUrl;
      v.addEventListener('loadedmetadata', () => { try { Clarity.event('PreLP1_Video_Loaded'); } catch {} }, { once: true });
      tryPlay();
      return;
    }

    // Carrega hls.js via CDN para navegadores sem suporte nativo
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    script.async = true;
    script.onload = () => {
      try {
        const Hls = (window as any).Hls;
        if (Hls && Hls.isSupported()) {
          const hls = new Hls({ enableWorker: true });
          hls.loadSource(hlsUrl);
          hls.attachMedia(v);
          v.addEventListener('loadedmetadata', () => { try { Clarity.event('PreLP1_Video_Loaded'); } catch {} }, { once: true });
          tryPlay();
        } else {
          // Fallback direto
          v.src = hlsUrl;
          v.addEventListener('loadedmetadata', () => { try { Clarity.event('PreLP1_Video_Loaded'); } catch {} }, { once: true });
          tryPlay();
        }
      } catch {
        v.src = hlsUrl;
        tryPlay();
      }
    };
    document.head.appendChild(script);
    return () => {
      try { document.head.removeChild(script); } catch {}
    };
  }, []);

  // Sem overlays: no primeiro toque/clique, tentar habilitar áudio e dar play
  useEffect(() => {
    const handler = () => {
      if (gestureHandledRef.current) return;
      gestureHandledRef.current = true;
      const v = videoRef.current;
      if (!v) return;
      try {
        v.muted = false;
        v.volume = 1.0;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {}
    };
    document.addEventListener('click', handler, { once: true });
    document.addEventListener('touchstart', handler, { once: true });
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  // Ao terminar o vídeo: navegar para a LP1 completa
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => {
      try { Clarity.event('PreLP1_Video_Ended'); } catch {}
      const qs = typeof window !== 'undefined' ? window.location.search : '';
      navigate('/b/lp1' + qs);
    };
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('ended', onEnded);
    };
  }, [navigate]);

  useEffect(() => {
    let t: any;
    const intervalMs = 450; // ~100 ticks in 45s
    const increment = 100 / (45000 / intervalMs); // 1% por tick
    const step = () => {
      setSimProgress((p) => {
        const next = Math.min(p + increment, 100);
        if (next < 100) {
          t = setTimeout(step, intervalMs);
        }
        return next;
      });
    };
    t = setTimeout(step, intervalMs);
    return () => { if (t) clearTimeout(t); };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero minimal focado em vídeo */}
      <section className="relative overflow-hidden px-4 pt-8 sm:pt-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4">
            Crie sites profissionais com IA em minutos — sem experiência
          </h1>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-zinc-300">
            <span className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              Sem experiência
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              Em minutos
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              Resultados reais
            </span>
          </div>

          {/* Vídeo destacado */}
          <div className="rounded-xl border border-border/50 overflow-hidden shadow-[0_0_40px_rgba(255,102,0,0.15)]">
            <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1)', transformOrigin: 'center' }}
                // @ts-ignore
                playsInline
                // @ts-ignore
                fetchpriority="high"
              />
            </div>
            <div className="mt-2 px-1" aria-hidden="true">
              <div className="h-1.5 bg-zinc-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${simProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Botão com delay */}
          <div className="mt-6 text-center">
            {ctaVisible ? (
              <div className="animate-fade-in inline-block">
                <GlowButton onClick={handleCTA} className="mx-auto">
                  <span className="inline-flex items-center gap-2">
                    Quero Conhecer o Treinamento
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </GlowButton>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </section>

      
    </main>
  );
};

export default PreLP1;