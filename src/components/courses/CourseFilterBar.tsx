"use client";

import type { CourseFacets } from "@/lib/course-filters";
import { CategoryFilter } from "./CategoryFilter";
import { CourseToolbar } from "./CourseToolbar";
import { useCourseFilters } from "./useCourseFilters";

type CourseFilterBarProps = {
  facets: CourseFacets;
  /** Also show the category chips under the toolbar (search page). */
  withCategoryChips?: boolean;
};

/** Toolbar (and optional chips) wired to the URL, so both always show the same category. */
export function CourseFilterBar({ facets, withCategoryChips = false }: CourseFilterBarProps) {
  const { filters, setFilters } = useCourseFilters();

  return (
    <>
      <CourseToolbar filters={filters} facets={facets} onChange={setFilters} />
      {withCategoryChips && (
        <CategoryFilter
          value={filters.category}
          onChange={(category) => setFilters({ ...filters, category })}
          align="start"
          className="mt-8"
        />
      )}
    </>
  );
}
