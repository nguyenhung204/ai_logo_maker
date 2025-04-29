"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "Who created AI Logo Maker?",
      answer:
        "AI Logo Maker was founded in 2025 by a team of AI enthusiasts and design professionals.",
    },
    {
      question: "What is the mission of AI Logo Maker?",
      answer:
        "Our mission is to democratize brand design through AI technology.",
    },
    {
      question: "How is AI Logo Maker different from others?",
      answer:
        "Unlike template-based creators, our AI generates unique logos tailored to your brand.",
    },
    {
      question: "Does AI Logo Maker work with designers?",
      answer:
        "Yes! We collaborate with designers to refine AI and offer custom services.",
    },
    {
      question: "What technologies power AI Logo Maker?",
      answer:
        "Our platform uses proprietary machine learning models optimized for logo design.",
    },
    {
      question: "How can I contact the team?",
      answer: "Contact us via our website or email at support@ailogomaker.com.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
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
    <section className="py-16 bg-gray-100/50 my-12 rounded-xl">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-primary"
          >
            About Our Company
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Learn more about the team and technology behind AI Logo Maker.
          </motion.p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-3xl mx-auto divide-y divide-gray-200"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants} className="py-5">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-pink-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3 text-gray-600"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
