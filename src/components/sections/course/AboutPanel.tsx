import Image from "next/image";
import { CheckList } from "@/components/ui/CheckList";
import { courseDetail } from "@/data/course-detail";
import { PanelSection } from "./PanelSection";

export function AboutPanel() {
  const { description, sneakPeek, keyPoints } = courseDetail;

  return (
    <div className="space-y-10">
      <PanelSection title="Description">
        <div className="space-y-5">
          {description.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Sneak Peak">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {sneakPeek.map((src, index) => (
            <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={src}
                alt={`Course sneak peek ${index + 1}`}
                fill
                sizes="(min-width: 640px) 180px, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </PanelSection>

      <PanelSection title="Key Points">
        <CheckList items={keyPoints} />
      </PanelSection>
    </div>
  );
}
