import Image from "next/image";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";

/**
 * Case-study image.
 *
 * Real product shots render in the Figma product-shot frame (node 57:22227):
 * rounded-16, a 1px border, a soft shadow, and object-cover. Tokens flip with
 * the theme. When `src` is missing, a branded placeholder renders instead.
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
    // Figma node 57:22227: rounded-16, 1px border-default, shadow-card, object-cover.
    return (
      <div
        className="relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)]"
        style={{ aspectRatio: aspect, boxShadow: "var(--shadow-card)" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
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
