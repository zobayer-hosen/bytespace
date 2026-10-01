import { useId } from "react";
import { shapePalettes, type ShapeProps } from "./palette";

/** Upright cylinder with a lit top face. */
export function Cylinder({ tone = "lime", className }: ShapeProps) {
  const id = useId();
  const color = shapePalettes[tone];

  return (
    <svg viewBox="0 0 100 132" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-body`} x1="10" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color.shade} />
          <stop offset="0.45" stopColor={color.light} />
          <stop offset="0.8" stopColor={color.base} />
          <stop offset="1" stopColor={color.deep} />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="10" y1="12" x2="90" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color.highlight} />
          <stop offset="1" stopColor={color.base} />
        </linearGradient>
      </defs>
      <path d="M10 26V106C10 113.7 27.9 120 50 120C72.1 120 90 113.7 90 106V26Z" fill={`url(#${id}-body)`} />
      <ellipse cx="50" cy="26" rx="40" ry="14" fill={`url(#${id}-top)`} />
    </svg>
  );
}
