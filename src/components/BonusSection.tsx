import { Check, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const BonusSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const bonuses = [
    { text: "Templates de propostas comerciais prontos para usar", value: "R$ 197" },
    { text: "Scripts de vendas testados e aprovados", value: "R$ 147" },
    { text: "Lista com 50+ nichos lucrativos para prospectar", value: "R$ 97" },
    { text: "Grupo exclusivo de alunos no WhatsApp", value: "R$ 297" },
    { text: "Suporte direto via e-mail por 90 dias", value: "R$ 397" },
    { text: "Atualizações gratuitas da ferramenta de I.A", value: "R$ 497" },
    { text: "Certificado de conclusão digital", value: "R$ 67" }
  ];

  const totalValue = bonuses.reduce((sum, bonus) => {
    return sum + parseInt(bonus.value.replace(/[^\d]/g, ''));
  }, 0);

  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-[75px]" ref={ref}>
        <div className="w-full max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Gift className="w-5 h-5 icon-gradient-orange" />
                <span className="text-gradient-orange font-semibold">Bônus Exclusivos</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
                <span className="text-gradient-orange-glow">Bônus exclusivos</span> para quem<br />
                começar agora
              </h2>
              <p className="text-lg text-zinc-300">
                Além do curso completo e da ferramenta de I.A, você recebe:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {bonuses.map((bonus, index) => (
                <motion.div 
                  key={index} 
                  className="bg-card/30 border border-border hover:border-primary/40 rounded-lg p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,102,0,0.1)] group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-base text-zinc-300 mb-2">{bonus.text}</p>
                      <p className="text-sm font-semibold text-gradient-orange">Valor: {bonus.value}</p>
                    </div>
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/40 rounded-lg p-6 md:p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <p className="text-lg text-zinc-300 mb-2">Valor total dos bônus:</p>
              <p className="text-4xl md:text-5xl font-bold text-gradient-orange-glow mb-3">
                R$ {inView && <CountUp end={totalValue} duration={2} separator="." />}
              </p>
              <p className="text-xl text-secondary font-semibold">
                Tudo isso GRÁTIS para você!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
