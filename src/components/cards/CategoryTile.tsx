import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import type { LearningPath } from "@/types";

type CategoryTileProps = {
  path: LearningPath;
};

/** Learning-path tile: lime icon over a label, linking to the course catalogue. */
export function CategoryTile({ path }: CategoryTileProps) {
  return (
    <Link
      href="/courses"
      className="flex aspect-square flex-col items-center justify-center gap-4 rounded-card border border-line bg-white p-4 text-center transition duration-300 ease-out hover:-translate-y-1 hover:shadow-card motion-reduce:transform-none"
    >
      <IconBadge icon={path.icon} />
      <span className="text-sm text-ink sm:text-[15px]">{path.label}</span>
    </Link>
  );
}
