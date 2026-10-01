import { useId } from "react";
import { shapePalettes, type ShapeProps } from "./palette";

/** Cone standing on its base, lit from the left. */
export function Cone({ tone = "lime", className }: ShapeProps) {
  const id = useId();
  const color = shapePalettes[tone];

  return (
    <svg viewBox="0 0 100 116" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-side`} x1="8" y1="0" x2="92" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color.base} />
          <stop offset="0.35" stopColor={color.highlight} />
          <stop offset="0.7" stopColor={color.base} />
          <stop offset="1" stopColor={color.deep} />
        </linearGradient>
      </defs>
      <path d="M50 6L92 96C92 103.7 73.2 110 50 110C26.8 110 8 103.7 8 96Z" fill={`url(#${id}-side)`} />
    </svg>
  );
}
