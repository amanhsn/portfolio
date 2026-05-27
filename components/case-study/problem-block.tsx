import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import type { Problem } from "@/content/case-studies/types";

/** 02 · THE PROBLEM - bold headline + three framing cards with top rules. */
export function ProblemBlock({ problem }: { problem: Problem }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="02">The Problem</SectionLabel>
      <h2 className="mt-8 max-w-[1000px] font-[family-name:var(--font-sans)] text-[28px] font-bold leading-[1.25] text-fg md:text-[36px]">
        {problem.headline}
      </h2>
      <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-3">
        {problem.cards.map((c) => (
          <div key={c.n} className="flex flex-col gap-3 border-t border-[var(--border-strong)] pt-4">
            <span className="font-[family-name:var(--font-sans)] text-[16px] font-medium text-fg">
              {c.n} · {c.title}
            </span>
            <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-fg-subtle">
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
