import { SectionLabel } from "./section-label";
import type { Learning } from "@/content/case-studies/types";

/**
 * 08 · WHAT I LEARNED - tinted band (#fafaf6) to break rhythm; three earned
 * principles, each a bold header + one serif-italic paragraph.
 */
export function LearningsBlock({ learnings }: { learnings: Learning[] }) {
  return (
    <section className="w-full bg-[#fafaf6] py-20 md:py-24 dark:bg-[var(--bg-muted)]">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12 lg:px-20">
        <SectionLabel n="08">What I Learned</SectionLabel>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {learnings.map((l) => (
            <div key={l.header} className="flex flex-col gap-3">
              <h3 className="font-[family-name:var(--font-sans)] text-[18px] font-bold leading-snug text-fg">
                {l.header}
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[16px] italic leading-relaxed text-fg-muted">
                {l.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
