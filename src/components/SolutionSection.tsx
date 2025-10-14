import React, { useCallback } from "react";
import { Briefcase, Sparkles, List, DollarSign, Shield } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import solutionBg from "@/assets/solution-background.webp";

const SolutionSection = React.memo(() => {
  const scrollToForm = useCallback(() => {
    const offerSection = document.getElementById('final-offer');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const steps = [
    {
      icon: Briefcase,
      title: "Identifique empresas sem site na sua região",
      description: "Lojas, salões, oficinas, clínicas... milhares de negócios ainda não têm presença online e estão perdendo clientes todos os dias para a concorrência.",
      connector: "Depois de identificar quem precisa..."
    },
    {
      icon: Sparkles,
      title: "Crie sites profissionais em minutos com I.A",
      description: "Não precisa programar nada. Você conversa com a ferramenta, descreve o que o cliente precisa, e a I.A monta o site completo automaticamente.",
      connector: "Com o site pronto..."
    },
    {
      icon: List,
      title: "Personalize seguindo nosso método simples",
      description: "Se você sabe usar WhatsApp, consegue fazer isso. Nosso passo a passo mostra exatamente como ajustar cores, textos e imagens para cada cliente.",
      connector: "Agora é hora de apresentar..."
    },
    {
      icon: DollarSign,
      title: "Venda e receba de R$500 a R$2.000 por projeto",
      description: "Apresente o site pronto, feche o negócio e receba pelo Pix. Trabalhe no seu ritmo, de casa, e escolha quantos projetos quer fazer por mês.",
      connector: "E se não funcionar?"
    },
    {
      icon: Shield,
      title: "Garantia de 7 dias ou dinheiro de volta",
      description: "Se em 7 dias você não conseguir vender seu primeiro site, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.",
      connector: null
    }
  ];

  return (
    <section id="solution" className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={solutionBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-[75px]">
        <div className="w-full max-w-5xl mx-auto">
          {/* Content */}
          <div className="text-center animate-fade-in">
            {/* Header Section */}
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-bold lg:text-5xl text-white">
              E se você pudesse <span className="text-gradient-orange-glow px-3 py-1 rounded">faturar de R$ 500 a R$ 2.000</span> vendendo sites, mesmo sem experiência?
            </h2>

            <div className="space-y-6 text-left md:text-center mb-16">
              <p className="text-lg text-zinc-300">
                Eu sei que parece distante. Talvez você pense: "Não sei programar. Não tenho tempo. Como vou competir com profissionais?"
              </p>

              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-primary/30 rounded-lg p-6 md:p-8 shadow-lg max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl font-bold text-gradient-orange-glow mb-3">
                  Mas e se eu te mostrar que a I.A já faz 95% do trabalho por você?
                </p>
                <p className="text-lg text-zinc-200">
                  Hoje, milhares de empreendedores precisam de sites, mas não têm R$ 3.000 a R$ 5.000 para pagar uma agência. Eles pagariam com prazer R$ 500 a R$ 1.500 por um site profissional — <span className="text-gradient-orange-glow font-semibold">e você pode ser quem entrega isso.</span>
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
                {[
                  { value: "95%", label: "do trabalho feito pela I.A" },
                  { value: "R$ 500-2k", label: "por projeto vendido" },
                  { value: "7 dias", label: "para primeiro resultado" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-primary/30 rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <p className="text-3xl font-bold text-gradient-orange-glow mb-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-zinc-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Section */}
            <div className="text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Como funciona o método <span className="text-gradient-orange-glow">CLT com Grana</span>
              </h3>

              <div className="relative">
                {/* Vertical Flow Line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 hidden md:block"></div>
                
                <div className="space-y-8 md:space-y-12">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="relative">
                        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                          {/* Step Icon */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-primary/30 rounded-lg flex items-center justify-center shadow-glow-orange">
                              <Icon className="w-8 h-8 icon-gradient-orange" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">
                              {step.title}
                            </h4>
                            <p className="text-lg text-zinc-300 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Connector */}
                        {step.connector && (
                          <div className="mt-6 mb-2 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-primary/30 rounded-full px-6 py-2">
                              <p className="text-sm text-gradient-orange-glow font-medium">
                                {step.connector}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-primary/30 rounded-lg p-8 shadow-xl max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Pronto para começar a <span className="text-gradient-orange-glow">faturar com sites</span>?
                </h3>
                <p className="text-lg text-zinc-300 mb-6">
                  Junte-se a centenas de pessoas que já estão vendendo sites e mudando de vida com nosso método.
                </p>
                <div className="flex justify-center">
                  <GlowButton onClick={scrollToForm}>
                    QUERO COMEÇAR AGORA
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SolutionSection;
