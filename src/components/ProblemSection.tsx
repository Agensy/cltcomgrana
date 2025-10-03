import { X } from "lucide-react";
const ProblemSection = () => {
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full max-w-6xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-bold">
              Você trabalha duro, mas sente que o
              salário <span className="text-gradient-orange-glow">nunca é suficiente?</span>
            </h2>

            <p className="mb-6 text-lg md:text-xl text-zinc-300 max-w-4xl mx-auto">
              Milhares de brasileiros vivem com o medo constante de perder o emprego,
              contas acumulando e a sensação de que nunca sobra nada no final do mês.
            </p>

            <p className="mb-12 text-gray-50 text-xl font-semibold md:text-2xl">
              O problema não é você. O problema é depender só do sistema CLT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {["O salário não cobre todas as contas", "Você vive com medo de ser demitido", "Parece não ter tempo para aprender algo novo", "Falta confiança para transformar conhecimento em renda"].map((item, index) => <div key={index} className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(203,123,66,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 border-2 border-primary flex items-center justify-center rounded-lg bg-primary/10">
                    <X className="w-5 h-5 icon-gradient-orange" strokeWidth={3} />
                  </div>
                  <p className="text-zinc-300 font-medium leading-relaxed">{item}</p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ProblemSection;