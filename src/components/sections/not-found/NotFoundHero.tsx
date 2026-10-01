import { Reveal } from "@/components/motion/Reveal";
import { BrandSection } from "@/components/ui/BrandSection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function NotFoundHero() {
  return (
    <BrandSection aria-labelledby="not-found-title" className="pt-36 pb-20 lg:pt-[200px] lg:pb-[136px]">
      <Container className="text-center">
        <Reveal onMount>
          <p
            aria-hidden
            className="bg-gradient-to-b from-accent from-30% to-accent/15 bg-clip-text font-display text-[160px] leading-[0.8] font-semibold tracking-[0.04em] text-transparent sm:text-[280px] lg:text-[440px]"
          >
            404
          </p>
        </Reveal>
        <Reveal onMount delay={0.15}>
          <h1
            id="not-found-title"
            className="relative mx-auto -mt-2 max-w-[960px] text-[32px] leading-[1.15] font-semibold tracking-tight sm:-mt-8 sm:text-6xl lg:-mt-12 lg:text-7xl"
          >
            The page you are looking for doesn’t exist
          </h1>
        </Reveal>
        <Reveal onMount delay={0.3}>
          <p className="mt-10 text-sm text-white/85 sm:text-base">
            Try to use a correct url or go back to homepage to start again
          </p>
          <ButtonLink href="/" className="mt-8">
            Back to Home
          </ButtonLink>
        </Reveal>
      </Container>
    </BrandSection>
  );
}
