import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.jpeg";
import testimonial3 from "@/assets/testimonial-3.jpeg";
import testimonial4 from "@/assets/testimonial-4.png";
import testimonial5 from "@/assets/testimonial-5.png";
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
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
