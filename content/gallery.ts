export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  /** Optional column hint (1–5) for the animated 5-column masonry. */
  col?: 1 | 2 | 3 | 4 | 5;
};

/**
 * 10 curated Unsplash photos arranged in 5 columns × 2 rows.
 * Carousel dialog browses every photo; the masonry shows them all at once.
 */
export const galleryImages: GalleryImage[] = [
  // ── Col 1
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    alt: "Macbook glowing in the dark",
    title: "midnight macbook",
    col: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    alt: "Latte art on a wooden table",
    title: "first coffee of the day",
    col: 1,
  },
  // ── Col 2
  {
    src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    alt: "Empty road stretching into hills",
    title: "the long drive",
    col: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=900&q=80",
    alt: "City at night through a wet window",
    title: "late-night islamabad",
    col: 2,
  },
  // ── Col 3
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    alt: "Sun cresting over a mountain ridge",
    title: "rooftop at six am",
    col: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    alt: "Vinyl record on a turntable",
    title: "spinning side B",
    col: 3,
  },
  // ── Col 4
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    alt: "Headphones on a desk",
    title: "playlist of the week",
    col: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=900&q=80",
    alt: "Bookshelf at home",
    title: "winter reading list",
    col: 4,
  },
  // ── Col 5
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    alt: "Cafe interior",
    title: "the corner table",
    col: 5,
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
    alt: "Mountain lake at sunrise",
    title: "off the grid",
    col: 5,
  },
];
