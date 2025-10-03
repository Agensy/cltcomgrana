import { Check } from "lucide-react";

const BonusSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              <span className="text-primary">Bônus exclusivos</span> para quem<br />
              começar agora
            </h2>

            <p className="mb-8 text-lg text-zinc-300">
              Além do curso completo e da ferramenta de I.A, você recebe:
            </p>

            <ul className="space-y-1">
              {[
                "Templates de propostas comerciais prontos para usar",
                "Scripts de vendas testados e aprovados",
                "Lista com 50+ nichos lucrativos para prospectar",
                "Grupo exclusivo de alunos no WhatsApp",
                "Suporte direto via e-mail por 90 dias",
                "Atualizações gratuitas da ferramenta de I.A",
                "Certificado de conclusão digital"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
