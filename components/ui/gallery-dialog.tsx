"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryCarousel } from "./gallery-carousel";

interface GalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startIndex?: number;
}

/**
 * Fullscreen modal that houses GalleryCarousel.
 * Backdrop blurs the page; ESC + close button + backdrop click all dismiss.
 */
export function GalleryDialog({
  open,
  onOpenChange,
  startIndex = 0,
}: GalleryDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[150] bg-[var(--bg)]/85 backdrop-blur-md"
                data-cursor-text="Close"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                className="fixed left-1/2 top-1/2 z-[151] flex h-[90vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 items-center justify-center focus:outline-none"
              >
                <Dialog.Title className="sr-only">
                  Gallery — fullscreen
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Browse images. Use left and right buttons to navigate, press
                  Escape to close.
                </Dialog.Description>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close gallery"
                    data-cursor-text="Close"
                    className="absolute right-2 top-2 z-[160] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]/95 text-fg backdrop-blur transition-all duration-200 hover:scale-105 sm:right-[-56px] sm:top-[-12px]"
                  >
                    <X size={18} strokeWidth={1.75} />
                  </button>
                </Dialog.Close>

                <GalleryCarousel startIndex={startIndex} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
