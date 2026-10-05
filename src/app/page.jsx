import SiteFooter from "@/components/layout/SiteFooter";
import SiteChrome from "@/components/layout/SiteChrome";
import Hero from "@/components/sections/Hero";
import SignalStrip from "@/components/sections/SignalStrip";
import Introduction from "@/components/sections/Introduction";
import SpotlightSection from "@/components/sections/SpotlightSection";
import JourneySection from "@/components/sections/JourneySection";
import MenuSection from "@/components/sections/MenuSection";
import BilingualRibbon from "@/components/sections/BilingualRibbon";
import GallerySection from "@/components/sections/GallerySection";
import OrderSection from "@/components/sections/OrderSection";
import VisitSection from "@/components/sections/VisitSection";
import EnquirySection from "@/components/sections/EnquirySection";
import FaqSection from "@/components/sections/FaqSection";
import {
  BUSINESS,
  COPY,
  LINKS,
  SITE,
  getPublishedMenuItems,
} from "@/data/businessData";

function buildJsonLd() {
  const menuItems = getPublishedMenuItems();

  return {
    "@context": "https://schema.org",
    "@type": BUSINESS.positioning.schemaType,
    name: BUSINESS.name,
    description: COPY.meta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: "VIC",
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.coordinates.latitude,
      longitude: BUSINESS.coordinates.longitude,
    },
    ...(SITE.canonicalUrl ? { url: SITE.canonicalUrl } : {}),
    sameAs: [LINKS.facebook.url, LINKS.doorDash.url],
    hasMenu: LINKS.doorDash.url,
    servesCuisine: "Asian fusion",
    currenciesAccepted: SITE.currency,
    makesOffer: menuItems.map((item) => ({
      "@type": "Offer",
      name: item.name,
      price: item.price.toFixed(2),
      priceCurrency: item.currency,
      url: item.sourceUrl,
      description: `Price observed on ${item.priceChannel} as of ${item.checkedAt}`,
    })),
  };
}

export default function Page() {
  const jsonLd = buildJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteChrome>
        <main id="main">
          <Hero />
          <SignalStrip />
          <Introduction />
          <SpotlightSection />
          <JourneySection />
          <MenuSection />
          <BilingualRibbon />
          <GallerySection />
          <OrderSection />
          <VisitSection />
          <EnquirySection />
          <FaqSection />
        </main>
        <SiteFooter />
      </SiteChrome>
    </>
  );
}
