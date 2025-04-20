import Image from "next/image";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Miller",
      role: "Founder, TechStart",
      image: "/imgs-for-testimonials-section/john-miller.png",
      content:
        "AI Logo Maker helped me create a professional logo for my startup within minutes. It saved me a lot of time and cost!",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Marketing Manager, FoodCo",
      image: "/imgs-for-testimonials-section/emily-chen.png",
      content:
        "I've tried many logo creation tools, but AI Logo Maker truly stands out with its user-friendly interface and high-quality results.",
      rating: 5,
    },
    {
      name: "David Nguyen",
      role: "Freelance Designer",
      image: "/imgs-for-testimonials-section/david-nguyen.png",
      content:
        "Even with my design experience, I'm impressed by AI Logo Maker’s capabilities. I now use it to quickly generate initial concepts.",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thousands of users have created professional logos with AI Logo
            Maker.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={
                      testimonial.image || "/placeholder.svg?height=48&width=48"
                    }
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
