import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlowButton from "@/components/ui/GlowButton";
import { Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useClarityInline } from "@/hooks/use-clarity-inline";
import "@/components/ui/liquid-glass.css";

const PreLP2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ctaVisible, setCtaVisible] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const disclaimerTimerRef = useRef<number | null>(null);
  const gestureHandledRef = useRef(false);
  const [simProgress, setSimProgress] = useState(0);
  const [useIframe, setUseIframe] = useState(false);
  useClarityInline('tx61eiszrq');

  useEffect(() => {
    try {
      const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
      setUseIframe(isMobile);
    } catch {}
  }, []);

  const mobileId = "3c4a4d7f-bd19-45aa-81e2-18113c350d32";
  const desktopId = "cb55e144-797f-41e5-9b4f-d4deb0676802";
  const selectedId = useIframe ? mobileId : desktopId;
  const hlsUrl = `https://b-vz-1e7e0b7e-27c.tv.pandavideo.com.br/${selectedId}/playlist.m3u8`;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const setup = () => {
      v.autoplay = true;
      v.controls = true;
      v.muted = false;
      (v as any).playsInline = true;
      v.preload = "auto";
    };
    const tryPlay = () => {
      setup();
      const p = v.play();
      if (p && typeof (p as any).catch === "function") (p as any).catch(() => {
        try {
          v.muted = true;
          const p2 = v.play();
          if (p2 && typeof (p2 as any).catch === "function") (p2 as any).catch(() => {});
          setTimeout(() => {
            try {
              v.muted = false;
              v.volume = 1.0;
              const p3 = v.play();
              if (p3 && typeof (p3 as any).catch === "function") (p3 as any).catch(() => {});
            } catch {}
          }, 500);
        } catch {}
      });
    };
    const canNative = v.canPlayType("application/vnd.apple.mpegURL");
    if (useIframe) {
      // Em modo iframe, não configurar HLS no elemento visível; manter somente ref escondido para timers/eventos
      return;
    }
    if (canNative) {
      v.src = hlsUrl;
      tryPlay();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
      script.async = true;
      script.onload = () => {
        try {
          const Hls = (window as any).Hls;
          if (Hls && Hls.isSupported()) {
            const hls = new Hls({ enableWorker: true });
            hls.loadSource(hlsUrl);
            hls.attachMedia(v);
            tryPlay();
          } else {
            v.src = hlsUrl;
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
    }
  }, [useIframe, hlsUrl]);

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
        if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
      } catch {}
    };
    document.addEventListener("click", handler, { once: true });
    document.addEventListener("touchstart", handler, { once: true });
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onFirstPlay = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      timerRef.current = window.setTimeout(() => setCtaVisible(true), 60000);
      disclaimerTimerRef.current = window.setTimeout(() => setDisclaimerVisible(true), 38000);
    };
    v.addEventListener("play", onFirstPlay);
    return () => {
      v.removeEventListener("play", onFirstPlay);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (disclaimerTimerRef.current) window.clearTimeout(disclaimerTimerRef.current);
    };
  }, []);

  useEffect(() => {
    let t: number | null = null;
    const intervalMs = 450;
    const increment = 100 / (45000 / intervalMs);
    const step = () => {
      setSimProgress((p) => {
        const next = Math.min(p + increment, 100);
        if (next < 100) t = window.setTimeout(step, intervalMs);
        return next;
      });
    };
    t = window.setTimeout(step, intervalMs);
    return () => { if (t) window.clearTimeout(t); };
  }, []);

  const handleCTA = () => {
    navigate("/b/lp2" + (location.search || ""));
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => {
      navigate("/b/lp2" + (location.search || ""));
    };
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
    };
  }, [navigate, location.search]);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 pt-12 sm:pt-16 pb-12 bg-gradient-to-b from-neutral-950 via-neutral-900 to-background">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4 leading-tight">
            Como um aluno criou um site completo em <span className="text-primary">20 minutos</span> usando apenas <span className="text-primary">1 prompt</span> e vendeu por <span className="text-primary">900 reais</span> em <span className="text-primary">menos de 7 dias</span>.
          </h1>
          <p className="text-center text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto mb-8 opacity-90">
            “Assista ao vídeo e veja exatamente como ele fez. Se ele conseguiu, você também consegue.”
          </p>
          

          <div className="rounded-2xl ring-1 ring-white/10 border border-white/10 overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)] bg-black/30">
            <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
              {useIframe ? (
                <iframe
                  id={`panda-${mobileId}`}
                  src={`https://player-vz-1e7e0b7e-27c.tv.pandavideo.com.br/embed/?v=${mobileId}`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  fetchpriority="high"
                />
              ) : (
                <video
                  ref={videoRef}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)", transformOrigin: "center" }}
                  playsInline
                  // @ts-ignore
                  fetchpriority="high"
                />
              )}
              {useIframe && (
                <video
                  ref={videoRef}
                  style={{ position: 'absolute', left: -99999, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                  playsInline
                />
              )}
              {disclaimerVisible && (
                <div
                  className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 sm:bottom-3 md:bottom-4 transform max-w-[70%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[45%] text-center"
                  role="note"
                  aria-label="Aviso de conteúdo gerado por IA"
                >
                  <div className="liquid-glass-orange inline-flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    <span className="text-[11px] sm:text-[12px] leading-snug font-medium text-zinc-100">
                      Tudo é preenchido automaticamente pela IA. Sem formulários nem trabalho manual.
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 px-1" aria-hidden="true">
              <div className="h-1.5 bg-zinc-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${simProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Badge className="liquid-glass inline-flex items-center gap-2 justify-center sm:justify-start text-zinc-200 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>Não precisa saber mexer com tecnologia</span>
            </Badge>
            <Badge className="liquid-glass inline-flex items-center gap-2 justify-center sm:justify-start text-zinc-200 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>Não precisa ser designer ou programador</span>
            </Badge>
            <Badge className="liquid-glass inline-flex items-center gap-2 justify-center sm:justify-start text-zinc-200 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>A IA faz praticamente tudo por você</span>
            </Badge>
          </div>

          <div className="mt-6 border-t border-white/10" />

          <div className="mt-6 text-center">
            {ctaVisible ? (
              <div className="animate-fade-in inline-block">
                <GlowButton onClick={handleCTA} className="mx-auto">
                  <span className="inline-flex items-center gap-2">Quero Conhecer o Treinamento</span>
                </GlowButton>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PreLP2;
