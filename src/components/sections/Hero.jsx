"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Sparkles } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import StaggerLines from "@/components/common/StaggerLines";
import HeroBackgroundVideo from "@/components/sections/HeroBackgroundVideo";
import { BUSINESS, COPY, LINKS, MEDIA } from "@/data/businessData";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

export default function Hero() {
  const reduce = useReducedMotion();
  const hero = MEDIA.hero;

  return (
    <section
      id="top"
      className="relative isolate min-h-[min(100svh,980px)] overflow-hidden bg-deep text-white"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0"
        initial={
          reduce
            ? false
            : { scale: 1.08, filter: "brightness(0.75)" }
        }
        animate={
          reduce
            ? { opacity: 1 }
            : { scale: 1, filter: "brightness(1)" }
        }
        transition={reduce ? REDUCED_OPACITY : MOTION.heroReveal}
      >
        <HeroBackgroundVideo hero={hero} />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep via-deep/55 to-forest/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgb(198_242_85_/_0.22),transparent_40%)]"
          aria-hidden="true"
        />
      </motion.div>

      <Container className="relative z-10 flex min-h-[min(100svh,980px)] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-lime uppercase backdrop-blur-sm"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={MOTION.state}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {COPY.hero.eyebrow}
            </motion.p>

            <StaggerLines
              lines={COPY.hero.headlineLines}
              className="font-display mt-5 text-hero leading-[0.95] font-bold tracking-[-0.04em]"
            />
            <span id="hero-heading" className="sr-only">
              {COPY.hero.headlineLines.join(" ")}
            </span>

            <motion.p
              className="measure mt-5 text-sm text-white/85 md:text-base lg:text-lg"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...MOTION.state, delay: 0.35 }}
            >
              {COPY.hero.introduction}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...MOTION.state, delay: 0.45 }}
            >
              <Button href="#menu" variant="lime">
                {COPY.hero.primaryCta}
              </Button>
              <Button
                href={LINKS.doorDash.url}
                external
                icon="external"
                variant="secondary"
                className="border-white/25 bg-white/10 text-white hover:border-lime hover:text-lime"
              >
                {COPY.hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.a
              href={LINKS.googleMaps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/75 hover:text-lime"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {COPY.hero.locationLabel}
            </motion.a>
          </div>

          <motion.div
            className="relative hidden overflow-hidden rounded-[32px] border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:block"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ ...MOTION.heroReveal, delay: 0.2 }}
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-lime uppercase">
              Live paths
            </p>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Browse menu", href: "#menu" },
                { label: "Order on DoorDash", href: LINKS.doorDash.url, external: true },
                { label: "Get directions", href: LINKS.googleMaps.url, external: true },
              ].map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center justify-between rounded-2xl bg-deep/40 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf"
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-white/55">
              {BUSINESS.name} · {BUSINESS.locality}
            </p>
            <p className="mt-2 text-xs text-white/45">{hero.caption}</p>
          </motion.div>
        </div>
        <p className="mt-6 text-xs text-white/45 lg:hidden">{hero.caption}</p>
      </Container>
    </section>
  );
}
