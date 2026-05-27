"use client";

import { lazy, Suspense, useState } from "react";
import Image from "next/image";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery";
import { galleryImages, type GalleryImage } from "@/content/gallery";

const GalleryDialog = lazy(() =>
  import("@/components/ui/gallery-dialog").then((m) => ({
    default: m.GalleryDialog,
  })),
);

/**
 * AboutGallery - scroll-driven 3D parallax 5-column masonry.
 * - Five columns at md+, 3 at sm, 2 on mobile
 * - Cards sit flat (no shadow / no card border) - flush masonry feel
 * - Each card carries data-cursor-text → CursorFollow shows the caption
 * - Click opens the GSAP circular-clip carousel at that image
 */
export function AboutGallery() {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const cols: GalleryImage[][] = [1, 2, 3, 4, 5].map((c) =>
    galleryImages.filter((i) => i.col === c),
  );

  const onCardClick = (img: GalleryImage) => {
    setOpenIndex(galleryImages.indexOf(img));
    setOpen(true);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col items-center gap-[6px] pb-[24px]">
        <h3 className="t-hero-name text-[17px] tracking-[2.2px] sm:text-[20px] sm:tracking-[2.8px]">
          Gallery
        </h3>
        <p className="t-meta text-fg-subtle">
          Scroll to view, click to expand
        </p>
      </div>

      <ContainerScroll className="relative h-[300vh] w-full">
        <ContainerSticky className="flex h-svh w-full items-center justify-center px-4 sm:px-8 lg:px-[80px]">
          <GalleryContainer className="mx-auto h-[min(78vh,720px)] w-full max-w-[1200px] gap-2 sm:gap-3">
            {/* Col 1 - slight downward parallax */}
            <GalleryCol yRange={["-6%", "0%"]} className="-mt-1">
              {cols[0].map((img) => (
                <GalleryCard key={img.src} img={img} onClick={onCardClick} />
              ))}
            </GalleryCol>

            {/* Col 2 - counter parallax, slight upward offset start */}
            <GalleryCol yRange={["8%", "1%"]} className="mt-[-8%]">
              {cols[1].map((img) => (
                <GalleryCard key={img.src} img={img} onClick={onCardClick} />
              ))}
            </GalleryCol>

            {/* Col 3 - center, mild parallax */}
            <GalleryCol yRange={["-4%", "0%"]} className="-mt-1">
              {cols[2].map((img) => (
                <GalleryCard key={img.src} img={img} onClick={onCardClick} />
              ))}
            </GalleryCol>

            {/* Col 4 - counter parallax (mirrors col 2) */}
            <GalleryCol
              yRange={["8%", "1%"]}
              className="mt-[-8%] hidden sm:flex"
            >
              {cols[3].map((img) => (
                <GalleryCard key={img.src} img={img} onClick={onCardClick} />
              ))}
            </GalleryCol>

            {/* Col 5 - mirrors col 1 */}
            <GalleryCol
              yRange={["-6%", "0%"]}
              className="-mt-1 hidden md:flex"
            >
              {cols[4].map((img) => (
                <GalleryCard key={img.src} img={img} onClick={onCardClick} />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>

      <Suspense fallback={null}>
        {open && (
          <GalleryDialog
            open={open}
            onOpenChange={setOpen}
            startIndex={openIndex}
          />
        )}
      </Suspense>
    </div>
  );
}

function GalleryCard({
  img,
  onClick,
}: {
  img: GalleryImage;
  onClick: (img: GalleryImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(img)}
      data-cursor-text={img.title}
      aria-label={`Open ${img.title}`}
      className="group relative block w-full flex-1 overflow-hidden rounded-[10px] bg-[var(--bg-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 right-1.5 rounded bg-black/60 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity duration-200 [@media(pointer:coarse)]:opacity-100">
        {img.title}
      </span>
    </button>
  );
}
