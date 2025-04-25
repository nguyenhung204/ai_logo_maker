import { Zap, Palette, Sparkles, Clock } from "lucide-react";

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

  return (
    <section className="py-16 bg-gray-100/50 my-8 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Why Choose AI Logo Maker?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI Logo Maker combines advanced technology with intuitive design
            to deliver the best logo creation experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
