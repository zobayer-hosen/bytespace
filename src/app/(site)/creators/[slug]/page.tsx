import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseFilterBar } from "@/components/courses/CourseFilterBar";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { EmptyResults } from "@/components/courses/EmptyResults";
import { CreatorHeader } from "@/components/sections/creator/CreatorHeader";
import { Container } from "@/components/ui/Container";
import { getCoursesByCreator } from "@/data/courses";
import { creators, getCreator } from "@/data/creators";
import {
  applyCourseFilters,
  clearCourseFilters,
  countFacets,
  parseCourseFilters,
  withCourseFilters,
} from "@/lib/course-filters";

type CreatorPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; level?: string; sort?: string }>;
};

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.slug }));
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  if (!creator) return {};
  return { title: creator.name, description: creator.tagline };
}

export default async function CreatorPage({ params, searchParams }: CreatorPageProps) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  const filters = parseCourseFilters(await searchParams);
  const creatorCourses = getCoursesByCreator(creator.slug);
  const visibleCourses = applyCourseFilters(creatorCourses, filters);
  const clearedSearch = withCourseFilters(new URLSearchParams(), clearCourseFilters(filters)).toString();

  return (
    <>
      <CreatorHeader creator={creator} />
      <section aria-label={`Courses by ${creator.name}`} className="py-12 lg:pt-14 lg:pb-24">
        <Container>
          <CourseFilterBar facets={countFacets(creatorCourses, filters)} />

          <p role="status" className="sr-only">
            {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"}
          </p>
          {visibleCourses.length > 0 ? (
            <CourseGrid courses={visibleCourses} className="mt-8" />
          ) : (
            <EmptyResults
              title="No courses match these filters"
              description={`${creator.name} has no courses for this level or category yet.`}
              action={{
                label: "Clear filters",
                href: `/creators/${creator.slug}${clearedSearch ? `?${clearedSearch}` : ""}`,
              }}
              className="mt-8"
            />
          )}
        </Container>
      </section>
    </>
  );
}
