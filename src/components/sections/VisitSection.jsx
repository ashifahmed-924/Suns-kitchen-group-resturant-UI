"use client";

import { useState } from "react";
import { Check, Copy, MapPinned } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import { BUSINESS, COPY, LINKS } from "@/data/businessData";
import { MOTION } from "@/lib/motionPresets";

export default function VisitSection() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS.formattedAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="visit"
      className="scroll-mt-24 mesh-green py-[var(--section-y)]"
      aria-labelledby="visit-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="text-xs font-bold tracking-[0.18em] text-leaf uppercase">
                Visit
              </p>
              <h2
                id="visit-heading"
                className="font-display mt-3 text-section font-bold tracking-[-0.03em] text-forest"
              >
                {COPY.visit.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <address className="mt-8 not-italic">
                <p className="font-display text-subhead font-bold text-forest">
                  {BUSINESS.name}
                </p>
                <p className="mt-3 max-w-md text-sm text-muted md:text-base lg:text-lg">
                  {BUSINESS.formattedAddress}
                </p>
              </address>
            </Reveal>

            <Reveal delay={0.18} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button type="button" variant="secondary" icon="none" onClick={copyAddress}>
                <span className="inline-flex items-center gap-2">
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? COPY.visit.copiedAddress : COPY.visit.copyAddress}
                </span>
              </Button>
              <Button href={LINKS.googleMaps.url} external icon="external">
                {COPY.visit.directions}
              </Button>
            </Reveal>

            <Reveal delay={0.24} className="mt-8 rounded-[28px] border border-border bg-foam p-6">
              <p className="text-sm font-bold text-forest">Opening hours</p>
              <p className="mt-2 text-muted">{COPY.visit.hoursFallback}</p>
              <a
                href={LINKS.googleMaps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-leaf hover:underline"
              >
                <MapPinned className="h-4 w-4" aria-hidden="true" />
                {COPY.visit.reviewsLink}
              </a>
            </Reveal>
          </div>

          <motion.div
            className="relative overflow-hidden rounded-[32px] bg-forest p-7 text-white md:p-9"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={MOTION.section}
          >
            <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-lime/25 blur-2xl" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.16em] text-lime uppercase">
              Directions
            </p>
            <p className="font-display mt-4 text-xl font-bold md:text-2xl lg:text-3xl">
              Petronella Avenue, Wheelers Hill
            </p>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              Use Google Maps for turn-by-turn directions. An embedded map will
              appear here once a permitted embed URL is confirmed.
            </p>
            <Button
              href={LINKS.googleMaps.url}
              external
              icon="external"
              variant="lime"
              className="mt-8"
            >
              Open in Google Maps
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
