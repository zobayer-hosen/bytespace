import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "light" | "dark";
  /** Show only the lime "b" mark (auth pages). */
  markOnly?: boolean;
  className?: string;
};

export function Logo({ tone = "light", markOnly = false, className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-8 w-auto" />
      {markOnly ? (
        <span className="sr-only">ByteSpace home</span>
      ) : (
        <span
          className={cn(
            "font-display text-[22px] font-bold tracking-tight",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          ByteSpace
        </span>
      )}
    </Link>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" aria-hidden className={className}>
      <path
        fill="var(--color-accent)"
        fillRule="evenodd"
        d="M6 1.5C8.5 1.5 10 3.2 10 5.5V9.6C11.2 9.2 12.5 9 14 9C19 9 23 13 23 18C23 23 19 27 14 27H6C3.5 27 1.5 25 1.5 22.5V6C1.5 3.5 3.5 1.5 6 1.5ZM11 14.5L16.5 18L11 21.5Z"
      />
    </svg>
  );
}
