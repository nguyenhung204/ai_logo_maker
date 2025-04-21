import Hero from "./_components/Hero";
import { AIImageCarousel } from "./_components/AIImageCarousel";
import { FeaturesSection } from "./_components/FeaturesSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="hidden sm:block">
        <AIImageCarousel />
      </div>
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
}
