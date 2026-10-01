import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { BrandSection } from "@/components/ui/BrandSection";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import type { Creator } from "@/types";
import { FollowButton } from "./FollowButton";

export function CreatorHeader({ creator }: { creator: Creator }) {
  return (
    <BrandSection aria-labelledby="creator-name" className="pt-32 pb-12 lg:pt-[184px] lg:pb-20">
      <Container>
        <Reveal onMount>
          <div className="flex items-center gap-5">
            <Image
              src={creator.avatar}
              alt=""
              width={104}
              height={104}
              priority
              className="size-20 rounded-2xl object-cover sm:size-[104px]"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 id="creator-name" className="text-2xl font-semibold sm:text-4xl">
                  {creator.name}
                </h1>
                <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-ink">Creator</span>
              </div>
              <p className="mt-1.5 text-sm text-white/80 sm:text-base">{creator.tagline}</p>
            </div>
          </div>
        </Reveal>

        <Reveal onMount delay={0.1}>
          <div className="mt-10 space-y-1 text-sm leading-relaxed text-white/90 sm:text-base">
            {creator.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal onMount delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex gap-3">
              <li>
                <Pill tone="white" size="lg">
                  <strong className="font-medium text-brand">{creator.products}</strong> Products
                </Pill>
              </li>
              <li>
                <Pill tone="white" size="lg">
                  <strong className="font-medium text-brand">{creator.followers}</strong> Followers
                </Pill>
              </li>
            </ul>
            <FollowButton />
          </div>
        </Reveal>
      </Container>
    </BrandSection>
  );
}
