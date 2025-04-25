import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function PricingModal({ formData }) {
  const { user } = useUser();

  useEffect(() => {
    if (formData && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />
      <div className = "flex justify-center mt-4">
        {Lookup.pricingOption.map((pricing, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-[700px]"
          >
            <Image
              src={pricing?.icon}
              alt={pricing?.title}
              width={60}
              height={60}
              className="mb-3"
            />
            <h2 className="font-medium text-xl md:text-2xl mb-4">{pricing.title}</h2>
            <div className="flex flex-col flex-1 w-full">
              {pricing.features.map((feature, index) => (
                <h2 className="text-base md:text-lg mb-2 text-center" key={index}>
                  {feature}
                </h2>
              ))}
              <div className="mt-auto pt-5 w-full">
                {user ? (
                  <Link href={`/generate-logo?type=${pricing.title}`} className="w-full block">
                    <Button className="w-full">{pricing.button}</Button>
                  </Link>
                ) : (
                  <SignInButton
                    mode="modal"
                    forceRedirectUrl={`/generate-logo?type=${pricing.title}`}
                  >
                    <Button className="w-full">{pricing.button}</Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModal;
