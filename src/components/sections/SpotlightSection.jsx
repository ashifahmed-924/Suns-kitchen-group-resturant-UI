"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import CircularGallery from "@/components/CircularGallery/CircularGallery";
import {
  COPY,
  MEDIA,
  formatAudPrice,
  getPublishedMenuItems,
} from "@/data/businessData";

export default function SpotlightSection() {
  const items = getPublishedMenuItems();
  const reduce = useReducedMotion();

  const galleryItems = useMemo(() => {
    const dishes = items.map((item) => ({
      image: MEDIA.dishes[item.imageId].path,
      text: "",
    }));

    // Extra illustrative food frames for a fuller orbit (photos only).
    const extras = [
      MEDIA.gallery[0]?.path,
      MEDIA.gallery[2]?.path,
      MEDIA.gallery[1]?.path,
    ]
      .filter(Boolean)
      .map((image) => ({ image, text: "" }));

    return [...dishes, ...extras];
  }, [items]);

  return (
    <section
      className="overflow-hidden bg-deep py-[var(--section-y)] text-white"
      aria-labelledby="spotlight-heading"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-lime uppercase">
            {COPY.spotlight.eyebrow}
          </p>
          <h2
            id="spotlight-heading"
            className="font-display mt-3 text-section leading-[1.08] font-bold tracking-[-0.03em] text-white"
          >
            {COPY.spotlight.heading}
          </h2>
          <p className="mt-4 text-white/75">{COPY.spotlight.supporting}</p>
          <p className="mt-2 text-xs text-white/50">
            Drag, scroll or use arrow keys to orbit the photos.
          </p>
        </Reveal>
      </Container>

      {reduce ? (
        <Container className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const image = MEDIA.dishes[item.imageId];
              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[24px] border border-white/10 bg-forest"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={image.path}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-subhead font-bold">{item.name}</p>
                    <p className="mt-1 text-sm text-lime">
                      {formatAudPrice(item.price)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      ) : (
        <div className="relative mt-8 h-[520px] w-full md:h-[600px]">
          <CircularGallery
            items={galleryItems}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            font="bold 28px Manrope"
            scrollSpeed={2}
          />
        </div>
      )}

      <Container className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/60">
          Verified DoorDash selection only — not the complete menu.
        </p>
        <Button href="#menu" variant="lime">
          Browse full selection
        </Button>
      </Container>
    </section>
  );
}
