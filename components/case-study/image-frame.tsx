import Image from "next/image";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";

/**
 * Case-study image.
 *
 * Real product shots already carry their own window chrome / rounded matte
 * (exported from Figma), so they render BARE - no extra border, background, or
 * shadow - at their natural aspect ratio, to match the Figma exactly.
 *
 * When `src` is missing, a branded framed placeholder renders instead, so the
 * layout reads cleanly while a screenshot is still pending.
 */
export function ImageFrame({
  src,
  alt,
  aspect,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "2620 / 1866". */
  aspect: string;
  sizes: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill className="object-contain" sizes={sizes} priority={priority} />
      </div>
    );
  }

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-muted)] text-fg-subtle"
      style={{ aspectRatio: aspect, boxShadow: "var(--shadow-card)" }}
    >
      <AsteriskLogo size={28} />
      <span className="font-[family-name:var(--font-dm-mono)] text-[11px] uppercase tracking-[0.2em]">
        Screenshot pending
      </span>
    </div>
  );
}
