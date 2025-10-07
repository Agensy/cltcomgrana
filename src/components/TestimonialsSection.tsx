import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import testimonial1 from "@/assets/testimonial-1-optimized.jpg";
import testimonial2 from "@/assets/testimonial-2-optimized.jpg";
import testimonial3 from "@/assets/testimonial-3-optimized.jpg";
import testimonial4 from "@/assets/testimonial-4-optimized.jpg";
import testimonial5 from "@/assets/testimonial-5-optimized.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  { id: 1, image: testimonial1, name: "Marcos" },
  { id: 2, image: testimonial2, name: "Fabricio" },
  { id: 3, image: testimonial3, name: "Dani" },
  { id: 4, image: testimonial4, name: "Roberta" },
  { id: 5, image: testimonial5, name: "Sabrina" },
];

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useState(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            O que nossos{" "}
            <span className="text-gradient-orange-glow">alunos dizem</span>
          </h2>
          <p className="text-center text-zinc-400 mb-12 text-lg max-w-2xl mx-auto">
            Veja os resultados reais de quem já está criando e vendendo sites
            com nossa metodologia
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-2"
                >
                  <div className="relative overflow-hidden rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <img
                      src={testimonial.image}
                      alt={`Depoimento de ${testimonial.name}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
