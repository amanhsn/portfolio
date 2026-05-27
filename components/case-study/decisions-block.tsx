import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import { Diagram } from "./diagrams";
import type { Decisions } from "@/content/case-studies/types";

/**
 * 04 · KEY DECISIONS - the spine. Opens with a serif-italic north-star line,
 * then each decision: bold headline, three supporting angles (column row),
 * its diagram, and an optional left-border validation callout.
 */
export function DecisionsBlock({ decisions }: { decisions: Decisions }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="04">Key Decisions</SectionLabel>

      <p className="mt-8 max-w-[760px] font-[family-name:var(--font-sans)] text-[20px] italic leading-relaxed text-fg-muted">
        {decisions.northStar}
      </p>

      <div className="mt-14 flex flex-col gap-20">
        {decisions.items.map((d, i) => (
          <div key={i} className="flex flex-col gap-8">
            <h3 className="max-w-[900px] font-[family-name:var(--font-sans)] text-[24px] font-bold leading-[1.25] text-fg md:text-[30px]">
              {d.headline}
            </h3>

            <div className="grid gap-x-12 gap-y-8 md:grid-cols-3">
              {d.points.map((p) => (
                <div key={p.n} className="flex flex-col gap-3 border-t border-[var(--border-strong)] pt-4">
                  <span className="font-[family-name:var(--font-sans)] text-[16px] font-medium text-fg">
                    {p.n} · {p.header}
                  </span>
                  <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-fg-subtle">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            {d.diagram && (
              <div className="mt-2">
                <Diagram name={d.diagram} />
              </div>
            )}

            {d.validation && (
              <blockquote className="border-l-2 border-[var(--accent)] pl-4 font-[family-name:var(--font-sans)] text-[15px] italic leading-relaxed text-fg-muted">
                {d.validation}
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
