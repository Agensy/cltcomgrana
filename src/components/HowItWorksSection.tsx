import { Lightbulb, Zap, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HowItWorksSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const steps = [
    {
      icon: Lightbulb,
      step: "01",
      title: "Aprenda o método",
      description: "Acesse o curso completo com aulas práticas e diretas. Sem enrolação, só o que você precisa para começar."
    },
    {
      icon: Zap,
      step: "02",
      title: "Use a ferramenta de I.A",
      description: "Nossa ferramenta exclusiva cria prompts perfeitos e gera sites profissionais em minutos. Você só precisa seguir o passo a passo."
    },
    {
      icon: DollarSign,
      step: "03",
      title: "Venda e fature",
      description: "Siga o método para conseguir clientes, entregue sites profissionais e receba de R$ 500 a R$ 2.000 por projeto."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20" ref={ref}>
        <div className="w-full max-w-5xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl text-center">
              Como funciona o <span className="text-gradient-orange-glow">CLT com Grana</span><br />
              em 3 passos simples
            </h2>

            <p className="mb-12 text-lg text-zinc-300 text-center">
              Um método direto e prático para você começar a faturar em até 7 dias.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="bg-card/30 border border-border hover:border-primary/50 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.15)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 icon-gradient-orange" />
                      </div>
                      <span className="text-4xl font-bold text-primary/30">{item.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-zinc-200">
                      {item.title}
                    </h3>
                    <p className="text-base text-zinc-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              className="mt-12 text-center bg-secondary/10 border border-secondary/30 rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-lg text-zinc-300">
                <span className="text-secondary font-bold">Simples assim:</span> Aprende → Cria → Vende → Fatura
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
