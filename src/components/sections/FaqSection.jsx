"use client";

import { MapPinned, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { COPY, FAQ_ITEMS, LINKS } from "@/data/businessData";
import { MOTION } from "@/lib/motionPresets";

const ICONS = {
  where: MapPinned,
  menu: UtensilsCrossed,
  order: ShoppingBag,
};

const ACTIONS = {
  where: { href: LINKS.googleMaps.url, label: "Open Maps", external: true },
  menu: { href: "#menu", label: "View selection", external: false },
  order: { href: LINKS.doorDash.url, label: "Open DoorDash", external: true },
};

export default function FaqSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-mint py-[var(--section-y)]"
      aria-labelledby="faq-heading"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-leaf uppercase">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-display mt-3 text-section font-bold tracking-[-0.03em] text-forest"
          >
            {COPY.faq.heading}
          </h2>
          <p className="mt-3 text-muted">
            Quick location, menu and ordering notes — always visible, no
            accordion clicks needed.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {FAQ_ITEMS.map((item, index) => {
            const Icon = ICONS[item.id] || MapPinned;
            const action = ACTIONS[item.id];
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.li
                key={item.id}
                className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-foam p-6 shadow-[0_16px_36px_rgb(15_61_36_/_0.05)]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...MOTION.state, delay: index * 0.08 }}
              >
                <div
                  className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-leaf to-lime"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-sage text-leaf"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-xl font-bold text-sage md:text-2xl lg:text-3xl">
                    {number}
                  </span>
                </div>

                <h3 className="font-display mt-5 text-subhead leading-snug font-bold text-forest">
                  {item.question}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                  {item.answer}
                </p>

                {action ? (
                  <a
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 text-sm font-semibold text-forest transition-colors hover:border-leaf hover:text-leaf"
                  >
                    {action.label}
                  </a>
                ) : null}
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
