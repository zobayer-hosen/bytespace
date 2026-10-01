import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

const starTones = {
  muted: "fill-[#C9CBD3] text-[#C9CBD3]",
  accent: "fill-accent text-accent",
  brand: "fill-brand text-brand",
} as const;

type RatingProps = {
  value: number;
  /** Optional review count shown in brackets, e.g. "4.5 (240)". */
  reviews?: number;
  tone?: keyof typeof starTones;
  className?: string;
};

/** Compact "4.5 ★" rating label. */
export function Rating({ value, reviews, tone = "muted", className }: RatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm text-muted", className)}>
      <span>
        {value.toFixed(1)}
        <span className="sr-only"> out of 5 stars</span>
        {reviews !== undefined && ` (${reviews})`}
      </span>
      <Star aria-hidden className={cn("size-3.5", starTones[tone])} />
    </span>
  );
}
