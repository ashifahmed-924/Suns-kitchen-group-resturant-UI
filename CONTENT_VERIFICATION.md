# Content verification — Sun's Kitchen Group (Wheelers Hill)

Research snapshot: **5 October 2026**. Recheck volatile information before public launch.

## Confirmed for publication

| Field | Value | Evidence |
| --- | --- | --- |
| Business name | Sun's Kitchen Group | Google Maps place URL; DoorDash store; Facebook page |
| Locality | Wheelers Hill, Victoria, Australia | Same |
| Address | 35 Petronella Avenue, Wheelers Hill VIC 3150 | DoorDash listing; directory corroboration; Maps place |
| Coordinates | −37.90314, 145.193711 | Embedded `!3d` / `!4d` values in the Maps place URL (not the `/@` viewport) |
| Currency / language / timezone | AUD · Australian English · Australia/Melbourne | Locale of the business |
| Positioning | Neighbourhood café with Asian-fusion food | Facebook page (Asian-fusion café); DoorDash menu mix |
| DoorDash store | https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/ | Matching address/name |
| Facebook page | https://www.facebook.com/mgacafe/ | Matching publically indexed page |
| Google Maps place | See `LINKS.googleMaps` in `src/data/businessData.js` | User-supplied reference |

### Verified menu selection (DoorDash observed prices)

Observed on DoorDash on **5 October 2026**. Delivery-platform prices — not verified dine-in prices; not proof of a complete menu.

| Dish | Chinese | AUD | Channel |
| --- | --- | --- | --- |
| Fried Rice | 炒饭 | 21.80 | DoorDash |
| Japanese Curry Rice — Chicken or Pork | 日式咖喱鸡排或猪排饭 | 22.80 | DoorDash |
| Pork Wonton with Chicken Soup — 12 pieces | 鸡汤云吞 | 20.80 | DoorDash |
| Chilli Pork Wonton — 12 pieces | 红油抄手 | 20.80 | DoorDash |

Published category labels observed on DoorDash include Entrée, Rice, Dumplings, Noodles and Brunch. Only items above are published on the site; empty categories are omitted.

## Source distinctions

- **Google Maps profile:** Complete listing content was not fully exposed during initial research automation. Do not claim all venue details were extracted directly from Google Maps.
- **DoorDash:** Confirms address match and observed menu/price channel for delivery/pickup.
- **Facebook (`mgacafe`):** Supports Asian-fusion café positioning and contact path.
- **Candidate website** https://sunskitchengroup.com.au/ — Shows a catering message but insufficient location information to conclusively establish the same branch. **Do not** use as deployment domain, enquiry destination, or evidence of catering at this venue until cross-linked or otherwise confirmed.
- **PawScapes** https://pawscapes.com.au/cafes/wheelers-hill-suns-kitchen-group — Secondary corroboration only. Pet policy, parking, accessibility and hours from this directory are **not** promoted as verified first-party claims.

## Not independently confirmed (kept null / unpublished)

- Phone number  
- Public email  
- Weekly opening hours and holiday hours  
- Current Google rating / review count  
- Reservation URL  
- Instagram / TikTok / YouTube  
- Official logo  
- Approved venue or dish photographs / video  
- Detailed service policies (parking, allergens, pets, accessibility)  
- Founding year  
- Catering packages or capacity  

Directory-reported hours (e.g. Mon–Sat 8am–4pm, Sun 9am–2pm) and a DoorDash ordering window (e.g. 8:30am–3:10pm) are **not** treated as the restaurant’s verified weekly schedule. A delivery-platform window is not opening hours.

## Rejected / out of scope

- Unrelated “Sun’s Kitchen” listings in other countries  
- Unverified older menus under other business names at the address  
- Inventing ingredients, allergens, spice levels, popularity badges or chef stories  

## Publication policy on the site

- Hours UI: “Check current opening hours on Google Maps” until verified hours exist.  
- Reviews: link to Google Maps only — no fabricated testimonials.  
- Imagery: illustrative Unsplash assets labelled as such.  
- Catering: not advertised.  
- Canonical / robots: `canonicalUrl` is null; robots set to `noindex, nofollow` until a confirmed production URL is supplied.

## Workspace audit

Workspace was empty at project start (5 October 2026). A new Next.js App Router static site was scaffolded in place. No unrelated restaurant project was overwritten.
