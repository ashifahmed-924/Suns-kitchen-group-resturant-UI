# Sun's Kitchen Group — marketing homepage

Static marketing site for **Sun's Kitchen Group**, Wheelers Hill VIC. Built with Next.js App Router (static export), React, Tailwind CSS v4, Motion and lucide-react.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run lint` | ESLint |
| `npm run build` | Production build → static files in `out/` |
| `npm run preview` | Build then serve `out/` |
| `npm run static-preview` | Serve an existing `out/` directory |

## Static hosting

```bash
npm run build
npx serve out
```

Deploy the contents of `out/` to any static host (Netlify, Cloudflare Pages, S3, nginx, etc.). No Next.js server runtime is required.

Configured in `next.config.mjs`:

- `output: 'export'`
- `images: { unoptimized: true }`

## Content editing

Primary editable source: `src/data/businessData.js`

Also see:

- `CONTENT_VERIFICATION.md` — verified vs unresolved facts
- `DESIGN_DIRECTION.md` — Porcelain Daylight art direction
- `ASSET_SOURCES.md` — image provenance and rights
- `QA_SUMMARY.md` — QA notes

## Launch blockers (owner content)

Before public launch, replace illustrative imagery, confirm hours/phone/email if available, set `SITE.canonicalUrl`, and switch robots from `noindex`.
