"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShoppingBag, MapPinned, UtensilsCrossed } from "lucide-react";
import Container from "@/components/common/Container";
import { COPY } from "@/data/businessData";
import { EASE, MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

const ICONS = {
  browse: UtensilsCrossed,
  order: ShoppingBag,
  visit: MapPinned,
};

const cardVariants = {
  hidden: (reduce) =>
    reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 40, scale: 0.94, rotateX: 8 },
  show: (reduce) =>
    reduce
      ? { opacity: 1, transition: REDUCED_OPACITY }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            ...MOTION.section,
            staggerChildren: 0.08,
            delayChildren: 0.12,
          },
        },
};

const itemVariants = {
  hidden: (reduce) => (reduce ? { opacity: 0 } : { opacity: 0, y: 16 }),
  show: (reduce) =>
    reduce
      ? { opacity: 1, transition: REDUCED_OPACITY }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: EASE.out },
        },
};

const iconVariants = {
  hidden: (reduce) =>
    reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -18 },
  show: (reduce) =>
    reduce
      ? { opacity: 1, transition: REDUCED_OPACITY }
      : {
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: EASE.spring,
        },
};

function JourneyCard({ step, index, reduce, active = false }) {
  const Icon = ICONS[step.id] || UtensilsCrossed;

  return (
    <motion.div
      className={`relative h-full overflow-hidden rounded-[28px] border border-border bg-foam p-6 shadow-[0_20px_50px_rgb(15_61_36_/_0.06)] transition-[transform,box-shadow] duration-300 ${
        active ? "scale-[1.02] shadow-[0_24px_56px_rgb(15_61_36_/_0.12)]" : ""
      }`}
      style={{ transformPerspective: 900 }}
      custom={reduce}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reduce ? undefined : { y: -8, transition: MOTION.control }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-lime/30 blur-2xl"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...MOTION.section, delay: 0.2 + index * 0.08 }}
      />

      <motion.span
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-lime-ink"
        custom={reduce}
        variants={iconVariants}
        whileHover={reduce ? undefined : { rotate: -10, scale: 1.08 }}
        transition={MOTION.control}
      >
        <motion.span
          className="inline-flex"
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.35,
          }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </motion.span>

      <motion.p
        className="mt-5 text-xs font-bold tracking-[0.14em] text-muted uppercase"
        custom={reduce}
        variants={itemVariants}
      >
        Step {index + 1}
      </motion.p>

      <motion.h3
        className="font-display mt-2 text-subhead font-bold text-forest"
        custom={reduce}
        variants={itemVariants}
      >
        {step.title}
      </motion.h3>

      <motion.p
        className="mt-3 text-sm text-muted md:text-base"
        custom={reduce}
        variants={itemVariants}
      >
        {step.body}
      </motion.p>
    </motion.div>
  );
}

function HeadingBlock({ reduce }) {
  const words = COPY.journey.heading.split(" ");

  return (
    <div className="max-w-2xl">
      <motion.p
        className="text-xs font-bold tracking-[0.18em] text-leaf uppercase"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, letterSpacing: "0.32em" }}
        whileInView={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, y: 0, letterSpacing: "0.18em" }
        }
        viewport={{ once: true }}
        transition={reduce ? REDUCED_OPACITY : { ...MOTION.text, delay: 0.05 }}
      >
        {COPY.journey.eyebrow}
      </motion.p>

      <h2
        id="journey-heading"
        className="font-display mt-3 text-section leading-[1.08] font-bold tracking-[-0.03em] text-forest"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="mr-[0.28em] inline-block"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={
              reduce
                ? { ...REDUCED_OPACITY, delay: i * 0.03 }
                : { ...MOTION.text, delay: 0.12 + i * 0.05 }
            }
          >
            {word}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

export default function JourneySection() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const steps = COPY.journey.steps;

  const syncActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector("[data-journey-slide]");
    if (!slide) return;
    const gap = 16;
    const width = slide.getBoundingClientRect().width + gap;
    if (width <= 0) return;
    const next = Math.round(el.scrollLeft / width);
    setActive(Math.max(0, Math.min(steps.length - 1, next)));
  }, [steps.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncActive();
    el.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      el.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive]);

  const goTo = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector("[data-journey-slide]");
    if (!slide) return;
    const gap = 16;
    const width = slide.getBoundingClientRect().width + gap;
    el.scrollTo({
      left: width * index,
      behavior: reduce ? "auto" : "smooth",
    });
    setActive(index);
  };

  return (
    <section
      className="relative overflow-hidden bg-sage/50 py-[var(--section-y)]"
      aria-labelledby="journey-heading"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-leaf/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, 16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-lime/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, -18, 0], y: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative">
        <HeadingBlock reduce={reduce} />

        {/* Mobile swipe carousel */}
        <div className="mt-10 md:hidden">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label={COPY.journey.eyebrow}
            tabIndex={0}
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                data-journey-slide
                className="w-[85%] shrink-0 snap-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${steps.length}`}
              >
                <JourneyCard
                  step={step}
                  index={index}
                  reduce={reduce}
                  active={active === index}
                />
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="How it works steps"
          >
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Go to step ${index + 1}`}
                onClick={() => goTo(index)}
                className="relative h-2.5 overflow-hidden rounded-full bg-border"
                animate={{
                  width: active === index ? 28 : 10,
                  backgroundColor:
                    active === index ? "var(--leaf)" : "var(--border)",
                }}
                transition={EASE.springSoft}
                whileTap={reduce ? undefined : { scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Tablet / desktop grid + connector */}
        <div className="relative mt-12 hidden md:block">
          <motion.div
            aria-hidden="true"
            className="absolute top-[3.25rem] right-[12%] left-[12%] h-[2px] origin-left bg-border"
            initial={reduce ? { opacity: 0 } : { scaleX: 0, opacity: 0.4 }}
            whileInView={
              reduce ? { opacity: 1 } : { scaleX: 1, opacity: 1 }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={
              reduce
                ? REDUCED_OPACITY
                : { duration: 0.9, ease: EASE.out, delay: 0.25 }
            }
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-[3.25rem] right-[12%] left-[12%] h-[2px] origin-left bg-leaf"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: EASE.out, delay: 0.45 }}
          />

          <ol className="relative grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.id} className="relative">
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-3 left-6 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-lime"
                  initial={
                    reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 8 }
                  }
                  whileInView={
                    reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
                  }
                  viewport={{ once: true }}
                  transition={{
                    ...(reduce ? REDUCED_OPACITY : EASE.spring),
                    delay: 0.35 + index * 0.12,
                  }}
                >
                  {index + 1}
                </motion.span>
                <JourneyCard step={step} index={index} reduce={reduce} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
