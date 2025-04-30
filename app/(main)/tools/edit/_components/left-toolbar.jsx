"use client";

import {
  Square,
  Circle,
  Triangle,
  Type,
  Layers,
  Trash2,
  Layers2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as fabric from "fabric";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

export default function LeftToolbar({ canvas }) {
  // Hàm thêm component (Rect, Circle, Triangle, Text)
  function handleAddComponent(tool) {
    if (!canvas) return;

    let obj = null;

    switch (tool) {
      case "rectangle":
        obj = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 60,
          fill: "#3498db",
        });
        break;

      case "circle":
        obj = new fabric.Circle({
          left: 150,
          top: 150,
          radius: 40,
          fill: "#e74c3c",
        });
        break;

      case "triangle":
        obj = new fabric.Triangle({
          left: 200,
          top: 100,
          width: 100,
          height: 100,
          fill: "#9b59b6",
        });
        break;

      case "text":
        obj = new fabric.Textbox("Your Text", {
          left: 100,
          top: 100,
          width: 200,
          fontSize: 20,
          fill: "black",
        });
        break;

      default:
        return;
    }

    if (obj) {
      canvas.add(obj);
      canvas.setActiveObject(obj);
      canvas.requestRenderAll();
    }
  }

  // Hàm xử lý Layer control (Forward, Backward, Delete)
  function handleLayerAction(action) {
    if (!canvas) return;

    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;

    switch (action) {
      case "forward":
        canvas.bringObjectForward(activeObj);
        break;
      case "backward":
        canvas.sendObjectBackwards(activeObj);

        break;
      case "delete":
        canvas.remove(activeObj);
        break;
      default:
        return;
    }

    canvas.renderAll();
  }

  // Binding nút delete
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete") {
        if (canvas) {
          const activeObj = canvas.getActiveObject();
          if (activeObj) {
            canvas.remove(activeObj);
            canvas.requestRenderAll();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);

  return (
    <div className="flex h-full w-16 flex-col items-center border-r border-gray-200 bg-white p-2">
      <TooltipProvider>
        {/* Nhóm thêm component */}
        <div className="flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleAddComponent("rectangle")}
              >
                <Square className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Rectangle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleAddComponent("circle")}
              >
                <Circle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Circle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleAddComponent("triangle")}
              >
                <Triangle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Triangle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleAddComponent("text")}
              >
                <Type className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Text</TooltipContent>
          </Tooltip>
        </div>

        <Separator className="my-2 h-0.5" />

        {/* Nhóm Layer control */}
        <div className="flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleLayerAction("forward")}
              >
                <Layers className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Bring Forward</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleLayerAction("backward")}
              >
                <Layers2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Send Backward</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleLayerAction("delete")}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Delete</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
