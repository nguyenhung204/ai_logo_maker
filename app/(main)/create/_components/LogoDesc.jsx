import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/(main)/_data/Lookup";

function LogoDesc({ onHandleInputChange, formData }) {
  const [desc, setDesc] = useState(formData?.desc || "");
  const [error, setError] = useState("");

  // Hàm để kiểm tra và xử lý các ký tự đặc biệt
  const validateInput = (input) => {
    // Loại bỏ hoặc thay thế các ký tự đặc biệt có thể gây ra vấn đề
    const sanitized = input.replace(/[\/\\%]/g, "-");
    return sanitized;
  };

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const sanitizedValue = validateInput(rawValue);
    
    // Hiện thông báo nếu giá trị bị thay đổi sau khi làm sạch
    if (rawValue !== sanitizedValue) {
      setError("Một số ký tự đặc biệt đã được thay thế để đảm bảo tương thích");
      setTimeout(() => setError(""), 3000);
    }
    
    setDesc(sanitizedValue);
    onHandleInputChange(sanitizedValue);
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default LogoDesc;
