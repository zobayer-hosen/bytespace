import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const shapes = {
  circle: "size-14 rounded-full",
  square: "size-14 rounded-2xl",
} as const;

type IconBadgeProps = {
  icon: LucideIcon;
  shape?: keyof typeof shapes;
  className?: string;
};

/** Lime tile holding a dark icon (category tiles, lesson modules). */
export function IconBadge({ icon: Icon, shape = "circle", className }: IconBadgeProps) {
  return (
    <span className={cn("grid shrink-0 place-items-center bg-accent text-ink", shapes[shape], className)}>
      <Icon aria-hidden className="size-6" strokeWidth={2} />
    </span>
  );
}
