import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const FinalOfferSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full max-w-3xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in text-center">
            <h2 className="text-4xl md:text-5xl leading-tight font-bold lg:text-5xl">
              Sua <span className="text-gradient-orange-glow">última chance</span> de<br />
              garantir sua vaga
            </h2>

            <p className="text-lg text-zinc-300">
              Esta oferta é limitada e as vagas podem encerrar a qualquer momento
            </p>

            <div className="bg-card/50 border border-primary/30 rounded-lg p-8">
              <p className="text-3xl md:text-4xl font-bold text-gradient-orange-glow">
                De R$ 997 por apenas 12x de R$ 47,28
              </p>
              <p className="text-xl text-zinc-400">
                ou R$ 497 à vista
              </p>

              <ul className="space-y-1 text-left max-w-md mx-auto">
                {[
                  "Curso completo CLT com Grana",
                  "Ferramenta exclusiva de I.A (acesso vitalício)",
                  "Todos os bônus inclusos",
                  "Suporte por 90 dias",
                  "Grupo exclusivo de alunos",
                  "Garantia incondicional de 7 dias"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-base">
                    <Check className="w-5 h-5 icon-gradient-orange flex-shrink-0" />
                    <span className="text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>

              <GlowButton onClick={scrollToForm}>
                GARANTIR MINHA VAGA AGORA
              </GlowButton>

              <p className="text-sm text-zinc-500">
                Apenas 50 vagas disponíveis neste lote
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
              <p className="text-xl font-bold text-gradient-orange-glow">
                GARANTIA DE 7 DIAS
              </p>
              <p className="text-zinc-400">
                Se você não vender seu primeiro site em 7 dias seguindo o método,<br />
                devolvemos 100% do seu investimento. Sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalOfferSection;
