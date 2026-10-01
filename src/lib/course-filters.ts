import { courseCategories, type CourseCategory } from "@/data/categories";
import type { Course, CourseLevel } from "@/types";

export const COURSE_LEVELS: readonly CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];

/**
 * Sort orders backed by real course fields. There is no publish date in the data,
 * so a "Newest" order is not offered.
 */
export const SORT_OPTIONS = [
  { value: "relevant", label: "Most relevant" },
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "title", label: "Title (A–Z)" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export type CourseFilters = {
  /** `null` is the "Featured" view: every category. */
  category: CourseCategory | null;
  level: CourseLevel | null;
  sort: SortOption;
};

export const DEFAULT_COURSE_FILTERS: CourseFilters = { category: null, level: null, sort: "relevant" };

const comparators: Record<SortOption, ((a: Course, b: Course) => number) | null> = {
  relevant: null,
  popular: (a, b) => b.learners - a.learners,
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
};

export function isInCategory(course: Course, category: CourseCategory) {
  return course.categories.includes(category);
}

/** Courses for a landing-page chip: Featured (`null`) lists the featured courses, any other chip its category. */
export function coursesForChip(courses: readonly Course[], category: CourseCategory | null) {
  return courses.filter((course) => (category ? isInCategory(course, category) : course.featured));
}

/** Keeps the courses matching the category and level, then sorts them (ties keep catalogue order). */
export function applyCourseFilters(courses: readonly Course[], filters: CourseFilters) {
  const matches = courses.filter(
    (course) =>
      (!filters.category || isInCategory(course, filters.category)) &&
      (!filters.level || course.level === filters.level),
  );
  const compare = comparators[filters.sort];
  return compare ? matches.sort(compare) : matches;
}

export function countActiveFilters(filters: CourseFilters) {
  return Number(filters.category !== null) + Number(filters.level !== null);
}

/** Removes the category and level filters but keeps the sort order. */
export function clearCourseFilters(filters: CourseFilters): CourseFilters {
  return { ...filters, category: null, level: null };
}

export type CourseFacets = {
  levels: Record<CourseLevel | "all", number>;
  categories: Record<CourseCategory | "all", number>;
};

/**
 * Result counts for every level and category option, each counted with the *other* filter applied,
 * so a dropdown shows how many courses picking that option would return.
 */
export function countFacets(courses: readonly Course[], filters: CourseFilters): CourseFacets {
  const inCategory = courses.filter((course) => !filters.category || isInCategory(course, filters.category));
  const atLevel = courses.filter((course) => !filters.level || course.level === filters.level);
  const count = (list: readonly Course[], match: (course: Course) => boolean) => list.filter(match).length;

  return {
    levels: {
      all: inCategory.length,
      ...(Object.fromEntries(
        COURSE_LEVELS.map((level) => [level, count(inCategory, (course) => course.level === level)]),
      ) as Record<CourseLevel, number>),
    },
    categories: {
      all: atLevel.length,
      ...(Object.fromEntries(
        courseCategories.map((category) => [category, count(atLevel, (course) => isInCategory(course, category))]),
      ) as Record<CourseCategory, number>),
    },
  };
}

// --- URL state -----------------------------------------------------------------------------------

const PARAM = { category: "category", level: "level", sort: "sort" } as const;

/** "UI/UX Design" → "ui-ux-design", "Drawing & Painting" → "drawing-painting". */
export function categorySlug(category: CourseCategory) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type FilterParamValues = {
  category?: string | null;
  level?: string | null;
  sort?: string | null;
};

/** Reads filters from URL values; unknown values fall back to the defaults. */
export function parseCourseFilters({ category, level, sort }: FilterParamValues): CourseFilters {
  return {
    category: courseCategories.find((option) => categorySlug(option) === category) ?? null,
    level: COURSE_LEVELS.find((option) => option.toLowerCase() === level) ?? null,
    sort: SORT_OPTIONS.find((option) => option.value === sort)?.value ?? DEFAULT_COURSE_FILTERS.sort,
  };
}

/** URL entries for the filters that differ from the defaults. */
export function filterSearchParams(filters: CourseFilters) {
  const params = new URLSearchParams();
  if (filters.category) params.set(PARAM.category, categorySlug(filters.category));
  if (filters.level) params.set(PARAM.level, filters.level.toLowerCase());
  if (filters.sort !== DEFAULT_COURSE_FILTERS.sort) params.set(PARAM.sort, filters.sort);
  return params;
}

/** Copies `params`, replacing its filter entries with `filters` and keeping everything else (e.g. `q`). */
export function withCourseFilters(params: URLSearchParams, filters: CourseFilters) {
  const next = new URLSearchParams(params);
  Object.values(PARAM).forEach((name) => next.delete(name));
  filterSearchParams(filters).forEach((value, name) => next.set(name, value));
  return next;
}
