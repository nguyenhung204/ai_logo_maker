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
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");

  useEffect(() => {
    if (selectedObject) {
      syncObjectState();
    }
  }, [selectedObject]);

  useEffect(() => {
    if (!canvas) return;

    const handleUpdate = (e) => {
      if (!e?.target) return;

      if (e.target.type === "textbox") {
        setText(e.target.text || "");
        setFontSize(e.target.fontSize || 20);
        setFontFamily(e.target.fontFamily || "Arial");
        setFontWeight(e.target.fontWeight || "normal");
      }
      syncObjectState();
    };

    canvas.on("object:modified", handleUpdate);
    canvas.on("object:scaling", handleTransforming);
    canvas.on("object:moving", handleTransforming);
    canvas.on("object:rotating", handleTransforming);
    canvas.on("text:changed", handleUpdate);

    return () => {
      canvas.off("object:modified", handleUpdate);
      canvas.off("object:scaling", handleTransforming);
      canvas.off("object:moving", handleTransforming);
      canvas.off("object:rotating", handleTransforming);
      canvas.off("text:changed", handleUpdate);
    };
  }, [canvas]);

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
      setFontSize(selectedObject.fontSize || 20);
      setFontFamily(selectedObject.fontFamily || "Arial");
      setFontWeight(selectedObject.fontWeight || "normal");
      setTextAlign(selectedObject.textAlign || "left");
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
    const finalTextAlign = override.textAlign ?? textAlign; // <- thêm dòng này

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
      selectedObject.set({
        text,
        fontSize,
        fontFamily,
        fontWeight,
        textAlign: finalTextAlign,
      });
      selectedObject.initDimensions();
    }

    canvas.requestRenderAll();
    syncObjectState();
  }

  function handleTransforming(e) {
    if (!e?.target) return;

    const obj = e.target;

    setWidth(Math.round(obj.width * obj.scaleX));
    setHeight(Math.round(obj.height * obj.scaleY));
    setX(Math.round(obj.left));
    setY(Math.round(obj.top));
    setAngle(Math.round(obj.angle || 0));
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
            {selectedObject.type !== "textbox" && (
              <TabsTrigger value="style" className="flex-1">
                Style
              </TabsTrigger>
            )}
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
          {selectedObject.type !== "textbox" && (
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
          )}

          {/* Tab Text */}
          {selectedObject.type === "textbox" && (
            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-1">
                <Label>Text</Label>
                <Input
                  value={text}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setText(newText);
                    if (selectedObject?.type === "textbox") {
                      selectedObject.set({ text: newText });
                      canvas.fire("object:modified", {
                        target: selectedObject,
                      });
                      canvas.requestRenderAll();
                    }
                  }}
                />
              </div>

              <div className="space-y-1">
                <Label>Font Size</Label>
                <Input
                  type="number"
                  value={fontSize}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 20;
                    setFontSize(value);
                    updateObject({ fontSize: value });
                  }}
                />
              </div>

              <div className="space-y-1">
                <Label>Font Family</Label>
                <select
                  value={fontFamily}
                  className="w-full border rounded px-2 py-1"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFontFamily(value);
                    updateObject({ fontFamily: value });
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label>Font Weight</Label>
                <button
                  type="button"
                  className="w-full border px-2 py-1 rounded"
                  onClick={() => {
                    const newWeight = fontWeight === "bold" ? "normal" : "bold";
                    setFontWeight(newWeight);
                    updateObject({ fontWeight: newWeight });
                  }}
                >
                  {fontWeight === "bold" ? "Normal" : "Bold"}
                </button>
              </div>

              <div className="space-y-1">
                <Label>Font Color</Label>
                <ColorPicker
                  color={fill}
                  onChange={(color) => {
                    setFill(color);
                    updateObject({ fill: color });
                  }}
                />
              </div>

              <div className="space-y-1">
                <Label>Text Align</Label>
                <select
                  value={textAlign}
                  className="w-full border rounded px-2 py-1"
                  onChange={(e) => {
                    const value = e.target.value;
                    setTextAlign(value);
                    updateObject({ textAlign: value });
                  }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}
