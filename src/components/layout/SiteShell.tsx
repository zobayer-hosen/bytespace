import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Navbar + main + footer frame shared by every marketing page (and the 404 page). */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
