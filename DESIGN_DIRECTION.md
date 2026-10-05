# Design direction — Verdant Kinetic

Updated art direction for the Sun's Kitchen Group homepage (October 2026 redesign). Proposed marketing design — not an official brand claim.

## Pattern

**Verdant Kinetic Kitchen** — a 2025/26 hospitality homepage pattern combining:

- Soft mint canvas with deep forest surfaces
- Lime accent CTAs and kinetic headline reveals
- Scroll-triggered section entrances on every block
- Spotlight bento of dishes + journey steps + bilingual ribbon
- Pill/capsule controls instead of hard rectangles
- Mesh gradients and restrained noise (static)

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| Mint | `#F3FAF4` | Page canvas |
| Foam | `#FFFFFF` | Cards / panels |
| Sage | `#D7EBDA` | Soft supporting bands |
| Leaf | `#2F8F4E` | Primary actions |
| Forest | `#0F3D24` | Headings / dark panels |
| Deep | `#072416` | Hero/footer ink |
| Lime | `#C6F255` | High-energy accent |
| Muted | `#5D7464` | Secondary text |
| Border | `#C9DECE` | Hairlines |

## New section stack

1. Hero (kinetic type + live paths panel)  
2. Signal marquee strip  
3. Introduction + chips  
4. Spotlight dish grid  
5. Journey (browse → order → visit)  
6. Interactive menu  
7. Bilingual ribbon  
8. Gallery contact sheet  
9. Order CTA island  
10. Visit panel  
11. Enquiry  
12. FAQ  

## Motion

Every section uses `Reveal`, stagger, hover lift, shared filter pill, clip/aperture media, or springy button feedback. `MotionConfig reducedMotion="user"` remains. Marquee pauses under `prefers-reduced-motion`.
