import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const titleSizes = {
  md: "text-2xl sm:text-[32px]",
  lg: "text-[30px] sm:text-4xl lg:text-[44px]",
} as const;

type SectionHeadingProps = {
  title: React.ReactNode;
  /** Id for the heading so the section can reference it with `aria-labelledby`. */
  id?: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: keyof typeof titleSizes;
  tone?: "dark" | "light";
  className?: string;
  descriptionClassName?: string;
};

/** Section H2 with an optional supporting paragraph; reveals on scroll. */
export function SectionHeading({
  title,
  id,
  description,
  align = "center",
  size = "lg",
  tone = "dark",
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn(centered && "mx-auto text-center", className)}>
      <h2
        id={id}
        className={cn(
          "font-semibold leading-[1.2] tracking-tight",
          titleSizes[size],
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed sm:text-base",
            tone === "light" ? "text-white/85" : "text-muted",
            centered && "mx-auto max-w-3xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
