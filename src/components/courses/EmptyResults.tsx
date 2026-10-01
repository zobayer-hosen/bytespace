import Link from "next/link";
import { cn } from "@/lib/cn";

type EmptyResultsAction = { label: string; href: string } | { label: string; onClick: () => void };

type EmptyResultsProps = {
  title: string;
  description?: string;
  action: EmptyResultsAction;
  className?: string;
};

const actionClass = "mt-6 inline-block text-sm font-medium text-brand hover:underline";

/** Dashed box shown when a search or filter returns no courses. */
export function EmptyResults({ title, description, action, className }: EmptyResultsProps) {
  return (
    <div className={cn("rounded-card border border-dashed border-line px-6 py-16 text-center", className)}>
      <p className="font-display text-xl font-semibold text-ink">{title}</p>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      {"href" in action ? (
        <Link href={action.href} className={actionClass}>
          {action.label}
        </Link>
      ) : (
        <button type="button" onClick={action.onClick} className={actionClass}>
          {action.label}
        </button>
      )}
    </div>
  );
}
