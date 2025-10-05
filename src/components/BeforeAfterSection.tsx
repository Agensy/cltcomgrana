import { Check, X, TrendingDown, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const BeforeAfterSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const testimonials = [
    {
      name: "Carlos Silva",
      age: "38 anos",
      job: "Analista Administrativo",
      result: "R$ 3.200 no primeiro mês",
      testimonial: "Nunca imaginei que conseguiria vender sites. Em 15 dias já tinha meu primeiro cliente e faturei R$ 800. Hoje faço de R$ 3.000 a R$ 4.000 por mês.",
      rating: 5
    },
    {
      name: "Ana Paula",
      age: "34 anos",
      job: "Professora",
      result: "Primeiro site vendido em 5 dias",
      testimonial: "Estava desesperada com as contas. Segui o método e em 5 dias vendi meu primeiro site por R$ 600. Hoje tenho renda extra garantida todo mês.",
      rating: 5
    },
    {
      name: "Roberto Oliveira",
      age: "42 anos",
      job: "Supervisor de Vendas",
      result: "R$ 5.800 em 45 dias",
      testimonial: "Trabalho CLT das 8h às 18h. Uso 2 horas por dia e já faturei mais de R$ 5.000 em menos de 2 meses. A ferramenta de I.A é incrível!",
      rating: 5
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-[75px]" ref={ref}>
        <div className="w-full">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-4 leading-tight font-bold lg:text-5xl text-center">
              <span className="text-gradient-orange-glow">Antes</span> e <span className="text-gradient-orange-glow">depois</span> do CLT com Grana
            </h2>
            
            <p className="text-lg text-zinc-300 text-center mb-12">
              Veja a transformação que milhares de pessoas já viveram
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Antes */}
              <div className="bg-card/20 border-2 border-destructive/30 rounded-lg p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-200">Antes</h3>
                  </div>
                <ul className="space-y-3">
                  {[
                    "Dependência total do salário CLT",
                    "Medo constante de perder o emprego",
                    "Contas acumulando no final do mês",
                    "Sem tempo para aprender algo novo",
                    "Cursos teóricos que não geram resultado",
                    "Frustração e insegurança financeira"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-base md:text-lg">
                      <div className="w-6 h-6 mt-0.5 flex-shrink-0 border-2 border-destructive/70 flex items-center justify-center rounded-sm">
                        <X className="w-4 h-4 text-destructive" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Depois */}
              <div className="bg-card/20 border-2 border-secondary/50 rounded-lg p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-200">Depois</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Renda extra de R$ 2.000 a R$ 5.000/mês",
                      "Segurança financeira e tranquilidade",
                      "Contas em dia e sobra no final do mês",
                      "Trabalha de casa, no seu tempo",
                      "Método prático com resultados reais",
                      "Confiança e controle sobre seu futuro"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-base md:text-lg">
                        <Check className="w-6 h-6 mt-0.5 text-secondary flex-shrink-0" strokeWidth={3} />
                        <span className="text-zinc-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl md:text-2xl font-bold text-gradient-orange-glow">
                Essa transformação pode começar hoje mesmo!
              </p>
            </div>

            {/* Social Proof Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <motion.div 
                  className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-6 py-3 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span className="text-secondary font-semibold">Resultados Reais</span>
                </motion.div>
                <h3 className="text-3xl md:text-4xl mb-4 leading-tight font-bold">
                  Veja os <span className="text-gradient-orange-glow">resultados reais</span><br />
                  dos nossos alunos
                </h3>
                <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                  Centenas de pessoas já estão faturando com o método CLT com Grana
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                {testimonials.map((proof, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-card/30 border border-border hover:border-primary/40 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)] group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(proof.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gradient-orange icon-gradient-orange" />
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xl font-bold text-zinc-200">{proof.name}</p>
                      <p className="text-sm text-zinc-500">{proof.age} • {proof.job}</p>
                      <div className="mt-2 inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                        <span className="text-gradient-orange font-semibold text-sm">{proof.result}</span>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 italic leading-relaxed">
                      "{proof.testimonial}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="bg-secondary/10 border border-secondary/30 rounded-lg p-6 max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <p className="text-lg text-zinc-300 mb-2">
                  <span className="text-secondary font-bold">Mais de <CountUp end={500} duration={2} enableScrollSpy scrollSpyOnce /> alunos</span> já transformaram suas vidas com o CLT com Grana
                </p>
                <p className="text-sm text-zinc-500">
                  *Resultados podem variar de acordo com dedicação e aplicação do método
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
