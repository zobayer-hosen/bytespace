import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-[15px]",
} as const;

type ChipStyleProps = {
  active?: boolean;
  size?: keyof typeof sizes;
  className?: string;
};

/**
 * Pill styling shared by filter chips and tab triggers: lime and medium weight when active, soft grey
 * otherwise. `max-w-full` lets a chip shrink to its container (wrap long labels in a `truncate` span).
 */
export function chipStyles({ active = false, size = "md", className }: ChipStyleProps = {}) {
  return cn(
    "inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full whitespace-nowrap transition-colors duration-200",
    sizes[size],
    active ? "bg-accent font-medium text-ink" : "bg-surface text-ink/75 hover:bg-line",
    className,
  );
}

type ChipProps = Omit<React.ComponentProps<"button">, "type"> & ChipStyleProps;

/** Toggleable filter pill. */
export function Chip({ active = false, size, className, ...props }: ChipProps) {
  return <button type="button" aria-pressed={active} className={chipStyles({ active, size, className })} {...props} />;
}
