"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const aiGeneratedImages = [
  {
    id: 6,
    src: "/logo-generated-imgs/img-1.png",
    alt: "AI generated logo for an application",
  },
  {
    id: 1,
    src: "/logo-generated-imgs/img-4.png",
    alt: "AI generated logo for a restaurant",
  },
  {
    id: 2,
    src: "/logo-generated-imgs/img-5.png",
    alt: "AI generated logo for a tech company",
  },
  {
    id: 3,
    src: "/logo-generated-imgs/img-2.png",
    alt: "AI generated logo for a sport team",
  },
  {
    id: 7,
    src: "/logo-generated-imgs/img-7.png",
    alt: "AI generated logo for a security team",
  },
  {
    id: 4,
    src: "/logo-generated-imgs/img-3.png",
    alt: "AI generated logo for a tech company",
  },
  {
    id: 5,
    src: "/logo-generated-imgs/img-6.png",
    alt: "AI generated logo for a tech company",
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

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="w-full py-16 bg-gray-100/50 my-8 rounded-xl">
      <div className="container mx-auto px-4">
        {/* Tiêu đề + mô tả */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-primary"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-lg text-gray-600"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleImages)
                }%)`,
              }}
            >
              {aiGeneratedImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="min-w-[33.333%] px-2"
                >
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
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Prev Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-white rounded-full shadow-md"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
          </motion.div>

          {/* Next Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-white rounded-full shadow-md"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
