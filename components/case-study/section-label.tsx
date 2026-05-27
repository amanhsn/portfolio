import { AsteriskLogo } from "@/components/ui/asterisk-logo";

/**
 * Numbered section label - "✱  01 · CONTEXT" (Figma case study template).
 * DM Mono, uppercase, wide tracking, preceded by the asterisk character mark.
 */
export function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  // Children are plain strings for every section; derive a stable id + clean
  // TOC title (the section name, without the number) for the dynamic-island TOC.
  const title = typeof children === "string" ? children : undefined;
  const id = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;
  return (
    <div
      id={id}
      data-toc
      data-toc-title={title}
      className="flex items-center gap-3 text-fg-muted"
    >
      <AsteriskLogo size={18} />
      <span
        className="font-[family-name:var(--font-dm-mono)] text-[13px] font-medium uppercase leading-none tracking-[0.22em]"
      >
        {n} · {children}
      </span>
    </div>
  );
}
