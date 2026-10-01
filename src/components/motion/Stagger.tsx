"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { dropIn, fadeUp, staggerContainer, VIEWPORT } from "./variants";

const containers = { div: motion.div, ul: motion.ul, dl: motion.dl } as const;
const items = { div: motion.div, li: motion.li } as const;
const itemVariants = { fadeUp, dropIn } as const;

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof containers;
  stagger?: number;
  delay?: number;
};

/** Reveals its `StaggerItem` children one after another when scrolled into view. */
export function Stagger({ children, className, as = "div", stagger, delay }: StaggerProps) {
  const Container = containers[as];
  const ref = useRef<HTMLDivElement & HTMLUListElement & HTMLDListElement>(null);
  const inView = useInView(ref, VIEWPORT);

  // `animate` rather than `whileInView`: items added after the reveal (e.g. chips shown by
  // "+ More") inherit the visible state and animate in instead of staying hidden.
  return (
    <Container
      ref={ref}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </Container>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof items;
  /** `fadeUp` rises into place; `dropIn` falls into place from above. */
  variant?: keyof typeof itemVariants;
};

export function StaggerItem({ children, className, as = "div", variant = "fadeUp" }: StaggerItemProps) {
  const Item = items[as];

  return (
    <Item className={className} variants={itemVariants[variant]}>
      {children}
    </Item>
  );
}
