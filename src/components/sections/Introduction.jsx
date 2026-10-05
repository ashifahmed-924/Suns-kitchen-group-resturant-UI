"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { COPY } from "@/data/businessData";
import { MOTION } from "@/lib/motionPresets";

export default function Introduction() {
  const reduce = useReducedMotion();

  return (
    <section
      className="mesh-green relative overflow-hidden py-[var(--section-y)]"
      aria-labelledby="intro-heading"
    >
      <div className="noise-soft absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.18em] text-leaf uppercase">
              {COPY.introduction.eyebrow}
            </p>
            <h2
              id="intro-heading"
              className="font-display mt-4 max-w-md text-section leading-[1.08] font-bold tracking-[-0.03em] text-forest"
            >
              {COPY.introduction.heading}
            </h2>
          </Reveal>

          <div className="space-y-5">
            {COPY.introduction.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.08 * (index + 1)}>
                <p className="measure text-sm text-muted md:text-base lg:text-lg">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.28}>
              <div className="flex flex-wrap gap-2 pt-2">
                {COPY.introduction.chips.map((chip, index) => (
                  <motion.span
                    key={chip}
                    className="rounded-full border border-border bg-foam px-4 py-2 text-sm font-semibold text-forest shadow-sm"
                    whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
                    transition={MOTION.control}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    custom={index}
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
