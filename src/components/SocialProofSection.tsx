import { Star, TrendingUp } from "lucide-react";

const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      age: "38 anos",
      job: "Analista Administrativo",
      result: "R$ 3.200 no primeiro mês",
      testimonial: "Nunca imaginei que conseguiria vender sites. Em 15 dias já tinha meu primeiro cliente e faturei R$ 800. Hoje faço de R$ 3.000 a R$ 4.000 por mês.",
      rating: 5
    },
    {
      name: "Ana Paula",
      age: "34 anos",
      job: "Professora",
      result: "Primeiro site vendido em 5 dias",
      testimonial: "Estava desesperada com as contas. Segui o método e em 5 dias vendi meu primeiro site por R$ 600. Hoje tenho renda extra garantida todo mês.",
      rating: 5
    },
    {
      name: "Roberto Oliveira",
      age: "42 anos",
      job: "Supervisor de Vendas",
      result: "R$ 5.800 em 45 dias",
      testimonial: "Trabalho CLT das 8h às 18h. Uso 2 horas por dia e já faturei mais de R$ 5.000 em menos de 2 meses. A ferramenta de I.A é incrível!",
      rating: 5
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-6 py-3 mb-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold">Resultados Reais</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-4 leading-tight font-bold lg:text-5xl">
                Veja os <span className="text-primary">resultados reais</span><br />
                dos nossos alunos
              </h2>
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                Centenas de pessoas já estão faturando com o método CLT com Grana
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {testimonials.map((proof, index) => (
                <div 
                  key={index} 
                  className="bg-card/30 border border-border hover:border-primary/40 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)] group"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(proof.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xl font-bold text-zinc-200">{proof.name}</p>
                    <p className="text-sm text-zinc-500">{proof.age} • {proof.job}</p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                      <span className="text-primary font-semibold text-sm">💰 {proof.result}</span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 italic leading-relaxed">
                    "{proof.testimonial}"
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6 max-w-3xl mx-auto text-center">
              <p className="text-lg text-zinc-300 mb-2">
                <span className="text-secondary font-bold">✨ Mais de 500 alunos</span> já transformaram suas vidas com o CLT com Grana
              </p>
              <p className="text-sm text-zinc-500">
                *Resultados podem variar de acordo com dedicação e aplicação do método
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
