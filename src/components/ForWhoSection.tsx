import { Check, X } from "lucide-react";

const ForWhoSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
                <span className="text-gradient-orange-glow">Para quem é</span> o CLT com Grana
              </h2>

              <ul className="space-y-1">
                {[
                  "Profissionais CLT que querem renda extra",
                  "Pessoas sem experiência técnica",
                  "Quem tem pouco tempo disponível",
                  "Quem quer resultados rápidos e reais",
                  "Pessoas que buscam segurança financeira",
                  "Quem quer trabalhar de casa"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
                <span className="text-gradient-orange-glow">Para quem NÃO é</span>
              </h2>

              <ul className="space-y-1">
                {[
                  "Quem busca enriquecimento rápido sem esforço",
                  "Quem não está disposto a aplicar o método",
                  "Quem quer apenas teoria sem prática",
                  "Quem não pode investir algumas horas por semana"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg">
                    <div className="w-5 h-5 flex-shrink-0 border-2 border-primary flex items-center justify-center rounded-sm">
                      <X className="w-3 h-3 icon-gradient-orange" strokeWidth={3} />
                    </div>
                    <span className="text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
