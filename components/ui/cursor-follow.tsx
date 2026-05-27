"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

/**
 * Global custom cursor. Walks up to the nearest ancestor with one of these
 * attributes (precedence: text/image/videos > pointer):
 *
 *   - data-cursor="pointer"           small dot, scale 1.5 + opacity 0.35
 *   - data-cursor-text="Label"        pill with arrow icon + text
 *   - data-cursor-image="/url"        tiny image-only thumbnail (no pill, no text)
 *   - data-cursor-image + text        pill with image + text
 *   - data-cursor-videos="/a,/b,/c"   plays a RANDOM video from the list, re-rolled
 *                                     each time the cursor enters the element
 *
 * Hidden on coarse pointer / reduced motion. Theme-aware via --cursor-bg/fg.
 */

const DOT_SIZE = 14;
const PILL_HEIGHT = 32;
const PILL_PAD_X = 12;
const IMAGE_ONLY_SIZE = 128;
const VIDEO_SIZE = 168;
const IMAGE_IN_PILL = 28;
const IMAGE_GAP = 8;
const POINTER_SCALE = 1.5;
const POINTER_OPACITY = 0.35;
const SPRING = { stiffness: 380, damping: 42, mass: 0.4 };
const MORPH = { duration: 0.2, ease: "easeOut" as const };

type Mode = "idle" | "pointer" | "label";
type CursorState = {
  mode: Mode;
  text: string | null;
  image: string | null;
  video: string | null;
};

export function CursorFollow() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({
    mode: "idle",
    text: null,
    image: null,
    video: null,
  });
  const [textWidth, setTextWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  // Track the element we're currently showing a video for, so the random pick
  // is stable while hovering one element and only re-rolls on a fresh enter.
  const lastVideoEl = useRef<Element | null>(null);
  const currentVideo = useRef<string | null>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!coarse.matches && !reduced.matches);
    update();
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      document.documentElement.setAttribute("data-cursor-active", "true");
    } else {
      document.documentElement.removeAttribute("data-cursor-active");
    }
    return () => document.documentElement.removeAttribute("data-cursor-active");
  }, [enabled]);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labelEl = target.closest<HTMLElement>(
        "[data-cursor-text], [data-cursor-image], [data-cursor-videos]",
      );
      if (labelEl) {
        const videosAttr = labelEl.getAttribute("data-cursor-videos");
        if (videosAttr) {
          // Re-roll a random video only on a fresh enter of this element.
          let video = currentVideo.current;
          if (lastVideoEl.current !== labelEl || !video) {
            const list = videosAttr
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            video = list[Math.floor(Math.random() * list.length)] ?? null;
            currentVideo.current = video;
            lastVideoEl.current = labelEl;
          }
          setState((prev) =>
            prev.mode === "label" && prev.video === video
              ? prev
              : { mode: "label", text: null, image: null, video },
          );
          return;
        }

        lastVideoEl.current = null;
        currentVideo.current = null;
        const text = labelEl.getAttribute("data-cursor-text");
        const image = labelEl.getAttribute("data-cursor-image");
        setState((prev) =>
          prev.mode === "label" &&
          prev.text === text &&
          prev.image === image &&
          !prev.video
            ? prev
            : { mode: "label", text, image, video: null },
        );
        return;
      }

      lastVideoEl.current = null;
      currentVideo.current = null;

      const pointerEl = target.closest<HTMLElement>('[data-cursor="pointer"]');
      if (pointerEl) {
        setState((prev) =>
          prev.mode === "pointer"
            ? prev
            : { mode: "pointer", text: null, image: null, video: null },
        );
        return;
      }

      setState((prev) =>
        prev.mode === "idle"
          ? prev
          : { mode: "idle", text: null, image: null, video: null },
      );
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, [enabled]);

  useLayoutEffect(() => {
    if (state.mode !== "label" || !state.text || !measureRef.current) {
      setTextWidth(0);
      return;
    }
    setTextWidth(measureRef.current.offsetWidth);
  }, [state]);

  if (!enabled) return null;

  const isPointer = state.mode === "pointer";
  const hasText = !!state.text;
  const hasImage = !!state.image;
  const hasVideo = !!state.video;
  const isVideoOnly = state.mode === "label" && hasVideo;
  const isImageOnly = state.mode === "label" && hasImage && !hasText;
  const isTextLabel = state.mode === "label" && hasText;

  // Pill width when text is present (with or without image)
  const arrowWidth = !hasImage ? 12 + 6 : 0; // arrow only when no image
  const imageBlock = hasImage ? IMAGE_IN_PILL + IMAGE_GAP : 0;
  const pillWidth = isVideoOnly
    ? VIDEO_SIZE
    : isTextLabel
      ? imageBlock + arrowWidth + textWidth + PILL_PAD_X * 2
      : isImageOnly
        ? IMAGE_ONLY_SIZE
        : DOT_SIZE;
  const pillHeight = isVideoOnly
    ? VIDEO_SIZE
    : isTextLabel
      ? hasImage
        ? IMAGE_IN_PILL + 8
        : PILL_HEIGHT
      : isImageOnly
        ? IMAGE_ONLY_SIZE
        : DOT_SIZE;
  const pillRadius = isVideoOnly
    ? 18
    : isTextLabel
      ? pillHeight / 2
      : isImageOnly
        ? 14
        : DOT_SIZE;

  // Media-only floats with its own subtle shadow, no pill background.
  // Text/Label uses the cursor-bg pill so text is legible.
  const pillBg = isImageOnly || isVideoOnly ? "transparent" : "var(--cursor-bg)";
  const showShadow = isTextLabel || isImageOnly || isVideoOnly;

  return (
    <>
      <span
        aria-hidden
        ref={measureRef}
        className="t-meta pointer-events-none fixed -left-[9999px] -top-[9999px] whitespace-nowrap"
        style={{ fontSize: 13, fontWeight: 500 }}
      >
        {state.text ?? ""}
      </span>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          initial={false}
          animate={{
            width: pillWidth,
            height: pillHeight,
            borderRadius: pillRadius,
            scale: isPointer ? POINTER_SCALE : 1,
            opacity: isPointer ? POINTER_OPACITY : 1,
            paddingLeft: isTextLabel ? PILL_PAD_X : 0,
            paddingRight: isTextLabel ? PILL_PAD_X : 0,
          }}
          transition={MORPH}
          className="flex items-center justify-center overflow-hidden"
          style={{
            background: pillBg,
            color: "var(--cursor-fg)",
            boxShadow: showShadow ? "var(--cursor-shadow)" : "none",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isVideoOnly && (
              <motion.video
                key={state.video!}
                src={state.video!}
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="block h-full w-full rounded-[18px] object-cover"
              />
            )}

            {isImageOnly && !isVideoOnly && (
              <motion.img
                key={state.image!}
                src={state.image!}
                alt=""
                draggable={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="block h-full w-full rounded-[14px] object-cover"
              />
            )}

            {isTextLabel && (
              <motion.div
                key={(state.image ?? "") + (state.text ?? "")}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {hasImage && (
                  <span
                    className="block flex-shrink-0 overflow-hidden rounded-md"
                    style={{
                      width: IMAGE_IN_PILL,
                      height: IMAGE_IN_PILL,
                      background: "var(--cursor-fg)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={state.image!}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </span>
                )}
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{ fontSize: 13, fontWeight: 500, lineHeight: 1 }}
                >
                  {!hasImage && <ArrowUpRight size={12} strokeWidth={2} />}
                  {state.text}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
