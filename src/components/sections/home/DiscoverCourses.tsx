import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseBrowser } from "./CourseBrowser";

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
        <CourseBrowser />
      </Container>
    </section>
  );
}
