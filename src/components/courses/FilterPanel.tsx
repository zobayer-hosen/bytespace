"use client";

import { Funnel } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PopoverPanel, usePopover } from "@/components/ui/Popover";
import { courseCategories, type CourseCategory } from "@/data/categories";
import {
  clearCourseFilters,
  COURSE_LEVELS,
  countActiveFilters,
  type CourseFilters,
} from "@/lib/course-filters";

const ALL = "all";

type FilterPanelProps = {
  filters: CourseFilters;
  onApply: (filters: CourseFilters) => void;
  triggerClassName?: string;
};

/** "Filter" button with a panel to edit level and category together, then apply or clear them. */
export function FilterPanel({ filters, onApply, triggerClassName }: FilterPanelProps) {
  const panelId = useId();
  const { open, setOpen, close, rootRef, triggerRef, handleBlur } = usePopover();
  const [draft, setDraft] = useState(filters);
  const activeCount = countActiveFilters(filters);

  function toggle() {
    if (!open) setDraft(filters);
    setOpen(!open);
  }

  function apply(next: CourseFilters) {
    onApply(next);
    close(true);
  }

  return (
    <div ref={rootRef} onBlur={handleBlur} className="sm:relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={toggle}
        className={triggerClassName}
      >
        <Funnel aria-hidden className="size-4" />
        Filter
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-accent text-[11px] font-semibold text-ink">
            {activeCount}
            <span className="sr-only"> active</span>
          </span>
        )}
      </button>

      <PopoverPanel open={open} id={panelId} role="dialog" aria-label="Filters" className="p-5 sm:w-80">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Level</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {[null, ...COURSE_LEVELS].map((level) => (
              <Chip
                key={level ?? ALL}
                size="sm"
                active={draft.level === level}
                // Chips mount when the panel opens, so this moves focus into it.
                autoFocus={level === null}
                onClick={() => setDraft({ ...draft, level })}
              >
                {level ?? "All levels"}
              </Chip>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-ink">Category</span>
          <select
            value={draft.category ?? ALL}
            onChange={(event) => {
              const { value } = event.target;
              setDraft({ ...draft, category: value === ALL ? null : (value as CourseCategory) });
            }}
            className="mt-3 h-11 w-full cursor-pointer rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value={ALL}>All categories</option>
            {courseCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => apply(clearCourseFilters(filters))}
            className="text-sm font-medium text-brand hover:underline"
          >
            Clear all
          </button>
          <Button size="sm" onClick={() => apply(draft)}>
            Apply
          </Button>
        </div>
      </PopoverPanel>
    </div>
  );
}
