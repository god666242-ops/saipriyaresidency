// Structured data (JSON-LD) for Google rich results: Organization, WebSite,
// WebPage, one Hotel per property (with geo, 24h hours, amenities, rooms) and FAQPage.
const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export default function Seo({ hotels, brand, url }) {
  const base = url.replace(/\/$/, "");
  const abs = (p) => (p.startsWith("http") ? p : base + p);
  const logo = brand.seo.logo ? abs(brand.seo.logo) : null;
  const id = (k) => `${base}/#${k}`;

  const amenities = (h) =>
    [
      ...h.trust.filter((t) => !/24 hours/i.test(t)),
      "Air-conditioned rooms",
      "Non-AC rooms",
      "Attached bathroom",
      "TV in every room",
      "24-hour front desk",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    }));

  const hotelNodes = hotels.map((h) => ({
    "@type": "Hotel",
    "@id": id(h.slug),
    name: h.name,
    alternateName: h.short,
    description: `${h.name}, ${h.city}. ${h.tagline} AC and Non-AC rooms, free Wi-Fi, hot water and power backup.${h.trust.includes("Banquet hall") ? " Banquet hall available." : ""} Open 24 hours.`,
    url: base + "/",
    image: h.gallery.map(([src]) => abs(src)),
    ...(logo ? { logo } : {}),
    ...(h.phones[0] ? { telephone: h.phones[0].tel } : {}),
    contactPoint: h.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "reservations",
      areaServed: "IN",
    })),
    address: {
      "@type": "PostalAddress",
      ...(h.address ? { streetAddress: h.address } : {}),
      addressLocality: h.locality,
      addressRegion: "Andhra Pradesh",
      ...(h.pin ? { postalCode: h.pin } : {}),
      addressCountry: "IN",
    },
    ...(h.lat && h.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: h.lat,
            longitude: h.lng,
          },
        }
      : {}),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery)}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS,
      opens: "00:00",
      closes: "23:59",
    },
    amenityFeature: amenities(h),
    containsPlace: brand.rooms.map((r) => ({
      "@type": "HotelRoom",
      name: r.name,
      description: r.desc,
      bed: { "@type": "BedDetails", typeOfBed: r.beds },
      amenityFeature: r.perks.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
    })),
    parentOrganization: { "@id": id("org") },
  }));

  const graph = [
    {
      "@type": "Organization",
      "@id": id("org"),
      name: brand.name,
      url: base + "/",
      ...(logo ? { logo } : {}),
      image: abs(brand.seo.ogImage),
    },
    {
      "@type": "WebSite",
      "@id": id("website"),
      url: base + "/",
      name: brand.name,
      inLanguage: "en-IN",
      publisher: { "@id": id("org") },
    },
    {
      "@type": "WebPage",
      "@id": id("webpage"),
      url: base + "/",
      name: brand.seo.title,
      description: brand.seo.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": id("website") },
      about: hotels.map((h) => ({ "@id": id(h.slug) })),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: abs(brand.seo.ogImage),
        width: 1200,
        height: 630,
      },
    },
    ...hotelNodes,
    {
      "@type": "FAQPage",
      "@id": id("faq"),
      mainEntity: brand.faq.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}