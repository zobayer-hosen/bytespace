import { useId } from "react";
import { shapePalettes, type ShapeProps } from "./palette";

const COIL_PATH =
  "M18 16C40 6 84 10 80 24C76 36 26 34 24 48C22 62 82 58 78 74C74 88 24 86 22 100C20 114 78 112 80 124";

/** Thick spring-like coil, drawn as a shaded tube. */
export function Squiggle({ tone = "lime", className }: ShapeProps) {
  const id = useId();
  const color = shapePalettes[tone];

  return (
    <svg viewBox="0 0 100 140" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-tube`} x1="10" y1="10" x2="90" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color.light} />
          <stop offset="0.55" stopColor={color.base} />
          <stop offset="1" stopColor={color.shade} />
        </linearGradient>
      </defs>
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d={COIL_PATH} stroke={color.deep} strokeWidth="17" transform="translate(2.5 3.5)" />
        <path d={COIL_PATH} stroke={`url(#${id}-tube)`} strokeWidth="17" />
        <path
          d={COIL_PATH}
          stroke={color.highlight}
          strokeOpacity="0.55"
          strokeWidth="4.5"
          transform="translate(-2.5 -3.5)"
        />
      </g>
    </svg>
  );
}
