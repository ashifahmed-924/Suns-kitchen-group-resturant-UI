"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import {
  BUSINESS,
  COPY,
  LINKS,
  getNavLinks,
} from "@/data/businessData";
import { MOTION } from "@/lib/motionPresets";

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.09 16.06 2 14.89 2 12.3 2 10.5 3.7 10.5 6.61V9.5H8v4h2.5V22h3.5z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.75 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 6z" />
    </svg>
  );
}

function YoutubeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.2 3.5-6.2 3.5z" />
    </svg>
  );
}

function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.12v-3.57a6.27 6.27 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.43a8.16 8.16 0 0 0 4.76 1.52V7.51a4.85 4.85 0 0 1-1-.82Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
};

/** Icons shown in the footer. Only entries with a url are clickable. */
const DISPLAY_SOCIAL = [
  {
    id: "facebook",
    label: "Facebook",
    icon: "facebook",
    url: "https://www.facebook.com/mgacafe/",
  },
  { id: "instagram", label: "Instagram", icon: "instagram", url: null },
  { id: "tiktok", label: "TikTok", icon: "tiktok", url: null },
  { id: "youtube", label: "YouTube", icon: "youtube", url: null },
];

export default function SiteFooter() {
  const navLinks = getNavLinks();
  const reduce = useReducedMotion();

  return (
    <footer className="bg-deep text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={MOTION.section}
        >
          <p className="font-display text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
            {BUSINESS.name}
            <span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-lime align-middle" />
          </p>
          <p className="mt-3 max-w-sm text-sm text-white/65">
            {COPY.footer.tagline}
          </p>
          <p className="mt-4 text-sm text-white/80">
            {BUSINESS.formattedAddress}
          </p>

          <div className="mt-6">
              <p className="text-xs font-bold tracking-[0.16em] text-lime uppercase">
                Social
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {DISPLAY_SOCIAL.map((item) => {
                  const Icon = SOCIAL_ICONS[item.icon] || FacebookIcon;
                  const linked = Boolean(item.url);

                  return (
                    <li key={item.id}>
                      {linked ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.label} (opens in a new tab)`}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-lime hover:bg-lime hover:text-lime-ink"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ) : (
                        <span
                          aria-label={`${item.label} icon`}
                          title={item.label}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 text-white/85"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
        </motion.div>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-lime uppercase">
            On this page
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="text-sm text-white/80 transition-colors hover:text-lime"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:items-start lg:items-end">
          <Button
            href={LINKS.doorDash.url}
            external
            icon="external"
            variant="lime"
          >
            Order on DoorDash
          </Button>
          <Button
            href={LINKS.googleMaps.url}
            external
            icon="external"
            variant="ghost"
            className="border border-white/20 text-white hover:bg-white/10 hover:text-lime"
          >
            Open in Google Maps
          </Button>
          <Button
            href={LINKS.facebook.url}
            external
            icon="external"
            variant="ghost"
            className="border border-white/20 text-white hover:bg-white/10 hover:text-lime"
          >
            Contact via Facebook
          </Button>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© 2026 {BUSINESS.name}. Marketing preview.</p>
          <p>Wheelers Hill, Victoria, Australia</p>
        </Container>
      </div>
    </footer>
  );
}
