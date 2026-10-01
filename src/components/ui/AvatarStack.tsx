import Image from "next/image";
import { cn } from "@/lib/cn";

const sizes = {
  sm: { box: "size-8", image: 32, badge: "text-[11px]" },
  md: { box: "size-9", image: 36, badge: "text-xs" },
} as const;

const badgeTones = {
  accent: "bg-accent text-ink",
  ink: "bg-ink text-white",
} as const;

type AvatarStackProps = {
  images: readonly string[];
  /** Text for the trailing count badge, e.g. "26+". */
  count?: string;
  size?: keyof typeof sizes;
  badgeTone?: keyof typeof badgeTones;
  /** Ring colour that separates overlapping avatars; match it to the surface behind the stack. */
  ringClassName?: string;
  className?: string;
};

export function AvatarStack({
  images,
  count,
  size = "sm",
  badgeTone = "accent",
  ringClassName = "ring-white",
  className,
}: AvatarStackProps) {
  const { box, image, badge } = sizes[size];
  const itemClass = cn("relative -ml-2 shrink-0 overflow-hidden rounded-full ring-2 first:ml-0", box, ringClassName);

  return (
    <div className={cn("flex items-center", className)}>
      {images.map((src) => (
        <span key={src} className={itemClass}>
          <Image src={src} alt="" width={image} height={image} className="size-full object-cover" />
        </span>
      ))}
      {count && (
        <span className={cn(itemClass, "grid place-items-center font-semibold", badgeTones[badgeTone], badge)}>
          {count}
        </span>
      )}
    </div>
  );
}
