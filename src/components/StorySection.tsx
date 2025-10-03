const StorySection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              E se você pudesse <span className="text-primary">faturar de R$ 500 a<br />
              R$ 2.000</span> vendendo sites, mesmo sem<br />
              experiência?
            </h2>

            <p className="mb-8 text-lg text-zinc-300">
              Eu sei que parece distante. Talvez você pense: "Não sei programar. Não tenho tempo.<br />
              Como vou competir com profissionais?"
            </p>

            <p className="mb-8 text-lg text-zinc-300">
              Mas e se eu te mostrar que a I.A já faz 95% do trabalho por você?
            </p>

            <p className="mb-8 text-lg text-zinc-400">
              Hoje, milhares de empreendedores precisam de sites, mas não têm R$ 3.000 a R$ 5.000<br />
              para pagar uma agência. Eles pagariam com prazer R$ 500 a R$ 1.500 por um site<br />
              profissional — e você pode ser quem entrega isso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
