"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import { COPY, getPublishedMenuItems } from "@/data/businessData";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

function LiveMarquee({ items, reverse = false, reduce }) {
  const loop = [...items, ...items];

  if (reduce) {
    return (
      <div className="flex flex-wrap justify-center gap-3 px-[var(--gutter)] py-3">
        {items.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
          >
            <span className="font-semibold">{item.name}</span>
            {item.nameZh ? (
              <span className="zh-label text-lime" lang="zh-Hans">
                {item.nameZh}
              </span>
            ) : null}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden py-3" aria-hidden="true">
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={reverse ? undefined : { animationDuration: "32s" }}
      >
        {loop.map((item, index) => (
          <span
            key={`${item.id}-${index}-${reverse ? "r" : "f"}`}
            className="inline-flex items-center gap-3 whitespace-nowrap text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="font-semibold text-white/90">{item.name}</span>
            <span className="text-white/35">·</span>
            {item.nameZh ? (
              <span className="zh-label text-lime" lang="zh-Hans">
                {item.nameZh}
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function BilingualCard({ item, index, reduce, spotlight }) {
  const [showZh, setShowZh] = useState(false);

  useEffect(() => {
    if (reduce || !item.nameZh) return undefined;
    const tick = () => setShowZh((v) => !v);
    const id = window.setInterval(tick, 2800 + index * 220);
    return () => window.clearInterval(id);
  }, [reduce, item.nameZh, index]);

  return (
    <motion.li
      className={`relative flex items-center justify-between gap-4 overflow-hidden rounded-[24px] border px-5 py-4 transition-colors duration-500 ${
        spotlight
          ? "border-lime/40 bg-lime/10"
          : "border-white/10 bg-white/5"
      }`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ ...MOTION.section, delay: index * 0.08 }}
      whileHover={
        reduce
          ? undefined
          : { scale: 1.02, backgroundColor: "rgba(198,242,85,0.12)" }
      }
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-lime"
        animate={
          reduce
            ? undefined
            : spotlight
              ? { opacity: [0.4, 1, 0.4], scaleY: [0.7, 1, 0.7] }
              : { opacity: 0.25 }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: 0.5 }}
      />

      <div className="min-w-0 pl-2">
        <div className="relative min-h-[3.25rem]">
          <AnimatePresence mode="wait" initial={false}>
            {!showZh || !item.nameZh ? (
              <motion.p
                key="en"
                className="font-semibold leading-snug"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={MOTION.state}
              >
                {item.name}
              </motion.p>
            ) : (
              <motion.p
                key="zh"
                className="zh-label text-lg leading-snug font-semibold text-lime md:text-xl"
                lang="zh-Hans"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={MOTION.state}
              >
                {item.nameZh}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {item.nameZh ? (
          <p className="mt-1 text-xs tracking-[0.12em] text-white/45 uppercase">
            {showZh && !reduce ? "Chinese label" : "English label"}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-sm text-white/50">0{index + 1}</span>
        {item.nameZh ? (
          <motion.span
            className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.14em] text-lime uppercase"
            animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            EN ↔ 中
          </motion.span>
        ) : null}
      </div>
    </motion.li>
  );
}

export default function BilingualRibbon() {
  const items = getPublishedMenuItems();
  const reduce = useReducedMotion();
  const [spotlight, setSpotlight] = useState(0);

  useEffect(() => {
    if (reduce || items.length === 0) return undefined;
    const id = window.setInterval(() => {
      setSpotlight((i) => (i + 1) % items.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduce, items.length]);

  const words = COPY.bilingual.heading.split(" ");

  return (
    <section
      className="relative overflow-hidden bg-forest py-[var(--section-y)] text-white"
      aria-labelledby="bilingual-heading"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-leaf/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-lime/15 blur-3xl"
        animate={reduce ? undefined : { y: [0, -24, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-lime uppercase"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduce ? REDUCED_OPACITY : MOTION.state}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-lime"
                animate={reduce ? undefined : { scale: [1, 1.45, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              Live labels
            </motion.div>

            <motion.p
              className="text-xs font-bold tracking-[0.18em] text-lime uppercase"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, letterSpacing: "0.3em" }
              }
              whileInView={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, letterSpacing: "0.18em" }
              }
              viewport={{ once: true }}
              transition={reduce ? REDUCED_OPACITY : MOTION.text}
            >
              {COPY.bilingual.eyebrow}
            </motion.p>

            <h2
              id="bilingual-heading"
              className="font-display mt-3 text-section font-bold tracking-[-0.03em]"
            >
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-[0.28em] inline-block"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    reduce
                      ? { ...REDUCED_OPACITY, delay: i * 0.03 }
                      : { ...MOTION.text, delay: 0.08 + i * 0.045 }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
        </div>
      </Container>

      <div className="relative mt-8 border-y border-white/10 bg-deep/40">
        <LiveMarquee items={items} reduce={reduce} />
        <LiveMarquee items={items} reverse reduce={reduce} />
        <p className="sr-only">
          {items
            .map((item) =>
              item.nameZh ? `${item.name}, ${item.nameZh}` : item.name,
            )
            .join(". ")}
        </p>
      </div>

      <Container className="relative">
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <BilingualCard
              key={item.id}
              item={item}
              index={index}
              reduce={reduce}
              spotlight={spotlight === index}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
