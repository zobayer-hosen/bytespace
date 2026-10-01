import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundHero } from "@/components/sections/not-found/NotFoundHero";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Rendered for unknown URLs and for `notFound()` calls in any route. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundHero />
    </SiteShell>
  );
}
