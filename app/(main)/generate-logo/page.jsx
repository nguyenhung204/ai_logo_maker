"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import HeadingDescription from "../create/_components/HeadingDescription";
import Lookup from "../_data/Lookup";
import LoadingSpinner from "../_components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const GenerateLogo = () => {
  const { userDetail, refreshUserData } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoGenerated, setLogoGenerated] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      try {
        const storage = localStorage.getItem("formData");
        if (storage) {
          setFormData(JSON.parse(storage));
        } else {
          router.push("/create");
        }
      } catch (error) {
        console.error("Error loading form data:", error);
      }
    }
  }, [userDetail?.email, router]);

  useEffect(() => {
    if (formData?.title && !logoGenerated) {
      if (!userDetail || userDetail.credits <= 0) {
        setError("You don't have enough credits to create a logo");
        setLoading(false);
      } else {
        generateAILogo();
        setLogoGenerated(true);
      }
    }
  }, [formData, logoGenerated, userDetail]);

  const generateAILogo = async () => {
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoIdea}", formData.idea || "Let AI Select the best idea")
      .replace("{logoPrompt}", formData?.design?.prompt);

    try {
      setLoading(true);

      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData?.title,
        desc: formData?.desc,
        userCredits: userDetail?.credits,
      });

      const image = result.data?.image;
      if (image) {
        setImageUrls([image]);
      }

      await refreshUserData();
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("Error generating logo:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(
          "An error occurred while creating the logo. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    // Check credits before trying again
    if (!userDetail || userDetail.credits <= 0) {
      setError("You don't have enough credits to create a logo");
      return;
    }

    setError(null);
    generateAILogo();
    setLogoGenerated(true);
  };

  return (
    <div className="p-10 border rounded-xl mx-auto my-12 min-h-[500px]">
      <HeadingDescription
        title={
          loading
            ? Lookup.LoadingWaitTitle
            : error
            ? "Unable to create logo"
            : Lookup.LogoOutputTitle
        }
        description={
          loading
            ? Lookup.LoadingWaitDesc
            : error
            ? error
            : Lookup.LogoOutputDesc
        }
      />

      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center my-12 p-8 border rounded-lg bg-red-50">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          {(!userDetail || userDetail.credits <= 0) && (
            <div className="mt-4">
              <Link href="/buy-credits">
                <Button className="bg-primary hover:bg-primary/90">
                  Buy more credits
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : imageUrls.length > 0 ? (
        <div className="text-center my-12">
          {imageUrls.map((url, index) => (
            <div key={index} className="mb-6">
              <Image
                src={url}
                alt={`Generated Logo ${index + 1}`}
                width={512}
                height={512}
                unoptimized
                className="mx-auto h-auto rounded"
              />
              <a
                href={url}
                download={`${formData.title}.png`}
                className="inline-block mt-3 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-12 p-8 border rounded-lg bg-gray-50">
          <p className="text-lg text-gray-600">
            No logo has been generated yet.
          </p>
          <button
            onClick={handleTryAgain}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
