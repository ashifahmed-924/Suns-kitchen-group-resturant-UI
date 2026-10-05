"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { COPY, LINKS } from "@/data/businessData";
import { MOTION } from "@/lib/motionPresets";

export default function OrderSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="order"
      className="scroll-mt-24 overflow-hidden bg-leaf py-14 text-white md:py-16"
      aria-labelledby="order-heading"
    >
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[32px] bg-deep px-6 py-10 md:px-12 md:py-14"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={MOTION.section}
        >
          <div
            className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-lime/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-leaf/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.18em] text-lime uppercase">
                Order
              </p>
              <h2
                id="order-heading"
                className="font-display mt-3 text-section font-bold tracking-[-0.03em]"
              >
                {COPY.order.heading}
              </h2>
              <p className="mt-3 text-white/75">{COPY.order.supporting}</p>
            </div>
            <Button href={LINKS.doorDash.url} external icon="external" variant="lime">
              {COPY.order.cta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
