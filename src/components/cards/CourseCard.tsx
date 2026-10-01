import { ChartNoAxesColumn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Pill } from "@/components/ui/Pill";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { getCreator } from "@/data/creators";
import { media } from "@/data/media";
import { cn } from "@/lib/cn";
import type { Course } from "@/types";

type CourseCardProps = {
  course: Course;
  /**
   * `showcase` is the decorative version used in the auth collage: lime star, dark learner badge
   * and no hover lift.
   */
  variant?: "default" | "showcase";
  /** Preload the image (use for cards that render above the fold). */
  priority?: boolean;
  className?: string;
};

export function CourseCard({ course, variant = "default", priority = false, className }: CourseCardProps) {
  const creator = getCreator(course.creatorSlug);
  const showcase = variant === "showcase";

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-card border border-line bg-white p-4",
        !showcase && "transition duration-300 ease-out hover:-translate-y-1 hover:shadow-card motion-reduce:transform-none",
        className,
      )}
    >
      <div className="relative aspect-[344/200] overflow-hidden rounded-inset bg-surface">
        <Image
          src={course.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
        <div className="absolute inset-x-2.5 bottom-2.5 flex justify-between gap-1.5">
          <Pill tone="glass" size="sm">
            {course.lessons} Lessons
          </Pill>
          <Pill tone="glass" size="sm">
            {course.duration}
          </Pill>
          <Pill tone="glass" size="sm">
            {course.comments} Comments
          </Pill>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-display text-xl font-semibold text-ink">
            <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:rounded-card">
              {course.title}
            </Link>
          </h3>
          <Rating value={course.rating} tone={showcase ? "accent" : "muted"} className="text-base" />
        </div>

        {creator && (
          <p className="mt-1 text-[13px] text-brand">
            by{" "}
            <Link href={`/creators/${creator.slug}`} className="relative z-10 lowercase hover:underline">
              {creator.name}
            </Link>
          </p>
        )}

        <div className="mt-4 flex items-center gap-3">
          <Pill tone="soft">
            <ChartNoAxesColumn aria-hidden className="size-3.5" strokeWidth={2.5} />
            {course.level}
          </Pill>
          <AvatarStack
            images={media.learners.slice(0, 4)}
            count={`${course.learners}+`}
            badgeTone={showcase ? "ink" : "accent"}
          />
        </div>

        <Price amount={course.price} className="mt-4" />
      </div>
    </article>
  );
}
