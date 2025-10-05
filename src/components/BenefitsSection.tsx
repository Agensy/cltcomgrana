import { Check } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-8 md:py-[75px]">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl">
              O que você <span className="text-gradient-orange-glow">realmente ganha</span><br />
              com o CLT com Grana
            </h2>

            <p className="mb-8 text-lg text-zinc-300">
              Não é só sobre criar sites. É sobre transformar sua vida financeira.
            </p>

            <ul className="space-y-1">
              {[
                "Renda extra de R$ 2.000 a R$ 5.000 por mês",
                "Trabalhe de casa, no seu horário",
                "Sem precisar programar ou entender de tecnologia",
                "Sem gastar com anúncios ou redes sociais",
                "Sem contratar equipe ou pagar designers",
                "Sites entregues em minutos, não em semanas",
                "Método validado por centenas de alunos",
                "Suporte direto para tirar suas dúvidas"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <Check className="w-5 h-5 icon-gradient-orange flex-shrink-0" />
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

export default BenefitsSection;
