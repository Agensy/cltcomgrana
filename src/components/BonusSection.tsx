import React from "react";
import { Check, Gift, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BonusSection = React.memo(() => {
  const bonuses = [
    { 
      title: "Propostas prontas pra fechar cliente", 
      description: "Modelos já prontos pra copiar e mandar no WhatsApp", 
      value: "R$ 197" 
    },
    { 
      title: "Agente de Vendas treinado pra você copiar", 
      description: "Scripts e respostas personalizadas pra convencer qualquer cliente", 
      value: "R$ 297" 
    },
    { 
      title: "Modelo de Contrato simples e direto", 
      description: "Pra você entregar com segurança e profissionalismo", 
      value: "R$ 147" 
    },
    { 
      title: "Suporte direto no WhatsApp", 
      description: "Teve dúvida? travou? Manda no nosso suporte e resolva rapidamente", 
      value: "R$ 397" 
    },
    { 
      title: "Futuras Atualizações", 
      description: "Sempre que o método melhorar, você recebe sem pagar nada", 
      value: "R$ 497" 
    },
    { 
      title: "Aula ao vivo tira-dúvidas", 
      description: "Encontro online pra resolver tudo com você, ao vivo", 
      value: "R$ 267" 
    }
  ];

  const totalValue = bonuses.reduce((sum, bonus) => {
    return sum + parseInt(bonus.value.replace(/[^\d]/g, ''));
  }, 0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-[75px]">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12 opacity-100 transform-none">
            <Badge variant="secondary" className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
              <Gift className="w-4 h-4 mr-2" />
              BÔNUS EXCLUSIVOS
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Mais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">R$ 1.800</span>
              <span className="block">em bônus inclusos</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tudo que você precisa para começar a faturar hoje mesmo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12 opacity-100 transform-none">
            {bonuses.map((bonus, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/10 rounded-full p-3 flex-shrink-0">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{bonus.title}</h3>
                    <p className="text-gray-300 mb-3">{bonus.description}</p>
                    <div className="text-green-400 font-bold text-lg">{bonus.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center opacity-100 transform-none scale-100">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Valor Total dos Bônus</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                R$ {totalValue.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-300">
                Tudo isso <span className="text-green-400 font-bold">GRÁTIS</span> quando você adquire o CLT com Grana hoje
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default BonusSection;
