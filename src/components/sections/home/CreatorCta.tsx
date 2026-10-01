import { Reveal } from "@/components/motion/Reveal";
import { Cone } from "@/components/shapes/Cone";
import { Cylinder } from "@/components/shapes/Cylinder";
import { Decorations, type DecorationSpec } from "@/components/shapes/Decorations";
import { Squiggle } from "@/components/shapes/Squiggle";
import { Torus } from "@/components/shapes/Torus";
import { BrandSection } from "@/components/ui/BrandSection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const shapes: DecorationSpec[] = [
  { shape: Squiggle, tone: "lime", className: "-top-6 -left-8 w-24 rotate-[-20deg] lg:-left-4 lg:w-[150px]", duration: 6 },
  { shape: Squiggle, tone: "white", className: "top-8 left-[15%] hidden w-[100px] rotate-[-10deg] lg:block", duration: 5, delay: 0.4 },
  { shape: Cone, tone: "white", className: "top-[240px] -left-6 hidden w-[130px] rotate-[-30deg] lg:block", duration: 5.5, delay: 0.8 },
  { shape: Torus, tone: "lime", className: "-bottom-20 left-[5%] hidden w-[230px] lg:block", duration: 7, rotate: 6 },
  { shape: Cone, tone: "lime", className: "top-6 right-[16%] hidden w-[120px] rotate-[18deg] lg:block", duration: 5, delay: 0.2 },
  { shape: Cylinder, tone: "white", className: "top-10 -right-10 hidden w-28 rotate-[25deg] sm:block lg:w-[190px]", duration: 6.5, delay: 0.6 },
  { shape: Squiggle, tone: "lime", className: "-bottom-8 right-[6%] hidden w-[180px] rotate-[70deg] lg:block", duration: 6, delay: 1 },
];

export function CreatorCta() {
  return (
    <BrandSection aria-labelledby="creator-cta-title" className="py-24 lg:py-[92px]">
      <Decorations items={shapes} />
      <Container className="relative text-center">
        <SectionHeading
          id="creator-cta-title"
          tone="light"
          title={
            <>
              Unlock Your Potential as a<br className="hidden sm:block" /> Creator with ByteSpace
            </>
          }
          description="Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a part of a community comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course Library."
          descriptionClassName="mt-6 max-w-[880px] lg:mt-8"
        />
        <Reveal delay={0.2}>
          <ButtonLink href="/signup" className="mt-10">
            Join as Creator
          </ButtonLink>
        </Reveal>
      </Container>
    </BrandSection>
  );
}
