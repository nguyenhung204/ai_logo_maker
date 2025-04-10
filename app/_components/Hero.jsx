"use client";
import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const router = useRouter();

  const handleClick = () => {
    if (logoTitle.trim()) {
      router.push(`/create/?title=${logoTitle.trim()}`);
    }
  };

  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="text-primary text-5xl text-center font-bold">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {Lookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-500 text-center">{Lookup.HeroDesc}</p>
      <div className="flex gap-6 w-full max-w-2xl mt-10">
        <input
          placeholder={Lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e) => setLogoTitle(e.target.value)}
        />
        <Button
          onClick={handleClick}
          disabled={!logoTitle.trim()}
          className={`p-6 ${
            logoTitle.trim() ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Hero;
