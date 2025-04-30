"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoTitle from "./_components/LogoTitle";
import LogoDesc from "./_components/LogoDesc";
import LogoPalette from "./_components/LogoPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModal from "./_components/PricingModal";
import ProgressBar from "./_components/ProgressBar";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [savedFormData, setSavedFormData] = useState(null);

  // Sự kiện khi giao diện được Mount
  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      setSavedFormData(JSON.parse(saved));
      setShowContinueModal(true);
    }
  }, []);

  // Sự kiện khi formData thay đổi
  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  // User chọn "Tiếp tục phiên cũ"
  const handleContinue = () => {
    if (savedFormData) {
      setFormData(savedFormData);
      if (savedFormData.currentStep) {
        setStep(savedFormData.currentStep);
      }
    }
    setShowContinueModal(false);
  };

  // User chọn "Bắt đầu mới"
  const handleStartNew = () => {
    localStorage.removeItem("formData");
    setFormData(null);
    setStep(1);
    setShowContinueModal(false);
  };

  // Lưu lựa chọn của User theo input
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Lưu lựa chọn của User theo nút "Next"
  const onNextStep = () => {
    setStep((prev) => {
      const nextStep = prev + 1;
      setFormData((prev) => ({ ...prev, currentStep: nextStep }));
      return nextStep;
    });
  };

  // Lưu lựa chọn của User theo nút "Previous"
  const onPrevStep = () => {
    setStep((prev) => {
      const prevStep = prev - 1;
      setFormData((prev) => ({ ...prev, currentStep: prevStep }));
      return prevStep;
    });
  };

  const totalSteps = 6;
  const stepLabels = [
    "Title",
    "Description",
    "Palette",
    "Design",
    "Idea",
    "Pricing",
  ];

  const isCurrentStepValid = () => {
    if (!formData) return false;
    switch (step) {
      case 1:
        return formData.title && formData.title.trim() !== "";
      case 2:
        return formData.desc && formData.desc.trim() !== "";
      case 3:
        return formData.palette;
      case 4:
        return formData.design;
      case 5:
        return formData.idea;
      default:
        return true;
    }
  };

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
          <Button onClick={onPrevStep} variant="outline">
            <ArrowLeft /> Previous
          </Button>
        )}
        {step < 6 && (
          <Button
            onClick={onNextStep}
            disabled={!isCurrentStepValid()}
            className={
              !isCurrentStepValid() ? "cursor-not-allowed opacity-50" : ""
            }
          >
            <ArrowRight /> Continue
          </Button>
        )}
      </div>

      {/* Modal hỏi user */}
      {showContinueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-2 md:p-8 rounded-lg shadow-md text-center w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Continue Your Session?
            </h2>
            <p className="text-sm md:text-base mb-6">
              Do you want to continue your previous session?
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button onClick={handleContinue} className="w-full md:w-auto">
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={handleStartNew}
                className="w-full md:w-auto"
              >
                Start New
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateLogo;
