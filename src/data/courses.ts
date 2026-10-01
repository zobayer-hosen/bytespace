import type { Course } from "@/types";
import { media } from "./media";

const sharedStats = {
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  rating: 4.5,
  level: "Beginner",
  price: 25,
  creatorSlug: "purepearl-studio",
  learners: 26,
} satisfies Partial<Course>;

/**
 * The Figma cards show no categories, so they are assigned from each course's title (and, for
 * Build Digital Asset, from its module list on the course page). All six courses appear under
 * "Featured" in the design.
 */
export const courses: Course[] = [
  {
    ...sharedStats,
    slug: "learn-figma-from-basic",
    categories: ["UI/UX Design"],
    featured: true,
    title: "Learn Figma from Basic",
    image: media.courses.figma,
  },
  {
    ...sharedStats,
    slug: "build-digital-asset",
    categories: ["Graphic Design", "UI/UX Design"],
    featured: true,
    title: "Build Digital Asset",
    headline: "Build Digital Asset: A Comprehensive Guide",
    image: media.courses.digitalAsset,
  },
  {
    ...sharedStats,
    slug: "the-power-of-big-data",
    categories: ["Data Science"],
    featured: true,
    title: "the Power of Big Data",
    image: media.courses.bigData,
  },
  {
    ...sharedStats,
    slug: "balancing-productivity-and-wellbeing",
    categories: ["Productivity"],
    featured: true,
    title: "Balancing Productivity and Wellbeing",
    image: media.courses.productivity,
  },
  {
    ...sharedStats,
    slug: "mastering-money-management",
    categories: ["Freelance & Entrepreneurship"],
    featured: true,
    title: "Mastering Money Management",
    image: media.courses.money,
  },
  {
    ...sharedStats,
    slug: "from-idea-to-startup-success",
    categories: ["Freelance & Entrepreneurship"],
    featured: true,
    title: "From Idea to Startup Success",
    image: media.courses.startup,
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCreator(creatorSlug: string) {
  return courses.filter((course) => course.creatorSlug === creatorSlug);
}
