import Image from "next/image";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { RevenueCard } from "@/components/cards/RevenueCard";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { Squiggle } from "@/components/shapes/Squiggle";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { Glow } from "@/components/ui/Glow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { creatorBenefits, revenue } from "@/data/home";
import { media } from "@/data/media";

export function CreateManage() {
  return (
    <section id="creators" className="relative isolate overflow-hidden bg-mist pt-4 pb-20 lg:pb-28">
      <Glow tone="lime" className="-bottom-40 -left-40 size-[520px]" />
      <Glow tone="blue" className="-right-40 -bottom-48 size-[560px]" />

      <Container className="grid items-center gap-14 lg:grid-cols-[540px_1fr] lg:gap-24">
        <div className="lg:order-last">
          <SectionHeading
            align="left"
            title={
              <>
                Create & Manage
                <br />
                Courses Easily.
              </>
            }
            description={
              <>
                <strong className="font-semibold text-ink">ByteSpace</strong> supports individuals or entities in the
                creation, publication, and administration of educational courses.
              </>
            }
            descriptionClassName="mt-6 max-w-[460px]"
          />
          <Reveal delay={0.15}>
            <CheckList items={creatorBenefits} className="mt-8" />
          </Reveal>
        </div>

        <CreatorCollage />
      </Container>
    </section>
  );
}

function CreatorCollage() {
  return (
    <Reveal className="relative mx-auto aspect-[540/580] w-full max-w-[540px]">
      <Image
        src={media.people.creator}
        alt="Course creator holding a tablet"
        width={867}
        height={1200}
        sizes="(min-width: 1024px) 380px, 70vw"
        className="absolute bottom-0 left-[15%] w-[69%]"
      />
      <Float className="absolute top-[4%] left-0 w-[41%]" duration={6}>
        <RevenueCard {...revenue.total} />
      </Float>
      <Float className="absolute top-[30%] left-0 w-[32%] max-sm:hidden" duration={5.5} delay={0.6}>
        <RevenueCard {...revenue.yearToDate} />
      </Float>
      <Float className="absolute top-[20%] left-[60%] w-[28%]" duration={5} rotate={-6} delay={0.3}>
        <Squiggle className="h-auto w-full" />
      </Float>
      <Float className="absolute top-[67%] left-[53%] w-[47%] max-sm:hidden" duration={6.5} delay={0.9}>
        <HappyStudentsCard />
      </Float>
    </Reveal>
  );
}
