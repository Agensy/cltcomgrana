import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import heroBackground from "@/assets/hero-background.jpg";
import logo from "@/assets/logo-clt-com-grana.webp";
const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{
      backgroundImage: `url(${heroBackground})`
    }} />
      <div className="absolute inset-0 bg-gradient-overlay" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-8">
              <img src={logo} alt="CLT com Grana" className="w-56" />
            </div>

            <h1 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              Crie e venda sites profissionais com{" "}
              <span className="text-primary">I.A em minutos</span>{" "}
              mesmo sem experiência e sem investimento
            </h1>

            <ul className="space-y-2 mb-8">
              {["Ferramenta exclusiva de I.A", "Agentes de vendas", "Sites prontos em minutos", "Crie sem experiência", "Venda de R$ 500 a R$ 2.000 por projeto"].map((item, index) => <li key={index} className="flex items-center gap-3 text-lg">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </li>)}
            </ul>

            <p className="mb-8 text-muted-foreground text-base">Seu primeiro site vendido em 07 dias ou seu dinheiro de volta.</p>

            <GlowButton onClick={scrollToForm}>
              GARANTIR MINHA VAGA AGORA
            </GlowButton>
          </div>

          {/* Right Content - Mock Transfer Notification */}
          <div className="hidden lg:flex justify-center animate-float">
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-card max-w-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">há 1 dia</p>
                  <h3 className="font-bold text-xl">Transferência recebida</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-2">
                Você recebeu uma transferência de{" "}
                <span className="font-bold text-secondary">R$2.500,00</span> de
              </p>
              <p className="font-semibold">MM GROUP</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;