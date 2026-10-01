import Image from "next/image";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { TopicCard } from "@/components/cards/TopicCard";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { Cone } from "@/components/shapes/Cone";
import { Cylinder } from "@/components/shapes/Cylinder";
import { Decorations, type DecorationSpec } from "@/components/shapes/Decorations";
import { Squiggle } from "@/components/shapes/Squiggle";
import { Torus } from "@/components/shapes/Torus";
import { BrandSection } from "@/components/ui/BrandSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SearchField } from "@/components/ui/SearchField";
import { highlightTopic, learningProgress } from "@/data/home";
import { media } from "@/data/media";

const shapes: DecorationSpec[] = [
  { shape: Squiggle, tone: "lime", className: "-left-8 top-[470px] w-20 -rotate-12 sm:top-[380px] sm:w-28 lg:-left-6 lg:top-[270px] lg:w-[190px]", duration: 6 },
  { shape: Cylinder, tone: "lime", className: "-right-8 top-[440px] w-20 rotate-[28deg] sm:top-[360px] sm:w-28 lg:-right-10 lg:top-[250px] lg:w-[190px]", duration: 7, delay: 0.6 },
  { shape: Squiggle, tone: "white", className: "left-[14%] top-[505px] hidden w-[90px] -rotate-[70deg] lg:block", duration: 4.5, delay: 0.3 },
  { shape: Cone, tone: "white", className: "left-[78%] top-[470px] hidden w-[130px] -rotate-[24deg] lg:block", duration: 5, delay: 1 },
  { shape: Torus, tone: "white", className: "left-[4%] top-[740px] hidden w-[170px] lg:block", duration: 6.5, rotate: 8 },
  { shape: Squiggle, tone: "white", className: "left-[87%] top-[700px] hidden w-[110px] rotate-[8deg] lg:block", duration: 5.5, delay: 0.8 },
];

export function Hero() {
  return (
    <BrandSection id="top" aria-labelledby="hero-title" className="pt-36 lg:pt-[184px]">
      <Decorations items={shapes} />

      <Container className="relative text-center">
        <Reveal onMount>
          <h1
            id="hero-title"
            className="mx-auto max-w-[960px] text-[40px] leading-[1.15] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Get Access to Hundreds Courses Available
          </h1>
        </Reveal>
        <Reveal onMount delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light text-white/90 sm:text-base lg:mt-10 lg:max-w-none lg:text-[17px]">
            Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
          </p>
        </Reveal>
        <Reveal onMount delay={0.3}>
          <form action="/courses" role="search" className="mx-auto mt-10 flex max-w-[580px] gap-3 sm:gap-4 lg:mt-14">
            <SearchField name="q" label="Search courses" placeholder="Course, topic, creator" className="h-12 flex-1 lg:h-[52px]" />
            <Button type="submit" size="lg" className="px-6 lg:h-[52px]">
              Search
            </Button>
          </form>
        </Reveal>
      </Container>

      <HeroStage />
    </BrandSection>
  );
}

/** Lime half-circle stage with the student cut-out and the floating stat cards. */
function HeroStage() {
  return (
    <Reveal onMount delay={0.45} className="relative mx-auto mt-16 aspect-[1110/452] w-full max-w-[1110px] lg:mt-20">
      <div aria-hidden className="absolute top-0 left-0 aspect-square w-full rounded-full bg-accent" />

      {/* The student's face sits at ~41% of the image width, so `left = 50% - 0.41 × width` centres her. */}
      <Image
        src={media.people.heroStudent}
        alt="Student working on a laptop, surrounded by books"
        width={2200}
        height={1401}
        priority
        quality={90}
        sizes="(min-width: 1110px) 733px, 78vw"
        className="absolute bottom-0 left-[17.7%] w-[78%] sm:left-[22.7%] sm:w-[66%]"
      />

      <Float className="absolute top-[14%] left-[21%] hidden lg:block" duration={5}>
        <TopicCard title={highlightTopic.title} meta={[highlightTopic.courses, highlightTopic.students]} />
      </Float>
      <Float className="absolute top-[14%] left-[63%] hidden w-[230px] lg:block" duration={6} delay={0.4}>
        <ProgressCard value={learningProgress} />
      </Float>
      <Float className="absolute top-[38%] left-[8%] hidden lg:block" duration={5.5} delay={0.8}>
        <HappyStudentsCard />
      </Float>
    </Reveal>
  );
}
