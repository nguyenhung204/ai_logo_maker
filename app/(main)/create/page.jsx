"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import LogoPalette from "./_components/LogoPalette";
import PricingModal from "./_components/PricingModal";
import ProgressBar from "./_components/ProgressBar";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("formData", formData);
  };

  const totalSteps = 6;
  const stepLabels = [
    "Title",
    "Vision",
    "Palette",
    "Design",
    "Idea",
    "Pricing",
  ];

  return (
    <div className="mt-28 p-10 border rounded-xl mx-auto bg-gray-100/50">
      <ProgressBar
        currentStep={step}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />

      {(() => {
        switch (step) {
          case 1:
            return (
              <LogoTitle
                onHandleInputChange={(v) => onHandleInputChange("title", v)}
                formData={formData}
              />
            );
          case 2:
            return (
              <LogoDesc
                onHandleInputChange={(v) => onHandleInputChange("desc", v)}
                formData={formData}
              />
            );
          case 3:
            return (
              <LogoPalette
                onHandleInputChange={(v) => onHandleInputChange("palette", v)}
                formData={formData}
              />
            );
          case 4:
            return (
              <LogoDesigns
                onHandleInputChange={(v) => onHandleInputChange("design", v)}
                formData={formData}
              />
            );
          case 5:
            return (
              <LogoIdea
                onHandleInputChange={(v) => onHandleInputChange("idea", v)}
                formData={formData}
              />
            );
          case 6:
            return (
              <PricingModal
                onHandleInputChange={(v) => onHandleInputChange("pricing", v)}
                formData={formData}
              />
            );
          default:
            return null;
        }
      })()}

      <div className="flex items-center justify-between mt-10">
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} variant="outline">
            <ArrowLeft /> Previous
          </Button>
        )}
        {step < 6 && (
        <Button onClick={() => setStep(step + 1)}>
          <ArrowRight /> Continue
        </Button>
        )}
      </div>
    </div>
  );
}

export default CreateLogo;
