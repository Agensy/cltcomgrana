import { Shield, Clock, Users, TrendingUp, Sparkles, Zap, Check, ClipboardCheck, Megaphone, FileText, MessageCircle, RefreshCcw, Video } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { VariationConfig } from "@/config/variations";
import BlackFridayCountdown from "@/components/BlackFridayCountdown";

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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => Math.max(12, prev - Math.floor(Math.random() * 2)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
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
    { icon: Clock, text: "Atualizações gratuitas" }
  ];

  const bonuses = [
    { title: "Propostas prontas pra fechar cliente", value: "R$ 197", icon: ClipboardCheck },
    { title: "Agente de Vendas treinado pra você copiar", value: "R$ 297", icon: Megaphone },
    { title: "Modelo de Contrato simples e direto", value: "R$ 147", icon: FileText }
  ];

  const trainingItems = [
    { icon: Zap, text: "Curso CLT com Grana passo a passo" },
    { icon: Sparkles, text: "Ferramenta exclusiva de I.A para criar sites em minutos" },
    { icon: Video, text: "Aula ao vivo tira-dúvidas" }
  ];
  const supportItems = benefits
    .filter(b => [
      "Suporte direto no WhatsApp",
      "Atualizações gratuitas"
    ].includes(b.text))
    .map(b => ({ icon: b.icon, text: b.text }));
  const allItems = [
    ...bonuses.map(b => ({ icon: b.icon, text: b.title })),
    ...trainingItems,
    ...supportItems
  ];

  const installmentValue = config.pricing.installmentPrice.replace(/^R\$\s*/, "");
  const [installWhole, installCents] = installmentValue.split(",");
  const installmentNumber = parseFloat(`${installWhole}.${installCents}`);
  const totalInstallment = (installmentNumber * config.pricing.installmentCount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const original = parseFloat(config.pricing.originalPrice.replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(',', '.')) || 0;
  const cash = parseFloat(config.pricing.cashPrice.replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(',', '.')) || 0;
  const savings = Math.max(original - cash, 0);
  const savingsBRL = savings.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const discountPct = original ? Math.round((savings / original) * 100) : 0;
  const perDay = (installmentNumber * config.pricing.installmentCount) / 365;
  const perDayBRL = perDay.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section id="final-offer" className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 md:py-[100px]" ref={ref}>
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-5 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <Badge className="bg-error/20 border-error/50 text-error px-3 py-1.5">
                <Clock className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" />
                OFERTA ESPECIAL — ÚLTIMAS VAGAS DISPONÍVEIS
              </Badge>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 leading-snug md:leading-tight tracking-tight font-bold">
              Crie e venda <span className="text-gradient-orange-glow">sites com I.A</span><br className="hidden md:block" />
              <span className="text-zinc-300"> ainda HOJE!</span>
            </h2>

            <p className="text-sm md:text-xl text-zinc-300 max-w-2xl mx-auto">Mesmo começando do zero, sem experiência e sem ser "da tecnologia".</p>
            <p className="hidden md:block text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mt-2">A I.A faz praticamente tudo por você. Você só segue o passo a passo e entrega para o cliente.</p>
          </motion.div>

          {/* Main Offer Card */}
          <motion.div 
            className="relative bg-white/95 border-2 border-zinc-200 rounded-lg md:rounded-xl p-2 md:p-4 mb-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary via-orange-500 to-primary border-2 border-background px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base shadow-lg rounded-xl md:rounded-2xl">
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" />
                Tudo o que você vai receber hoje.
              </Badge>
            </div>

            <div className="text-center mb-2 pt-1"></div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3 lg:gap-4 items-stretch max-w-5xl mx-auto">
              {/* Left Column - Content */}
              <div className="lg:col-span-1 order-1 flex flex-col">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-lg md:text-xl text-gray-800 font-semibold mb-2">Conteúdo incluído</h3>
                  <div className="space-y-1">
                    {allItems.map((item, i) => {
                      const Icon = item.icon as any;
                      return (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 bg-white border border-gray-100 rounded p-1.5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                        >
                          <div className="bg-orange-50 rounded-full p-1 flex-shrink-0">
                            <Icon className="w-3 h-3 text-orange-500" strokeWidth={2} aria-hidden="true" focusable="false" />
                          </div>
                          <span className="text-sm text-gray-700 leading-tight">{item.text}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              <div role="separator" aria-orientation="horizontal" className="mx-auto my-2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-black/10 to-transparent md:hidden" />

              {/* Right Column - Offer */}
              <div className="lg:col-span-1 order-2 flex flex-col">
                <div className="flex-1">
                  {/* Offer Card - Optimized with CTA inside */}
                  <motion.div 
                    className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 shadow-xl border-2 border-orange-200 relative overflow-hidden h-full flex flex-col justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {/* Glow effect wrapper */}
                    <div className={`glowbox glowbox-active absolute inset-0`}>
                      {!reducedMotion && (
                        <div className="glowbox-animations">
                          <div className="glowbox-glow"></div>
                          <div className="glowbox-stars-masker">
                            <div className="glowbox-stars"></div>
                          </div>
                        </div>
                      )}
                      <div className="glowbox-borders-masker">
                        <div className="glowbox-borders"></div>
                      </div>
                    </div>
                    
                    <div className="relative z-10 text-center space-y-0.5">
                      <div className="mb-0.5">
                        <h3 className="text-gray-800 text-lg font-bold mb-0">Oferta de Hoje</h3>
                        <p className="text-sm text-gray-600 font-medium">Investimento</p>
                      </div>
                      
                      <div className="mb-0.5">
                        <p className="text-base text-gray-400 line-through">{config.pricing.originalPrice}</p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <Badge className="bg-black text-white border-black px-2 py-0 rounded-full text-sm">BLACK FRIDAY</Badge>
                        <span className="text-sm font-semibold text-gray-700">Termina hoje • <BlackFridayCountdown /></span>
                      </div>
                      
                      <div className="mb-0.5">
                        <div className="relative inline-flex items-center justify-center gap-1 mb-0">
                          <span className="text-base font-semibold text-gray-500" aria-hidden="true">
                            {config.pricing.installmentCount}x R$
                          </span>
                          <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500" aria-hidden="true">
                            {installWhole}
                          </span>
                          <span className="text-xl md:text-2xl font-bold text-orange-400" aria-hidden="true">,
                          </span>
                          <span className="text-xl md:text-2xl font-bold text-orange-400" aria-hidden="true">{installCents}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{perDayBRL}/dia</p>
                      </div>
                      
                      <div className="pt-0.5 border-t border-gray-100 mb-0.5">
                        <p className="text-sm text-gray-600 font-semibold">ou {config.pricing.cashPrice} à vista</p>
                      </div>

                      {/* CTA Button - Now Inside Offer Card */}
                      <div className="space-y-0.5">
                        <GlowButton onClick={handleGoToCheckout} className={`w-full max-w-xs text-base ${ctaClassName ?? ""}`} aria-describedby="payment-safe">
                          GARANTIR MINHA VAGA AGORA
                        </GlowButton>
                        
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                          <Shield className="w-3 h-3 flex-shrink-0" aria-hidden="true" focusable="false" />
                          <span id="payment-safe">Pagamento 100% seguro e criptografado</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guarantee Section - Footer */}
          <motion.div 
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 md:p-6 text-center shadow-lg border border-orange-100 mt-3 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-2 md:p-3 shadow-sm">
                  <Shield className="w-5 md:w-6 h-5 md:h-6 text-orange-500" aria-hidden="true" focusable="false" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Garantia Blindada de 7 Dias
                </h3>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-2 md:mb-3">
              Se você não vender seu primeiro site em <span className="text-orange-600 font-semibold">7 dias</span> seguindo o método, 
              devolvemos <span className="text-orange-600 font-semibold">100% do seu investimento</span>.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-orange-200 mt-2 md:mt-3">
              <Shield className="w-3 md:w-4 h-3 md:h-4 text-orange-500" aria-hidden="true" />
              <span className="text-sm md:text-base font-medium text-orange-700">Não vendeu? Devolvemos 100%.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DynamicFinalOfferSection;