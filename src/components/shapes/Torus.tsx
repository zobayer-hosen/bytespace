import { useId } from "react";
import { shapePalettes, type ShapeProps } from "./palette";

const RING_PATH =
  "M60 6A54 54 0 1 1 59.9 6ZM60 36A24 24 0 1 0 60.1 36Z";

/** Thick glossy ring (doughnut). */
export function Torus({ tone = "lime", className }: ShapeProps) {
  const id = useId();
  const color = shapePalettes[tone];

  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className}>
      <defs>
        <radialGradient id={`${id}-ring`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor={color.highlight} />
          <stop offset="0.45" stopColor={color.base} />
          <stop offset="0.85" stopColor={color.shade} />
          <stop offset="1" stopColor={color.deep} />
        </radialGradient>
      </defs>
      <path d={RING_PATH} fillRule="evenodd" fill={`url(#${id}-ring)`} />
      <path
        d="M24 44A40 40 0 0 1 64 20"
        stroke={color.highlight}
        strokeOpacity="0.7"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
