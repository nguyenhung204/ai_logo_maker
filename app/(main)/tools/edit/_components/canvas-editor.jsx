"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function CanvasEditor({ setCanvas, setSelectedObject }) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setCanvas(canvasInstance);

    canvasInstance.on("selection:created", () => {
      setSelectedObject(canvasInstance.getActiveObject());
    });

    canvasInstance.on("selection:updated", () => {
      setSelectedObject(canvasInstance.getActiveObject());
    });

    canvasInstance.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    const handleResize = () => {
      if (canvasContainerRef.current) {
        const containerWidth = canvasContainerRef.current.clientWidth;
        const containerHeight = canvasContainerRef.current.clientHeight;
        const scale = Math.min(containerWidth / 800, containerHeight / 600);

        canvasInstance.setDimensions({
          width: 800 * scale,
          height: 600 * scale,
        });

        canvasInstance.setZoom(scale);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      canvasInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [setCanvas, setSelectedObject]);

  return (
    <div
      ref={canvasContainerRef}
      className="flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
