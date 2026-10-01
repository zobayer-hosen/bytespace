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

export const courses: Course[] = [
  {
    ...sharedStats,
    slug: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    image: media.courses.figma,
  },
  {
    ...sharedStats,
    slug: "build-digital-asset",
    title: "Build Digital Asset",
    headline: "Build Digital Asset: A Comprehensive Guide",
    image: media.courses.digitalAsset,
  },
  {
    ...sharedStats,
    slug: "the-power-of-big-data",
    title: "the Power of Big Data",
    image: media.courses.bigData,
  },
  {
    ...sharedStats,
    slug: "balancing-productivity-and-wellbeing",
    title: "Balancing Productivity and Wellbeing",
    image: media.courses.productivity,
  },
  {
    ...sharedStats,
    slug: "mastering-money-management",
    title: "Mastering Money Management",
    image: media.courses.money,
  },
  {
    ...sharedStats,
    slug: "from-idea-to-startup-success",
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
