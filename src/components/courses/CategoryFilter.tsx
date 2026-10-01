"use client";

import Link from "next/link";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Chip } from "@/components/ui/Chip";
import { courseCategories } from "@/data/categories";
import { cn } from "@/lib/cn";

type CategoryFilterProps = {
  /**
   * `wrap` centres the chips over several rows (one scrollable row on phones);
   * `scroll` always keeps one horizontally scrollable row.
   */
  layout?: "wrap" | "scroll";
  /** Adds a trailing "+ More" link. */
  moreHref?: string;
  className?: string;
};

/** Row of category chips; clicking a chip makes it the active one. */
export function CategoryFilter({ layout = "wrap", moreHref, className }: CategoryFilterProps) {
  const [active, setActive] = useState(courseCategories[0]);

  return (
    <div role="group" aria-label="Course categories" className={className}>
      <Stagger
        stagger={0.03}
        className={cn(
          "flex",
          "scrollbar-none gap-3 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:gap-4",
          layout === "wrap" &&
            "sm:flex-wrap sm:justify-center sm:gap-5 sm:overflow-visible sm:[mask-image:none]",
        )}
      >
        {courseCategories.map((category) => (
          <StaggerItem key={category} className="shrink-0">
            <Chip active={category === active} onClick={() => setActive(category)}>
              {category}
            </Chip>
          </StaggerItem>
        ))}
        {moreHref && (
          <StaggerItem className="shrink-0">
            <Link
              href={moreHref}
              className="inline-flex h-10 items-center px-3 text-sm font-medium text-brand hover:underline sm:h-11 sm:text-[15px]"
            >
              + More
            </Link>
          </StaggerItem>
        )}
      </Stagger>
    </div>
  );
}
