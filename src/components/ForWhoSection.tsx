import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ForWhoSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const forWhoItems = [
    "Profissionais CLT que querem renda extra",
    "Pessoas sem experiência técnica",
    "Quem tem pouco tempo disponível",
    "Quem quer resultados rápidos e reais",
    "Pessoas que buscam segurança financeira",
    "Quem quer trabalhar de casa"
  ];

  const notForWhoItems = [
    "Quem busca enriquecimento rápido sem esforço",
    "Quem não está disposto a aplicar o método",
    "Quem quer apenas teoria sem prática",
    "Quem não pode investir algumas horas por semana"
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" ref={ref}>
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl mb-4 leading-tight font-bold">
            Descubra se o <span className="text-gradient-orange-glow">CLT com Grana</span> é para você
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Seja honesto consigo mesmo. Este método funciona, mas não é para todo mundo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Para quem É */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-primary/10 to-secondary/5 border-2 border-primary/30 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,102,0,0.2)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-6 h-6 icon-gradient-orange" strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-bold text-gradient-orange-glow">
                Para quem É
              </h3>
            </div>

            <ul className="space-y-4">
              {forWhoItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-lg group"
                >
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <span className="text-zinc-300 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Para quem NÃO É */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border-2 border-zinc-700/50 rounded-xl p-8 hover:border-zinc-600/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-700/30 flex items-center justify-center">
                <X className="w-6 h-6 text-zinc-400" strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-bold text-zinc-300">
                Para quem NÃO é
              </h3>
            </div>

            <ul className="space-y-4">
              {notForWhoItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-lg group"
                >
                  <div className="w-5 h-5 flex-shrink-0 mt-1 border-2 border-zinc-500/50 flex items-center justify-center rounded-sm group-hover:border-zinc-400 transition-colors">
                    <X className="w-3 h-3 text-zinc-400" strokeWidth={3} />
                  </div>
                  <span className="text-zinc-400 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto bg-secondary/10 border border-secondary/30 rounded-lg p-6">
            <span className="text-secondary font-bold">Se você se encaixa no lado esquerdo,</span> o CLT com Grana foi feito para você. É hora de transformar sua vida financeira.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ForWhoSection;
