export default function Seo({ hotels, url }) {
  const j = hotels.map(h => ({ "@context": "https://schema.org", "@type": "Hotel", name: h.name, url, image: url.replace(/\/$/, "") + h.image, ...(h.phones[0] ? { telephone: h.phones[0].tel } : {}),
    address: { "@type": "PostalAddress", ...(h.address ? { streetAddress: h.address } : {}), addressLocality: h.locality, addressRegion: "Andhra Pradesh", ...(h.pin ? { postalCode: h.pin } : {}), addressCountry: "IN" } }));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />;
}
