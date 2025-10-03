import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const StorySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20" ref={ref}>
        <div className="w-full max-w-6xl mx-auto">
          {/* Content */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-bold lg:text-5xl">
              E se você pudesse <span className="text-gradient-orange-glow">faturar de R$ 500 a<br />
              R$ 2.000</span> vendendo sites, mesmo sem<br />
              experiência?
            </h2>

            <div className="space-y-6 text-left md:text-center">
              <p className="text-lg text-zinc-300">
                Eu sei que parece distante. Talvez você pense: "Não sei programar. Não tenho tempo. Como vou competir com profissionais?"
              </p>

              <motion.div 
                className="bg-primary/10 border border-primary/30 rounded-lg p-6 md:p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xl md:text-2xl font-bold text-gradient-orange-glow mb-3">
                  Mas e se eu te mostrar que a I.A já faz 95% do trabalho por você?
                </p>
                <p className="text-lg text-zinc-300">
                  Hoje, milhares de empreendedores precisam de sites, mas não têm R$ 3.000 a R$ 5.000 para pagar uma agência. Eles pagariam com prazer R$ 500 a R$ 1.500 por um site profissional — <span className="text-gradient-orange-glow font-semibold">e você pode ser quem entrega isso.</span>
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                {[
                  { 
                    icon: Sparkles,
                    value: 95, 
                    suffix: "%", 
                    label: "do trabalho feito pela I.A",
                    description: "A I.A cria o site completo"
                  },
                  { 
                    icon: TrendingUp,
                    value: 500, 
                    prefix: "R$ ", 
                    suffix: "-2k", 
                    label: "por projeto vendido",
                    description: "Valor médio por cliente"
                  },
                  { 
                    icon: Zap,
                    value: 7, 
                    suffix: " dias", 
                    label: "para primeiro resultado",
                    description: "Seu primeiro cliente"
                  }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="group relative bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(203,123,66,0.15)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 icon-gradient-orange" strokeWidth={2} />
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-gradient-orange-glow mb-2">
                        {stat.prefix}
                        {inView && <CountUp end={stat.value} duration={2} />}
                        {stat.suffix}
                      </p>
                      <p className="text-sm font-semibold text-gray-50 mb-1">{stat.label}</p>
                      <p className="text-xs text-zinc-400">{stat.description}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-lg md:text-xl text-zinc-300 mb-6">
                  <span className="text-gradient-orange-glow font-semibold">Pare de adiar seus sonhos.</span> Comece hoje mesmo a construir sua renda extra com sites.
                </p>
                <GlowButton onClick={scrollToForm} className="text-lg px-8 py-6">
                  Quero Aprender a Vender Sites
                </GlowButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
