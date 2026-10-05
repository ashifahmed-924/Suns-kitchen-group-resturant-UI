# QA summary — Sun's Kitchen Group homepage

Date: 5 October 2026  
Environment: Windows 10 · Node v24.11.1 · Next.js 16.3.8 static export · served with `npx serve out` on localhost:4173

## Implementation status

| Area | Status |
| --- | --- |
| Static export (`out/`) | Pass — `npm run build` succeeded |
| Lint | Pass — `npm run lint` clean |
| Business identity / address | Pass — Wheelers Hill, 35 Petronella Avenue |
| Menu prices + DoorDash channel + date | Pass |
| No invented phone/hours/reviews/bookings | Pass |
| Illustrative imagery labelled | Pass |
| Client islands (not whole-page client) | Pass |
| Reduced-motion / MotionConfig | Pass (`reducedMotion="user"`) |

## Visual QA (browser tools)

Checked via Cursor browser against the **static** `out/` build:

- **Mobile-width hero** (~751px): full-bleed food photo, lower-left text panel, CTAs visible, illustrative caption present.
- **Desktop 1440×900**: primary nav + Order CTA; hero composition; intro editorial split; menu filters with shared Cobalt indicator (Rice filter confirmed).
- **Dish dialog**: opens from “View dish”, shows bilingual title, DoorDash price note, “View on DoorDash”, Escape closes.
- **Horizontal overflow**: none measured at 1440px (`scrollWidth` ≈ viewport).
- **Mobile action bar**: appears after scrolling past hero; can intercept mid-viewport taps — sticky filters raised above bar (`z-30` vs `z-40` bar kept below dialogs). Extra bottom padding applied.

Widths not exhaustively screenshot-captured in this session: 360, 390, 430, 768, 820, 1024, 1280, 1920, phone landscape, short viewports. Manual checklist remains for those.

## Manual checklist before launch

1. Replace illustrative Unsplash assets with owner-approved photography.  
2. Verify hours, phone, email; publish when confirmed.  
3. Set `SITE.canonicalUrl` and switch robots from noindex.  
4. Keyboard: skip link, mobile menu Escape/focus return, dialog focus trap, gallery lightbox arrows.  
5. `prefers-reduced-motion: reduce` — no spatial hero/gallery motion.  
6. Disable JavaScript — SSR HTML still exposes menu, address, DoorDash and Maps links.  
7. Refresh deep-link behaviour on static host (`/#menu`).  
8. Recheck DoorDash prices and update `checkedAt` / price note date.

## Distinguishing complete vs unresolved

**Complete:** implementable marketing homepage, static hosting, honest content boundaries, motion system, accessibility patterns for dialogs/nav/filters.

**Unresolved for public launch:** official logo, approved photos/video, verified contact hours, production domain, catering confirmation for candidate website, map embed URL.
