"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import AccessibleDialog from "@/components/common/AccessibleDialog";
import {
  COPY,
  LINKS,
  MEDIA,
  MENU_FILTERS,
  formatAudPrice,
  getPublishedMenuItems,
} from "@/data/businessData";
import { EASE, MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

function PriceTicker({ items, reduce }) {
  const loop = [...items, ...items];

  if (reduce) {
    return (
      <p className="text-sm text-muted">
        {items.map((item) => `${item.name} ${formatAudPrice(item.price)}`).join(" · ")}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-full border border-border bg-foam/80 py-2.5">
      <div className="marquee-track" style={{ animationDuration: "26s" }} aria-hidden="true">
        {loop.map((item, index) => (
          <span
            key={`${item.id}-tick-${index}`}
            className="inline-flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            <span className="font-semibold text-forest">{item.name}</span>
            <span className="zh-label text-muted" lang="zh-Hans">
              {item.nameZh}
            </span>
            <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
              {formatAudPrice(item.price)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const noteId = useId();
  const items = getPublishedMenuItems();

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.uiGroup === filter);
  }, [filter, items]);

  useEffect(() => {
    if (visible.length === 0) {
      setActiveId(null);
      return;
    }
    setActiveId((current) =>
      visible.some((item) => item.id === current) ? current : visible[0].id,
    );
  }, [visible]);

  useEffect(() => {
    if (reduceMotion || paused || visible.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const index = visible.findIndex((item) => item.id === current);
        const next = index < 0 ? 0 : (index + 1) % visible.length;
        return visible[next].id;
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, visible]);

  const featured = visible.find((item) => item.id === activeId) || visible[0];
  const featuredImage = featured ? MEDIA.dishes[featured.imageId] : null;
  const selectedImage = selected ? MEDIA.dishes[selected.imageId] : null;
  const headingWords = COPY.menu.heading.split(" ");

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 overflow-hidden bg-mint py-[var(--section-y)]"
      aria-labelledby="menu-heading"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -right-24 h-72 w-72 rounded-full bg-sage blur-3xl"
        animate={
          reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div>
            <motion.div
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-leaf/25 bg-sage/70 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-leaf uppercase"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduceMotion ? REDUCED_OPACITY : MOTION.state}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-leaf"
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.5, 1], opacity: [1, 0.45, 1] }
                }
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              />
              Live menu
            </motion.div>

            <motion.p
              className="text-xs font-bold tracking-[0.18em] text-leaf uppercase"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, letterSpacing: "0.3em" }
              }
              whileInView={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, letterSpacing: "0.18em" }
              }
              viewport={{ once: true }}
              transition={reduceMotion ? REDUCED_OPACITY : MOTION.text}
            >
              Food
            </motion.p>

            <h2
              id="menu-heading"
              className="font-display mt-3 text-section leading-[1.08] font-bold tracking-[-0.03em] text-forest"
            >
              {headingWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-[0.28em] inline-block"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    reduceMotion
                      ? { ...REDUCED_OPACITY, delay: i * 0.03 }
                      : { ...MOTION.text, delay: 0.08 + i * 0.05 }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.p
            id={noteId}
            className="measure text-sm text-muted md:text-base lg:justify-self-end"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduceMotion ? REDUCED_OPACITY : { ...MOTION.text, delay: 0.15 }}
          >
            {COPY.menu.priceNote}
          </motion.p>
        </div>

        <div className="mt-8">
          <PriceTicker items={items} reduce={reduceMotion} />
        </div>

        <div
          className="sticky top-[4.5rem] z-30 mt-8 rounded-full border border-border bg-foam/95 p-2 shadow-lg backdrop-blur-md"
          role="group"
          aria-label="Menu filters"
        >
          <LayoutGroup id="menu-filters">
            <div className="flex flex-wrap gap-1">
              {MENU_FILTERS.map((option) => {
                const active = filter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={active}
                    className={`relative min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${
                      active ? "text-lime-ink" : "text-forest hover:bg-sage/60"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="menu-filter-pill"
                        className="absolute inset-0 rounded-full bg-lime"
                        transition={
                          reduceMotion ? REDUCED_OPACITY : MOTION.state
                        }
                      />
                    ) : null}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
        <p className="mt-3 text-xs text-muted">
          Filter labels group the verified dishes for browsing. They are not
          claimed as the merchant’s original DoorDash category assignment.
        </p>

        {visible.length === 0 ? (
          <p className="py-10 text-muted">{COPY.menu.emptyFilter}</p>
        ) : (
          <div
            className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-6"
            aria-describedby={noteId}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setPaused(false);
              }
            }}
          >
            {/* Featured stage */}
            <div className="relative overflow-hidden rounded-[32px] border border-border bg-deep text-white shadow-[0_28px_60px_rgb(15_61_36_/_0.16)]">
              <AnimatePresence mode="wait">
                {featured && featuredImage ? (
                  <motion.div
                    key={featured.id}
                    className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[32rem]"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 1.04 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.98 }
                    }
                    transition={reduceMotion ? REDUCED_OPACITY : MOTION.gallery}
                  >
                    <Image
                      src={featuredImage.path}
                      alt={featuredImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/45 to-transparent" />

                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
                      initial={
                        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduceMotion
                          ? REDUCED_OPACITY
                          : { ...MOTION.state, delay: 0.12 }
                      }
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <motion.span
                          className="rounded-full bg-lime px-3 py-1 text-sm font-bold text-lime-ink"
                          animate={
                            reduceMotion
                              ? undefined
                              : { scale: [1, 1.05, 1] }
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {formatAudPrice(featured.price)}
                        </motion.span>
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
                          {featured.priceChannel} · {featured.checkedAt}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {featured.name}
                      </h3>
                      {featured.nameZh ? (
                        <p
                          className="zh-label mt-2 text-base text-lime sm:text-lg"
                          lang="zh-Hans"
                        >
                          {featured.nameZh}
                        </p>
                      ) : null}
                      <p className="mt-3 max-w-md text-sm text-white/75">
                        {featured.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                          type="button"
                          variant="lime"
                          onClick={() => setSelected(featured)}
                        >
                          {COPY.menu.viewDish}
                        </Button>
                        <Button
                          href={featured.sourceUrl}
                          external
                          icon="external"
                          variant="inverse"
                        >
                          {COPY.menu.orderExternal}
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Progress dots for live rotation */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {visible.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.name}`}
                    aria-current={item.id === featured?.id}
                    onClick={() => setActiveId(item.id)}
                    className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                      item.id === featured?.id
                        ? "w-6 bg-lime"
                        : "w-1.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Compact list format */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
                Verified dishes
              </p>
              <ul className="flex flex-1 flex-col gap-3">
                {visible.map((item, index) => {
                  const image = MEDIA.dishes[item.imageId];
                  const isActive = item.id === featured?.id;

                  return (
                    <motion.li
                      key={item.id}
                      layout={!reduceMotion}
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: 24 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        ...(reduceMotion ? REDUCED_OPACITY : MOTION.state),
                        delay: index * 0.06,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        onDoubleClick={() => setSelected(item)}
                        className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[24px] border p-3 text-left transition-[background-color,border-color,transform] duration-300 ${
                          isActive
                            ? "border-leaf bg-sage/70 shadow-[0_14px_36px_rgb(15_61_36_/_0.08)]"
                            : "border-border bg-foam hover:border-leaf/40 hover:bg-sage/40"
                        }`}
                        aria-pressed={isActive}
                      >
                        {isActive && !reduceMotion ? (
                          <motion.span
                            layoutId="menu-active-glow"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lime/20 to-transparent"
                            transition={EASE.springSoft}
                          />
                        ) : null}

                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-20">
                          <Image
                            src={image.path}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          {isActive && !reduceMotion ? (
                            <motion.span
                              className="absolute inset-0 border-2 border-lime"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          ) : null}
                        </div>

                        <div className="relative min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-display text-base font-bold text-forest sm:text-lg">
                                {item.name}
                              </p>
                              {item.nameZh ? (
                                <p
                                  className="zh-label mt-0.5 truncate text-sm text-muted"
                                  lang="zh-Hans"
                                >
                                  {item.nameZh}
                                </p>
                              ) : null}
                            </div>
                            <motion.span
                              className="shrink-0 rounded-full bg-lime px-2.5 py-1 text-xs font-bold text-lime-ink"
                              animate={
                                isActive && !reduceMotion
                                  ? { scale: [1, 1.08, 1] }
                                  : undefined
                              }
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              {formatAudPrice(item.price)}
                            </motion.span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-xs text-muted">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <Button
                type="button"
                variant="secondary"
                className="mt-1 w-full sm:w-auto"
                onClick={() => featured && setSelected(featured)}
              >
                {COPY.menu.viewDish}
              </Button>
            </div>
          </div>
        )}

        <motion.div
          className="mt-10"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? REDUCED_OPACITY : MOTION.section}
        >
          <Button
            href={LINKS.doorDash.url}
            external
            icon="external"
            variant="primary"
          >
            {COPY.menu.fullMenuCta}
          </Button>
        </motion.div>
      </Container>

      <AccessibleDialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.name || "Dish"}
      >
        {selected && selectedImage ? (
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[24px]">
              <Image
                src={selectedImage.path}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>
            <p className="text-xs font-medium text-muted">
              Illustrative image — not a verified photograph of this dish
            </p>
            {selected.nameZh ? (
              <p className="zh-label text-base text-muted" lang="zh-Hans">
                {selected.nameZh}
              </p>
            ) : null}
            <p className="text-muted">{selected.description}</p>
            <div>
              <p className="text-lg font-bold text-forest md:text-xl lg:text-2xl">
                {formatAudPrice(selected.price)}
              </p>
              <p className="mt-1 text-sm text-muted">
                Listed on {selected.priceChannel} · checked {selected.checkedAt}
              </p>
            </div>
            <Button
              href={selected.sourceUrl}
              external
              icon="external"
              variant="lime"
            >
              {COPY.menu.orderExternal}
            </Button>
            <p className="text-xs text-muted">
              Opening DoorDash shows the store menu. This action does not
              preselect a dish.
            </p>
          </div>
        ) : null}
      </AccessibleDialog>
    </section>
  );
}
