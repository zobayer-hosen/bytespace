import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

type SearchFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  label: string;
};

/** White pill search input with a leading magnifier icon. */
export function SearchField({ label, className, ...props }: SearchFieldProps) {
  return (
    <label className={cn("relative flex h-11 items-center rounded-full bg-white", className)}>
      <span className="sr-only">{label}</span>
      <Search aria-hidden className="pointer-events-none absolute left-4 size-4 text-muted" />
      <input
        type="search"
        className="size-full rounded-full bg-transparent pr-5 pl-11 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
        {...props}
      />
    </label>
  );
}
