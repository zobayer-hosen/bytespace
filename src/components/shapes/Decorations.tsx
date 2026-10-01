import type { ComponentType } from "react";
import { Float } from "@/components/motion/Float";
import { cn } from "@/lib/cn";
import type { ShapeProps, ShapeTone } from "./palette";

export type DecorationSpec = {
  shape: ComponentType<ShapeProps>;
  tone: ShapeTone;
  /** Absolute position, size and static rotation of the shape. */
  className: string;
  duration?: number;
  delay?: number;
  rotate?: number;
};

type DecorationsProps = {
  items: readonly DecorationSpec[];
  className?: string;
};

/** Layer of floating 3D shapes placed absolutely inside a `relative` parent. */
export function Decorations({ items, className }: DecorationsProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {items.map(({ shape: Shape, tone, className: position, duration, delay, rotate }, index) => (
        <Float key={index} className={cn("absolute", position)} duration={duration} delay={delay} rotate={rotate}>
          <Shape tone={tone} className="h-auto w-full drop-shadow-[0_18px_24px_rgb(5_20_90/0.25)]" />
        </Float>
      ))}
    </div>
  );
}
