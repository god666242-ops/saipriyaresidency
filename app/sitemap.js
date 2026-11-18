import { brand } from "../site";
export default function sitemap() {
  return [{ url: brand.url, lastModified: new Date() }];
}
