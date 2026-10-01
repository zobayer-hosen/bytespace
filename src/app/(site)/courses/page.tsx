import type { Metadata } from "next";
import { CourseFilterBar } from "@/components/courses/CourseFilterBar";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { EmptyResults } from "@/components/courses/EmptyResults";
import { CourseSearchHero } from "@/components/sections/courses/CourseSearchHero";
import { Container } from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import { catalogHref, parseScope, searchCatalog } from "@/lib/catalog";
import { clearCourseFilters, countActiveFilters, parseCourseFilters } from "@/lib/course-filters";

export const metadata: Metadata = {
  title: "Courses",
  description: "Search ByteSpace courses by topic or creator.",
};

type CoursesPageProps = {
  searchParams: Promise<{ q?: string; in?: string; page?: string; category?: string; level?: string; sort?: string }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const scope = parseScope(params.in);
  const filters = parseCourseFilters(params);
  const { results, total, facets, currentPage, totalPages } = searchCatalog({
    query,
    scope,
    filters,
    page: Number(params.page) || 1,
  });
  const filtered = countActiveFilters(filters) > 0;

  return (
    <>
      <CourseSearchHero query={query} scope={scope} filters={filters} />

      <section aria-label="Search results" className="py-12 lg:py-14">
        <Container>
          <CourseFilterBar facets={facets} withCategoryChips />

          <p role="status" className="sr-only">
            {total} {total === 1 ? "result" : "results"}
          </p>
          {results.length > 0 ? (
            <>
              <CourseGrid courses={results} className="mt-12" />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hrefForPage={(page) => catalogHref({ query, scope, filters, page })}
                  className="mt-14"
                />
              )}
            </>
          ) : filtered ? (
            <EmptyResults
              title="No courses match these filters"
              description="Try another level or category, or clear the filters."
              action={{ label: "Clear filters", href: catalogHref({ query, scope, filters: clearCourseFilters(filters) }) }}
              className="mt-12"
            />
          ) : (
            <EmptyResults
              title={`No results for “${query}”`}
              description="Try another keyword or browse every course."
              action={{ label: "Clear search", href: "/courses" }}
              className="mt-12"
            />
          )}
        </Container>
      </section>
    </>
  );
}
