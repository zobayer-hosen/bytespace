import Image from "next/image";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, role, quote, avatar } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-card bg-white p-6 shadow-[0_12px_40px_-24px_rgb(16_18_35/0.25)] sm:p-7">
      <Image src={avatar} alt="" width={80} height={80} className="size-20 rounded-full object-cover" />
      <figcaption className="mt-6">
        <p className="font-display text-lg font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-[15px] text-brand">{role}</p>
      </figcaption>
      <blockquote className="mt-6 text-[15px] leading-[1.75] text-ink/75 sm:text-base">“{quote}”</blockquote>
    </figure>
  );
}
