import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, CheckCircle, TrendingUp, Users } from "lucide-react";
import CountUp from "react-countup";
import testimonial1 from "@/assets/testimonial-1-optimized.jpg";
import testimonial2 from "@/assets/testimonial-2-optimized.jpg";
import testimonial3 from "@/assets/testimonial-3-optimized.jpg";
import testimonial4 from "@/assets/testimonial-4-optimized.jpg";
import testimonial5 from "@/assets/testimonial-5-optimized.jpg";

const testimonials = [
  { 
    id: 1, 
    image: testimonial1, 
    name: "Marcos Silva", 
    age: "34 anos",
    job: "Auxiliar de Limpeza",
    result: "R$ 1.800 no primeiro mês",
    rating: 5,
    testimonial: "Trabalho de faxineiro ganhando um salário mínimo. Estava desesperado para aumentar minha renda. Com o método, consegui fazer meu primeiro site em 10 dias e vendi por R$ 400. Agora faço de R$ 1.500 a R$ 2.000 extras por mês!"
  },
  { 
    id: 2, 
    image: testimonial2, 
    name: "Fabricio Costa", 
    age: "28 anos",
    job: "Entregador de App",
    result: "R$ 2.200 em 45 dias",
    rating: 5,
    testimonial: "Sou entregador do iFood e estava cansado de depender só da bike. O curso me ensinou a criar sites mesmo sem saber nada de tecnologia. Em 1 mês já tinha 3 clientes fixos. Agora tenho uma renda extra garantida!"
  },
  { 
    id: 3, 
    image: testimonial3, 
    name: "Dani Oliveira", 
    age: "31 anos",
    job: "Caixa de Supermercado",
    result: "R$ 1.400 trabalhando fins de semana",
    rating: 5,
    testimonial: "Trabalho no caixa do supermercado e ganhava pouco. Nos fins de semana uso o método e já consegui vender 4 sites. O melhor é que não preciso sair de casa e posso fazer no meu tempo livre!"
  },
  { 
    id: 4, 
    image: testimonial4, 
    name: "Roberta Santos", 
    age: "42 anos",
    job: "Diarista",
    result: "R$ 1.600 no primeiro mês",
    rating: 5,
    testimonial: "Sou diarista e estava com dificuldades financeiras. Pensei que nunca conseguiria mexer com computador, mas o método é muito simples. Em 15 dias vendi meu primeiro site por R$ 350. Hoje tenho uma renda extra que me ajuda muito!"
  },
  { 
    id: 5, 
    image: testimonial5, 
    name: "Sabrina Lima", 
    age: "26 anos",
    job: "Atendente de Lanchonete",
    result: "R$ 1.900 em 60 dias",
    rating: 5,
    testimonial: "Trabalho numa lanchonete ganhando pouco. Sempre quis ter uma renda extra mas não sabia como. Com o CLT com Grana, aprendi a criar sites profissionais. Já vendi 5 sites e estou muito feliz com os resultados!"
  },
];

const TestimonialsSection = React.memo(() => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useState(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  });

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="container relative z-10 mx-auto" ref={ref}>
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold">Resultados Comprovados</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Veja o que nossos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 block">
              alunos estão dizendo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Resultados reais de pessoas que transformaram suas vidas com o CLT com Grana
          </p>
          
          {/* Social Proof Counter */}
          <motion.div 
            className="mt-8 flex justify-center items-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2">
               <Users className="w-5 h-5 text-orange-400" />
               <span className="text-white font-semibold">
                 <CountUp end={387} duration={2} enableScrollSpy scrollSpyOnce />+ alunos
               </span>
             </div>
            <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">4.9/5 estrelas</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="p-4 h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + (index % 3) * 0.1 }}
                  >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full hover:border-orange-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)] group">
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                      
                      {/* Testimonial Image */}
                      <div className="relative mb-4">
                        <img
                          src={testimonial.image}
                          alt={`Depoimento de ${testimonial.name}`}
                          className="w-full h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Verification Badge */}
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* User Info */}
                      <div className="mb-4">
                        <h3 className="text-gray-200 font-bold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-400 text-sm">{testimonial.age} • {testimonial.job}</p>
                        
                        {/* Result Badge */}
                        <div className="mt-2 inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1">
                          <TrendingUp className="w-3 h-3 text-orange-400" />
                          <span className="text-orange-400 font-semibold text-sm">{testimonial.result}</span>
                        </div>
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-gray-300 italic leading-relaxed text-sm">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-orange-400 scale-110"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
});

export default TestimonialsSection;
