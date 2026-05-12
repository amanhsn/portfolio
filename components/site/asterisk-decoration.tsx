import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Decorative asterisk motif from Figma frame 84:7189 (Frame 5).
 * In the Figma, three of these sit just outside the content edges:
 *   - top-right of hero band (peeks in from right, slightly above)
 *   - bottom-left of last project row (peeks in from left)
 * Pointer-events disabled; rendered behind content via -z-10.
 */
export function AsteriskDecoration({
  position,
  className,
}: {
  position: "top-right" | "bottom-left" | "top-left";
  className?: string;
}) {
  const positionClass = {
    "top-right": "right-[-80px] top-[-60px]",
    "bottom-left": "left-[-80px] bottom-[-60px]",
    "top-left": "left-[-80px] top-[-60px]",
  }[position];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 hidden select-none opacity-90 dark:opacity-15 sm:block",
        positionClass,
        className,
      )}
    >
      <Image
        src="/asterisk.png"
        alt=""
        width={387}
        height={387}
        priority={position === "top-right"}
        sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 387px"
        className="h-auto w-[260px] md:w-[320px] lg:w-[387px] object-contain"
      />
    </div>
  );
}
