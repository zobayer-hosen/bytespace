"use client";

import { useId, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Chip } from "@/components/ui/Chip";
import { courseCategories, FEATURED_LABEL, type CourseCategory } from "@/data/categories";
import { cn } from "@/lib/cn";

/** Default chips shown before "+ More" (Featured … UI/UX Design): together they fill one desktop row. */
const DEFAULT_COLLAPSED_COUNT = 7;

/** `null` is the Featured chip. */
const chips: readonly (CourseCategory | null)[] = [null, ...courseCategories];

type CategoryFilterProps = {
  value: CourseCategory | null;
  onChange: (category: CourseCategory | null) => void;
  /** `center` is the landing-page layout; `start` lines the chips up under the search toolbar. */
  align?: "center" | "start";
  /** Chips shown before "+ More", counting Featured. */
  collapsedCount?: number;
  className?: string;
};

/**
 * Category chips. The first `collapsedCount` are shown until "+ More" expands the rest; the
 * active chip always stays visible, even while collapsed. "+ More" is hidden when nothing is left over.
 */
export function CategoryFilter({
  value,
  onChange,
  align = "center",
  collapsedCount = DEFAULT_COLLAPSED_COUNT,
  className,
}: CategoryFilterProps) {
  const groupId = useId();
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = chips.length - collapsedCount;
  const visibleChips = expanded
    ? chips
    : chips.filter((category, index) => index < collapsedCount || category === value);

  return (
    <div id={groupId} role="group" aria-label="Course categories" className={className}>
      <Stagger
        stagger={0.03}
        className={cn("flex flex-wrap gap-3", align === "center" ? "justify-center sm:gap-5" : "sm:gap-4")}
      >
        {visibleChips.map((category) => (
          <StaggerItem key={category ?? FEATURED_LABEL}>
            <Chip active={category === value} onClick={() => onChange(category)}>
              {category ?? FEATURED_LABEL}
            </Chip>
          </StaggerItem>
        ))}
        {hiddenCount > 0 && (
          <StaggerItem>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={groupId}
              onClick={() => setExpanded((isExpanded) => !isExpanded)}
              className="inline-flex h-10 items-center px-3 text-sm font-medium text-brand hover:underline sm:h-11 sm:text-[15px]"
            >
              {expanded ? (
                "Show less"
              ) : (
                <>
                  <span aria-hidden>+&nbsp;</span>More
                  <span className="sr-only"> categories</span>
                </>
              )}
            </button>
          </StaggerItem>
        )}
      </Stagger>
    </div>
  );
}
