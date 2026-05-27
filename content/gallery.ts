export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  /** Optional column hint (1 to 5) for the animated 5-column masonry. */
  col?: 1 | 2 | 3 | 4 | 5;
};

/**
 * Aman's own photos, arranged in 5 columns × 2 rows. Hover title = the file
 * name as uploaded (verbatim). Files live in /public/gallery; spaces are
 * URL-encoded in `src`. The carousel dialog browses every photo; the masonry
 * shows them all at once.
 */
export const galleryImages: GalleryImage[] = [
  // ── Col 1
  {
    src: "/gallery/brew.jpg",
    alt: "A fresh brew",
    title: "brew",
    col: 1,
  },
  {
    src: "/gallery/dahlia.jpg",
    alt: "A dahlia in bloom",
    title: "dahlia",
    col: 1,
  },
  // ── Col 2
  {
    src: "/gallery/fairy meadows.jpg",
    alt: "Fairy Meadows",
    title: "fairy meadows",
    col: 2,
  },
  {
    src: "/gallery/frozen lake.jpg",
    alt: "A frozen lake",
    title: "frozen lake",
    col: 2,
  },
  // ── Col 3
  {
    src: "/gallery/himalayas.jpg",
    alt: "The Himalayas",
    title: "himalayas",
    col: 3,
  },
  {
    src: "/gallery/jim.jpg",
    alt: "Jim",
    title: "jim",
    col: 3,
  },
  // ── Col 4
  {
    src: "/gallery/late night brainstorms.jpg",
    alt: "Late-night brainstorms",
    title: "late night brainstorms",
    col: 4,
  },
  {
    src: "/gallery/snoopy setup.jpg",
    alt: "A Snoopy desk setup",
    title: "snoopy setup",
    col: 4,
  },
  // ── Col 5
  {
    src: "/gallery/coffeemaxxing.jpg",
    alt: "Coffee in hand, outdoors",
    title: "coffeemaxxing",
    col: 5,
  },
  {
    src: "/gallery/workspace.jpg",
    alt: "The workspace",
    title: "workspace",
    col: 5,
  },
];
