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
      title: "As empresas precisam de site. Agora.",
      description: "Tem loja, salão, oficina, clínica... tudo sem site.\nElas estão perdendo cliente por isso."
    },
    {
      icon: Sparkles,
      number: "02",
      title: "Você aprende a montar o site em minutos.",
      description: "A ferramenta já faz tudo.\nVocê só escreve o que quer e ela monta."
    },
    {
      icon: List,
      number: "03",
      title: "Você só precisa seguir o passo a passo.",
      description: "Se você sabe mexer no WhatsApp, você já consegue fazer isso."
    },
    {
      icon: DollarSign,
      number: "04",
      title: "Entrega o site e recebe pelo Pix.",
      description: "Clientes pagam de R$500 a R$2.000 por site feito.\nVocê pode fazer em casa, no seu tempo livre."
    },
    {
      icon: Shield,
      number: "05",
      title: "Se não vender seu primeiro site em 7 dias, devolvemos seu dinheiro.",
      description: "Simples assim. Sem enrolação."
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
            <div className="space-y-8 max-w-3xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={index} className="relative">
                    {/* Connector Line */}
                    {!isLast && (
                      <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 translate-y-2" />
                    )}
                    
                    <motion.div
                      className="relative bg-card/40 border border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.15)] cursor-pointer"
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div className="flex gap-6">
                        {/* Icon Circle */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                            <Icon className="w-6 h-6 icon-gradient-orange" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-primary">{step.number}</span>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-100">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-base text-zinc-400 leading-relaxed whitespace-pre-line">
                            {step.description}
                          </p>
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
