import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

type ProgressCardProps = {
  value: number;
  className?: string;
};

/** "Learning Progress 55%" stat card. */
export function ProgressCard({ value, className }: ProgressCardProps) {
  return (
    <div className={cn("rounded-2xl bg-white p-4 shadow-float", className)}>
      <p className="text-xs text-ink/70">Learning Progress</p>
      <p className="mt-1.5 font-display text-[32px] leading-none font-medium text-ink">{value}%</p>
      <ProgressBar value={value} label="Learning progress" className="mt-3" />
    </div>
  );
}
