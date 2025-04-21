"use client";

export default function ProgressBar({ currentStep, totalSteps, stepLabels }) {
  // Tính phần trăm tiến độ
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
          (stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  stepNumber === currentStep
                    ? "bg-pink-500 text-white"
                    : stepNumber < currentStep
                    ? "bg-pink-200 text-pink-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNumber}
              </div>
              {stepLabels && stepLabels[stepNumber - 1] && (
                <span className="text-xs mt-1">
                  {stepLabels[stepNumber - 1]}
                </span>
              )}
            </div>
          )
        )}
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-pink-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
