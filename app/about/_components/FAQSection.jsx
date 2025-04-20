"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "How does the AI Logo Maker work?",
      answer:
        "AI Logo Maker uses advanced artificial intelligence technology to generate logos based on the information you provide. Simply enter your brand name, choose your preferred style and color, and our AI will create multiple unique logo designs for you to choose from.",
    },
    {
      question: "Do I own the logo after creating it?",
      answer:
        "Yes, with Pro and Enterprise plans, you will have full ownership of the generated logo. With the Free plan, you can use the logo for non-commercial personal purposes.",
    },
    {
      question: "Can I edit the logo after it is created?",
      answer:
        "Yes, you can edit the logo at any time. We offer easy-to-use editing tools that let you change colors, fonts, layout, and other design elements.",
    },
    {
      question: "In which formats can I download the logo?",
      answer:
        "Depending on your plan, you can download the logo in various formats. The Free plan supports PNG, while the Pro and Enterprise plans support PNG, JPG, SVG, PDF, and more.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no long-term contracts. You can upgrade, downgrade, or cancel your plan from your account page.",
    },
    {
      question: "Can I use the logo for commercial purposes?",
      answer:
        "Yes, with Pro and Enterprise plans, you can use the logo for commercial purposes. The Free plan only supports non-commercial personal use.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about AI Logo Maker.
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
