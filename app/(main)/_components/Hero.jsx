"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Palette, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Lookup from "../_data/Lookup";

export default function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderTitle, setPlaceholderTitle] = useState("");
  const router = useRouter();

  const exampleTitles = [
    "Industrial University of Ho Chi Minh City",
    "Saigon Street Eats",
    "Hanoi Art Space",
    "Lotus Boutique",
    "Dragon Coffee",
    "Mekong Adventures",
    "Golden Bamboo Spa",
    "Pho Master",
    "Halong Bay Tours",
  ];

  const features = [
    { icon: <Wand2 className="w-5 h-5" />, text: "AI-Powered" },
    { icon: <Zap className="w-5 h-5" />, text: "Instant" },
    { icon: <Palette className="w-5 h-5" />, text: "Customizable" },
    { icon: <Layers className="w-5 h-5" />, text: "Multiple Styles" },
  ];

  useEffect(() => {
    if (!isTyping) {
      const interval = setInterval(() => {
        const randomTitle =
          exampleTitles[Math.floor(Math.random() * exampleTitles.length)];
        setPlaceholderTitle(randomTitle);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const handleClick = () => {
    if (logoTitle.trim()) {
      router.push(`/create/?title=${logoTitle.trim()}`);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="flex items-center mt-16 flex-col gap-5 px-4">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="text-center max-w-4xl"
      >
        {/* Badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            AI-Powered Logo Generation
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold tracking-tight text-pink-600 mb-4"
        >
          {Lookup.HeroHeading}
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6"
        >
          {Lookup.HeroSubheading}
        </motion.h2>

        {/* Description */}
        <motion.p variants={item} className="text-lg text-gray-600 mb-8">
          {Lookup.HeroDesc}
        </motion.p>

        {/* Features */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm"
            >
              {feature.icon}
              <span className="text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Input and Button */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center max-w-xl mx-auto"
        >
          <div className="relative flex-grow w-full">
            <input
              type="text"
              value={logoTitle}
              onChange={(e) => setLogoTitle(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              placeholder={placeholderTitle || Lookup.InputTitlePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg shadow-md"
            />
            {!logoTitle && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Wand2 className="w-5 h-5" />
              </div>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleClick}
              disabled={!logoTitle.trim()}
              className={`h-full px-6 py-3 text-base font-medium rounded-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200 shadow-lg whitespace-nowrap ${
                logoTitle.trim() ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.div variants={item} className="mt-8 text-sm text-gray-500">
          <p>No credit card required • Free to start • 100+ logo styles</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
