import type { Metadata } from "next";
import Link from "next/link";
import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseToolbar } from "@/components/courses/CourseToolbar";
import { CourseSearchHero } from "@/components/sections/courses/CourseSearchHero";
import { Container } from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import { parseScope, searchCatalog, type SearchScope } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Courses",
  description: "Search ByteSpace courses by topic or creator.",
};

type CoursesPageProps = {
  searchParams: Promise<{ q?: string; in?: string; page?: string }>;
};

function pageHref(query: string, scope: SearchScope, page: number) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (scope !== "courses") params.set("in", scope);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/courses?${search}` : "/courses";
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const scope = parseScope(params.in);
  const { results, currentPage, totalPages } = searchCatalog({ query, scope, page: Number(params.page) || 1 });

  return (
    <>
      <CourseSearchHero query={query} scope={scope} />

      <section aria-label="Search results" className="py-12 lg:py-14">
        <Container>
          <CourseToolbar />
          <CategoryFilter layout="scroll" className="mt-8" />

          {results.length > 0 ? (
            <>
              <CourseGrid courses={results} className="mt-12" />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hrefForPage={(page) => pageHref(query, scope, page)}
                  className="mt-14"
                />
              )}
            </>
          ) : (
            <div className="mt-16 rounded-card border border-dashed border-line px-6 py-16 text-center">
              <p className="font-display text-xl font-semibold text-ink">No results for “{query}”</p>
              <p className="mt-2 text-sm text-muted">Try another keyword or browse every course.</p>
              <Link href="/courses" className="mt-6 inline-block text-sm font-medium text-brand hover:underline">
                Clear search
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
