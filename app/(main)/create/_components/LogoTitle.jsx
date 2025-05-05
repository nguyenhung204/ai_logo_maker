"use client";
import React, { useEffect, useState, Suspense } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";
import { useSearchParams } from "next/navigation";

// Create a component that safely uses useSearchParams
function LogoTitleContent({ onHandleInputChange, formData }) {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(formData?.title || "");
  const [error, setError] = useState("");

  // Hàm để kiểm tra và xử lý các ký tự đặc biệt
  const validateInput = (input) => {
    // Loại bỏ hoặc thay thế các ký tự đặc biệt có thể gây ra vấn đề
    const sanitized = input.replace(/[\/\\%]/g, "-");
    return sanitized;
  };

  useEffect(() => {
    const initialTitle = searchParams.get("title") ?? "";
    if (initialTitle && !formData?.title) {
      const sanitizedTitle = validateInput(initialTitle);
      setTitle(sanitizedTitle);
      onHandleInputChange(sanitizedTitle);
    }
  }, []);

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const sanitizedValue = validateInput(rawValue);
    
    // Hiện thông báo nếu giá trị bị thay đổi sau khi làm sạch
    if (rawValue !== sanitizedValue) {
      setError("Một số ký tự đặc biệt đã được thay thế để đảm bảo tương thích");
      setTimeout(() => setError(""), 3000);
    }
    
    setTitle(sanitizedValue);
    onHandleInputChange(sanitizedValue);
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
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
