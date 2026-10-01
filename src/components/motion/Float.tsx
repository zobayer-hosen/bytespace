"use client";

import { motion } from "framer-motion";

type FloatProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full up-and-down cycle. */
  duration?: number;
  delay?: number;
  /** Vertical travel in pixels. */
  distance?: number;
  /** Rotation swing in degrees. */
  rotate?: number;
};

/** Gently bobs its children up and down forever (decorative shapes and stat cards). */
export function Float({
  children,
  className,
  duration = 5,
  delay = 0,
  distance = 12,
  rotate = 0,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
