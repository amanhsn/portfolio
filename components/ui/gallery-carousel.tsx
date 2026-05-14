"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/content/gallery";

gsap.registerPlugin(MotionPathPlugin);

interface GalleryCarouselProps {
  startIndex?: number;
}

/**
 * GalleryCarousel — circular-clip image carousel (GSAP MotionPath).
 *
 * Layout: image frame on top, dot/thumb controller in its own HTML row below
 * the frame (no overlap). Prev/Next chevrons flank the frame.
 */
export function GalleryCarousel({ startIndex = 0 }: GalleryCarouselProps) {
  const images = galleryImages;
  const [opened, setOpened] = useState(startIndex);
  const [inPlace, setInPlace] = useState(startIndex);
  const [disabled, setDisabled] = useState(false);
  const autoplayTimer = useRef<number | null>(null);

  const onInPlace = useCallback((id: number) => setInPlace(id), []);

  const next = useCallback(() => {
    setOpened((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 5000);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [opened, next]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 sm:gap-6">
      {/* IMAGE FRAME */}
      <div className="relative aspect-square w-full max-w-[min(75vmin,560px)] overflow-hidden rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)]">
        {images.map((image, i) => (
          <div
            key={image.src}
            className="absolute left-0 top-0 h-full w-full"
            style={{ zIndex: inPlace === i ? i : images.length + 1 }}
          >
            <ClippedImage
              total={images.length}
              id={i}
              image={image}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
            />
          </div>
        ))}

        {/* Active image title — top centre */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-[101] flex justify-center">
          <span
            className="rounded-full border border-[var(--border-default)] bg-[var(--bg)]/85 px-3 py-1.5 text-fg backdrop-blur"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {images[opened]?.title}
          </span>
        </div>
      </div>

      {/* PREV / NEXT — flanking the image */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={prev}
        disabled={disabled}
        data-cursor-text="Previous"
        className="absolute left-2 top-[calc(50%-32px)] z-[101] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]/95 text-fg backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-[var(--bg-elevated)] disabled:cursor-not-allowed disabled:opacity-40 sm:left-[-60px] sm:h-12 sm:w-12"
      >
        <ChevronLeft size={20} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={next}
        disabled={disabled}
        data-cursor-text="Next"
        className="absolute right-2 top-[calc(50%-32px)] z-[101] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]/95 text-fg backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-[var(--bg-elevated)] disabled:cursor-not-allowed disabled:opacity-40 sm:right-[-60px] sm:h-12 sm:w-12"
      >
        <ChevronRight size={20} strokeWidth={1.75} />
      </button>
    </div>
  );
}

/* ── ClippedImage: GSAP MotionPath / SVG circle clip-path animation ─────── */

interface ClippedImageProps {
  image: GalleryImage;
  open: boolean;
  inPlace: boolean;
  id: number;
  onInPlace: (id: number) => void;
  total: number;
}

function ClippedImage({
  image,
  open,
  inPlace,
  id,
  onInPlace,
  total,
}: ClippedImageProps) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef<SVGCircleElement>(null);

  const gap = 10;
  const circleRadius = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.4;
  const width = 400;
  const height = 400;
  const scale = 700;
  const bigSize = circleRadius * scale;
  const overlap = 0;

  const getPosSmall = () => ({
    cx:
      width / 2 -
      (total * (circleRadius * 2 + gap) - gap) / 2 +
      id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  });
  const getPosSmallAbove = () => ({
    cx:
      width / 2 -
      (total * (circleRadius * 2 + gap) - gap) / 2 +
      id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  });
  const getPosCenter = () => ({
    cx: width / 2,
    cy: height / 2,
    r: circleRadius * 7,
  });
  const getPosEnd = () => ({
    cx: width / 2 - bigSize + overlap,
    cy: height / 2,
    r: bigSize,
  });
  const getPosStart = () => ({
    cx: width / 2 + bigSize - overlap,
    cy: height / 2,
    r: bigSize,
  });

  useEffect(() => {
    if (!clip.current) return;
    setLoaded(false);
    const flipDuration = firstLoad ? 0 : duration;
    const upDuration = firstLoad ? 0 : 0.2;
    const bounceDuration = firstLoad ? 0.01 : 1;
    const delay = firstLoad ? 0 : flipDuration + upDuration;

    if (open) {
      gsap
        .timeline()
        .set(clip.current, { ...defaults, ...getPosSmall() })
        .to(clip.current, {
          ...defaults,
          ...getPosCenter(),
          duration: upDuration,
          ease: "power3.inOut",
        })
        .to(clip.current, {
          ...defaults,
          ...getPosEnd(),
          duration: flipDuration,
          ease: "power4.in",
          onComplete: () => onInPlace(id),
        });
    } else {
      gsap
        .timeline({ overwrite: true })
        .set(clip.current, { ...defaults, ...getPosStart() })
        .to(clip.current, {
          ...defaults,
          ...getPosCenter(),
          delay,
          duration: flipDuration,
          ease: "power4.out",
        })
        .to(clip.current, {
          ...defaults,
          motionPath: {
            path: [getPosSmallAbove(), getPosSmall()],
            curviness: 1,
          },
          duration: bounceDuration,
          ease: "bounce.out",
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      data-cursor-text={image.title}
    >
      <defs>
        <clipPath id={`${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip} />
        </clipPath>
        <clipPath id={`${id}_squareClip`}>
          <rect className="clip" width={width} height={height} />
        </clipPath>
      </defs>
      <g
        clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}
      >
        <image
          width={width}
          height={height}
          href={image.src}
          className="pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  );
}

