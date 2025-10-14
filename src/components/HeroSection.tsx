import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import heroBackground from "@/assets/hero-background-optimized.jpg";
import heroMobile from "@/assets/hero-mobile.webp";
import logo from "@/assets/logo-clt-com-grana.webp";
// Removendo animações para melhorar LCP no mobile

const HeroSection = () => {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('final-offer');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Background Image com picture/srcset e fetchpriority alto */}
      <picture className="absolute inset-0">
        <source srcSet={heroMobile} media="(max-width: 768px)" />
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover opacity-70"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </picture>

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content sem framer-motion para reduzir custo de renderização inicial */}
          <div>
            <div className="mb-8">
              <img src={logo} alt="CLT com Grana" className="w-56" loading="eager" decoding="async" />
            </div>

            <h1 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-6xl hero-title">
              Crie e venda sites<br />
              profissionais com <span className="text-gradient-orange">I.A em
              minutos</span> mesmo sem<br />
              experiência e sem<br />
              investimento
            </h1>

            <ul className="space-y-1 mb-8">
              {["Sites prontos em minutos com I.A fácil de usar", "Passo a passo simplificado e detalhado", "Faça de R$ 500 a R$ 2.000 por projeto"].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <Check className="w-5 h-5 icon-gradient-orange flex-shrink-0" />
                  <span className="text-zinc-400">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mb-8 text-lg text-zinc-300">
              Seu primeiro site vendido em 07 dias ou seu dinheiro de volta.
            </p>

            <div>
              <GlowButton onClick={scrollToOffer}>
                GARANTIR MINHA VAGA AGORA
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;