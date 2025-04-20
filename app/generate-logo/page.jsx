"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import HeadingDescription from "../create/_components/HeadingDescription";
import Lookup from "../_data/Lookup";
import LoadingSpinner from "../_components/LoadingSpinner";

const GenerateLogo = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetail?.email && typeof window !== "undefined") {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      generateAILogo();
    }
  }, [formData]);

  const generateAILogo = async () => {
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoColor}", formData.palette)
      .replace("{logoDesign}", formData.design.title)
      .replace("{logoIdea}", formData.idea)
      .replace("{logoPrompt}", formData.design.prompt);

    try {
      setLoading(true);
      const result = await axios.post("/api/ai-logo-model", { prompt: PROMPT });

      const image = result.data?.image;
      if (image) {
        setImageUrls([image]);
      }
    } catch (error) {
      console.error("Error generating logo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 border rounded-xl mx-auto my-12 min-h-[500px]">
      <HeadingDescription
        title={loading ? Lookup.LoadingWaitTitle : Lookup.LogoOutputTitle}
        description={loading ? Lookup.LoadingWaitDesc : Lookup.LogoOutputDesc}
      ></HeadingDescription>

      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <LoadingSpinner />
        </div>
      ) : (
        imageUrls.length > 0 && (
          <div className="text-center my-12">
            {imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Generated Logo ${index + 1}`}
                width={512}
                height={512}
                className="w-full h-auto rounded"
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default GenerateLogo;
