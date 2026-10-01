import { Building, Camera, CodeXml, Laptop, Megaphone, PencilRuler } from "lucide-react";
import type { LearningPath } from "@/types";

/** Label of the first chip, which shows every course instead of one category. */
export const FEATURED_LABEL = "Featured";

export const courseCategories = [
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
] as const;

export type CourseCategory = (typeof courseCategories)[number];

export const learningPaths: LearningPath[] = [
  { label: "Design", icon: PencilRuler },
  { label: "Development", icon: CodeXml },
  { label: "IT & Software", icon: Laptop },
  { label: "Business", icon: Building },
  { label: "Marketing", icon: Megaphone },
  { label: "Photography", icon: Camera },
];
