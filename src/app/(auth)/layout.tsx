import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";

/** Full-viewport blue grid shared by the login and signup pages. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-brand blueprint-grid">
      <Container className="grid min-h-dvh content-start gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_568px] lg:content-stretch lg:gap-16 lg:py-10">
        <Logo markOnly className="lg:hidden" />
        {children}
      </Container>
    </main>
  );
}
