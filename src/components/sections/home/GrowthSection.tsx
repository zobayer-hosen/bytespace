import Image from "next/image";
import { CourseCard } from "@/components/cards/CourseCard";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { CountUp } from "@/components/motion/CountUp";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Squiggle } from "@/components/shapes/Squiggle";
import { Container } from "@/components/ui/Container";
import { Glow } from "@/components/ui/Glow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courses } from "@/data/courses";
import { growthStats, learningProgress } from "@/data/home";
import { media } from "@/data/media";

export function GrowthSection() {
  return (
    <section className="relative isolate overflow-hidden bg-mist py-20 lg:py-28">
      <Glow tone="lime" className="-top-32 -left-32 size-[520px]" />
      <Glow tone="blue" className="top-1/4 -right-48 size-[560px]" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_573px] lg:gap-10">
        <div className="max-w-[540px]">
          <SectionHeading
            align="left"
            title="Your Path to Professional Growth Starts Here!"
            description="Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need."
            descriptionClassName="mt-6 max-w-[470px]"
          />
          <Stagger as="dl" className="mt-12 flex gap-14">
            {growthStats.map((stat) => (
              <StaggerItem key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-ink/70">{stat.label}</dt>
                <dd className="font-display text-4xl leading-none font-medium text-brand">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <GrowthCollage />
      </Container>
    </section>
  );
}

function GrowthCollage() {
  return (
    <Reveal className="relative mx-auto aspect-[573/548] w-full max-w-[573px]">
      <CourseCard course={courses[0]} className="absolute top-0 left-0 w-[64%] max-sm:hidden" />
      <Image
        src={media.people.student}
        alt="Student learning online"
        width={894}
        height={1005}
        sizes="(min-width: 1024px) 450px, 78vw"
        className="absolute bottom-0 left-[19%] w-[78%]"
      />
      <Float className="absolute top-[16%] left-[78%] w-[18%]" duration={5} rotate={6}>
        <Squiggle className="h-auto w-full" />
      </Float>
      <Float className="absolute top-[38%] left-[59%] w-[41%]" duration={6} delay={0.4}>
        <ProgressCard value={learningProgress} />
      </Float>
    </Reveal>
  );
}
