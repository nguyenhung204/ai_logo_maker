import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesig from "@/app/_data/LogoDesig";
import Image from "next/image";

function LogoDesigns({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDesignDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesig.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title);
              onHandleInputChange(design);
            }}
            className={`cursor-pointer border-2 transition-transform duration-300 hover:-translate-y-10 ${
              selectedOption == design.title
                ? "rounded-lg border-primary"
                : "border-transparent"
            } `}
          >
            <Image
              src={design?.image}
              alt={design?.title}
              width={150}
              height={150}
              className="w-full rounded-xl object-cover"
            />
            <h2 className="text-md lg:text-xl text-primary text-center mt-2">
              {design.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
