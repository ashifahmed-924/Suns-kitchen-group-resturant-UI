import { Bricolage_Grotesque, Manrope } from "next/font/google";
import MotionProvider from "@/components/common/MotionProvider";
import { BUSINESS, COPY, SITE } from "@/data/businessData";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: COPY.meta.title,
  description: COPY.meta.description,
  robots: SITE.robots,
  openGraph: {
    title: COPY.meta.title,
    description: COPY.meta.description,
    locale: "en_AU",
    type: "website",
    siteName: BUSINESS.name,
  },
  alternates: SITE.canonicalUrl
    ? { canonical: SITE.canonicalUrl }
    : undefined,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang={SITE.language}
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-mint font-sans text-forest">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
