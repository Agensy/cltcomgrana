import React, { useEffect } from "react";

// VTurb SmartPlayer embed exclusivo da LP2
// Renderiza o custom element e injeta os scripts/links necessários no <head>
const Lp2VTurbVideo: React.FC = () => {
  useEffect(() => {
    const urls = {
      playerJs:
        "https://scripts.converteai.net/a9fb935f-36e0-4753-9a43-7758a0aa0378/players/6919b9c4f65a4dcdb5b21eaa/v4/player.js",
      smartplayerJs:
        "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js",
      m3u8:
        "https://cdn.converteai.net/a9fb935f-36e0-4753-9a43-7758a0aa0378/6919b9b7b788ee53b44922e7/main.m3u8",
      cdn: "https://cdn.converteai.net",
      scripts: "https://scripts.converteai.net",
      images: "https://images.converteai.net",
      api: "https://api.vturb.com.br",
    };

    const head = document.head;
    const appended: (HTMLLinkElement | HTMLScriptElement)[] = [];

    const addLink = (rel: string, href: string, as?: string) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (as) link.as = as as any;
      head.appendChild(link);
      appended.push(link);
      return link;
    };

    // Preloads
    addLink("preload", urls.playerJs, "script");
    addLink("preload", urls.smartplayerJs, "script");
    addLink("preload", urls.m3u8, "fetch");
    // DNS Prefetch
    addLink("dns-prefetch", urls.cdn);
    addLink("dns-prefetch", urls.scripts);
    addLink("dns-prefetch", urls.images);
    addLink("dns-prefetch", urls.api);

    // Performance marker
    (function (i: any, n: any) {
      i._plt = i._plt || (n && n.timeOrigin ? n.timeOrigin + n.now() : Date.now());
    })(window as any, performance as any);

    // Append VTurb player script
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = urls.playerJs;
    s.async = true;
    head.appendChild(s);
    appended.push(s);

    return () => {
      // Cleanup para evitar duplicação ao navegar
      appended.forEach((el) => {
        try {
          el.parentNode?.removeChild(el);
        } catch {}
      });
    };
  }, []);

  // Usar createElement para evitar erro de TS com custom element
  return (
    <div className="mx-auto max-w-3xl px-4">
      {React.createElement("vturb-smartplayer", {
        id: "vid-6919b9c4f65a4dcdb5b21eaa",
        style: { display: "block", margin: "0 auto", width: "100%" },
      })}
    </div>
  );
};

export default Lp2VTurbVideo;