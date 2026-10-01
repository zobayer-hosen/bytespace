import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckListProps = {
  items: readonly string[];
  className?: string;
};

/** List with filled blue check-circle bullets. */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-[15px] text-ink/85">
          <CircleCheck aria-hidden className="size-5 shrink-0 fill-brand text-white" strokeWidth={2} />
          {item}
        </li>
      ))}
    </ul>
  );
}
