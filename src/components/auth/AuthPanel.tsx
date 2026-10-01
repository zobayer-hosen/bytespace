"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/variants";

type AuthPanelProps = {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
};

/** White form panel that slides in from the right. */
export function AuthPanel({ eyebrow, title, children, footer }: AuthPanelProps) {
  return (
    <motion.section
      aria-labelledby="auth-title"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="flex w-full flex-col rounded-panel bg-white p-6 sm:p-10 lg:min-h-[760px] lg:self-center lg:p-14"
    >
      <p className="text-sm text-brand">{eyebrow}</p>
      <h1 id="auth-title" className="mt-1 text-4xl leading-[1.15] font-semibold tracking-tight text-ink sm:text-[44px]">
        {title}
      </h1>
      <div className="mt-10">{children}</div>
      <p className="mt-auto pt-10 text-center text-sm text-muted">{footer}</p>
    </motion.section>
  );
}
