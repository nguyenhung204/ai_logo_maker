"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";
import axios from "axios";
import Prompt from "@/app/(main)/_data/Prompt";
import { Loader2Icon, RotateCwIcon } from "lucide-react"; // ✨ Import thêm

function LogoIdea({ formData, onHandleInputChange }) {
  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.logo_prompts);

  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design.title
    )
      .replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoPrompt}", formData?.design.prompt);

    const result = await axios.post("/api/ai-design-ideas", {
      prompt: PROMPT,
    });

    setIdeas(result.data.logo_prompts);
    setLoading(false);
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />

      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}

        {!loading && (
          <div className="flex flex-wrap gap-3 mt-6">
            {ideas?.map((item, index) => (
              <h2
                key={index}
                onClick={() => {
                  setSelectedOption(item.prompt);
                  onHandleInputChange(item.prompt);
                }}
                className={`p-2 rounded-full border px-3 cursor-pointer transition hover:border-primary ${
                  selectedOption === item.prompt && "border-primary"
                }`}
              >
                {item.prompt}
              </h2>
            ))}

            <h2
              onClick={() => {
                setSelectedOption("Let AI Select the best idea");
                onHandleInputChange("Let AI Select the best idea");
              }}
              className={`p-2 rounded-full border px-3 cursor-pointer transition hover:border-primary ${
                selectedOption === "Let AI Select the best idea" &&
                "border-primary"
              }`}
            >
              Let AI Select the best idea
            </h2>

            <button
              onClick={generateLogoDesignIdea}
              className="text-muted-foreground transition bg-primary text-white text-center px-5 rounded-lg hover:-translate-y-0.5 transform duration-300 ease-in-out"
            >
              <RotateCwIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="my-6 p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            Current Selected Idea:
          </p>
        </div>
        <p className="text-lg font-semibold text-primary">
          {formData.idea || "NONE"}
        </p>
      </div>
    </div>
  );
}

export default LogoIdea;
