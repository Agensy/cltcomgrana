import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const StorySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20" ref={ref}>
        <div className="w-full max-w-4xl mx-auto">
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
                <p className="text-xl md:text-2xl font-bold text-primary mb-3">
                  Mas e se eu te mostrar que a I.A já faz 95% do trabalho por você?
                </p>
                <p className="text-lg text-zinc-300">
                  Hoje, milhares de empreendedores precisam de sites, mas não têm R$ 3.000 a R$ 5.000 para pagar uma agência. Eles pagariam com prazer R$ 500 a R$ 1.500 por um site profissional — <span className="text-primary font-semibold">e você pode ser quem entrega isso.</span>
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  { value: 95, suffix: "%", label: "do trabalho feito pela I.A" },
                  { value: 500, prefix: "R$ ", suffix: "-2k", label: "por projeto vendido" },
                  { value: 7, suffix: " dias", label: "para primeiro resultado" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-card/30 border border-border rounded-lg p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-3xl font-bold text-primary mb-2">
                      {stat.prefix}
                      {inView && <CountUp end={stat.value} duration={2} />}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
