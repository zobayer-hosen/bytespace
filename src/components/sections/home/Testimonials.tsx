import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Glow } from "@/components/ui/Glow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/home";

export function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-mist py-20 lg:pt-28 lg:pb-16">
      <Glow tone="lime" className="top-0 left-[40%] size-[620px]" />
      <Glow tone="blue" className="top-1/3 -left-56 size-[520px]" />

      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            align="left"
            title={
              <>
                Discover What Our
                <br />
                Community Is Saying
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="text-sm leading-relaxed text-ink/70 sm:text-[15px]">
              At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly
              from those who have experienced the transformative journey of learning and creating on our platform.
              Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished
              creators.
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16 lg:gap-10">
          {testimonials.map((testimonial) => (
            <StaggerItem as="li" key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
