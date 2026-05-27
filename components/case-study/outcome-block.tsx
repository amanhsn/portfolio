import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import { Diagram } from "./diagrams";
import type { Outcome } from "@/content/case-studies/types";

/** 07 · OUTCOME - data spread (metric cards + date stamp) or qualitative cards. */
export function OutcomeBlock({ outcome }: { outcome: Outcome }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="07">Outcome</SectionLabel>
      <h2 className="mt-8 max-w-[820px] font-[family-name:var(--font-sans)] text-[24px] font-bold leading-[1.3] text-fg md:text-[30px]">
        {outcome.headline}
      </h2>

      {outcome.kind === "data" ? (
        <>
          <p className="mt-3 font-[family-name:var(--font-inter)] text-[13px] tracking-wide text-fg-subtle">
            {outcome.dateStamp}
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {outcome.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-muted)] p-6">
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-[var(--text-company)]">{m.label}</span>
                <span className="font-[family-name:var(--font-sans)] text-[32px] font-bold leading-tight text-fg">{m.value}</span>
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-fg-subtle">{m.caption}</span>
              </div>
            ))}
          </div>
          {outcome.chart && (
            <div className="mt-8">
              <Diagram name={outcome.chart} />
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {outcome.cards.map((c) => (
            <div key={c.label} className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-muted)] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[12px] uppercase tracking-[0.18em] text-fg-subtle">{c.label}</span>
              <p className="font-[family-name:var(--font-sans)] text-[16px] leading-relaxed text-fg">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 max-w-[760px] font-[family-name:var(--font-sans)] text-[16px] leading-relaxed text-fg-muted">
        {outcome.closing}
      </p>
    </Container>
  );
}
