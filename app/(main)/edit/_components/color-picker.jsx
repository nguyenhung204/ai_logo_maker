"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="h-8 w-8 rounded border cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute z-10 mt-2">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
