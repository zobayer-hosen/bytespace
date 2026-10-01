import type { LucideIcon } from "lucide-react";
import type { CourseCategory } from "@/data/categories";

export type NavLink = {
  label: string;
  href: string;
  /** Id of the home page section the link scrolls to (`"top"` is the hero). */
  sectionId?: string;
};

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  slug: string;
  title: string;
  /** Longer title used on the course detail page, when it differs from the card title. */
  headline?: string;
  image: string;
  lessons: number;
  duration: string;
  comments: number;
  rating: number;
  level: CourseLevel;
  /** A course can belong to several categories. */
  categories: CourseCategory[];
  /** Shown under the landing page's "Featured" chip. */
  featured: boolean;
  price: number;
  creatorSlug: string;
  /** Number of learners shown in the card's avatar stack badge ("26+"). */
  learners: number;
};

export type Creator = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  avatar: string;
  products: number;
  followers: number;
};

export type LearningPath = {
  label: string;
  icon: LucideIcon;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type LessonPreview = {
  title: string;
  duration: string;
};

export type CourseModule = {
  title: string;
  description: string;
};

export type CourseFeature = {
  label: string;
  icon: LucideIcon;
};

export type Review = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  postedAt: string;
  text: string;
};

export type RatingBreakdown = {
  stars: number;
  count: number;
};

export type FieldRules = {
  required?: boolean;
  email?: boolean;
  minLength?: number;
};

export type AuthField = {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete: string;
  rules: FieldRules;
};
