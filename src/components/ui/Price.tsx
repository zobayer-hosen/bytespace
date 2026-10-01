import { cn } from "@/lib/cn";

const sizes = {
  md: "text-[22px]",
  lg: "text-[32px] leading-none",
} as const;

type PriceProps = {
  amount: number;
  size?: keyof typeof sizes;
  className?: string;
};

/** Blue "$25/lifetime" price tag. */
export function Price({ amount, size = "md", className }: PriceProps) {
  return (
    <p className={cn("flex items-baseline", className)}>
      <span className={cn("font-display font-semibold text-brand", sizes[size])}>${amount}</span>
      <span className="text-xs text-muted">/lifetime</span>
    </p>
  );
}
