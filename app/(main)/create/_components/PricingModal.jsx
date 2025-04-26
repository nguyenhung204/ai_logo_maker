import React, { useEffect, useContext } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserDetailContext } from "@/app/(main)/_context/UserDetailContext";
import { toast } from "sonner";

function PricingModal({ formData }) {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);

  const handleGenerateClick = (e) => {
    if (!userDetail || userDetail.credits <= 0) {
      e.preventDefault();
      toast.error("You need credits to create a logo", {
        description: "Please purchase more credits to continue",
        action: {
          label: "Buy credits",
          onClick: () => (window.location.href = "/buy-credits"),
        },
      });
      return false;
    }
    return true;
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />
      <div className="flex justify-center mt-4">
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
            <h2 className="font-medium text-xl md:text-2xl mb-4">
              {pricing.title}
            </h2>
            <div className="flex flex-col flex-1 w-full">
              {pricing.features.map((feature, index) => (
                <h2
                  className="text-base md:text-lg mb-2 text-center"
                  key={index}
                >
                  {feature}
                </h2>
              ))}
              <div className="mt-auto pt-5 w-full">
                {user ? (
                  <Link
                    href={`/generate-logo?type=${pricing.title}`}
                    className="w-full block"
                    onClick={handleGenerateClick}
                  >
                    <Button
                      className="w-full"
                      disabled={!userDetail || userDetail.credits <= 0}
                    >
                      {!userDetail || userDetail.credits <= 0
                        ? "More credits needed"
                        : pricing.button}
                    </Button>
                  </Link>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="w-full">{pricing.button}</Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {userDetail && userDetail.credits <= 0 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <p className="text-amber-800 mb-2">
            You don't have enough credits to create a logo
          </p>
          <Link href="/buy-credits">
            <Button
              variant="outline"
              className="bg-amber-100 hover:bg-amber-200 border-amber-300"
            >
              Buy more credits
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PricingModal;
