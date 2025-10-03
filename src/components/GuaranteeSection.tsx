import { Check } from "lucide-react";
import guaranteeVisual from "@/assets/guarantee-visual.jpg";

const GuaranteeSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img
              src={guaranteeVisual}
              alt="Garantia FURION"
              className="relative z-10 rounded-2xl w-full h-auto shadow-card"
            />
          </div>

          {/* Right - Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Tudo isso por menos que o valor do seu{" "}
              <span className="text-primary">primeiro cliente</span>
            </h2>

            <h3 className="text-2xl font-bold text-primary mb-6">
              Você recebe:
            </h3>

            <ul className="space-y-4 mb-10">
              {[
                "Curso completo passo a passo",
                "Scripts de vendas prontos",
                "Ferramenta exclusiva de IA",
                "Suporte e comunidade ativa",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Guarantee Badge */}
            <div className="flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-6">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 border-4 border-primary rounded-full" />
                <div className="absolute inset-2 border-2 border-primary/50 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-black text-primary animate-glow-pulse">
                    7
                  </span>
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider">
                  DIAS DE GARANTIA
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Se não enxergar valor, pode pedir reembolso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
