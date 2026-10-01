import { Video } from "lucide-react";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { courseDetail } from "@/data/course-detail";
import { PanelSection } from "./PanelSection";

export function LessonsPanel() {
  const { modulesIntro, modules, lessonContent, progressIntro, progress } = courseDetail;

  return (
    <div className="space-y-10">
      <PanelSection title="Explore the Modules">
        <p>{modulesIntro}</p>
      </PanelSection>

      <PanelSection title="Lesson List">
        <ol className="space-y-5">
          {modules.map((module) => (
            <li key={module.title} className="flex gap-4">
              <IconBadge icon={Video} shape="square" />
              <div>
                <h3 className="font-sans text-[15px] font-medium text-ink">{module.title}</h3>
                <p className="mt-1 text-sm leading-relaxed">{module.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </PanelSection>

      <PanelSection title="Lesson Content">
        <p>{lessonContent}</p>
      </PanelSection>

      <PanelSection title="Lesson Progress Tracking">
        <p>{progressIntro}</p>
        <ProgressCard value={progress} className="mt-6 max-w-[500px] border border-line shadow-none" />
      </PanelSection>
    </div>
  );
}
