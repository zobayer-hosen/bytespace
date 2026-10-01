"use client";

import { MotionConfig } from "framer-motion";

/** Disables transform animations for visitors who prefer reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
