import { Diagram } from "./diagrams";
import { ImageFrame } from "./image-frame";
import type { Craft } from "@/content/case-studies/types";

/**
 * 05 · CRAFT MOMENT - full-bleed dark band (#0c0d10, white text). The visual
 * signal to pay attention. Tag, headline, supporting paragraph, the rendered
 * craft visual, and a closing serif-italic principle.
 */
export function CraftBand({ craft }: { craft: Craft }) {
  return (
    <section className="w-full bg-[#0c0d10] py-20 text-white md:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12 lg:px-20">
        <span className="font-[family-name:var(--font-dm-mono)] text-[13px] font-medium uppercase tracking-[0.22em] text-white/45">
          05 · Craft Moment
        </span>
        <h2 className="mt-6 max-w-[820px] font-[family-name:var(--font-sans)] text-[26px] font-bold leading-[1.25] md:text-[34px]">
          {craft.headline}
        </h2>
        <p className="mt-5 max-w-[680px] font-[family-name:var(--font-sans)] text-[17px] leading-relaxed text-white/65">
          {craft.body}
        </p>

        {craft.image ? (
          <div className="mt-12">
            <ImageFrame
              src={craft.image}
              alt={craft.headline}
              aspect={craft.imageAspect ?? "16 / 10"}
              sizes="(max-width: 768px) 100vw, 1180px"
            />
          </div>
        ) : craft.visual ? (
          <div className="mt-12">
            <Diagram name={craft.visual} />
          </div>
        ) : null}

        <p className="mt-12 max-w-[680px] font-[family-name:var(--font-sans)] text-[18px] italic leading-relaxed text-white/80">
          {craft.closing}
        </p>
      </div>
    </section>
  );
}
