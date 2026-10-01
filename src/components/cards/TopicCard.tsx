import { cn } from "@/lib/cn";

type TopicCardProps = {
  title: string;
  meta: readonly string[];
  className?: string;
};

/** Small floating card naming a topic and its numbers ("UI/UX Design · 200 Courses · 1000+ Students"). */
export function TopicCard({ title, meta, className }: TopicCardProps) {
  return (
    <div className={cn("rounded-2xl bg-white px-4 py-3 shadow-float", className)}>
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="mt-1 flex items-center gap-2 text-[11px] text-muted">
        {meta.map((item, index) => (
          <span key={item} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden className="size-1 rounded-full bg-muted/60" />}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
