import { Container } from "@/components/ui/container";
import { SectionLabel } from "./section-label";
import { ImageFrame } from "./image-frame";
import type { ShippedScreen } from "@/content/case-studies/types";

/** 06 · WHAT SHIPPED - 2-col grid of final screens; captions name the job-to-be-done. */
export function ShippedGrid({ screens }: { screens: ShippedScreen[] }) {
  return (
    <Container className="py-16 md:py-20">
      <SectionLabel n="06">What Shipped</SectionLabel>
      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {screens.map((s, i) => (
          <figure key={i} className="flex flex-col gap-4">
            <ImageFrame src={s.src} alt={s.alt} aspect={s.aspect ?? "16 / 10"} sizes="(max-width: 768px) 100vw, 620px" />
            <figcaption className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-fg-muted">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
}
