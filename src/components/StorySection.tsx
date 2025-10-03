const StorySection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full max-w-4xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in text-center">
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-bold lg:text-5xl">
              E se você pudesse <span className="text-primary">faturar de R$ 500 a<br />
              R$ 2.000</span> vendendo sites, mesmo sem<br />
              experiência?
            </h2>

            <div className="space-y-6 text-left md:text-center">
              <p className="text-lg text-zinc-300">
                💭 Eu sei que parece distante. Talvez você pense: "Não sei programar. Não tenho tempo. Como vou competir com profissionais?"
              </p>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 md:p-8">
                <p className="text-xl md:text-2xl font-bold text-primary mb-3">
                  ✨ Mas e se eu te mostrar que a I.A já faz 95% do trabalho por você?
                </p>
                <p className="text-lg text-zinc-300">
                  Hoje, milhares de empreendedores precisam de sites, mas não têm R$ 3.000 a R$ 5.000 para pagar uma agência. Eles pagariam com prazer R$ 500 a R$ 1.500 por um site profissional — <span className="text-primary font-semibold">e você pode ser quem entrega isso.</span>
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-card/30 border border-border rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">95%</p>
                  <p className="text-sm text-zinc-400">do trabalho feito pela I.A</p>
                </div>
                <div className="bg-card/30 border border-border rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">R$ 500-2k</p>
                  <p className="text-sm text-zinc-400">por projeto vendido</p>
                </div>
                <div className="bg-card/30 border border-border rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">7 dias</p>
                  <p className="text-sm text-zinc-400">para primeiro resultado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
