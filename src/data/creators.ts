import type { Creator } from "@/types";
import { media } from "./media";

export const creators: Creator[] = [
  {
    slug: "purepearl-studio",
    name: "PurePearl Studio",
    role: "Professional Creator",
    tagline: "Passionate UI/UX, Web designer",
    bio: [
      "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
      "Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    ],
    avatar: media.avatars.purepearl,
    products: 3,
    followers: 12,
  },
];

export function getCreator(slug: string) {
  return creators.find((creator) => creator.slug === slug);
}
