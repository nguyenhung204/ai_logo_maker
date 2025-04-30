"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import LoadingSpinner from "../../_components/LoadingSpinner";

export default function RemoveBgPage() {
  const [original, setOriginal] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setOriginal(imageURL);
    setResultUrl(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Remove.bg failed");

      const blob = await res.blob();
      const result = URL.createObjectURL(blob);
      setResultUrl(result);
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpload = () => inputRef.current?.click();

  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white border rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          ✂️ Remove Background from Image
        </h1>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        {!original && (
          <label
            onClick={triggerUpload}
            className="flex flex-col items-center justify-center border-2 border-dashed border-primary text-primary cursor-pointer rounded-xl p-8 hover:bg-primary/10 transition"
          >
            <UploadCloud className="w-10 h-10 mb-2" />
            <span className="font-medium">Click to upload image</span>
          </label>
        )}

        {original && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="font-semibold mb-2">Original Image</p>
              <img src={original} className="max-w-xs rounded-xl shadow" />
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center gap-2 mt-4">
                <p className="text-sm text-gray-500">Removing background...</p>
                <LoadingSpinner />
              </div>
            ) : resultUrl ? (
              <div>
                <div className="text-center">
                  <p className="font-semibold mb-2">Image without background</p>
                  <img src={resultUrl} className="max-w-xs rounded-xl shadow" />
                </div>
                <div className="text-center my-4">
                  <button
                    onClick={triggerUpload}
                    className="text-sm text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/10"
                  >
                    Upload another image
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
