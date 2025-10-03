import { Check, Gift } from "lucide-react";

const BonusSection = () => {
  const bonuses = [
    { icon: "📝", text: "Templates de propostas comerciais prontos para usar", value: "R$ 197" },
    { icon: "💬", text: "Scripts de vendas testados e aprovados", value: "R$ 147" },
    { icon: "🎯", text: "Lista com 50+ nichos lucrativos para prospectar", value: "R$ 97" },
    { icon: "👥", text: "Grupo exclusivo de alunos no WhatsApp", value: "R$ 297" },
    { icon: "📧", text: "Suporte direto via e-mail por 90 dias", value: "R$ 397" },
    { icon: "🔄", text: "Atualizações gratuitas da ferramenta de I.A", value: "R$ 497" },
    { icon: "🏆", text: "Certificado de conclusão digital", value: "R$ 67" }
  ];

  const totalValue = bonuses.reduce((sum, bonus) => {
    return sum + parseInt(bonus.value.replace(/[^\d]/g, ''));
  }, 0);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full max-w-4xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-4">
                <Gift className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Bônus Exclusivos</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
                <span className="text-primary">Bônus exclusivos</span> para quem<br />
                começar agora
              </h2>
              <p className="text-lg text-zinc-300">
                Além do curso completo e da ferramenta de I.A, você recebe:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {bonuses.map((bonus, index) => (
                <div 
                  key={index} 
                  className="bg-card/30 border border-border hover:border-primary/40 rounded-lg p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,102,0,0.1)] group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{bonus.icon}</span>
                    <div className="flex-1">
                      <p className="text-base text-zinc-300 mb-2">{bonus.text}</p>
                      <p className="text-sm font-semibold text-primary">Valor: {bonus.value}</p>
                    </div>
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/40 rounded-lg p-6 md:p-8 text-center">
              <p className="text-lg text-zinc-300 mb-2">Valor total dos bônus:</p>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-3">R$ {totalValue.toLocaleString('pt-BR')}</p>
              <p className="text-xl text-secondary font-semibold">
                🎁 Tudo isso GRÁTIS para você!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
