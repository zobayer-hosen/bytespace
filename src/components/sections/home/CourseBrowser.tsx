"use client";

import { useState } from "react";
import { AnimatedCourseGrid } from "@/components/courses/AnimatedCourseGrid";
import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { EmptyResults } from "@/components/courses/EmptyResults";
import { Reveal } from "@/components/motion/Reveal";
import type { CourseCategory } from "@/data/categories";
import { courses } from "@/data/courses";
import { coursesForChip } from "@/lib/course-filters";

function resultsMessage(count: number, category: CourseCategory | null) {
  if (count === 0) return `No courses in ${category} yet`;
  const noun = count === 1 ? "course" : "courses";
  return category ? `Showing ${count} ${noun} in ${category}` : `Showing ${count} featured ${noun}`;
}

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

      <p aria-live="polite" className="sr-only">
        {resultsMessage(visibleCourses.length, category)}
      </p>
      {visibleCourses.length > 0 ? (
        <AnimatedCourseGrid courses={visibleCourses} className="mt-14 lg:mt-16" />
      ) : (
        <Reveal onMount className="mt-14 lg:mt-16">
          <EmptyResults
            title="No courses in this category yet."
            action={{ label: "Show featured courses", onClick: () => setCategory(null) }}
          />
        </Reveal>
      )}
    </>
  );
}
