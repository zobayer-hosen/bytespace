import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type StarsProps = {
  rating: number;
  className?: string;
  starClassName?: string;
};

/** Row of five stars with `rating` of them filled. */
export function Stars({ rating, className, starClassName }: StarsProps) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className={cn("inline-flex gap-1", className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn(
            "size-4",
            index < rating ? "fill-ink/80 text-ink/80" : "fill-line text-line",
            starClassName,
          )}
        />
      ))}
    </span>
  );
}
