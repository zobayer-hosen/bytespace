"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { EmptyResults } from "@/components/courses/EmptyResults";
import type { CourseCategory } from "@/data/categories";
import { courses } from "@/data/courses";
import { applyCourseFilters, DEFAULT_COURSE_FILTERS } from "@/lib/course-filters";

/** Landing-page category chips and the course grid they filter. */
export function CourseBrowser() {
  const [category, setCategory] = useState<CourseCategory | null>(null);
  const visibleCourses = applyCourseFilters(courses, { ...DEFAULT_COURSE_FILTERS, category });

  return (
    <>
      <CategoryFilter value={category} onChange={setCategory} className="mx-auto mt-10 max-w-[1080px]" />

      <p role="status" className="sr-only">
        {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"}
      </p>
      {visibleCourses.length > 0 ? (
        <CourseGrid courses={visibleCourses} className="mt-14 lg:mt-16" />
      ) : (
        <EmptyResults
          title={`No ${category} courses yet`}
          description="New courses are added all the time. Explore the featured courses in the meantime."
          action={{ label: "Show featured courses", onClick: () => setCategory(null) }}
          className="mt-14 lg:mt-16"
        />
      )}
    </>
  );
}
