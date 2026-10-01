"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/variants";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { authNav, mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const section = href.split("/")[1];
  return pathname.startsWith(`/${section}`);
}

/** Transparent navbar laid over each page's blue header. */
export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex h-28 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm transition-colors hover:text-white",
                      active ? "font-medium text-white" : "text-white/80",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-7 text-sm text-white/85 md:flex">
          <Link href={authNav.signIn.href} className="transition-colors hover:text-white">
            {authNav.signIn.label}
          </Link>
          <Link href={authNav.signUp.href} className="transition-colors hover:text-white">
            {authNav.signUp.label}
          </Link>
          <Link href="/courses" aria-label="Cart" className="transition-colors hover:text-white">
            <ShoppingBag aria-hidden className="size-[18px]" />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-10 place-items-center rounded-full text-white md:hidden"
        >
          {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </Container>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden bg-brand-600 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className="rounded-xl px-3 py-3 text-white aria-[current=page]:bg-white/10 aria-[current=page]:font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-3 border-t border-white/15 pt-4">
                <ButtonLink href={authNav.signIn.href} onClick={closeMenu} variant="white" className="flex-1">
                  {authNav.signIn.label}
                </ButtonLink>
                <ButtonLink href={authNav.signUp.href} onClick={closeMenu} className="flex-1">
                  {authNav.signUp.label}
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
