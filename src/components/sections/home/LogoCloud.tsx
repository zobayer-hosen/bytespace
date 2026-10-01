import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { partners } from "@/data/home";

export function LogoCloud() {
  return (
    <section aria-label="Our partners" className="bg-surface py-14 lg:py-[72px]">
      <Container>
        <Stagger as="ul" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 lg:justify-between lg:px-8">
          {partners.map(({ name, icon: Icon }, index) => (
            <StaggerItem as="li" key={`${name}-${index}`} className="flex items-center gap-2 text-ink/45">
              <Icon aria-hidden className="size-6 sm:size-8" strokeWidth={1.75} />
              <span className="font-display text-base font-semibold sm:text-xl">{name}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
