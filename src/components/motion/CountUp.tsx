"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "./variants";

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [count, duration, inView, reduceMotion, to]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}
