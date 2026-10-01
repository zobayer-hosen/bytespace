"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { EmptyResults } from "@/components/courses/EmptyResults";
import type { CourseCategory } from "@/data/categories";
import { courses } from "@/data/courses";
import { coursesForChip } from "@/lib/course-filters";

/** Landing-page category chips and the course grid they filter (one source of truth for both). */
export function CourseBrowser() {
  // `null` is the Featured chip.
  const [category, setCategory] = useState<CourseCategory | null>(null);
  const visibleCourses = coursesForChip(courses, category);

  return (
    <>
      <CategoryFilter
        value={category}
        onChange={setCategory}
        collapsedCount={8}
        className="mx-auto mt-10 max-w-[1080px]"
      />

      <p role="status" className="sr-only">
        {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"}
      </p>
      {visibleCourses.length > 0 ? (
        <CourseGrid courses={visibleCourses} className="mt-14 lg:mt-16" />
      ) : (
        <EmptyResults
          title="No courses in this category yet."
          action={{ label: "Show featured courses", onClick: () => setCategory(null) }}
          className="mt-14 lg:mt-16"
        />
      )}
    </>
  );
}
