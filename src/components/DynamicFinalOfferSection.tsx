import { Shield, Clock, Users, TrendingUp, Sparkles, Zap, Check, ClipboardCheck, Megaphone, FileText, MessageCircle, RefreshCcw, Video } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { VariationConfig } from "@/config/variations";

interface DynamicFinalOfferSectionProps {
  config: VariationConfig;
  ctaClassName?: string;
}

const DynamicFinalOfferSection = ({ config, ctaClassName }: DynamicFinalOfferSectionProps) => {
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

  const buildCheckoutUrl = () => {
    try {
      const url = new URL(config.checkout.checkoutUrl);
      const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
      const hasWindow = typeof window !== 'undefined';
      const searchParams = hasWindow ? new URLSearchParams(window.location.search) : null;
      keys.forEach((key) => {
        const fromQuery = searchParams?.get(key);
        const fallback = (config.checkout.utmParams as any)?.[key];
        const value = fromQuery || fallback;
        if (value) url.searchParams.set(key, value);
      });
      return url.toString();
    } catch {
      return config.checkout.checkoutUrl;
    }
  };

  const handleGoToCheckout = () => {
    const target = buildCheckoutUrl();
    if (typeof window !== 'undefined') {
      window.location.href = target;
    }
  };

  const benefits = [
    { icon: Zap, text: "Curso completo CLT com Grana" },
    { icon: Sparkles, text: "Ferramenta exclusiva de I.A" },
    { icon: TrendingUp, text: "Todos os bônus inclusos" },
    { icon: Users, text: "Suporte direto no WhatsApp" },
    { icon: Clock, text: "Atualizações gratuitas" },
    { icon: Shield, text: "Garantia incondicional de 7 dias" }
  ];

  const bonuses = [
    { title: "Propostas prontas pra fechar cliente", value: "R$ 197", icon: ClipboardCheck },
    { title: "Agente de Vendas treinado pra você copiar", value: "R$ 297", icon: Megaphone },
    { title: "Modelo de Contrato simples e direto", value: "R$ 147", icon: FileText },
    { title: "Aula ao vivo tira-dúvidas", value: "R$ 267", icon: Video }
  ];

  const installmentValue = config.pricing.installmentPrice.replace(/^R\$\s*/, "");
  const [installWhole, installCents] = installmentValue.split(",");

  return (
    <section id="final-offer" className="relative overflow-hidden">
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
              <Badge className="bg-error/20 border-error/50 text-error px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                OFERTA ESPECIAL — ÚLTIMAS VAGAS DISPONÍVEIS
              </Badge>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight font-bold">
              Crie e venda <span className="text-gradient-orange-glow">sites com I.A</span><br className="hidden md:block" />
              <span className="text-zinc-300"> ainda HOJE!</span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">Mesmo começando do zero.</p>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">Mesmo sem experiência.</p>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">Mesmo sem ser “da tecnologia”.</p>
            <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mt-2">A I.A faz praticamente tudo por você. Você só segue o passo a passo e entrega para o cliente.</p>
          </motion.div>

          {/* Main Offer Card */}
          <motion.div 
            className="relative bg-white/95 border-2 border-zinc-200 rounded-2xl p-6 md:p-10 mb-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
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

            <div className="text-center mb-6 pt-4">
              <p className="text-lg md:text-xl text-zinc-900 font-semibold">Tudo o que você vai receber hoje</p>
            </div>

            <motion.div
              className="mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm text-[#2A2A2A] font-medium mb-4 border-b border-black/10 pb-2">Ferramentas prontas para vender</p>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-3">
                {bonuses.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 bg-white/90 border border-orange-500/30 rounded-2xl px-8 py-3 hover:border-orange-400/40 shadow-sm transition-all duration-300"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <div className="bg-orange-500/5 rounded-full p-2.5 flex-shrink-0">
                        <Icon className="w-6 h-6 icon-gradient-orange" strokeWidth={2.25} />
                      </div>
                      <span className="text-sm text-zinc-900 leading-relaxed">{b.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <p className="text-sm text-[#2A2A2A] font-medium mb-4 border-b border-black/10 pb-2">Treinamento completo</p>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-3">
                {[
                  { icon: Zap, text: "Curso CLT com Grana passo a passo" },
                  { icon: Sparkles, text: "Ferramenta exclusiva de I.A para criar sites em minutos" },
                  { icon: Video, text: "Aula ao vivo tira-dúvidas" }
                ].map((item, idx) => {
                  const Icon = item.icon as any;
                  return (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-4 bg-white/90 border border-orange-500/30 rounded-2xl px-8 py-3 hover:border-orange-400/40 shadow-sm transition-all duration-300"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.35 + idx * 0.1 }}
                    >
                      <div className="bg-orange-500/5 rounded-full p-2.5 flex-shrink-0">
                        <Icon className="w-6 h-6 icon-gradient-orange" strokeWidth={2.25} />
                      </div>
                      <span className="text-sm text-zinc-900 leading-relaxed">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            

            {/* Benefits Grid */}
            <p className="text-sm text-[#2A2A2A] font-medium mb-4 border-b border-black/10 pb-2">Suporte e segurança</p>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-3 mb-8">
              {benefits.filter(b => [
                "Suporte direto no WhatsApp",
                "Atualizações gratuitas",
                "Garantia incondicional de 7 dias"
              ].includes(b.text)).map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 bg-white/90 border border-orange-500/30 rounded-2xl px-8 py-3 hover:border-orange-400/40 shadow-sm transition-all duration-300"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="bg-orange-500/5 rounded-full p-2.5 flex-shrink-0">
                      <Icon className="w-6 h-6 icon-gradient-orange" strokeWidth={2.25} />
                    </div>
                    <span className="text-sm text-zinc-900 leading-relaxed">{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mb-6">
              <div className="inline-block bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-[28px] px-10 py-8">
                <p className="text-[#2A2A2A] text-sm mb-2">Investimento</p>
                <p className="text-xs text-[#C6C6C6] line-through mb-3">{config.pricing.originalPrice}</p>
                <div className="relative inline-flex items-center justify-center gap-1 mb-3">
                  <span className="text-base md:text-lg font-semibold text-zinc-300">
                    {config.pricing.installmentCount}x R$
                  </span>
                  <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    {installWhole},
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-emerald-400">
                    {installCents}
                  </span>
                </div>
                <p className="text-xl md:text-2xl text-zinc-400">ou {config.pricing.cashPrice} à vista</p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <GlowButton onClick={handleGoToCheckout} className={ctaClassName ?? ""}>
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
            className="bg-gradient-to-r from-primary/15 via-primary/20 to-primary/15 border-2 border-primary/40 rounded-xl p-6 md:p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
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
            <p className="text-sm text-zinc-500 mt-3">— Não vendeu seu primeiro site? Devolvemos 100%.</p>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default DynamicFinalOfferSection;
