import { AsteriskLogo } from "@/components/ui/asterisk-logo";

/**
 * Numbered section label - "✱  01 · CONTEXT" (Figma case study template).
 * DM Mono, uppercase, wide tracking, preceded by the asterisk character mark.
 */
export function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-fg-muted">
      <AsteriskLogo size={18} />
      <span
        className="font-[family-name:var(--font-dm-mono)] text-[13px] font-medium uppercase leading-none tracking-[0.22em]"
      >
        {n} · {children}
      </span>
    </div>
  );
}
