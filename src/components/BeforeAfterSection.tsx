import { Check, X } from "lucide-react";

const BeforeAfterSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-12 leading-tight font-bold lg:text-5xl text-center">
              <span className="text-primary">Antes</span> e <span className="text-primary">depois</span> do CLT com Grana
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Antes */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-zinc-300">❌ Antes</h3>
                <ul className="space-y-1">
                  {[
                    "Dependência total do salário CLT",
                    "Medo constante de perder o emprego",
                    "Contas acumulando no final do mês",
                    "Sem tempo para aprender algo novo",
                    "Cursos teóricos que não geram resultado",
                    "Frustração e insegurança financeira"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-lg">
                      <div className="w-5 h-5 flex-shrink-0 border-2 border-primary flex items-center justify-center rounded-sm">
                        <X className="w-3 h-3 text-primary" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Depois */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-secondary">✅ Depois</h3>
                <ul className="space-y-1">
                  {[
                    "Renda extra de R$ 2.000 a R$ 5.000/mês",
                    "Segurança financeira e tranquilidade",
                    "Contas em dia e sobra no final do mês",
                    "Trabalha de casa, no seu tempo",
                    "Método prático com resultados reais",
                    "Confiança e controle sobre seu futuro"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-lg">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
