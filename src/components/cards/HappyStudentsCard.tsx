import { AvatarStack } from "@/components/ui/AvatarStack";
import { Rating } from "@/components/ui/Rating";
import { happyStudents } from "@/data/home";
import { media } from "@/data/media";
import { cn } from "@/lib/cn";

type HappyStudentsCardProps = {
  tone?: "white" | "lime";
  className?: string;
};

/** Social-proof card: rating plus a stack of learner avatars. */
export function HappyStudentsCard({ tone = "white", className }: HappyStudentsCardProps) {
  const lime = tone === "lime";

  return (
    <div className={cn("rounded-2xl p-4 shadow-float", lime ? "bg-accent" : "bg-white", className)}>
      <p className="text-sm font-medium text-ink">Happy Students</p>
      <Rating
        value={happyStudents.rating}
        reviews={happyStudents.reviews}
        tone={lime ? "brand" : "accent"}
        className={cn("text-xs", lime && "text-ink/70")}
      />
      <AvatarStack
        images={media.learners.slice(0, 7)}
        count={happyStudents.total}
        size="md"
        badgeTone={lime ? "ink" : "accent"}
        ringClassName={lime ? "ring-accent" : "ring-white"}
        className="mt-3"
      />
    </div>
  );
}
