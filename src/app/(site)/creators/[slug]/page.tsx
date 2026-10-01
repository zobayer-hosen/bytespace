import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseToolbar } from "@/components/courses/CourseToolbar";
import { CreatorHeader } from "@/components/sections/creator/CreatorHeader";
import { Container } from "@/components/ui/Container";
import { getCoursesByCreator } from "@/data/courses";
import { creators, getCreator } from "@/data/creators";

type CreatorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.slug }));
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  if (!creator) return {};
  return { title: creator.name, description: creator.tagline };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  return (
    <>
      <CreatorHeader creator={creator} />
      <section aria-label={`Courses by ${creator.name}`} className="py-12 lg:pt-14 lg:pb-24">
        <Container>
          <CourseToolbar />
          <CourseGrid courses={getCoursesByCreator(creator.slug)} className="mt-8" />
        </Container>
      </section>
    </>
  );
}
