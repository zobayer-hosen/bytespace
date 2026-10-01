import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { courseDetail } from "@/data/course-detail";
import type { Course, Creator } from "@/types";

type EnrollCardProps = {
  course: Course;
  creator: Creator;
};

/** Sticky sidebar: lesson preview, price, enrol CTA, inclusions and the creator. */
export function EnrollCard({ course, creator }: EnrollCardProps) {
  const { totalLessons, totalHours, lessonPreview, moreVideos, enrollPitch, features } = courseDetail;

  return (
    <Reveal onMount delay={0.25}>
      <div className="rounded-panel bg-white p-6 shadow-[0_24px_60px_-30px_rgb(16_18_35/0.35)] ring-1 ring-line sm:p-8 lg:p-10">
        <h2 className="text-xl font-semibold text-ink">
          {totalLessons} Lessons ({totalHours} hours)
        </h2>
        <ol className="mt-4 space-y-3">
          {lessonPreview.map((lesson, index) => (
            <li key={lesson.title} className="flex gap-3 text-sm text-ink/85">
              <span className="w-5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1">{lesson.title}</span>
              <span className="shrink-0 text-brand">{lesson.duration}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted">{moreVideos} more videos</p>

        <p className="mt-6 text-sm leading-relaxed text-muted">{enrollPitch}</p>
        <Price amount={course.price} size="lg" className="mt-5" />
        <ButtonLink href="/signup" size="lg" className="mt-5 w-full">
          Enroll Now
        </ButtonLink>

        <h2 className="mt-7 text-xl font-semibold text-ink">This course include</h2>
        <ul className="mt-4 space-y-3">
          {features.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-ink/75">
              <Icon aria-hidden className="size-[18px] text-brand" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-line pt-7">
          <div className="flex items-center gap-3">
            <Image src={creator.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
            <div>
              <p className="font-medium text-ink">{creator.name}</p>
              <p className="text-xs text-muted">{creator.role}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">{enrollPitch}</p>
          <ButtonLink href={`/creators/${creator.slug}`} variant="outline" size="sm" className="mt-5">
            See Full Profile
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
