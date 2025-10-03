import { X } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/10" />
      
      {/* Grid Overlay with fade */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto px-8 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="space-y-12 animate-fade-in">
            {/* Headline with enhanced styling */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold">
                Você trabalha duro, mas sente que o<br />
                salário <span className="text-primary bg-primary/10 px-2 rounded">nunca é suficiente?</span>
              </h2>

              <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                Milhares de brasileiros vivem com o medo constante de perder o emprego,
                contas acumulando e a sensação de que nunca sobra nada no final do mês.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Problem statement */}
            <p className="text-lg md:text-xl text-muted-foreground italic border-l-4 border-primary/50 pl-6 py-2">
              O problema não é você. O problema é depender só do sistema CLT.
            </p>

            {/* Problems list with enhanced design */}
            <div className="grid gap-4 mt-8">
              {[
                "O salário não cobre todas as contas",
                "Você vive com medo de ser demitido",
                "Parece não ter tempo para aprender algo novo",
                "Falta confiança para transformar conhecimento em renda"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="group flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded border-2 border-primary/70 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300">
                    <X className="w-5 h-5 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-base md:text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
