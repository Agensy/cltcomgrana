import { Briefcase, Sparkles, List, DollarSign, Shield } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import solutionBg from "@/assets/solution-background.webp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const SolutionSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const steps = [
    {
      icon: Briefcase,
      number: "01",
      title: "Identifique empresas sem site na sua região",
      description: "Lojas, salões, oficinas, clínicas... milhares de negócios ainda não têm presença online e estão perdendo clientes todos os dias para a concorrência.",
      connector: "Depois de identificar quem precisa..."
    },
    {
      icon: Sparkles,
      number: "02",
      title: "Crie sites profissionais em minutos com I.A",
      description: "Não precisa programar nada. Você conversa com a ferramenta, descreve o que o cliente precisa, e a I.A monta o site completo automaticamente.",
      connector: "Com o site pronto..."
    },
    {
      icon: List,
      number: "03",
      title: "Personalize seguindo nosso método simples",
      description: "Se você sabe usar WhatsApp, consegue fazer isso. Nosso passo a passo mostra exatamente como ajustar cores, textos e imagens para cada cliente.",
      connector: "Agora é hora de apresentar..."
    },
    {
      icon: DollarSign,
      number: "04",
      title: "Venda e receba de R$500 a R$2.000 por projeto",
      description: "Apresente o site pronto, feche o negócio e receba pelo Pix. Trabalhe no seu ritmo, de casa, e escolha quantos projetos quer fazer por mês.",
      connector: "E se não funcionar?"
    },
    {
      icon: Shield,
      number: "05",
      title: "Garantia de 7 dias ou seu dinheiro de volta",
      description: "Se você seguir o método e não conseguir vender seu primeiro site em 7 dias, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia."
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={solutionBg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-[75px]" ref={ref}>
        <div className="w-full max-w-5xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Header Section */}
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-bold lg:text-5xl text-white">
              E se você pudesse <span className="text-gradient-orange-glow px-3 py-1 rounded">faturar de R$ 500 a R$ 2.000</span> vendendo sites, mesmo sem experiência?
            </h2>

            <div className="space-y-6 text-left md:text-center mb-16">
              <p className="text-lg text-zinc-300">
                Eu sei que parece distante. Talvez você pense: "Não sei programar. Não tenho tempo. Como vou competir com profissionais?"
              </p>

              <motion.div 
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-primary/30 rounded-lg p-6 md:p-8 shadow-lg max-w-3xl mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xl md:text-2xl font-bold text-gradient-orange-glow mb-3">
                  Mas e se eu te mostrar que a I.A já faz 95% do trabalho por você?
                </p>
                <p className="text-lg text-zinc-200">
                  Hoje, milhares de empreendedores precisam de sites, mas não têm R$ 3.000 a R$ 5.000 para pagar uma agência. Eles pagariam com prazer R$ 500 a R$ 1.500 por um site profissional — <span className="text-gradient-orange-glow font-semibold">e você pode ser quem entrega isso.</span>
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
                {[
                  { value: 95, suffix: "%", label: "do trabalho feito pela I.A" },
                  { value: 500, prefix: "R$ ", suffix: "-2k", label: "por projeto vendido" },
                  { value: 7, suffix: " dias", label: "para primeiro resultado" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-primary/30 rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-3xl font-bold text-gradient-orange-glow mb-2">
                      {stat.prefix}
                      {inView && <CountUp end={stat.value} duration={2} />}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-zinc-300">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How It Works Section */}
            <h3 className="text-3xl md:text-4xl mb-12 leading-tight font-bold text-center">
              Como funciona o <span className="text-gradient-orange-glow">CLT com Grana</span>
            </h3>

            {/* Steps */}
            <div className="space-y-6 max-w-4xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={index} className="relative">
                    {/* Connector Line with Animation */}
                    {!isLast && (
                      <div className="absolute left-8 md:left-10 top-[88px] h-[calc(100%-40px)] w-px overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent h-20"
                          animate={{ y: [0, 60, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                    
                    <motion.div
                      className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 border border-primary/20 hover:border-primary/50 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,102,0,0.2)] group backdrop-blur-sm"
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 8 }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative flex gap-5 md:gap-6">
                        {/* Icon Circle with Pulse */}
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 md:w-20 md:h-20">
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-500" />
                            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 flex items-center justify-center group-hover:border-primary/60 transition-all duration-500">
                              <Icon className="w-7 h-7 md:w-9 md:h-9 icon-gradient-orange group-hover:scale-110 transition-transform duration-500" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="text-xs md:text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
                              PASSO {step.number}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-gradient-orange-glow transition-all duration-300">
                            {step.title}
                          </h3>
                          <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-4">
                            {step.description}
                          </p>
                          
                          {/* Connector Text */}
                          {!isLast && step.connector && (
                            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-primary/10">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <p className="text-sm text-primary/80 font-medium italic">
                                {step.connector}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <GlowButton onClick={scrollToForm}>
                QUERO FATURAR EM 7 DIAS
              </GlowButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
