import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerColumns, legalLinks } from "@/data/navigation";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="pt-16 pb-8 lg:pt-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-[500px] lg:w-[500px] lg:shrink-0">
            <Logo tone="dark" />
            <p className="mt-6 text-[13px] text-ink/80">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>
            <NewsletterForm />
            <p className="text-xs leading-relaxed text-ink/70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:w-[576px]">
            {footerColumns.map((column, index) => (
              <ul key={index} className="space-y-4">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink/80 transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 text-xs text-ink/80 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p>© 2023 ByteSpace. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
