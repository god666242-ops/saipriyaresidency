import "./globals.css";
import Script from "next/script";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { brand, hotels } from "../site";
import Seo from "../components/Seo";

const d = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--fd",
  display: "swap",
});
const b = Public_Sans({
  subsets: ["latin"],
  variable: "--fb",
  display: "swap",
});

const { seo } = brand;
const keywords = [
  ...new Set([...hotels.flatMap((h) => h.keywords || []), ...seo.keywords]),
];

// Search Console / Bing Webmaster verification: set these env vars in production.
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata = {
  metadataBase: new URL(brand.url),
  title: { default: seo.title, template: seo.titleTemplate },
  description: seo.description,
  keywords,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  publisher: brand.name,
  category: "travel",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    images: [
      { url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, alt: seo.ogImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
  other: {
    "geo.region": seo.region,
    "geo.placename": hotels.map((h) => h.locality).join(", "),
    "format-detection": "telephone=yes",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12355b",
};

export default function L({ children }) {
  return (
    <html lang="en-IN" className="scroll-smooth scroll-pt-[70px]">
      <head>
        <link rel="preconnect" href="https://cdn.purebook.in" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.purebook.in" />
      </head>
      <body className={`${d.variable} ${b.variable}`}>
        {children}
        <Seo hotels={hotels} brand={brand} url={brand.url} />
        <Script
          src="https://cdn.purebook.in/engine.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}