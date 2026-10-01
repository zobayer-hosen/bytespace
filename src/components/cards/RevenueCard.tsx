import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

type RevenueCardProps = {
  label: string;
  period: string;
  amount: string;
  /** Renders a progress bar under the amount. */
  progress?: number;
  /** Renders a small lime change badge under the amount. */
  change?: string;
  className?: string;
};

/** Blue earnings card used in the "Create & Manage" collage. */
export function RevenueCard({ label, period, amount, progress, change, className }: RevenueCardProps) {
  return (
    <div className={cn("rounded-2xl bg-brand p-4 text-white shadow-float", className)}>
      <p className="text-sm">{label}</p>
      <p className="text-[10px] text-white/60">{period}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{amount}</p>
      {progress !== undefined && (
        <ProgressBar value={progress} label={`${label} goal`} className="mt-3 bg-white/25" />
      )}
      {change && (
        <span className="mt-2 inline-flex rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-ink">
          {change}
        </span>
      )}
    </div>
  );
}
