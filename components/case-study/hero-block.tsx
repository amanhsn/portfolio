import { Container } from "@/components/ui/container";
import { AsteriskDecoration } from "@/components/site/asterisk-decoration";
import { ArrowUpRight } from "./arrow";
import { ImageFrame } from "./image-frame";
import type { Hero } from "@/content/case-studies/types";

/**
 * 01 - HERO. Title + serif-italic POV subtitle + live link (left), description +
 * Timeline/Role/Scope meta (right), then the four-stat strip and a divider.
 * Matches Figma node 55:21350.
 */
export function HeroBlock({ hero }: { hero: Hero }) {
  return (
    <header className="relative w-full pt-10 md:pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full max-w-[1441px]">
        <AsteriskDecoration position="top-right" />
      </div>

      <Container className="relative z-10">
        {/* Top: two columns */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Left - title / subtitle / live link */}
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="font-[family-name:var(--font-inter)] text-[32px] font-normal uppercase leading-[1.1] tracking-[2.8px] text-[var(--text-name)]">
              {hero.title}
            </h1>
            <p className="font-[family-name:var(--font-sans)] text-[20px] italic leading-snug text-[var(--text-body)]">
              {hero.subtitle}
            </p>
            <a
              href={hero.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="Open live"
              className="inline-flex w-fit items-center gap-1 font-[family-name:var(--font-sans)] text-[18px] font-bold leading-tight text-[var(--text-strong)] underline-offset-4 hover:underline"
            >
              {hero.liveLabel}
              <ArrowUpRight />
            </a>
          </div>

          {/* Right - description + meta */}
          <div className="flex flex-1 flex-col gap-4">
            <p className="font-[family-name:var(--font-sans)] text-[20px] leading-normal text-[var(--text-body)]">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {hero.meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-0.5">
                  <span className="font-[family-name:var(--font-geist)] text-[15px] text-[var(--text-company)]">
                    {m.label}
                  </span>
                  <span className="font-[family-name:var(--font-geist)] text-[15px] text-[var(--text-tertiary)]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-6">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-inter)] text-[15px] text-[var(--text-company)]">
                {s.label}
              </span>
              <span className="font-[family-name:var(--font-sans)] text-[32px] font-bold leading-tight text-fg">
                {s.value}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[15px] text-[var(--text-tertiary)]">
                {s.caption}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 h-px w-full bg-[var(--border-subtle)]" />
      </Container>
    </header>
  );
}

/** Hero product shot - immediately below the hero block. A video takes precedence over a still. */
export function ProductShot({
  src,
  alt,
  aspect = "2620 / 1866",
  video,
}: {
  src?: string;
  alt: string;
  aspect?: string;
  video?: string;
}) {
  if (video) {
    // Same framed treatment as ImageFrame (node 57:22227), but a looping clip.
    return (
      <Container className="mt-10">
        <div
          className="relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)]"
          style={{ aspectRatio: aspect, boxShadow: "var(--shadow-card)" }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            poster={src}
            autoPlay
            loop
            muted
            playsInline
            aria-label={alt}
          />
        </div>
      </Container>
    );
  }
  return (
    <Container className="mt-10">
      <ImageFrame src={src} alt={alt} aspect={aspect} sizes="(max-width: 768px) 100vw, 1280px" priority />
    </Container>
  );
}
