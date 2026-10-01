import { cn } from "@/lib/cn";

const tones = {
  lime: "bg-accent/60",
  blue: "bg-brand/20",
} as const;

type GlowProps = {
  tone: keyof typeof tones;
  /** Position and size of the glow, e.g. "-top-24 -left-24 size-[480px]". */
  className: string;
};

/** Large blurred colour blob behind a section's content (parent needs `relative isolate`). */
export function Glow({ tone, className }: GlowProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute -z-10 rounded-full blur-[120px]", tones[tone], className)} />
  );
}
