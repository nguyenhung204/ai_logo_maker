"use client";

import { 
  Award, 
  Clock, 
  Code, 
  GraduationCap, 
  Lightbulb, 
  Palette, 
  Rocket, 
  Shield, 
  Star, 
  Target, 
  Users, 
  Zap 
} from "lucide-react";
import TeamMemberCard from "./_components/TeamMemberCard";
import { FAQSection } from "./_components/FAQSection";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 px-6 py-16 text-center text-white md:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            About Our Vision
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl">
            We are revolutionizing logo design with AI technology, making professional branding accessible to everyone.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary">
          Our Story
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Founded by students passionate about design and technology, our AI Logo Generator 
          combines cutting-edge AI with creative expertise to democratize professional logo design. 
          We believe every business deserves a stunning visual identity, regardless of budget.
        </p>
      </div>

      {/* Core Values */}
      <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Innovative Technology</h3>
          <p className="mt-2 text-muted-foreground">
            We leverage the latest AI advancements to create exceptional logo designs
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Creative Excellence</h3>
          <p className="mt-2 text-muted-foreground">
            We craft unique logos that capture your brand's essence and personality
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium">User-Focused Design</h3>
          <p className="mt-2 text-muted-foreground">
            We prioritize intuitive experiences that make logo creation simple
          </p>
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-8">
          <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-primary">Our Mission</h3>
          <p className="text-muted-foreground">
            To democratize professional logo design through AI technology, making high-quality 
            branding accessible to businesses of all sizes at a fraction of traditional costs.
          </p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-8">
          <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-primary">Our Vision</h3>
          <p className="text-muted-foreground">
            To become the global leader in AI-powered design solutions, empowering entrepreneurs 
            and businesses worldwide with tools that transform their visual identity.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          Why Choose Our AI Logo Generator
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg p-4 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Generate professional logos in seconds, not days</p>
          </div>
          <div className="flex flex-col items-center rounded-lg p-4 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">100% Unique</h3>
            <p className="text-sm text-muted-foreground">Every design is original and tailored to your brand</p>
          </div>
          <div className="flex flex-col items-center rounded-lg p-4 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">Professional results without the premium price tag</p>
          </div>
          <div className="flex flex-col items-center rounded-lg p-4 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Full Ownership</h3>
            <p className="text-sm text-muted-foreground">You own all rights to your generated logos</p>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="mb-20">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary">
          Meet Our Team
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Our talented team combines technical expertise and creative skills to bring you the best AI logo generation platform.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <TeamMemberCard
            name="Nguyễn Văn Hùng"
            studentId="22666271"
            role="Student"
            imageUrl="/about-us-imgs/nguyen-van-hung.PNG"
          />

          <TeamMemberCard
            name="Huỳnh Đức Phú"
            studentId="22653551"
            role="Student"
            imageUrl="/about-us-imgs/huynh-duc-phu.jpg"
          />
        </div>
      </div>
      <FAQSection />

    </div>
  );
}
