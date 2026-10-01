import { courses } from "@/data/courses";
import { getCreator } from "@/data/creators";
import {
  applyCourseFilters,
  countFacets,
  DEFAULT_COURSE_FILTERS,
  filterSearchParams,
  type CourseFilters,
} from "@/lib/course-filters";
import type { Course } from "@/types";

export const CATALOG_PAGE_SIZE = 18;
const CATALOG_PAGES = 5;

export const SEARCH_SCOPES = [
  { value: "courses", label: "Courses" },
  { value: "creators", label: "Creators" },
] as const;

export type SearchScope = (typeof SEARCH_SCOPES)[number]["value"];

export function parseScope(value: string | undefined): SearchScope {
  return SEARCH_SCOPES.some((scope) => scope.value === value) ? (value as SearchScope) : "courses";
}

/**
 * Demo catalogue for the search page: the six designed courses repeated to fill five result
 * pages, as in the Figma "Search Page" frame. Replace with an API query when one exists.
 */
const catalog = Array.from(
  { length: CATALOG_PAGE_SIZE * CATALOG_PAGES },
  (_, index) => courses[index % courses.length],
);

function searchableText(course: Course, scope: SearchScope) {
  const text = scope === "creators" ? getCreator(course.creatorSlug)?.name ?? "" : course.title;
  return text.toLowerCase();
}

type CatalogQuery = {
  query?: string;
  scope?: SearchScope;
  filters?: CourseFilters;
  page?: number;
};

/** Search, then filter and sort, then paginate. Facet counts cover the search matches. */
export function searchCatalog({ query = "", scope = "courses", filters = DEFAULT_COURSE_FILTERS, page = 1 }: CatalogQuery) {
  const term = query.trim().toLowerCase();
  const matches = term ? catalog.filter((course) => searchableText(course, scope).includes(term)) : catalog;
  const filtered = applyCourseFilters(matches, filters);

  const totalPages = Math.max(1, Math.ceil(filtered.length / CATALOG_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * CATALOG_PAGE_SIZE;

  return {
    results: filtered.slice(start, start + CATALOG_PAGE_SIZE),
    total: filtered.length,
    facets: countFacets(matches, filters),
    currentPage,
    totalPages,
  };
}

/** Link to the search page; default values are left out of the URL. */
export function catalogHref({ query = "", scope = "courses", filters = DEFAULT_COURSE_FILTERS, page = 1 }: CatalogQuery) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (scope !== "courses") params.set("in", scope);
  filterSearchParams(filters).forEach((value, name) => params.set(name, value));
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/courses?${search}` : "/courses";
}
