import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlowButton from "@/components/ui/GlowButton";

const PreLP2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ctaVisible, setCtaVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [simProgress, setSimProgress] = useState(0);

  const hlsUrl = "https://b-vz-1e7e0b7e-27c.tv.pandavideo.com.br/cb55e144-797f-41e5-9b4f-d4deb0676802/playlist.m3u8";

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
      if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
    };
    const canNative = v.canPlayType("application/vnd.apple.mpegURL");
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
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onFirstPlay = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      timerRef.current = window.setTimeout(() => setCtaVisible(true), 60000);
    };
    v.addEventListener("play", onFirstPlay);
    return () => {
      v.removeEventListener("play", onFirstPlay);
      if (timerRef.current) window.clearTimeout(timerRef.current);
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

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 pt-8 sm:pt-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4">
            Crie sites profissionais com IA em minutos — sem experiência
          </h1>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-zinc-300">
            <span className="inline-flex items-center gap-2">Sem experiência</span>
            <span className="inline-flex items-center gap-2">Em minutos</span>
            <span className="inline-flex items-center gap-2">Resultados reais</span>
          </div>

          <div className="rounded-xl border border-border/50 overflow-hidden shadow-[0_0_40px_rgba(255,102,0,0.15)]">
            <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
              <video
                ref={videoRef}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)", transformOrigin: "center" }}
                playsInline
                // @ts-ignore
                fetchpriority="high"
              />
              <div
                className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 sm:bottom-3 sm:left-1/2 sm:-translate-x-1/2 transform max-w-[70%] bg-black/50 text-white rounded-md px-2 py-1.5 backdrop-blur-md shadow-md border border-white/20 text-center"
                role="note"
                aria-label="Aviso de conteúdo gerado por IA"
              >
                <p className="text-[10px] sm:text-[11px] leading-snug">
                  Tudo é preenchido automaticamente pela IA. Sem formulários nem trabalho manual.
                </p>
              </div>
            </div>
            <div className="mt-2 px-1" aria-hidden="true">
              <div className="h-1.5 bg-zinc-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${simProgress}%` }} />
              </div>
            </div>
          </div>

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

