import { Stars } from "@/components/ui/Stars";
import type { RatingBreakdown } from "@/types";

type RatingSummaryProps = {
  average: number;
  breakdown: readonly RatingBreakdown[];
};

/** Average score tile plus one bar per star level. */
export function RatingSummary({ average, breakdown }: RatingSummaryProps) {
  const total = breakdown.reduce((sum, row) => sum + row.count, 0);

  return (
    <div className="flex flex-col gap-6 rounded-card border border-line p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
      <div className="grid aspect-[126/140] w-28 shrink-0 place-content-center rounded-xl bg-accent text-center sm:w-[126px]">
        <p className="text-sm text-ink">Ratings</p>
        <p className="font-display text-[40px] leading-tight font-semibold text-ink">{average}</p>
      </div>

      <ul className="flex-1 space-y-2.5">
        {breakdown.map(({ stars, count }) => (
          <li key={stars} className="flex items-center gap-4">
            <div
              role="meter"
              aria-label={`${stars} star reviews`}
              aria-valuenow={count}
              aria-valuemin={0}
              aria-valuemax={total}
              className="h-2 flex-1 overflow-hidden rounded-full bg-line"
            >
              <div className="h-full rounded-full bg-accent" style={{ width: `${(count / total) * 100}%` }} />
            </div>
            <Stars rating={stars} className="gap-1.5" starClassName="size-[18px]" />
            <span className="w-8 text-right text-sm text-muted">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
