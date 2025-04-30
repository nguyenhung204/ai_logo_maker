"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

export default function ExtractPalettePage() {
  const [imgSrc, setImgSrc] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();
  const inputRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImgSrc(e.target.result);
      setColors([]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageLoad = async () => {
    try {
      setLoading(true); // 👉 Bắt đầu loading
      const VibrantModule = await import("node-vibrant/browser");
      const Vibrant = VibrantModule.Vibrant;

      const palette = await Vibrant.from(imgSrc).getPalette();
      const colorList = Object.entries(palette)
        .filter(([_, swatch]) => swatch)
        .map(([name, swatch]) => ({
          name,
          hex: swatch.hex,
        }));
      setColors(colorList);
    } catch (error) {
      console.error("Color extraction failed:", error);
    } finally {
      setLoading(false); // 👉 Dừng loading
    }
  };

  const handleOpenUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          🎨 Extract Color Palette from Image
        </h1>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        {/* Upload box */}
        {!imgSrc && (
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-primary text-primary cursor-pointer rounded-xl p-8 hover:bg-primary/10 transition mb-6"
          >
            <UploadCloud className="w-10 h-10 mb-2" />
            <span className="font-medium">
              Click or drag image here to upload
            </span>
          </label>
        )}

        {/* Show image & button */}
        {imgSrc && (
          <div className="flex flex-col items-center">
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Uploaded"
              onLoad={handleImageLoad}
              className="max-w-sm mb-4 rounded-xl shadow"
            />

            <button
              onClick={handleOpenUpload}
              className="text-sm text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition mb-4"
            >
              Upload another image
            </button>
          </div>
        )}

        {/* Spinner */}
        {loading && (
          <div className="flex flex-col items-center mt-4 text-gray-500">
            <span>Extracting colors...</span>
            <div className="w-6 h-6 mt-2 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Color palette */}
        {!loading && colors.length > 0 && (
          <div className="flex gap-4 flex-wrap mt-4 justify-center">
            {colors.map(({ name, hex }, i) => (
              <div
                key={i}
                style={{ backgroundColor: hex }}
                className="w-24 h-24 rounded-xl border flex flex-col justify-center items-center text-white text-sm shadow"
                title={hex}
              >
                <span className="font-bold">{name}</span>
                <span className="text-xs">{hex}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
