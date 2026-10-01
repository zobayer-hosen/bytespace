"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/components/motion/variants";
import { cn } from "@/lib/cn";

const fill: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE_OUT, delay: 0.2 } },
};

type ProgressBarProps = {
  value: number;
  label: string;
  className?: string;
};

/** Lime progress bar that fills to `value`% when it scrolls into view. */
export function ProgressBar({ value, label, className }: ProgressBarProps) {
  // The in-view trigger sits on the track: the fill starts at scaleX(0), which has no area to observe.
  return (
    <motion.div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-line", className)}
    >
      <motion.div variants={fill} className="h-full origin-left rounded-full bg-accent" style={{ width: `${value}%` }} />
    </motion.div>
  );
}
