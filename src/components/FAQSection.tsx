import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Preciso saber programar?",
      answer: "Não! A ferramenta de I.A faz todo o trabalho técnico. Você só precisa seguir o método passo a passo."
    },
    {
      question: "Quanto tempo levo para fazer o primeiro site?",
      answer: "Com a ferramenta exclusiva, você cria sites profissionais em minutos. O curso ensina você a fazer isso do zero."
    },
    {
      question: "Como consigo meus primeiros clientes?",
      answer: "O curso ensina métodos práticos e validados para conseguir clientes sem gastar com anúncios ou redes sociais."
    },
    {
      question: "Preciso investir em outras ferramentas?",
      answer: "Não. A ferramenta de I.A já está inclusa e você tem acesso vitalício. Sem mensalidades escondidas."
    },
    {
      question: "E se eu não conseguir vender em 7 dias?",
      answer: "Você tem 7 dias de garantia incondicional. Se não vender seu primeiro site, devolvemos 100% do seu investimento."
    },
    {
      question: "Funciona mesmo para iniciantes?",
      answer: "Sim! O método foi criado exatamente para quem nunca criou um site ou trabalhou com vendas online."
    },
    {
      question: "Quanto tempo preciso dedicar por dia?",
      answer: "Com 1 a 2 horas por dia você consegue aplicar o método e começar a faturar. Quanto mais tempo dedicar, mais rápido verá resultados."
    },
    {
      question: "Vou ter suporte?",
      answer: "Sim! Você terá suporte direto via e-mail por 90 dias e acesso ao grupo exclusivo de alunos no WhatsApp."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl leading-tight font-bold lg:text-5xl">
              <span className="text-gradient-orange-glow">Perguntas frequentes</span>
            </h2>

            <p className="text-lg text-zinc-300">
              Tire suas dúvidas sobre o CLT com Grana
            </p>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg text-zinc-300 hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
