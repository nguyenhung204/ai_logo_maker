"use client";

import { Save, ImageIcon, Download, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef } from "react";
import * as fabric from "fabric";

export default function TopBar({ canvas }) {
  const fileInputRef = useRef(null);

  // Trigger khi nhập file
  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Hàm xử lý logic thêm ảnh vào
  const handleImageChange = async (e) => {
    if (!canvas) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (f) => {
      try {
        const img = await fabric.Image.fromURL(f.target.result, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
      } catch (err) {
        console.error("Error loading image", err);
      }
    };
    reader.readAsDataURL(file);
  };

  // Hàm export png
  const handleExportImage = async () => {
    if (!canvas) return;

    const objects = canvas.getObjects();

    if (objects.length === 0) return;

    // Clone từng object
    const clones = await Promise.all(objects.map((obj) => obj.clone()));

    // Group tạm để lấy bounding box
    const group = new fabric.Group(clones, { canvas });
    const { width, height, left, top } = group.getBoundingRect(true, true);

    // Tạo canvas mới
    const tempCanvas = new fabric.StaticCanvas(null, {
      width: width,
      height: height,
      backgroundColor: "white",
    });

    // Copy object vào canvas mới
    clones.forEach((cloned) => {
      cloned.left = (cloned.left || 0) - left;
      cloned.top = (cloned.top || 0) - top;
      tempCanvas.add(cloned);
    });

    tempCanvas.renderAll();

    // Xuất ảnh từ tempCanvas
    const dataURL = tempCanvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };

  return (
    <div className="flex h-14 w-full items-center justify-center border-b border-gray-200 bg-white px-4">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Add Image */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleAddImage}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Add Image</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add image to canvas</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Export PNG */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleExportImage}
              >
                <Download className="h-4 w-4" />
                <span>Export Image</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export canvas as PNG</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
