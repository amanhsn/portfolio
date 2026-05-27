export type BentoItem = {
  /** Short kicker above the title, e.g. "Figma plugin". */
  tag?: string;
  title: string;
  blurb: string;
  /** External link the whole card opens, if any. */
  href?: string;
  /** Snippet image (public path). Falls back to a branded panel. */
  image?: string;
  /** Column span on the lg 6-column grid: 2, 3, or 4. Defaults to 2. */
  span?: 2 | 3 | 4;
};

/**
 * Vibecoded side projects shown in the /playground bento grid.
 * More to come - the rest are still being vibe coded.
 */
export const bentoItems: BentoItem[] = [
  {
    tag: "Live reference",
    title: "ImagineArt Design System",
    blurb:
      "The whole design system, hosted on the web from a repo so Claude Code can pull it in and vibe code new ideas fast, and on-brand.",
    href: "https://imagine-design-system.vercel.app",
    image: "/playground/imagine-design-system.jpg",
    span: 3,
  },
  {
    tag: "Figma plugin",
    title: "ImagineArt Icon Checker",
    blurb:
      "A Figma plugin that validates icons against the ImagineArt design system and turns raw SVGs into compliant icon components.",
    href: "https://www.figma.com/community/plugin/1620403662972661108/imagine-art-icon-checker",
    image: "/playground/icon-checker.jpg",
    span: 3,
  },
];
