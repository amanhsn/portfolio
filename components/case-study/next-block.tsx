import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import { ArrowUpRight } from "./arrow";
import type { Next } from "@/content/case-studies/types";

/**
 * 09 · WHAT'S NEXT - 2×2 forward-look cards, then a nav pair: a wide
 * "next case study" card and a dark "all work" card. Never a contact form.
 */
export function NextBlock({ next }: { next: Next }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="09">What&apos;s Next</SectionLabel>

      <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {next.steps.map((s) => (
          <div key={s.n} className="flex flex-col gap-2 border-t border-[var(--border-strong)] pt-4">
            <span className="font-[family-name:var(--font-dm-mono)] text-[13px] uppercase tracking-[0.18em] text-fg-subtle">
              {s.n}
            </span>
            <h3 className="font-[family-name:var(--font-sans)] text-[18px] font-bold leading-snug text-fg">
              {s.header}
            </h3>
            <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-fg-muted">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* Nav pair */}
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <Link
          href={next.nav.next.href}
          data-cursor-text="Open"
          className="group flex flex-col justify-between gap-8 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-muted)] p-7 transition-colors hover:bg-[var(--pill-bg-active)] md:col-span-2"
        >
          <span className="font-[family-name:var(--font-dm-mono)] text-[12px] uppercase tracking-[0.18em] text-fg-subtle">
            {next.nav.next.label}
          </span>
          <span className="flex items-center justify-between font-[family-name:var(--font-sans)] text-[24px] font-bold tracking-[-0.2px] text-fg underline-offset-4 group-hover:underline">
            {next.nav.next.title}
            <ArrowUpRight size={22} />
          </span>
        </Link>

        <Link
          href={next.nav.all.href}
          data-cursor-text="Back"
          className="group flex flex-col justify-between gap-8 rounded-[var(--radius-lg)] bg-[#0c0d10] p-7 text-white transition-opacity hover:opacity-90"
        >
          <span className="font-[family-name:var(--font-dm-mono)] text-[12px] uppercase tracking-[0.18em] text-white/45">
            {next.nav.all.label}
          </span>
          <span className="flex items-center justify-between font-[family-name:var(--font-sans)] text-[18px] font-medium underline-offset-4 group-hover:underline">
            {next.nav.all.title}
            <ArrowUpRight size={20} />
          </span>
        </Link>
      </div>
    </Container>
  );
}
