"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const aiGeneratedImages = [
  {
    id: 1,
    src: "/imgs-for-carousel-and-readme/img-4.png",
    alt: "AI generated logo for a restaurant",
  },
  {
    id: 2,
    src: "/imgs-for-carousel-and-readme/img-5.png",
    alt: "AI generated logo for a tech company",
  },
  {
    id: 3,
    src: "/imgs-for-carousel-and-readme/img-2.png",
    alt: "AI generated logo for a restaurant",
  },
  {
    id: 4,
    src: "/imgs-for-carousel-and-readme/img-1.png",
    alt: "AI generated logo for a tech company",
  },

  {
    id: 5,
    src: "/imgs-for-carousel-and-readme/img-3.png",
    alt: "AI generated logo for a tech company",
  },
  {
    id: 6,
    src: "/imgs-for-carousel-and-readme/img-6.png",
    alt: "AI generated logo for a restaurant",
  },
];

export function AIImageCarousel({
  title = "AI Generated Logos",
  description = "Browse through our collection of AI-generated logos",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const totalImages = aiGeneratedImages.length;
  const visibleImages = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - visibleImages ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - visibleImages : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="w-full py-16 bg-gray-100 my-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleImages)
                }%)`,
              }}
            >
              {aiGeneratedImages.map((image) => (
                <div key={image.id} className="min-w-[33.333%] px-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-64 w-full">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-4"
                        priority={image.id === 1}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-md z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-md z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalImages - visibleImages + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  currentIndex === index ? "bg-pink-500" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
