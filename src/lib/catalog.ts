import { courses } from "@/data/courses";
import { getCreator } from "@/data/creators";
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
  page?: number;
};

export function searchCatalog({ query = "", scope = "courses", page = 1 }: CatalogQuery) {
  const term = query.trim().toLowerCase();
  const matches = term ? catalog.filter((course) => searchableText(course, scope).includes(term)) : catalog;

  const totalPages = Math.max(1, Math.ceil(matches.length / CATALOG_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * CATALOG_PAGE_SIZE;

  return {
    results: matches.slice(start, start + CATALOG_PAGE_SIZE),
    currentPage,
    totalPages,
  };
}
