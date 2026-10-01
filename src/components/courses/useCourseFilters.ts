"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useOptimistic, useTransition } from "react";
import { parseCourseFilters, withCourseFilters, type CourseFilters } from "@/lib/course-filters";

/**
 * Course filters stored in the URL (`?category=&level=&sort=`), so the page renders the matching
 * results on the server and the view can be shared. Updates are client-side navigations (no page
 * reload); the new value shows immediately while the results load.
 */
export function useCourseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const urlFilters = useMemo(
    () =>
      parseCourseFilters({
        category: searchParams.get("category"),
        level: searchParams.get("level"),
        sort: searchParams.get("sort"),
      }),
    [searchParams],
  );
  const [filters, setOptimisticFilters] = useOptimistic(urlFilters);

  function setFilters(next: CourseFilters) {
    const params = withCourseFilters(new URLSearchParams(searchParams), next);
    params.delete("page"); // a new filter starts from the first page
    const search = params.toString();

    startTransition(() => {
      setOptimisticFilters(next);
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    });
  }

  return { filters, setFilters };
}
