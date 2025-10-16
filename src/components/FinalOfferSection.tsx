import React, { useState, useEffect, useCallback } from "react";
import { Shield, Clock, Users, TrendingUp, Sparkles, Zap } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import CheckoutDialog from "@/components/CheckoutDialog";
import { Badge } from "@/components/ui/badge";

const FinalOfferSection = React.memo(() => {
  const [spots, setSpots] = useState(47);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => Math.max(12, prev - Math.floor(Math.random() * 2)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const benefits = [
    { icon: Zap, text: "Curso completo CLT com Grana" },
    { icon: Sparkles, text: "Ferramenta exclusiva de I.A" },
    { icon: TrendingUp, text: "Todos os bônus inclusos (R$ 1.802)" },
    { icon: Users, text: "Suporte direto no WhatsApp" },
    { icon: Clock, text: "Atualizações gratuitas" },
    { icon: Shield, text: "Garantia de 7 dias" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 md:py-[100px]">
        <div className="text-center mb-12">
          <div className="opacity-100 transform-none">
            <Badge variant="secondary" className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">
              🔥 OFERTA ESPECIAL
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Última Chance de Garantir
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 block">
                Sua Vaga com Desconto
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Apenas <span className="text-orange-400 font-bold">{spots} vagas restantes</span> com 
              <span className="text-green-400 font-bold"> 67% de desconto</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="opacity-100 transform-none scale-100">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl text-gray-400 line-through">R$ 497</span>
                  <span className="text-4xl md:text-5xl font-bold text-green-400">R$ 167</span>
                </div>
                <p className="text-gray-300">ou 12x de R$ 16,90</p>
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 font-semibold">💰 Economia de R$ 330</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <Icon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span>{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <GlowButton 
                onClick={handleOpenDialog}
                className="w-full text-lg py-4"
              >
                GARANTIR MINHA VAGA AGORA
              </GlowButton>
            </div>
          </div>

          <div className="opacity-100 transform-none">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">⚡ Acesso Imediato</h3>
                <p className="text-gray-300">
                  Comece hoje mesmo! Receba o acesso completo na sua caixa de entrada em até 5 minutos.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-3">🛡️ Garantia Total</h3>
                <p className="text-gray-300">
                  7 dias para testar. Se não gostar, devolvemos 100% do seu dinheiro.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3">🎯 Suporte Exclusivo</h3>
                <p className="text-gray-300">
                  Tire suas dúvidas diretamente comigo no WhatsApp. Suporte personalizado incluído.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 opacity-100 transform-none">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-red-400 mb-2">⏰ Oferta por Tempo Limitado</h3>
            <p className="text-gray-300">
              Esta promoção especial expira em breve. Não perca a chance de transformar sua carreira com 67% de desconto.
            </p>
          </div>
        </div>
      </div>

      <CheckoutDialog open={dialogOpen} onOpenChange={handleCloseDialog} />
    </section>
  );
});

export default FinalOfferSection;
