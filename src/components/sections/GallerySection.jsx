"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import FocusStageGallery from "@/components/gallery/FocusStageGallery";
import { COPY, FEATURES, getPublishedGallery } from "@/data/businessData";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

export default function GallerySection() {
  const items = getPublishedGallery();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((i) => (i === null ? i : (i + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i === null ? i : (i - 1 + items.length) % items.length,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, items.length]);

  if (!FEATURES.showGallery || items.length === 0) return null;

  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-foam py-[var(--section-y)]"
      aria-labelledby="gallery-heading"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-leaf uppercase">
            Gallery
          </p>
          <h2
            id="gallery-heading"
            className="font-display mt-3 text-section font-bold tracking-[-0.03em] text-forest"
          >
            {COPY.gallery.heading}
          </h2>
          <p className="measure mt-4 text-muted">{COPY.gallery.supporting}</p>
          <p className="mt-3 text-sm text-muted">
            Hover a thumbnail to stage it. Click again — or the expand button —
            for a larger view.
          </p>
        </Reveal>

        <div className="mt-10">
          {reduceMotion ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="group overflow-hidden rounded-[18px] text-left"
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.path}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted">{item.caption}</p>
                </button>
              ))}
            </div>
          ) : (
            <FocusStageGallery items={items} onOpen={setLightboxIndex} />
          )}
        </div>
      </Container>

      <AnimatePresence>
        {active ? (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-deep/75 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close lightbox"
              onClick={() => setLightboxIndex(null)}
            />
            <motion.div
              className="relative z-10 flex max-h-[min(92dvh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-foam"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.94, y: 20 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
              }
              transition={reduceMotion ? REDUCED_OPACITY : MOTION.gallery}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <p className="text-sm text-muted">
                  {lightboxIndex + 1} / {items.length}
                </p>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border"
                  aria-label="Close lightbox"
                  onClick={() => setLightboxIndex(null)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-mint p-3">
                <Image
                  src={active.path}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  className="max-h-[70dvh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                <p className="text-sm text-muted">{active.caption}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border"
                    aria-label="Previous image"
                    onClick={() =>
                      setLightboxIndex(
                        (i) => (i - 1 + items.length) % items.length,
                      )
                    }
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border"
                    aria-label="Next image"
                    onClick={() =>
                      setLightboxIndex((i) => (i + 1) % items.length)
                    }
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
