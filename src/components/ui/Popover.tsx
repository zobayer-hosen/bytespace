"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/components/motion/variants";
import { cn } from "@/lib/cn";

/**
 * Open state for a trigger + floating panel. Closes on a click outside `rootRef`, on Escape
 * (returning focus to the trigger) and when keyboard focus leaves the root (Tab).
 */
export function usePopover() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close(true);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  /** Attach to the root's `onBlur`. A null `relatedTarget` (mouse click) is left to the pointer handler. */
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && !event.currentTarget.contains(next)) setOpen(false);
  }, []);

  return { open, setOpen, close, rootRef, triggerRef, handleBlur };
}

type PopoverPanelProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> & {
  open: boolean;
  /** Edge of the trigger the panel lines up with from `sm` up. */
  align?: "start" | "end";
};

/**
 * Floating panel below a trigger. From `sm` up it is anchored to the trigger's wrapper
 * (give it `sm:relative`); on phones it spans the nearest positioned ancestor so it never
 * runs off-screen.
 *
 * It fades in but unmounts at once on close, so reopening always mounts fresh content
 * (and `autoFocus` inside it runs again).
 */
export function PopoverPanel({ open, align = "start", className, ...props }: PopoverPanelProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
      className={cn(
        "absolute inset-x-0 top-full z-30 mt-2 rounded-2xl border border-line bg-white p-2 shadow-float sm:inset-x-auto",
        align === "start" ? "sm:left-0" : "sm:right-0",
        className,
      )}
      {...props}
    />
  );
}
