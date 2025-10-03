const HowItWorksSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              Como funciona o <span className="text-primary">CLT com Grana</span><br />
              em 3 passos simples
            </h2>

            <p className="mb-8 text-lg text-zinc-300">
              Um método direto e prático para você começar a faturar em até 7 dias.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Aprenda o método",
                  description: "Acesse o curso completo com aulas práticas e diretas. Sem enrolação, só o que você precisa para começar."
                },
                {
                  step: "02",
                  title: "Use a ferramenta de I.A",
                  description: "Nossa ferramenta exclusiva cria prompts perfeitos e gera sites profissionais em minutos. Você só precisa seguir o passo a passo."
                },
                {
                  step: "03",
                  title: "Venda e fature",
                  description: "Siga o método para conseguir clientes, entregue sites profissionais e receba de R$ 500 a R$ 2.000 por projeto."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-5xl font-bold text-primary/20">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-zinc-200">{item.title}</h3>
                    <p className="text-lg text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
