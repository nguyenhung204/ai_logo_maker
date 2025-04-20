"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

function TeamMemberCard({ name, studentId, role, bio, imageUrl }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span className="font-medium text-primary">{studentId}</span>
          <span>{role}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default TeamMemberCard;
