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
export const metadata = {
  metadataBase: new URL(brand.url),
  title: `${brand.name} | Mangalagiri and Nellore`,
  description: brand.desc,
  openGraph: {
    title: brand.name,
    description: brand.desc,
    images: [hotels[0].image],
    locale: "en_IN",
    type: "website",
  },
};
export const viewport = { width: "device-width", initialScale: 1 };
export default function L({ children }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-[70px]">
      <body className={`${d.variable} ${b.variable}`}>
        {children}
        <Seo hotels={hotels} url={brand.url} />
        <Script
          src="https://cdn.purebook.in/engine.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
