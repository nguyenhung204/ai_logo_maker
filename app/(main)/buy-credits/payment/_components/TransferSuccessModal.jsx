"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function Checkmark({
  size = 100,
  strokeWidth = 2,
  color = "currentColor",
  className = "",
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.2,
          type: "spring",
          duration: 1.5,
          bounce: 0.2,
          ease: "easeInOut",
        },
        opacity: { delay: i * 0.2, duration: 0.2 },
      },
    }),
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        variants={draw}
        custom={0}
        style={{ strokeWidth, strokeLinecap: "round", fill: "transparent" }}
      />
      <motion.path
        d="M30 50L45 65L70 35"
        stroke={color}
        variants={draw}
        custom={1}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  );
}

export default function TransferSuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const closeTimeout = setTimeout(() => {
        onClose?.();
      }, 4000);
      return () => clearTimeout(closeTimeout);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
          >
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="space-y-4 flex flex-col items-center justify-center">
                <motion.div className="relative">
                  <motion.div
                    className="absolute inset-0 blur-xl bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  />
                  <Checkmark
                    size={80}
                    strokeWidth={4}
                    color="rgb(16 185 129)"
                    className="relative z-10 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                  />
                </motion.div>

                <motion.h2
                  className="text-lg text-zinc-900 dark:text-white font-semibold"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.4 }}
                >
                  Thanh toán thành công
                </motion.h2>

                <div className="w-full text-center text-sm text-zinc-600 dark:text-zinc-400">
                  Cảm ơn bạn đã thanh toán. Credits của bạn sẽ được cập nhật
                  ngay sau ít phút.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
