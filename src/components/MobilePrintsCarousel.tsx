import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface MobilePrintsCarouselProps {
  images: string[];
  titleNode?: React.ReactNode;
}

const MobilePrintsCarousel: React.FC<MobilePrintsCarouselProps> = ({ images, titleNode }) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="relative py-12 px-4">
      <div className="container mx-auto">
        {titleNode ? titleNode : null}
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[Autoplay({ delay: 4500 })]}
        >
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i} className="basis-auto">
                <div className="p-2">
                  <img
                    src={img}
                    alt={`Depoimento ${i + 1}`}
                    className="w-64 sm:w-72 h-auto rounded-xl border border-zinc-700 shadow-md"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <div className="flex justify-center mt-6 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-orange-400" : "bg-zinc-600"}`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobilePrintsCarousel;
