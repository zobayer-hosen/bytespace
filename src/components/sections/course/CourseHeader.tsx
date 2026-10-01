import { ChartNoAxesColumn, Star, Users } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { courseDetail } from "@/data/course-detail";
import { cn } from "@/lib/cn";
import type { Creator } from "@/types";
import { ShareButton } from "./ShareButton";

type CourseHeaderProps = {
  title: string;
  creator: Creator;
  className?: string;
};

export function CourseHeader({ title, creator, className }: CourseHeaderProps) {
  const { subtitle, level, rating, reviewCount, students } = courseDetail;

  return (
    <header className={cn("flex flex-col gap-6 text-white sm:flex-row sm:justify-between", className)}>
      <Reveal onMount>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 font-display text-base font-semibold sm:text-xl">{subtitle}</p>
        <p className="mt-6 text-sm sm:text-base">
          by{" "}
          <Link href={`/creators/${creator.slug}`} className="text-accent lowercase hover:underline">
            {creator.name}
          </Link>
        </p>
        <ul className="mt-5 flex flex-wrap gap-3">
          <li>
            <Pill tone="white" size="lg">
              <ChartNoAxesColumn aria-hidden className="size-4 text-brand" strokeWidth={2.5} />
              {level}
            </Pill>
          </li>
          <li>
            <Pill tone="white" size="lg">
              <Star aria-hidden className="size-4 fill-brand text-brand" />
              {rating} ({reviewCount} reviews)
            </Pill>
          </li>
          <li>
            <Pill tone="white" size="lg">
              <Users aria-hidden className="size-4 text-brand" />
              {students} Students
            </Pill>
          </li>
        </ul>
      </Reveal>
      <ShareButton title={title} />
    </header>
  );
}
