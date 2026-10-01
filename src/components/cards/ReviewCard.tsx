import Image from "next/image";
import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/types";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const { name, role, avatar, rating, postedAt, text } = review;

  return (
    <article className="rounded-card border border-line p-5 sm:p-6">
      <header className="flex items-start gap-3">
        <Image src={avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="font-sans text-sm font-medium text-ink">{name}</h3>
          <p className="text-xs text-muted">{role}</p>
        </div>
        <p className="text-xs text-muted">{postedAt}</p>
      </header>
      <Stars rating={rating} className="mt-4" />
      <p className="mt-4 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}
