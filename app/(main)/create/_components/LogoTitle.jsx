"use client";
import React, { useEffect, useState, Suspense } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";
import { useSearchParams } from "next/navigation";

// Create a component that safely uses useSearchParams
function LogoTitleContent({ onHandleInputChange, formData }) {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(formData?.title || "");

  useEffect(() => {
    const initialTitle = searchParams.get("title") ?? "";
    if (initialTitle && !formData?.title) {
      setTitle(initialTitle);
      onHandleInputChange(initialTitle);
    }
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    onHandleInputChange(newValue);
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <input
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full"
        value={title}
        onChange={handleChange}
      />
    </div>
  );
}

function LogoTitleFallback() {
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <div className="p-4 border rounded-lg mt-5 w-full h-12 bg-gray-100 animate-pulse"></div>
    </div>
  );
}

function LogoTitle(props) {
  return (
    <Suspense fallback={<LogoTitleFallback />}>
      <LogoTitleContent {...props} />
    </Suspense>
  );
}

export default LogoTitle;
