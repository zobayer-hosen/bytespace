"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy: the id of the section that currently covers a line 40% down the viewport,
 * or `null` while none of them does. One IntersectionObserver watches every section.
 * Pass a stable `sectionIds` array (e.g. defined at module level).
 */
export function useActiveSection(sectionIds: readonly string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (!enabled) return;
    const sections = sectionIds.flatMap((id) => document.getElementById(id) ?? []);
    if (sections.length === 0) return;

    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        setActiveId(sectionIds.find((id) => intersecting.has(id)) ?? null);
      },
      // Shrink the root to a thin band 40% from the top, so only the section crossing it counts.
      { rootMargin: "-40% 0px -59% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return enabled ? activeId : null;
}
