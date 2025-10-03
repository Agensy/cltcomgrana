import { Check, X, TrendingDown, TrendingUp } from "lucide-react";

const BeforeAfterSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-4 leading-tight font-bold lg:text-5xl text-center">
              <span className="text-primary">Antes</span> e <span className="text-primary">depois</span> do CLT com Grana
            </h2>
            
            <p className="text-lg text-zinc-300 text-center mb-12">
              Veja a transformação que milhares de pessoas já viveram
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Antes */}
              <div className="bg-card/20 border-2 border-destructive/30 rounded-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-200">😔 Antes</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Dependência total do salário CLT",
                    "Medo constante de perder o emprego",
                    "Contas acumulando no final do mês",
                    "Sem tempo para aprender algo novo",
                    "Cursos teóricos que não geram resultado",
                    "Frustração e insegurança financeira"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-base md:text-lg">
                      <div className="w-6 h-6 mt-0.5 flex-shrink-0 border-2 border-destructive/70 flex items-center justify-center rounded-sm">
                        <X className="w-4 h-4 text-destructive" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Depois */}
              <div className="bg-card/20 border-2 border-secondary/50 rounded-lg p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-200">🚀 Depois</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Renda extra de R$ 2.000 a R$ 5.000/mês",
                      "Segurança financeira e tranquilidade",
                      "Contas em dia e sobra no final do mês",
                      "Trabalha de casa, no seu tempo",
                      "Método prático com resultados reais",
                      "Confiança e controle sobre seu futuro"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-base md:text-lg">
                        <Check className="w-6 h-6 mt-0.5 text-secondary flex-shrink-0" strokeWidth={3} />
                        <span className="text-zinc-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">
                ⏰ Essa transformação pode começar hoje mesmo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
