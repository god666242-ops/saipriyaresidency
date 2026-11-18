import { brand } from "../site";
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: brand.url + "/sitemap.xml",
  };
}
