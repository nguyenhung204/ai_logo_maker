"use client";

import { useEffect, useState } from "react";
import LeftToolbar from "./_components/left-toolbar";
import CanvasEditor from "./_components/canvas-editor";
import RightSettings from "./_components/right-settings";
import TopBar from "./_components/topbar";
import * as fabric from "fabric";

export default function EditorPage() {
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  // Khi bấm nút Edit ở trang /dashboard:
  // - Ảnh sẽ được lưu tạm vào localStorage.
  // - Sau đó chuyển hướng sang trang /edit.
  // - Tại /edit, ảnh từ localStorage sẽ được load vào canvas.
  useEffect(() => {
    const loadImage = async () => {
      const imgData = localStorage.getItem("editImage");
      if (imgData && canvas) {
        const img = await fabric.Image.fromURL(imgData);

        img.scaleToWidth(400);
        img.scaleToHeight(400);
        img.set({
          left: 100,
          top: 100,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
        localStorage.removeItem("editImage");
      }
    };

    loadImage();
  }, [canvas]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar canvas={canvas} />

      <div className="flex flex-1 overflow-auto">
        <LeftToolbar canvas={canvas} />

        <div className="flex-grow">
          <CanvasEditor
            setCanvas={setCanvas}
            setSelectedObject={setSelectedObject}
          />
        </div>

        <div className="">
          <RightSettings selectedObject={selectedObject} canvas={canvas} />
        </div>
      </div>
    </div>
  );
}
