import { brand, hotels } from "../site";
export default function sitemap() {
  const abs = (p) => brand.url + p;
  const images = [
    brand.seo.ogImage,
    ...hotels.flatMap((h) => h.gallery.map(([src]) => src)),
  ].map(abs);
  return [
    {
      url: brand.url + "/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [...new Set(images)],
    },
  ];
}