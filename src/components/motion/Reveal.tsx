"use client";

import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "./variants";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (used above the fold). */
  onMount?: boolean;
};

/** Fades its children in with a 24px rise. */
export function Reveal({ children, className, delay = 0, onMount = false }: RevealProps) {
  const target = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={onMount ? target : undefined}
      whileInView={onMount ? undefined : target}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
