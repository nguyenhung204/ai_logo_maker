"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "Who created AI Logo Maker?",
      answer:
        "AI Logo Maker was founded in 2025 by a team of AI enthusiasts and design professionals who wanted to make professional logo creation accessible to everyone. Our diverse team combines expertise in artificial intelligence, user experience design, and brand development.",
    },
    {
      question: "What is the mission of AI Logo Maker?",
      answer:
        "Our mission is to democratize brand design by leveraging cutting-edge AI technology. We believe that every business, regardless of size or budget, deserves access to high-quality, unique logo designs that effectively represent their brand identity.",
    },
    {
      question: "How is AI Logo Maker different from other logo creators?",
      answer:
        "Unlike template-based logo creators, our platform uses advanced AI algorithms trained on thousands of professional logo designs. This allows us to generate truly unique logos tailored to your specific brand attributes rather than modified templates.",
    },
    {
      question: "Does AI Logo Maker work with designers?",
      answer:
        "Absolutely! We have a network of professional designers who review and refine our AI algorithms. For Enterprise customers, we also offer custom design services where our in-house designers work directly with your team to perfect your brand identity.",
    },
    {
      question: "What technologies power AI Logo Maker?",
      answer:
        "Our platform is built on state-of-the-art machine learning algorithms and neural networks. We've developed proprietary AI models specifically optimized for logo design, trained on vast datasets of professional design work with careful attention to aesthetic principles.",
    },
    {
      question: "How can I contact the team behind AI Logo Maker?",
      answer:
        "You can reach our team through the Contact page on our website, or directly via email at support@ailogomaker.com. We're always happy to answer questions, receive feedback, or discuss potential collaborations.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100/50 my-12 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            About Our Company
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about the team and technology behind AI Logo Maker.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
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
                <div className="mt-3 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
