"use client";

import { Lightbulb, Palette, Target, Users, Zap } from "lucide-react";
import TeamMemberCard from "./_components/TeamMemberCard";
import { FAQSection } from "./_components/FAQSection";
import { motion } from "framer-motion";

export default function AboutUs() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          variants={itemVariants}
          className="relative z-10 px-6 py-16 text-center text-white md:py-24"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            About Our Vision
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl">
            We are revolutionizing logo design with AI technology, making
            professional branding accessible to everyone.
          </p>
        </motion.div>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-16 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-3xl font-bold tracking-tight text-primary"
        >
          Our Story
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-3xl text-lg text-muted-foreground"
        >
          Founded by students passionate about design and technology, our AI
          Logo Generator combines cutting-edge AI with creative expertise to
          democratize professional logo design.
        </motion.p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {[
          {
            Icon: Zap,
            title: "Innovative Technology",
            desc: "We leverage the latest AI advancements to create exceptional logo designs",
          },
          {
            Icon: Palette,
            title: "Creative Excellence",
            desc: "We craft unique logos that capture your brand's essence and personality",
          },
          {
            Icon: Users,
            title: "User-Focused Design",
            desc: "We prioritize intuitive experiences that make logo creation simple",
          },
        ].map((value, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <value.Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium">{value.title}</h3>
            <p className="mt-2 text-muted-foreground">{value.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2"
      >
        {[
          {
            Icon: Target,
            title: "Our Mission",
            desc: "To democratize professional logo design through AI technology, making high-quality branding accessible.",
          },
          {
            Icon: Lightbulb,
            title: "Our Vision",
            desc: "To become the global leader in AI-powered design solutions, empowering entrepreneurs worldwide.",
          },
        ].map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-8"
          >
            <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
              <section.Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-primary">
              {section.title}
            </h3>
            <p className="text-muted-foreground">{section.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Meet Our Team */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-center text-3xl font-bold text-primary"
        >
          Meet Our Team
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground"
        >
          Our talented team combines technical expertise and creative skills to
          bring you the best AI logo generation platform.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <motion.div variants={itemVariants}>
            <TeamMemberCard
              name="Nguyễn Văn Hùng"
              studentId="22666271"
              role="Student"
              imageUrl="/about-us-imgs/nguyen-van-hung.PNG"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TeamMemberCard
              name="Huỳnh Đức Phú"
              studentId="22653551"
              role="Student"
              imageUrl="/about-us-imgs/huynh-duc-phu.jpg"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
