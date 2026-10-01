import { CourseCard } from "@/components/cards/CourseCard";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import type { Course } from "@/types";

/** 1 column on phones, 2 from 640px, 3 from 1024px. */
export const courseGridClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10";

type CourseGridProps = {
  courses: readonly Course[];
  className?: string;
};

/** Responsive 1 / 2 / 3 column course grid; each row reveals with a left-to-right stagger. */
export function CourseGrid({ courses, className }: CourseGridProps) {
  return (
    <ul className={cn(courseGridClassName, className)}>
      {courses.map((course, index) => (
        <li key={`${course.slug}-${index}`}>
          <Reveal delay={(index % 3) * 0.08} className="h-full">
            <CourseCard course={course} className="h-full" />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
