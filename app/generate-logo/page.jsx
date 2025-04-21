"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import HeadingDescription from "../create/_components/HeadingDescription";
import Lookup from "../_data/Lookup";
import LoadingSpinner from "../_components/LoadingSpinner";
import { useRouter } from "next/navigation";

const GenerateLogo = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading state
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);
  const router = useRouter();

  // 1 : Load data
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storage = localStorage.getItem("formData");
        if (storage) {
          setFormData(JSON.parse(storage));
        } else {
          // Back về tạo mới nếu không có formData
          router.push('/create');
        }
      } catch (error) {
        console.error("Error loading form data:", error);
      } finally {
        setInitialLoadAttempted(true);
      }
    }
  }, [userDetail, router]);

  // 2 : Tạo logo nếu đủ dữ liệu
  useEffect(() => {
    if (formData?.title && initialLoadAttempted) {
      generateAILogo();
    } else if (initialLoadAttempted) {
      setLoading(false);
    }
  }, [formData, initialLoadAttempted]);

  const generateAILogo = async () => {
    if (!formData?.title || !formData?.desc || !formData?.palette || !formData?.design?.title) {
      console.error("Missing required form data");
      setLoading(false);
      return;
    }

    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc || "")
      .replace("{logoColor}", formData.palette || "")
      .replace("{logoDesign}", formData.design?.title || "")
      .replace("{logoIdea}", formData.idea || "Let AI Select the best idea")
      .replace("{logoPrompt}", formData.design?.prompt || "");

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
      />

      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <LoadingSpinner />
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
          <p className="text-lg text-gray-600">No logo has been generated yet.</p>
          <button 
            onClick={generateAILogo}
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