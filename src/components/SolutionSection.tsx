import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const SolutionSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              Apresento o <span className="text-primary">CLT com Grana</span>:<br />
              Seu caminho para renda extra em 7 dias
            </h2>

            <p className="mb-8 text-lg text-zinc-300">
              Um curso prático aliado a uma ferramenta exclusiva de I.A que cria sites<br />
              profissionais em minutos — mesmo que você nunca tenha feito um na vida.
            </p>

            <ul className="space-y-1 mb-8">
              {[
                "Ferramenta de I.A exclusiva com prompts perfeitos",
                "Sites prontos para vender em minutos, não em semanas",
                "Método passo a passo para conseguir clientes de verdade",
                "Venda de R$ 500 a R$ 2.000 por projeto",
                "Primeiro pagamento em até 7 dias ou seu dinheiro de volta"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-400">{item}</span>
                </li>
              ))}
            </ul>

            <GlowButton onClick={scrollToForm}>
              QUERO FATURAR EM 7 DIAS
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
