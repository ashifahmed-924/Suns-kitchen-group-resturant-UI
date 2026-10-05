"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import ContactForm from "@/components/common/ContactForm";
import { COPY, LINKS } from "@/data/businessData";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

export default function EnquirySection() {
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { ...REDUCED_OPACITY, delay } }
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          transition: { ...MOTION.section, delay },
        };

  return (
    <section
      id="enquiry"
      className="relative scroll-mt-24 overflow-hidden bg-forest py-[var(--section-y)] text-white"
      aria-labelledby="enquiry-heading"
    >
      <motion.div
        className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-leaf/40 blur-3xl"
        aria-hidden="true"
        animate={
          reduce
            ? undefined
            : { x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-4rem] bottom-[-3rem] h-80 w-80 rounded-full bg-lime/25 blur-3xl"
        aria-hidden="true"
        animate={
          reduce
            ? undefined
            : { x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.18, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-leaf/20 blur-2xl"
        aria-hidden="true"
        animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
          <div>
            <motion.p
              className="text-xs font-bold tracking-[0.18em] text-lime uppercase"
              {...fade(0)}
              viewport={{ once: true }}
            >
              Contact us
            </motion.p>
            <motion.h2
              id="enquiry-heading"
              className="font-display mt-3 text-section font-bold tracking-[-0.03em] text-white"
              {...fade(0.08)}
              viewport={{ once: true }}
            >
              {COPY.enquiry.heading}
            </motion.h2>
            <motion.p
              className="measure mt-4 text-white/80"
              {...fade(0.16)}
              viewport={{ once: true }}
            >
              {COPY.enquiry.supporting}
            </motion.p>
            <motion.p
              className="measure mt-3 text-sm text-white/65"
              {...fade(0.22)}
              viewport={{ once: true }}
            >
              Use the form to prepare your enquiry, then continue on Facebook.
              Maps is available if you need directions instead.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              {...fade(0.3)}
              viewport={{ once: true }}
            >
              <Button
                href={LINKS.facebook.url}
                external
                icon="external"
                variant="lime"
              >
                {COPY.enquiry.facebookCta}
              </Button>
              <Button
                href={LINKS.googleMaps.url}
                external
                icon="external"
                variant="ghost"
                className="border border-white/25 text-white hover:border-lime hover:bg-white/10 hover:text-lime"
              >
                {COPY.enquiry.mapsCta}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: 48, scale: 0.96, rotate: 1.5 }
            }
            whileInView={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, x: 0, scale: 1, rotate: 0 }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={reduce ? REDUCED_OPACITY : { ...MOTION.section, delay: 0.18 }}
          >
            <ContactForm tone="onGreen" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
