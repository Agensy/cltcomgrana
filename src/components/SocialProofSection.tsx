import { Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SocialProofSection = () => {
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
    },
    {
      name: "Marina Costa",
      age: "29 anos",
      job: "Assistente Financeira",
      result: "R$ 2.400 em 3 semanas",
      testimonial: "Estava cética no início, mas decidi tentar. Vendi 3 sites em menos de um mês e já paguei o curso 5 vezes. Incrível!",
      rating: 5
    },
    {
      name: "João Pedro",
      age: "45 anos",
      job: "Motorista de Aplicativo",
      result: "R$ 1.800 trabalhando nos finais de semana",
      testimonial: "Uso só aos sábados e domingos. Já é uma renda extra que me ajuda muito. O método é simples e funciona de verdade.",
      rating: 5
    },
    {
      name: "Fernanda Alves",
      age: "31 anos",
      job: "Recepcionista",
      result: "R$ 4.100 no segundo mês",
      testimonial: "No primeiro mês fiz R$ 1.200, no segundo já saltei pra R$ 4.000. A ferramenta de I.A economiza tanto tempo que consigo atender vários clientes.",
      rating: 5
    },
    {
      name: "Ricardo Santos",
      age: "39 anos",
      job: "Técnico em Informática",
      result: "R$ 6.200 em 60 dias",
      testimonial: "Tinha conhecimento técnico mas não sabia vender. O método me ensinou a prospectar e fechar vendas. Melhor investimento que já fiz.",
      rating: 5
    },
    {
      name: "Juliana Ferreira",
      age: "27 anos",
      job: "Auxiliar Administrativo",
      result: "Primeiro cliente em 3 dias",
      testimonial: "Não acreditei quando vendi meu primeiro site em 3 dias! O script de vendas é perfeito. Hoje já tenho 5 clientes fixos.",
      rating: 5
    },
    {
      name: "Marcos Vieira",
      age: "36 anos",
      job: "Auxiliar de Produção",
      result: "R$ 3.800 trabalhando à noite",
      testimonial: "Trabalho durante o dia em fábrica. À noite dedico 2 horas e já estou faturando mais de R$ 3.000 extras. Mudou minha vida!",
      rating: 5
    },
    {
      name: "Patricia Lima",
      age: "41 anos",
      job: "Gerente de Loja",
      result: "R$ 5.400 no primeiro mês completo",
      testimonial: "Usei minha experiência em vendas e apliquei o método. Resultado: mais de R$ 5.000 no primeiro mês cheio. Estou impressionada!",
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-6 py-3 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold">Resultados Reais</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl mb-4 leading-tight font-bold lg:text-5xl">
                Veja os <span className="text-gradient-orange-glow">resultados reais</span><br />
                dos nossos alunos
              </h2>
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                Centenas de pessoas já estão faturando com o método CLT com Grana
              </p>
            </div>

            <div className="max-w-6xl mx-auto mb-8">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((proof, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <motion.div 
                        className="bg-card/30 border border-border hover:border-primary/40 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)] group h-full"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + (index % 3) * 0.1 }}
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>

            <motion.div 
              className="bg-secondary/10 border border-secondary/30 rounded-lg p-6 max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
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
    </section>
  );
};

export default SocialProofSection;
