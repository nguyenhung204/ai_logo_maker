"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({ onHandleInputChange, formData }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const initialTitle = searchParams.get("title") ?? "";
    if (initialTitle) {
      onHandleInputChange(initialTitle);
    }
  }, []);

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
        value={formData?.title ?? ""}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoTitle;
