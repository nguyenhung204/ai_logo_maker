"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

function TeamMemberCard({ name, studentId, role, bio, imageUrl, socialLinks }) {
  const links = socialLinks || {
    email: "#",
    github: "#",
    linkedin: "#",
    twitter: "#",
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span className="font-medium text-primary">{studentId}</span>
          <span className="text-sm font-medium">{role}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          {bio || "Passionate about creating innovative solutions through design and technology."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 pb-4">
        <a href={links.github} className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-white">
          <Github className="h-4 w-4" />
        </a>
        <a href={links.linkedin} className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-white">
          <Linkedin className="h-4 w-4" />
        </a>
        <a href={links.twitter} className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-white">
          <Twitter className="h-4 w-4" />
        </a>
        <a href={`mailto:${links.email}`} className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-white">
          <Mail className="h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
}

export default TeamMemberCard;
