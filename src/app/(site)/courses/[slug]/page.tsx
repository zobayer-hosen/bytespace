import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPanel } from "@/components/sections/course/AboutPanel";
import { CourseHeader } from "@/components/sections/course/CourseHeader";
import { CoursePreview } from "@/components/sections/course/CoursePreview";
import { EnrollCard } from "@/components/sections/course/EnrollCard";
import { LessonsPanel } from "@/components/sections/course/LessonsPanel";
import { ReviewsPanel } from "@/components/sections/course/ReviewsPanel";
import { Tabs } from "@/components/ui/Tabs";
import { courseDetail } from "@/data/course-detail";
import { courses, getCourse } from "@/data/courses";
import { getCreator } from "@/data/creators";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return { title: course.headline ?? course.title, description: courseDetail.subtitle };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = getCourse((await params).slug);
  const creator = course && getCreator(course.creatorSlug);
  if (!course || !creator) notFound();

  const title = course.headline ?? course.title;

  /*
   * One grid spans the blue header and the white body so the enrol card can sit across both:
   * full-bleed gutters | main column (744px) | gap | sidebar (408px) | full-bleed gutters.
   */
  return (
    <article className="grid grid-cols-[1rem_minmax(0,1fr)_1rem] sm:grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] lg:grid-cols-[minmax(1.5rem,1fr)_minmax(0,744px)_48px_408px_minmax(1.5rem,1fr)]">
      <div aria-hidden className="col-span-full row-start-1 row-end-3 bg-brand blueprint-grid" />

      <CourseHeader title={title} creator={creator} className="col-start-2 row-start-1 pt-32 lg:col-end-5 lg:pt-[164px]" />

      <div className="col-start-2 row-start-2 pt-8 pb-12 lg:pt-10 lg:pb-16">
        <CoursePreview title={title} />
      </div>

      <aside className="col-start-2 row-start-3 pt-10 lg:sticky lg:top-6 lg:col-start-4 lg:row-span-2 lg:row-start-2 lg:self-start lg:pt-10">
        <EnrollCard course={course} creator={creator} />
      </aside>

      <Tabs
        label="Course information"
        className="col-start-2 row-start-4 pt-12 pb-20 lg:row-start-3 lg:pb-28"
        items={[
          { id: "about", label: "About", content: <AboutPanel /> },
          { id: "lessons", label: "Lessons", content: <LessonsPanel /> },
          { id: "reviews", label: "Reviews", content: <ReviewsPanel /> },
        ]}
      />
    </article>
  );
}
