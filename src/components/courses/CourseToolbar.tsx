"use client";

import { ArrowDownWideNarrow, ChartNoAxesColumn, Shapes } from "lucide-react";
import { SelectMenu, type SelectMenuOption } from "@/components/ui/SelectMenu";
import { courseCategories, type CourseCategory } from "@/data/categories";
import { COURSE_LEVELS, SORT_OPTIONS, type CourseFacets, type CourseFilters } from "@/lib/course-filters";
import { cn } from "@/lib/cn";
import type { CourseLevel } from "@/types";
import { FilterPanel } from "./FilterPanel";

const ALL = "all";

function pillClass(active = false) {
  return cn(
    "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-ink transition-colors hover:border-ink/25 sm:h-11 sm:px-5",
    active && "border-ink/35 font-medium",
  );
}

type CourseToolbarProps = {
  filters: CourseFilters;
  facets: CourseFacets;
  onChange: (filters: CourseFilters) => void;
  className?: string;
};

/** Filter, Level, Category and sort controls above a course list. */
export function CourseToolbar({ filters, facets, onChange, className }: CourseToolbarProps) {
  const levelOptions: SelectMenuOption<CourseLevel | typeof ALL>[] = [
    { value: ALL, label: "All levels", count: facets.levels.all },
    ...COURSE_LEVELS.map((level) => ({ value: level, label: level, count: facets.levels[level] })),
  ];
  const categoryOptions: SelectMenuOption<CourseCategory | typeof ALL>[] = [
    { value: ALL, label: "All categories", count: facets.categories.all },
    ...courseCategories.map((category) => ({ value: category, label: category, count: facets.categories[category] })),
  ];
  const sortLabel = SORT_OPTIONS.find((option) => option.value === filters.sort)?.label ?? SORT_OPTIONS[0].label;

  // The relative wrapper lets the menus span the whole toolbar on phones (see PopoverPanel).
  return (
    <div className={cn("relative z-20 flex flex-wrap items-center justify-between gap-3", className)}>
      <div className="flex flex-wrap gap-3">
        <FilterPanel
          filters={filters}
          onApply={onChange}
          triggerClassName={pillClass(filters.category !== null || filters.level !== null)}
        />
        <SelectMenu
          label="Level"
          triggerLabel={filters.level ?? "Level"}
          icon={ChartNoAxesColumn}
          options={levelOptions}
          value={filters.level ?? ALL}
          onChange={(level) => onChange({ ...filters, level: level === ALL ? null : level })}
          triggerClassName={pillClass(filters.level !== null)}
        />
        <SelectMenu
          label="Category"
          triggerLabel={filters.category ?? "Category"}
          icon={Shapes}
          options={categoryOptions}
          value={filters.category ?? ALL}
          onChange={(category) => onChange({ ...filters, category: category === ALL ? null : category })}
          triggerClassName={pillClass(filters.category !== null)}
        />
      </div>
      <SelectMenu
        label="Sort by"
        triggerLabel={sortLabel}
        icon={ArrowDownWideNarrow}
        options={SORT_OPTIONS}
        value={filters.sort}
        onChange={(sort) => onChange({ ...filters, sort })}
        align="end"
        triggerClassName={pillClass()}
      />
    </div>
  );
}
