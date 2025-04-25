"use client";

import { GraduationCap, Palette, Users } from "lucide-react";
import TeamMemberCard from "./_components/TeamMemberCard";
import { FAQSection } from "./_components/FAQSection";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary">
          About Us
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We are a passionate team of designers dedicated to creating beautiful
          and meaningful logos for businesses of all sizes.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
          <Users className="mb-4 h-12 w-12 text-primary" />
          <h3 className="text-xl font-medium">Experienced Team</h3>
          <p className="mt-2 text-muted-foreground">
            Our designers bring years of creative expertise to every project
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
          <Palette className="mb-4 h-12 w-12 text-primary" />
          <h3 className="text-xl font-medium">Creative Design</h3>
          <p className="mt-2 text-muted-foreground">
            We craft unique logos that capture your brand's essence
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
          <GraduationCap className="mb-4 h-12 w-12 text-primary" />
          <h3 className="text-xl font-medium">Academic Excellence</h3>
          <p className="mt-2 text-muted-foreground">
            Founded by students with a passion for design and technology
          </p>
        </div>
      </div>

      <h2 className="mb-8 text-center text-3xl font-bold text-primary">
        Meet Our Team
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <TeamMemberCard
          name="Nguyễn Văn Hùng"
          studentId="22666271"
          role="Team Member"
          imageUrl="/about-us-imgs/nguyen-van-hung.PNG"
        />

        <TeamMemberCard
          name="Huỳnh Đức Phú"
          studentId="22653551"
          role="Team Member"
          imageUrl="/about-us-imgs/huynh-duc-phu.jpg"
        />
      </div>

      <FAQSection />
    </div>
  );
}
