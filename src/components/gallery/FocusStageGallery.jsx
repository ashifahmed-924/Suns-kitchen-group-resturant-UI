"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { EASE, MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

/**
 * Focus Stage gallery — featured image + peeling thumbnail rail.
 * Distinct from circular orbit and accordion expand patterns.
 */
export default function FocusStageGallery({ items = [], onOpen }) {
  const [focus, setFocus] = useState(0);
  const reduce = useReducedMotion();
  const active = items[focus] || items[0];

  if (!items.length || !active) return null;

  return (
    <LayoutGroup id="gallery-focus-stage">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(11rem,0.45fr)] lg:gap-5">
        <motion.div
          layout={!reduce}
          className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-mint md:min-h-[420px] lg:min-h-[520px]"
          transition={reduce ? REDUCED_OPACITY : EASE.springSoft}
        >
          <AnimatePresence mode="wait" initial={false}>
            <AnimateImage
              key={active.id}
              item={active}
              reduce={reduce}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-lime uppercase">
                {focus + 1} / {items.length}
              </p>
              <p className="font-display mt-2 text-subhead font-bold text-white">
                {active.caption}
              </p>
            </div>
            <button
              type="button"
              className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-lime text-lime-ink shadow-lg transition-transform hover:scale-105"
              aria-label={`Open ${active.caption}`}
              onClick={() => onOpen?.(focus)}
            >
              <Expand className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <div
          className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          role="list"
          aria-label="Gallery thumbnails"
        >
          {items.map((item, index) => {
            const selected = index === focus;
            return (
              <motion.button
                key={item.id}
                type="button"
                role="listitem"
                aria-current={selected ? "true" : undefined}
                aria-label={`Show ${item.caption}`}
                onMouseEnter={() => setFocus(index)}
                onFocus={() => setFocus(index)}
                onClick={() => {
                  if (selected) onOpen?.(index);
                  else setFocus(index);
                }}
                className={`relative min-w-[8.5rem] flex-1 overflow-hidden rounded-[20px] text-left outline-none focus-visible:ring-2 focus-visible:ring-lime lg:min-w-0 ${
                  selected ? "ring-2 ring-lime" : "ring-1 ring-border"
                }`}
                initial={false}
                animate={
                  reduce
                    ? { opacity: 1 }
                    : {
                        opacity: selected ? 1 : 0.72,
                        y: selected ? 0 : index % 2 === 0 ? 8 : -8,
                        scale: selected ? 1 : 0.97,
                      }
                }
                whileHover={
                  reduce
                    ? undefined
                    : { y: selected ? -2 : 0, opacity: 1, scale: 1 }
                }
                transition={reduce ? REDUCED_OPACITY : MOTION.state}
              >
                <div className="relative aspect-[4/5] h-auto w-full lg:aspect-auto lg:h-[7.5rem]">
                  <Image
                    src={item.path}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className={`h-full w-full object-cover transition-[filter] duration-500 ${
                      selected ? "grayscale-0" : "grayscale"
                    }`}
                    sizes="(max-width: 1024px) 140px, 180px"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      selected ? "bg-transparent" : "bg-deep/25"
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </LayoutGroup>
  );
}

function AnimateImage({ item, reduce }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 1.08,
              clipPath: "inset(8% 12% 8% 12% round 28px)",
            }
      }
      animate={
        reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 28px)",
            }
      }
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
      transition={reduce ? REDUCED_OPACITY : MOTION.gallery}
    >
      <motion.div className="h-full w-full">
        <Image
          src={item.path}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="h-full w-full object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 70vw"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}
