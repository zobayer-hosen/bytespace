type PanelSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

/** Titled block inside a course tab panel. */
export function PanelSection({ title, children, className }: PanelSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 text-[15px] leading-[1.75] text-muted">{children}</div>
    </section>
  );
}
