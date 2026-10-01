import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { Logo } from "@/components/layout/Logo";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Cone } from "@/components/shapes/Cone";
import { Squiggle } from "@/components/shapes/Squiggle";
import { Torus } from "@/components/shapes/Torus";
import { getCourse } from "@/data/courses";

type AuthShowcaseProps = {
  title: string;
  description: string;
};

/** Left column of the auth pages: logo, pitch and a decorative card collage (desktop only). */
export function AuthShowcase({ title, description }: AuthShowcaseProps) {
  return (
    <div className="hidden text-white lg:block">
      <Reveal onMount>
        <Logo markOnly />
        <h2 className="mt-10 text-xl font-semibold">{title}</h2>
        <p className="mt-4 max-w-[470px] leading-relaxed text-white/85">{description}</p>
      </Reveal>
      <AuthCollage />
    </div>
  );
}

function AuthCollage() {
  const backCourse = getCourse("build-digital-asset");
  const frontCourse = getCourse("the-power-of-big-data");

  return (
    <div aria-hidden inert>
      <Stagger delay={0.3} stagger={0.12} className="relative mt-12 aspect-[475/540] w-full max-w-[475px]">
        {backCourse && (
          <StaggerItem variant="dropIn" className="absolute top-[16%] left-0 w-[77%]">
            <CourseCard course={backCourse} variant="showcase" priority />
          </StaggerItem>
        )}
        {frontCourse && (
          <StaggerItem variant="dropIn" className="absolute top-0 left-[22.5%] w-[77%]">
            <CourseCard course={frontCourse} variant="showcase" priority />
          </StaggerItem>
        )}
        <StaggerItem variant="dropIn" className="absolute top-[3%] left-[9%] w-[23%]">
          <Float duration={5} rotate={10}>
            <Torus className="h-auto w-full" />
          </Float>
        </StaggerItem>
        <StaggerItem variant="dropIn" className="absolute top-[78%] left-[46%] w-[54%]">
          <Float duration={6} delay={0.3} distance={8}>
            <HappyStudentsCard tone="lime" />
          </Float>
        </StaggerItem>
        <StaggerItem variant="dropIn" className="absolute top-[60%] left-[78%] w-[22%]">
          <Float duration={4.5} delay={0.5}>
            <Squiggle tone="white" className="h-auto w-full -rotate-[70deg]" />
          </Float>
        </StaggerItem>
        <StaggerItem variant="dropIn" className="absolute top-[70%] -left-[3%] w-[26%]">
          <Float duration={5.5} delay={0.8}>
            <Cone className="h-auto w-full -rotate-[25deg]" />
          </Float>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
