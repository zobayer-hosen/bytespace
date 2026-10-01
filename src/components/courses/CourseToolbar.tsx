import { ArrowDownWideNarrow, ChartNoAxesColumn, Funnel, Shapes, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const filters: { label: string; icon: LucideIcon }[] = [
  { label: "Filter", icon: Funnel },
  { label: "Level", icon: ChartNoAxesColumn },
  { label: "Category", icon: Shapes },
];

const pillClass =
  "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-ink transition-colors hover:border-ink/25 sm:h-11 sm:px-5";

/**
 * Filter and sort controls above a course list. The design has no filter panels yet,
 * so these are visual placeholders.
 */
export function CourseToolbar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <div className="flex flex-wrap gap-3">
        {filters.map(({ label, icon: Icon }) => (
          <button key={label} type="button" className={pillClass}>
            <Icon aria-hidden className="size-4" />
            {label}
          </button>
        ))}
      </div>
      <button type="button" className={pillClass}>
        <ArrowDownWideNarrow aria-hidden className="size-4" />
        Most relevant
      </button>
    </div>
  );
}
