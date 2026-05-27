import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import type { Context } from "@/content/case-studies/types";

/** 01 · CONTEXT - two columns: where this lives / why this feature. */
export function ContextBlock({ context }: { context: Context }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="01">Context</SectionLabel>
      <div className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
        {[context.left, context.right].map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-sans)] text-[20px] font-bold leading-snug text-fg">
              {col.heading}
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[17px] leading-relaxed text-fg-muted">
              {col.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
