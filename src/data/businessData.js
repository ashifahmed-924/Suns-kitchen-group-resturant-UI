/**
 * Central editable content source for Sun's Kitchen Group (Wheelers Hill).
 * Distinguish verified facts, proposed marketing copy, and unresolved fields.
 * Never infer approval from a non-empty string — check verificationStatus + publish.
 */

export const SITE = {
  language: "en-AU",
  currency: "AUD",
  timezone: "Australia/Melbourne",
  /** Set when a confirmed production URL is supplied. */
  canonicalUrl: null,
  robots: "noindex, nofollow",
  checkedAt: "2026-10-05",
};

export const BUSINESS = {
  id: "suns-kitchen-group-wheelers-hill",
  name: "Sun's Kitchen Group",
  legalName: null,
  locality: "Wheelers Hill",
  region: "Victoria",
  country: "Australia",
  countryCode: "AU",
  postalCode: "3150",
  streetAddress: "35 Petronella Avenue",
  formattedAddress: "35 Petronella Avenue, Wheelers Hill VIC 3150",
  coordinates: {
    latitude: -37.90314,
    longitude: 145.193711,
    sourceUrl:
      "https://www.google.com/maps/place/Sun's+Kitchen+Group/@-37.9095262,145.1593166,14.71z/data=!4m6!3m5!1s0x6ad63fbf5ae757e7:0x7dd25a2c1afa6d9a!8m2!3d-37.90314!4d145.193711!16s%2Fg%2F11kr88nc10",
    checkedAt: "2026-10-05",
    verificationStatus: "verified",
    publish: true,
  },
  positioning: {
    summary:
      "A neighbourhood café in Wheelers Hill serving Asian-fusion food.",
    schemaType: "CafeOrCoffeeShop",
    verificationStatus: "verified",
    publish: true,
    sources: [
      {
        id: "facebook-mgacafe",
        label: "Facebook page",
        url: "https://www.facebook.com/mgacafe/",
        note: "Publicly indexed page describing an Asian-fusion café.",
        checkedAt: "2026-10-05",
      },
      {
        id: "doordash-store",
        label: "DoorDash listing",
        url: "https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/",
        note: "Matching delivery listing for the Wheelers Hill address.",
        checkedAt: "2026-10-05",
      },
    ],
  },
  phone: null,
  email: null,
  openingHours: [],
  holidayHours: [],
  rating: null,
  reviewCount: null,
  reservationUrl: null,
  social: {
    facebook: {
      id: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/mgacafe/",
      icon: "facebook",
      verificationStatus: "verified",
      publish: true,
      checkedAt: "2026-10-05",
    },
    instagram: null,
    tiktok: null,
    youtube: null,
  },
  logo: null,
};

export const LINKS = {
  googleMaps: {
    id: "google-maps",
    label: "Open in Google Maps",
    url: "https://www.google.com/maps/place/Sun's+Kitchen+Group/@-37.9095262,145.1593166,14.71z/data=!4m6!3m5!1s0x6ad63fbf5ae757e7:0x7dd25a2c1afa6d9a!8m2!3d-37.90314!4d145.193711!16s%2Fg%2F11kr88nc10",
    verificationStatus: "verified",
    publish: true,
    checkedAt: "2026-10-05",
  },
  doorDash: {
    id: "doordash",
    label: "Order on DoorDash",
    url: "https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/",
    verificationStatus: "verified",
    publish: true,
    checkedAt: "2026-10-05",
  },
  facebook: {
    id: "facebook-contact",
    label: "Contact via Facebook",
    url: "https://www.facebook.com/mgacafe/",
    verificationStatus: "verified",
    publish: true,
    checkedAt: "2026-10-05",
  },
  candidateWebsite: {
    id: "candidate-website",
    label: "sunskitchengroup.com.au",
    url: "https://sunskitchengroup.com.au/",
    verificationStatus: "unconfirmed",
    publish: false,
    checkedAt: "2026-10-05",
    note: "Displays a catering message but lacks conclusive branch linkage. Do not use as deployment domain or enquiry destination until confirmed.",
  },
  mapEmbed: null,
};

export const FEATURES = {
  showGallery: true,
  showVideo: false,
  showReviews: false,
  showOpeningHours: false,
  showMapEmbed: false,
  showCatering: false,
  showReservation: false,
  showPhone: false,
  showEmail: false,
  showSearch: false,
};

/** Proposed marketing copy — not attributed as first-party brand language. */
export const COPY = {
  meta: {
    title: "Sun's Kitchen Group | Wheelers Hill",
    description:
      "Neighbourhood café in Wheelers Hill, Victoria, serving Asian-fusion food. Browse a selection from the menu, order on DoorDash, or find us at 35 Petronella Avenue.",
  },
  hero: {
    eyebrow: "Wheelers Hill · Asian-fusion café",
    headlineLines: ["Fresh greens.", "Bold bowls.", "Easy order."],
    introduction:
      "Sun's Kitchen Group is a neighbourhood café in Wheelers Hill, Victoria, serving Asian-fusion food.",
    primaryCta: "Explore the menu",
    secondaryCta: "Order on DoorDash",
    locationLabel: "35 Petronella Avenue, Wheelers Hill",
  },
  signal: {
    items: [
      "Wheelers Hill VIC",
      "Asian-fusion café",
      "Order on DoorDash",
      "Rice · Wontons",
      "Petronella Avenue",
    ],
  },
  introduction: {
    eyebrow: "The neighbourhood table",
    heading: "A calm cafe stop with Asian-fusion flavour",
    paragraphs: [
      "Sun's Kitchen Group is a neighbourhood café on Petronella Avenue, offering an Asian-fusion menu that moves between rice dishes, wontons and more.",
      "Browse a verified selection below, continue ordering on DoorDash, or plan a visit using the address and Maps link.",
    ],
    chips: ["Rice dishes", "Wonton plates", "DoorDash pickup & delivery"],
  },
  spotlight: {
    eyebrow: "On the plate",
    heading: "Four dishes to start with",
    supporting:
      "A verified DoorDash selection — not the full menu. Open any dish for details.",
  },
  menu: {
    heading: "A selection from the menu",
    priceNote:
      "Prices shown were listed on DoorDash on 5 October 2026. Prices and availability may differ; check DoorDash for current details.",
    emptyFilter: "No dishes in this group yet.",
    viewDish: "View dish",
    orderExternal: "View on DoorDash",
    fullMenuCta: "Browse the full menu on DoorDash",
  },
  journey: {
    eyebrow: "How it works",
    heading: "Browse here. Order there. Visit when you can.",
    steps: [
      {
        id: "browse",
        title: "Browse the selection",
        body: "Filter the verified dishes on this page and open dish details.",
      },
      {
        id: "order",
        title: "Continue on DoorDash",
        body: "Delivery and pickup ordering happens on the matching DoorDash store.",
      },
      {
        id: "visit",
        title: "Find the café",
        body: "Use the Petronella Avenue address and Google Maps for directions.",
      },
    ],
  },
  bilingual: {
    eyebrow: "Names you’ll see",
    heading: "English + Chinese labels from the published items",
  },
  order: {
    heading: "Hungry now? Order on DoorDash",
    supporting:
      "Ordering continues on DoorDash. Availability and fees are shown there.",
    cta: "Order on DoorDash",
  },
  visit: {
    heading: "Find us in Wheelers Hill",
    hoursFallback: "Check current opening hours on Google Maps",
    copyAddress: "Copy address",
    copiedAddress: "Address copied",
    directions: "Get directions",
    reviewsLink: "Read reviews on Google Maps",
  },
  enquiry: {
    heading: "Planning a visit?",
    supporting:
      "Reach out via the matched Facebook page, or open Google Maps for directions and current details.",
    facebookCta: "Contact via Facebook",
    mapsCta: "Open in Google Maps",
  },
  faq: {
    heading: "Practical answers",
  },
  gallery: {
    heading: "Flavour, framed",
    supporting:
      "Illustrative food photography for design preview. Not photographs of this venue or verified dishes.",
  },
  footer: {
    tagline: "Neighbourhood café · Wheelers Hill",
  },
};

/**
 * Published DoorDash category labels observed at research time.
 * Only Rice and Dumplings currently have verified items in this dataset.
 */
export const PUBLISHED_MENU_CATEGORIES = [
  "Entrée",
  "Rice",
  "Dumplings",
  "Noodles",
  "Brunch",
];

/**
 * UI display groups for the verified items only.
 * These are interface groupings, not merchant category claims.
 */
export const MENU_FILTERS = [
  { id: "all", label: "All" },
  { id: "rice", label: "Rice" },
  { id: "wontons", label: "Wontons" },
];

export const MENU_ITEMS = [
  {
    id: "fried-rice",
    name: "Fried Rice",
    nameZh: "炒饭",
    description: "Fried rice.",
    price: 21.8,
    currency: "AUD",
    priceChannel: "DoorDash",
    sourceUrl:
      "https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/",
    checkedAt: "2026-10-05",
    verificationStatus: "observed-delivery",
    publish: true,
    uiGroup: "rice",
    imageId: "dish-fried-rice",
  },
  {
    id: "japanese-curry-rice",
    name: "Japanese Curry Rice — Chicken or Pork",
    nameZh: "日式咖喱鸡排或猪排饭",
    description: "Japanese curry rice with chicken or pork.",
    price: 22.8,
    currency: "AUD",
    priceChannel: "DoorDash",
    sourceUrl:
      "https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/",
    checkedAt: "2026-10-05",
    verificationStatus: "observed-delivery",
    publish: true,
    uiGroup: "rice",
    imageId: "dish-japanese-curry",
  },
  {
    id: "pork-wonton-chicken-soup",
    name: "Pork Wonton with Chicken Soup — 12 pieces",
    nameZh: "鸡汤云吞",
    description: "Pork wontons served with chicken soup, 12 pieces.",
    price: 20.8,
    currency: "AUD",
    priceChannel: "DoorDash",
    sourceUrl:
      "https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/",
    checkedAt: "2026-10-05",
    verificationStatus: "observed-delivery",
    publish: true,
    uiGroup: "wontons",
    imageId: "dish-wonton-soup",
  },
  {
    id: "chilli-pork-wonton",
    name: "Chilli Pork Wonton — 12 pieces",
    nameZh: "红油抄手",
    description: "Chilli pork wontons, 12 pieces.",
    price: 20.8,
    currency: "AUD",
    priceChannel: "DoorDash",
    sourceUrl:
      "https://www.doordash.com/store/suns-kitchen-group-wheelers-hill-38887989/",
    checkedAt: "2026-10-05",
    verificationStatus: "observed-delivery",
    publish: true,
    uiGroup: "wontons",
    imageId: "dish-chilli-wonton",
  },
];

export const MEDIA = {
  hero: {
    id: "hero-food",
    path: "/images/hero-food.jpg",
    pathMobile: "/images/hero-food-mobile.jpg",
    videoPath: "/videos/hero-loop.mp4",
    videoMime: "video/mp4",
    width: 2400,
    height: 1600,
    alt: "Illustrative live footage of Asian stir-fry cooking in a wok with flame and steam",
    caption:
      "Illustrative live food footage — not a verified video of this venue",
    representative: true,
    licence: "Mixkit License",
    source: "Mixkit — Cooking asian food (9286)",
    sourceUrl: "https://mixkit.co/free-stock-video/cooking-asian-food-9286/",
    verificationStatus: "representative",
    publish: true,
  },
  dishes: {
    "dish-fried-rice": {
      id: "dish-fried-rice",
      path: "/images/dish-fried-rice.jpg",
      width: 1200,
      height: 900,
      alt: "Illustrative photograph of fried rice in a ceramic bowl",
      caption: "Illustrative image",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
    "dish-japanese-curry": {
      id: "dish-japanese-curry",
      path: "/images/dish-japanese-curry.jpg",
      width: 1200,
      height: 900,
      alt: "Illustrative photograph of Japanese curry rice with a cutlet",
      caption: "Illustrative image",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
    "dish-wonton-soup": {
      id: "dish-wonton-soup",
      path: "/images/dish-wonton-soup.jpg",
      width: 1200,
      height: 900,
      alt: "Illustrative photograph of wontons in clear soup",
      caption: "Illustrative image",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
    "dish-chilli-wonton": {
      id: "dish-chilli-wonton",
      path: "/images/dish-chilli-wonton.jpg",
      width: 1200,
      height: 900,
      alt: "Illustrative photograph of chilli oil wontons",
      caption: "Illustrative image",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
  },
  gallery: [
    {
      id: "gallery-rice-bowl",
      path: "/images/gallery-rice-bowl.jpg",
      width: 1200,
      height: 1600,
      alt: "Illustrative tall frame of a rice bowl in daylight",
      caption: "Illustrative food photography",
      frame: "tall",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
    {
      id: "gallery-table-spread",
      path: "/images/gallery-table-spread.jpg",
      width: 1600,
      height: 1000,
      alt: "Illustrative wide frame of shared Asian dishes on a table",
      caption: "Illustrative food photography",
      frame: "wide",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
    {
      id: "gallery-dumplings",
      path: "/images/gallery-dumplings.jpg",
      width: 1000,
      height: 1000,
      alt: "Illustrative close-up of dumplings",
      caption: "Illustrative food photography",
      frame: "square",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
    {
      id: "gallery-tea-setting",
      path: "/images/gallery-tea-setting.jpg",
      width: 1000,
      height: 1250,
      alt: "Illustrative ceramic cups and tea setting",
      caption: "Illustrative still life — not this venue",
      frame: "portrait",
      representative: true,
      licence: "Unsplash License",
      source: "Unsplash",
      verificationStatus: "representative",
      publish: true,
    },
  ],
  video: null,
};

export const FAQ_ITEMS = [
  {
    id: "where",
    question: "Where is Sun's Kitchen Group?",
    answer:
      "Sun's Kitchen Group is at 35 Petronella Avenue, Wheelers Hill VIC 3150, Australia.",
  },
  {
    id: "menu",
    question: "How can I browse the full menu?",
    answer:
      "A verified selection is shown on this page. For the full current menu, prices and availability, open the matching DoorDash store listing.",
  },
  {
    id: "order",
    question: "Where does online ordering take place?",
    answer:
      "Online ordering for delivery or pickup continues on DoorDash. This website does not process orders or payments.",
  },
];

export const NAV_LINKS = [
  { id: "menu", label: "Menu", href: "#menu" },
  { id: "gallery", label: "Gallery", href: "#gallery", featureFlag: "showGallery" },
  { id: "visit", label: "Visit", href: "#visit" },
];

export function formatAudPrice(amount) {
  const formatted = Number(amount).toFixed(2);
  return `A$${formatted}`;
}

export function getPublishedMenuItems() {
  return MENU_ITEMS.filter((item) => item.publish);
}

export function getPublishedGallery() {
  return MEDIA.gallery.filter((item) => item.publish);
}

export function getNavLinks() {
  return NAV_LINKS.filter((link) => {
    if (!link.featureFlag) return true;
    return FEATURES[link.featureFlag] === true;
  });
}

/** Published social profiles only — never invent unverified network URLs. */
export function getPublishedSocialLinks() {
  return Object.values(BUSINESS.social).filter(
    (item) => item && item.publish && item.url,
  );
}
