import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CreateManage } from "@/components/sections/home/CreateManage";
import { CreatorCta } from "@/components/sections/home/CreatorCta";
import { BrandSection } from "@/components/ui/BrandSection";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Creators",
};

export default function CreatorsPage() {
  return (
    <>
      <BrandSection aria-labelledby="creators-title" className="pt-32 pb-14 lg:pt-[160px] lg:pb-[72px]">
        <Container className="text-center">
          <Reveal onMount>
            <h1 id="creators-title" className="text-[28px] font-semibold tracking-tight sm:text-[32px]">
              Creators
            </h1>
          </Reveal>
        </Container>
      </BrandSection>
      <CreateManage />
      <CreatorCta />
    </>
  );
}
