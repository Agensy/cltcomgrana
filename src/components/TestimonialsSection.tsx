import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import testimonial1 from "@/assets/testimonial-1-optimized.jpg";
import testimonial2 from "@/assets/testimonial-2-optimized.jpg";
import testimonial3 from "@/assets/testimonial-3-optimized.jpg";
import testimonial4 from "@/assets/testimonial-4-optimized.jpg";
import testimonial5 from "@/assets/testimonial-5-optimized.jpg";

const testimonials = [
  { id: 1, image: testimonial1, name: "Marcos" },
  { id: 2, image: testimonial2, name: "Fabricio" },
  { id: 3, image: testimonial3, name: "Dani" },
  { id: 4, image: testimonial4, name: "Roberta" },
  { id: 5, image: testimonial5, name: "Sabrina" },
];

const TestimonialsSection = React.memo(() => {
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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 opacity-100 transform-none">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Veja o que nossos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 block">
              alunos estão dizendo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Resultados reais de pessoas que transformaram suas vidas com o CLT com Grana
          </p>
        </div>

        <div className="max-w-4xl mx-auto opacity-100 transform-none scale-100">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full">
                      <img
                        src={testimonial.image}
                        alt={`Depoimento de ${testimonial.name}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                        loading="lazy"
                      />
                      <div className="mt-4 text-center">
                        <p className="text-gray-300 font-medium">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">Aluno CLT com Grana</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

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
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;
