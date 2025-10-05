import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import solutionBg from "@/assets/solution-background.webp";

const SolutionSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={solutionBg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight font-bold">
              Apresento o <span className="text-gradient-orange-glow">CLT com Grana</span>
            </h2>
            
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-gray-100">
              Seu caminho para renda extra em 7 dias
            </p>

            <p className="mb-10 text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Um curso prático aliado a uma ferramenta exclusiva de I.A que cria sites
              profissionais em minutos — mesmo que você nunca tenha feito um na vida.
            </p>

            <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 md:p-10 mb-10 shadow-2xl max-w-2xl mx-auto overflow-hidden">
              {/* Dot Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(203, 123, 66, 0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              
              <ul className="space-y-4 relative z-10">
                {[
                  "Ferramenta de I.A exclusiva com prompts perfeitos",
                  "Sites prontos para vender em minutos, não em semanas",
                  "Método passo a passo para conseguir clientes de verdade",
                  "Venda de R$ 500 a R$ 2.000 por projeto",
                  "Primeiro pagamento em até 7 dias ou seu dinheiro de volta"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-lg group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-5 h-5 icon-gradient-orange" strokeWidth={3} />
                    </div>
                    <span className="text-zinc-200 pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <GlowButton onClick={scrollToForm}>
                QUERO FATURAR EM 7 DIAS
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
