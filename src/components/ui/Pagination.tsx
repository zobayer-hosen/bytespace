import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
  className?: string;
};

const arrowClass =
  "grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/30";

export function Pagination({ currentPage, totalPages, hrefForPage, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-3", className)}>
      <PageArrow href={hasPrevious ? hrefForPage(currentPage - 1) : undefined} label="Previous page">
        <ChevronLeft aria-hidden className="size-4" />
      </PageArrow>

      <ol className="flex items-center gap-1">
        {pages.map((page) => {
          const current = page === currentPage;
          return (
            <li key={page}>
              <Link
                href={hrefForPage(page)}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "grid size-8 place-items-center rounded-full text-sm font-semibold transition-colors",
                  current ? "text-muted/70" : "text-ink hover:bg-surface",
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ol>

      <PageArrow href={hasNext ? hrefForPage(currentPage + 1) : undefined} label="Next page">
        <ChevronRight aria-hidden className="size-4" />
      </PageArrow>
    </nav>
  );
}

type PageArrowProps = {
  href?: string;
  label: string;
  children: React.ReactNode;
};

function PageArrow({ href, label, children }: PageArrowProps) {
  if (!href) {
    return (
      <span aria-hidden className={cn(arrowClass, "opacity-40")}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={arrowClass}>
      {children}
    </Link>
  );
}
