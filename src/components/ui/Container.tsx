import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<"div">;

/** Centers content on a 1200px column (the Figma frame's content width) with responsive gutters. */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1248px] px-4 sm:px-6", className)} {...props} />;
}
