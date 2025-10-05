import { Check, Shield, Clock, Users, TrendingUp, Sparkles, ArrowRight, Zap } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const FinalOfferSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [spots, setSpots] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => Math.max(12, prev - Math.floor(Math.random() * 2)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const benefits = [
    { icon: Zap, text: "Curso completo CLT com Grana" },
    { icon: Sparkles, text: "Ferramenta exclusiva de I.A (acesso vitalício)" },
    { icon: TrendingUp, text: "Todos os bônus inclusos (R$ 1.802)" },
    { icon: Users, text: "Suporte direto no WhatsApp" },
    { icon: Clock, text: "Atualizações gratuitas vitalícias" },
    { icon: Shield, text: "Garantia incondicional de 7 dias" }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 md:py-[100px]" ref={ref}>
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge className="bg-red-500/20 border-red-500/50 text-red-400 px-4 py-2 animate-pulse">
                <Clock className="w-4 h-4 mr-2" />
                Oferta por Tempo Limitado
              </Badge>
              <Badge className="bg-primary/20 border-primary/50 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                {spots} vagas restantes
              </Badge>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight font-bold">
              Sua <span className="text-gradient-orange-glow">última chance</span><br className="hidden md:block" />
              <span className="text-zinc-300"> de garantir sua vaga</span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Centenas de pessoas já estão faturando. Não fique de fora dessa oportunidade.
            </p>
          </motion.div>

          {/* Main Offer Card */}
          <motion.div 
            className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm border-2 border-primary/40 rounded-2xl p-6 md:p-10 mb-6 shadow-[0_0_50px_rgba(255,102,0,0.15)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary via-orange-500 to-primary border-2 border-background px-6 py-2 text-base shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                MAIS ESCOLHIDO
              </Badge>
            </div>

            {/* Value Comparison */}
            <div className="text-center mb-6 pt-4">
              <p className="text-zinc-400 text-sm mb-1">Valor total com bônus:</p>
              <p className="text-2xl md:text-3xl text-zinc-500 line-through mb-2">R$ 2.799</p>
              
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <p className="relative text-5xl md:text-6xl font-black text-gradient-orange-glow mb-2">
                  12x R$ 47,28
                </p>
              </div>
              
              <p className="text-xl md:text-2xl text-secondary font-semibold mb-1">
                ou R$ 497 à vista
              </p>
              <Badge className="bg-green-500/20 border-green-500/50 text-green-400 mt-2">
                Economia de 82%
              </Badge>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 bg-background/50 border border-border/50 rounded-lg p-3 hover:border-primary/40 transition-all duration-300"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-zinc-300 leading-relaxed">{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <GlowButton onClick={scrollToForm}>
                GARANTIR MINHA VAGA AGORA
              </GlowButton>
              
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-zinc-500 mt-4">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>Pagamento 100% seguro e criptografado</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Guarantee Section */}
          <motion.div 
            className="bg-gradient-to-r from-primary/15 via-primary/20 to-primary/15 border-2 border-primary/40 rounded-xl p-6 md:p-8 text-center shadow-[0_0_30px_rgba(255,102,0,0.1)]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex items-center justify-center mb-3">
              <div className="bg-primary/20 rounded-full p-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gradient-orange-glow mb-3">
              Garantia Blindada de 7 Dias
            </h3>
            <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Se você não vender seu primeiro site em <span className="text-secondary font-semibold">7 dias</span> seguindo o método, 
              devolvemos <span className="text-secondary font-semibold">100% do seu investimento</span>. Sem perguntas. Sem burocracia.
            </p>
            <p className="text-sm text-zinc-500 mt-3">
              Você não tem nada a perder. Todo o risco é nosso.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinalOfferSection;
