import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import type { Constraint } from "@/content/case-studies/types";

/** 03 · CONSTRAINTS - 2-col grid; `span` constraints take the full bottom row. */
export function ConstraintsBlock({ constraints }: { constraints: Constraint[] }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="03">Constraints</SectionLabel>
      <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
        {constraints.map((c) => (
          <div
            key={c.header}
            className={`flex flex-col gap-2 ${c.span ? "md:col-span-2" : ""}`}
          >
            <h3 className="font-[family-name:var(--font-sans)] text-[20px] font-bold leading-snug text-fg">
              {c.header}
            </h3>
            <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-[16px] leading-relaxed text-fg-muted">
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
