import { Play } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { media } from "@/data/media";

/** Poster frame of the course trailer. */
export function CoursePreview({ title }: { title: string }) {
  return (
    <Reveal onMount delay={0.15}>
      <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-white/10">
        <Image
          src={media.coursePreview}
          alt={`Preview of ${title}`}
          fill
          priority
          sizes="(min-width: 1024px) 744px, 100vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-ink/40 text-white backdrop-blur-md sm:size-[72px]"
        >
          <Play className="size-7 translate-x-0.5 fill-white" />
        </span>
      </figure>
    </Reveal>
  );
}
