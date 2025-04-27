"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "./color-picker";

export default function RightSettings({ selectedObject, canvas }) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [angle, setAngle] = useState(0);
  const [fill, setFill] = useState("#000000");
  const [opacity, setOpacity] = useState(100);
  const [text, setText] = useState("");

  // Khi người dùng chọn 1 obj bất kỳ
  // thì đồng bộ với obj (size, width, height) đó
  useEffect(() => {
    if (selectedObject) {
      syncObjectState();
    }
  }, [selectedObject]);

  // UseEffect này là Listener, nó lắng nghe mấy sự
  // kiện liên quan đến selectedObject
  useEffect(() => {
    if (!canvas) return;

    const handleUpdate = () => {
      syncObjectState();
    };

    canvas.on("object:modified", handleUpdate);
    canvas.on("object:scaling", handleUpdate);
    canvas.on("object:moving", handleUpdate);
    canvas.on("object:rotating", handleUpdate);

    return () => {
      canvas.off("object:modified", handleUpdate);
      canvas.off("object:scaling", handleUpdate);
      canvas.off("object:moving", handleUpdate);
      canvas.off("object:rotating", handleUpdate);
    };
  }, [canvas, selectedObject]);

  // Hàm sync lại obj đúng kích thước
  function syncObjectState() {
    if (!selectedObject) return;

    setWidth(Math.round(selectedObject.width * selectedObject.scaleX));
    setHeight(Math.round(selectedObject.height * selectedObject.scaleY));
    setX(Math.round(selectedObject.left));
    setY(Math.round(selectedObject.top));
    setAngle(Math.round(selectedObject.angle || 0));
    setFill(selectedObject.fill || "#000000");
    setOpacity(Math.round((selectedObject.opacity || 1) * 100));
    if (selectedObject.type === "textbox") {
      setText(selectedObject.text || "");
    }
  }

  function updateObject(override = {}) {
    if (!selectedObject || !canvas) return;

    const finalWidth = override.width ?? width;
    const finalHeight = override.height ?? height;
    const finalX = override.x ?? x;
    const finalY = override.y ?? y;
    const finalAngle = override.angle ?? angle;
    const finalFill = override.fill ?? fill;
    const finalOpacity = override.opacity ?? opacity;

    selectedObject.set({
      scaleX: finalWidth / selectedObject.width,
      scaleY: finalHeight / selectedObject.height,
      left: finalX,
      top: finalY,
      angle: finalAngle,
      fill: finalFill,
      opacity: finalOpacity / 100,
    });

    if (selectedObject.type === "textbox") {
      selectedObject.text = text;
    }

    canvas.requestRenderAll();
  }

  return (
    <div className="h-full w-64 overflow-y-auto border-l border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Settings</h2>

      {!selectedObject ? (
        <p className="text-sm text-gray-500">
          Select an object to edit its properties
        </p>
      ) : (
        <Tabs defaultValue="position">
          <TabsList className="w-full">
            <TabsTrigger value="position" className="flex-1">
              Position
            </TabsTrigger>
            <TabsTrigger value="style" className="flex-1">
              Style
            </TabsTrigger>
            {selectedObject.type === "textbox" && (
              <TabsTrigger value="text" className="flex-1">
                Text
              </TabsTrigger>
            )}
          </TabsList>

          {/* Tab Position */}
          <TabsContent value="position" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Width</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setWidth(value);
                    updateObject({ width: value });
                  }}
                />
              </div>
              <div>
                <Label>Height</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setHeight(value);
                    updateObject({ height: value });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>X</Label>
                <Input
                  type="number"
                  value={x}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setX(value);
                    updateObject({ x: value });
                  }}
                />
              </div>
              <div>
                <Label>Y</Label>
                <Input
                  type="number"
                  value={y}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setY(value);
                    updateObject({ y: value });
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Rotation</Label>
              <Input
                type="number"
                value={angle}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setAngle(value);
                  updateObject({ angle: value });
                }}
              />
            </div>
          </TabsContent>

          {/* Tab Style */}
          <TabsContent value="style" className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label>Fill Color</Label>
              <ColorPicker
                color={fill}
                onChange={(color) => {
                  setFill(color);
                  updateObject({ fill: color });
                }}
              />
            </div>
            <div className="space-y-3">
              <Label>Opacity</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[opacity]}
                onValueChange={(v) => {
                  setOpacity(v[0]);
                  updateObject({ opacity: v[0] });
                }}
              />
            </div>
          </TabsContent>

          {/* Tab Text */}
          {selectedObject.type === "textbox" && (
            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-1">
                <Label>Text</Label>
                <Input
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    updateObject();
                  }}
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}
