"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Bubble({ x, y, size, color }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.7, 0.3, 0.7],
        scale: [1, 1.2, 1],
        x: x + Math.random() * 100 - 50,
        y: y + Math.random() * 100 - 50,
      }}
      transition={{
        duration: 5 + Math.random() * 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}

function FloatingBubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 5,
      color: `rgba(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      },0.3)`,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {bubbles.map((bubble) => (
          <Bubble key={bubble.id} {...bubble} />
        ))}
      </svg>
    </div>
  );
}

export default function FloatingBubblesLayer() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <FloatingBubbles />
    </div>
  );
}
