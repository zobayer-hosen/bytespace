"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { EASE_OUT } from "@/components/motion/variants";
import { chipStyles } from "./Chip";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: readonly TabItem[];
  label: string;
  className?: string;
};

/** Accessible pill tabs (arrow keys move between tabs) with a cross-fade between panels. */
export function Tabs({ items, label, className }: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(items[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + items.length) % items.length;
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex gap-3">
        {items.map((item, index) => {
          const selected = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={chipStyles({ active: selected, size: "sm" })}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeItem.id}
          role="tabpanel"
          id={`${baseId}-panel-${activeItem.id}`}
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="mt-8 focus-visible:outline-none"
        >
          {activeItem.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
