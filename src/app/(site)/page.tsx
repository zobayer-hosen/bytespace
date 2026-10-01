import { CreateManage } from "@/components/sections/home/CreateManage";
import { CreatorCta } from "@/components/sections/home/CreatorCta";
import { DiscoverCourses } from "@/components/sections/home/DiscoverCourses";
import { GrowthSection } from "@/components/sections/home/GrowthSection";
import { Hero } from "@/components/sections/home/Hero";
import { LearningPaths } from "@/components/sections/home/LearningPaths";
import { LogoCloud } from "@/components/sections/home/LogoCloud";
import { Testimonials } from "@/components/sections/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <DiscoverCourses />
      <LearningPaths />
      <GrowthSection />
      <CreateManage />
      <CreatorCta />
      <Testimonials />
    </>
  );
}
