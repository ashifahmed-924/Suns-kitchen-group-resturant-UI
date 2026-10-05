"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { BUSINESS, LINKS, getNavLinks } from "@/data/businessData";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

export default function SiteHeader({ onMobileNavChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const navLinks = getNavLinks();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    onMobileNavChange?.(open);
  }, [open, onMobileNavChange]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a, button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-mint/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={MOTION.heroReveal}
    >
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3 md:min-h-[4.75rem]">
        <a
          href="#top"
          className={`font-display text-base font-bold tracking-tight md:text-lg lg:text-xl ${
            scrolled ? "text-forest" : "text-white"
          }`}
        >
          {BUSINESS.name}
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-lime align-middle" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                scrolled
                  ? "text-forest hover:text-leaf"
                  : "text-white/90 hover:text-lime"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button href={LINKS.doorDash.url} external icon="external" variant="lime">
            Order on DoorDash
          </Button>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border lg:hidden ${
            scrolled
              ? "border-border bg-foam text-forest"
              : "border-white/35 bg-white/10 text-white"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            ref={panelRef}
            className="border-t border-border bg-mint lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduce ? REDUCED_OPACITY : MOTION.state}
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="rounded-2xl px-3 py-3 text-base font-semibold text-forest hover:bg-sage/70"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  href={LINKS.doorDash.url}
                  external
                  icon="external"
                  variant="lime"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Order on DoorDash
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
