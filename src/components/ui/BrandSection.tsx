import { cn } from "@/lib/cn";

type BrandSectionProps = React.ComponentProps<"section">;

/** Brand-blue surface with the Figma white grid overlay. */
export function BrandSection({ className, ...props }: BrandSectionProps) {
  return <section className={cn("relative isolate overflow-hidden bg-brand blueprint-grid text-white", className)} {...props} />;
}
