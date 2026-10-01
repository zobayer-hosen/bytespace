import { CategoryTile } from "@/components/cards/CategoryTile";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { learningPaths } from "@/data/categories";

export function LearningPaths() {
  return (
    <section className="pb-20 lg:pb-32">
      <Container>
        <SectionHeading
          size="md"
          title="Explore Diverse Learning Paths at Bytespace"
          description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        />
        <Stagger as="ul" className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {learningPaths.map((path) => (
            <StaggerItem as="li" key={path.label}>
              <CategoryTile path={path} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
