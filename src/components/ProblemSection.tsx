import { DollarSign, AlertTriangle, Clock, TrendingDown } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: DollarSign,
      title: "Salário Insuficiente",
      description: "O salário não cobre todas as contas e você vive no vermelho"
    },
    {
      icon: AlertTriangle,
      title: "Medo Constante",
      description: "Você vive com medo de ser demitido a qualquer momento"
    },
    {
      icon: Clock,
      title: "Falta de Tempo",
      description: "Parece não ter tempo para aprender algo novo"
    },
    {
      icon: TrendingDown,
      title: "Sem Confiança",
      description: "Falta confiança para transformar conhecimento em renda"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-5xl mb-6 leading-tight font-bold">
              Você trabalha duro, mas sente que o
              salário <span className="text-gradient-orange-glow">nunca é suficiente?</span>
            </h2>

            <p className="mb-6 text-lg md:text-xl text-zinc-300 max-w-4xl mx-auto">
              Milhares de brasileiros vivem com o medo constante de perder o emprego,
              contas acumulando e a sensação de que nunca sobra nada no final do mês.
            </p>

            <p className="mb-3 text-gray-50 text-xl font-semibold md:text-2xl">
              O problema não é você. O problema é depender só do sistema CLT.
            </p>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(203,123,66,0.15)] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 icon-gradient-orange" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-50 mb-2 group-hover:text-gradient-orange-glow transition-all duration-300">
                        {problem.title}
                      </h3>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
export default ProblemSection;