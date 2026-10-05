"use client";

import SiteHeader from "@/components/layout/SiteHeader";

export default function SiteChrome({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
