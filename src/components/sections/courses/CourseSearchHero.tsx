import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BrandSection } from "@/components/ui/BrandSection";
import { Container } from "@/components/ui/Container";
import { SearchField } from "@/components/ui/SearchField";
import { SEARCH_SCOPES, type SearchScope } from "@/lib/catalog";

type CourseSearchHeroProps = {
  query: string;
  scope: SearchScope;
};

/** Blue search header. Submitting the form reloads /courses with `?q=&in=` (works without JavaScript). */
export function CourseSearchHero({ query, scope }: CourseSearchHeroProps) {
  return (
    <BrandSection aria-labelledby="search-title" className="pt-32 pb-14 lg:pt-[160px] lg:pb-[72px]">
      <Container className="text-center">
        <Reveal onMount>
          <h1 id="search-title" className="text-[28px] font-semibold tracking-tight sm:text-[32px]">
            Find Your Next Course
          </h1>
        </Reveal>
        <Reveal onMount delay={0.1}>
          <form action="/courses" role="search" className="mx-auto mt-6 flex max-w-[620px] gap-3">
            <SearchField
              name="q"
              defaultValue={query}
              label="Search"
              placeholder="Search"
              className="h-[52px] flex-1"
            />
            <label className="relative">
              <span className="sr-only">Search in</span>
              <select
                name="in"
                defaultValue={scope}
                className="h-[52px] cursor-pointer appearance-none rounded-full bg-accent pr-11 pl-6 text-sm font-medium text-ink transition-colors hover:bg-accent-600"
              >
                {SEARCH_SCOPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2" />
            </label>
          </form>
        </Reveal>
      </Container>
    </BrandSection>
  );
}
