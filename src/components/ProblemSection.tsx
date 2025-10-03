import { X } from "lucide-react";
const ProblemSection = () => {
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              Você trabalha duro, mas sente que o
              salário <span className="text-gradient-orange-glow">nunca é suficiente?</span>
            </h2>

            <p className="mb-8 text-lg text-zinc-300">
              Milhares de brasileiros vivem com o medo constante de perder o emprego,
              contas acumulando e a sensação de que nunca sobra nada no final do mês.
            </p>

            <p className="mb-8 text-gray-50 text-lg font-semibold">
              O problema não é você. O problema é depender só do sistema CLT.
            </p>

            <ul className="space-y-1">
              {["O salário não cobre todas as contas", "Você vive com medo de ser demitido", "Parece não ter tempo para aprender algo novo", "Falta confiança para transformar conhecimento em renda"].map((item, index) => <li key={index} className="flex items-center gap-3 text-lg">
                    <div className="w-5 h-5 flex-shrink-0 border-2 border-primary flex items-center justify-center rounded-sm">
                      <X className="w-3 h-3 icon-gradient-orange" strokeWidth={3} />
                  </div>
                  <span className="text-zinc-400">{item}</span>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>;
};
export default ProblemSection;