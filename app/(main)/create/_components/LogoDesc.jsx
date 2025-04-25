import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";

function LogoDesc({ onHandleInputChange, formData }) {
  const [desc, setDesc] = useState(formData?.desc || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDesc(newValue);
    onHandleInputChange(newValue);
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDescDesc}
      />

      <input
        type="text"
        placeholder="Describe your logo idea"
        className="p-4 border rounded-lg mt-5 w-full"
        value={desc}
        onChange={handleChange}
      />
    </div>
  );
}

export default LogoDesc;
