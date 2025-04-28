"use client";

import { Zap, Palette, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-pink-500" />,
      title: "AI-Powered Design",
      description:
        "Advanced AI technology generates unique logos based on your input within seconds.",
    },
    {
      icon: <Palette className="h-10 w-10 text-pink-500" />,
      title: "Unlimited Customization",
      description:
        "Adjust colors, fonts, and layouts to create the perfect logo for your brand.",
    },
    {
      icon: <Clock className="h-10 w-10 text-pink-500" />,
      title: "Time-Saving",
      description:
        "No need to wait for designers. Create professional logos in minutes instead of days.",
    },
    {
      icon: <Zap className="h-10 w-10 text-pink-500" />,
      title: "Save Generated Logos",
      description:
        "Easily save and access all your generated logos for future use or editing anytime.",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // các card vào lần lượt
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="py-16 bg-gray-100/50 my-8 rounded-xl">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-primary mb-4"
          >
            Why Choose AI Logo Maker?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our AI Logo Maker combines advanced technology with intuitive design
            to deliver the best logo creation experience.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
