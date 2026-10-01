import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courses } from "@/data/courses";

export function DiscoverCourses() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <SectionHeading
          title={
            <>
              Discover Your Passion,
              <br />
              Build Your Skills
            </>
          }
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
          descriptionClassName="max-w-[880px]"
        />
        <CategoryFilter moreHref="/courses" className="mx-auto mt-10 max-w-[1080px]" />
        <CourseGrid courses={courses} className="mt-14 lg:mt-16" />
      </Container>
    </section>
  );
}
