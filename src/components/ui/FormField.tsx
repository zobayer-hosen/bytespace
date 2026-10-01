import { useId } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

/** Labelled text input with an inline error message. */
export function FormField({ label, error, className, ...props }: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink transition-colors placeholder:text-muted/70",
          "focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10",
          error ? "border-red-500" : "border-line",
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
