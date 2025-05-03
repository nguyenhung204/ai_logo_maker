import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";
import LogoDesignSample from "@/app/(main)/_data/LogoDesignSample";
import Image from "next/image";

function LogoDesigns({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesignSample.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title);
              onHandleInputChange(design);
            }}
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={design?.image}
              alt={design?.title}
              width={100}
              height={100}
              className={`w-full mx-auto border-4  ${
                selectedOption == design.title
                  ? "rounded-lg border-primary scale-105"
                  : "border-transparent"
              }`}
            />
            <h2 className="text-md lg:text-lg text-primary text-center mt-2 font-semibold break-words  max-w-[150px] mx-auto">
              {design.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
