const SocialProofSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl text-center">
              Veja os <span className="text-primary">resultados reais</span><br />
              dos nossos alunos
            </h2>

            <p className="mb-12 text-lg text-zinc-300 text-center max-w-2xl mx-auto">
              Centenas de pessoas já estão faturando com o método CLT com Grana
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Carlos Silva",
                  result: "R$ 3.200 no primeiro mês",
                  testimonial: "Nunca imaginei que conseguiria vender sites. Em 15 dias já tinha meu primeiro cliente e faturei R$ 800. Hoje faço de R$ 3.000 a R$ 4.000 por mês."
                },
                {
                  name: "Ana Paula",
                  result: "Primeiro site vendido em 5 dias",
                  testimonial: "Estava desesperada com as contas. Segui o método e em 5 dias vendi meu primeiro site por R$ 600. Hoje tenho renda extra garantida todo mês."
                },
                {
                  name: "Roberto Oliveira",
                  result: "R$ 5.800 em 45 dias",
                  testimonial: "Trabalho CLT das 8h às 18h. Uso 2 horas por dia e já faturei mais de R$ 5.000 em menos de 2 meses. A ferramenta de I.A é incrível!"
                }
              ].map((proof, index) => (
                <div key={index} className="bg-card/30 border border-border rounded-lg p-6">
                  <div className="mb-4">
                    <p className="text-xl font-bold text-zinc-200">{proof.name}</p>
                    <p className="text-primary font-semibold">{proof.result}</p>
                  </div>
                  <p className="text-zinc-400 italic">"{proof.testimonial}"</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-zinc-500">
              *Resultados podem variar de acordo com dedicação e aplicação do método
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
