"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CourseCard } from "@/components/cards/CourseCard";
import { Stagger } from "@/components/motion/Stagger";
import { EASE_OUT, fadeUp } from "@/components/motion/variants";
import { cn } from "@/lib/cn";
import type { Course } from "@/types";
import { courseGridClassName } from "./CourseGrid";

const exit = { opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: EASE_OUT } };
const layoutTransition = { layout: { duration: 0.35, ease: EASE_OUT } };

type AnimatedCourseGridProps = {
  courses: readonly Course[];
  className?: string;
};

/**
 * Course grid for lists that change in place: removed cards fade out, the rest glide to their new
 * cells and new cards fade in. Reveals with a stagger on first scroll, like `CourseGrid`.
 */
export function AnimatedCourseGrid({ courses, className }: AnimatedCourseGridProps) {
  // `relative` anchors the cards that popLayout takes out of the flow while they exit.
  return (
    <Stagger as="ul" className={cn(courseGridClassName, "relative", className)}>
      <AnimatePresence mode="popLayout">
        {courses.map((course) => (
          <motion.li key={course.slug} layout variants={fadeUp} exit={exit} transition={layoutTransition}>
            <CourseCard course={course} className="h-full" />
          </motion.li>
        ))}
      </AnimatePresence>
    </Stagger>
  );
}
