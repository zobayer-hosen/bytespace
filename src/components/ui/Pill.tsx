import { cn } from "@/lib/cn";

const tones = {
  /** Frosted pill laid over photos (course card meta). */
  glass: "bg-white/70 text-ink/70 backdrop-blur-md",
  soft: "bg-surface text-ink/80",
  white: "bg-white text-ink",
} as const;

const sizes = {
  sm: "h-7 gap-1 px-3 text-xs",
  md: "h-9 gap-1.5 px-4 text-[13px]",
  lg: "h-10 gap-2 px-5 text-sm",
} as const;

type PillProps = React.ComponentProps<"span"> & {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
};

/** Static, non-interactive label pill. */
export function Pill({ tone = "soft", size = "md", className, ...props }: PillProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full whitespace-nowrap", tones[tone], sizes[size], className)}
      {...props}
    />
  );
}
