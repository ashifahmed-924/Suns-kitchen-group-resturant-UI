"use client";

import { COPY } from "@/data/businessData";

export default function SignalStrip() {
  const items = [...COPY.signal.items, ...COPY.signal.items];

  return (
    <section
      className="overflow-hidden border-y border-border bg-forest py-4 text-lime"
      aria-label="Quick facts"
    >
      <div className="marquee-track" aria-hidden="true">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.08em] uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            {item}
          </span>
        ))}
      </div>
      <p className="sr-only">{COPY.signal.items.join(". ")}</p>
    </section>
  );
}
