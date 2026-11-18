"use client";
import { useRef, useState } from "react";
import { brand as s, hotels } from "../site";
import Image from "next/image";
import Img from "../components/Img";
import Widget from "../components/Widget";
import Faq from "../components/Faq";
import Map from "../components/Map";

const first = hotels.find((h) => h.phones.length);
const nearbyHotels = hotels.filter((h) => h.nearby && h.nearby.length > 0);
const links = [
  ["Rooms", "rooms"],
  ["Facilities", "facilities"],
  ...(nearbyHotels.length ? [["Nearby", "nearby"]] : []),
  ["Photos", "photos"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
];

/* Shared style tokens */
const WRAP = "mx-auto max-w-[1140px] px-5 py-[52px] md:px-[22px] md:py-[72px]";
const H2 =
  "font-fd text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-rail";
const SH = "mb-[34px] max-w-[640px]";
const SH_P = "mt-2.5 text-mut";
const PH = "relative overflow-hidden bg-[#d6dee8]"; // image placeholder base

/* Styles for the Faq component's <details>/<summary> markup */
const FAQ_STYLES =
  "[&_details]:border-t [&_details]:border-line [&_details]:py-[18px] [&_details:last-child]:border-b " +
  "[&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:justify-between [&_summary]:gap-4 [&_summary]:text-lg [&_summary]:font-semibold " +
  "[&_summary::-webkit-details-marker]:hidden " +
  "[&_summary]:after:text-[26px] [&_summary]:after:leading-none [&_summary]:after:text-rail [&_summary]:after:content-['+'] " +
  "[&_details[open]_summary]:after:content-['−'] " +
  "[&_p]:mt-2.5 [&_p]:max-w-[680px] [&_p]:text-mut";

/* Reusable hotel switch: sliding pill, keyboard accessible */
function HotelSwitch({ items, active, onChange, label, className = "" }) {
  const refs = useRef([]);
  const n = items.length;
  if (n < 2) return null;

  const go = (i) => {
    const next = (i + n) % n;
    onChange(next);
    refs.current[next]?.focus();
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(n - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`relative grid w-full auto-cols-fr grid-flow-col rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200 sm:w-fit sm:min-w-[22rem] ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-rail shadow-md transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 0.5rem) / ${n})`,
          transform: `translateX(${active * 100}%)`,
        }}
      />
      {items.map((h, i) => {
        const isActive = i === active;
        return (
          <button
            key={h.slug}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(i)}
            className={`relative z-10 flex flex-col items-center justify-center rounded-full px-4 py-2 text-center leading-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="text-sm font-semibold">{h.short || h.name}</span>
            <span
              className={`text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 ${
                isActive ? "text-sky-200" : "text-slate-400"
              }`}
            >
              {h.locality}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function P() {
  const [activeNearby, setActiveNearby] = useState(0);
  const currentHotel = nearbyHotels[activeNearby] || nearbyHotels[0];
  const [activeUses, setActiveUses] = useState(0);
  const currentUsesHotel = hotels[activeUses] || hotels[0];
  const [activeGallery, setActiveGallery] = useState(0);
  const currentGallery = hotels[activeGallery] || hotels[0];
  const [activeContact, setActiveContact] = useState(0);
  const currentContact = hotels[activeContact] || hotels[0];

  return (
    <div className="bg-white font-fb text-[17px] leading-[1.65] text-ink [&_a:focus-visible]:outline [&_a:focus-visible]:outline-[3px] [&_a:focus-visible]:outline-offset-[3px] [&_a:focus-visible]:outline-sun">
      {/* Top sign bar */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 bg-sun px-[22px] py-2 text-sm font-semibold text-[#111] md:flex-nowrap md:justify-between">
        <div className="flex flex-wrap gap-x-[22px] gap-y-1">
          {hotels.map((h) => (
            <a key={h.slug} href="#book" className="hover:underline">
              {h.name}, {h.locality}
            </a>
          ))}
        </div>
        {first && (
          <a href={`tel:${first.phones[0].tel}`}>Call {first.phones[0].show}</a>
        )}
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-20 flex items-center gap-7 border-b border-line bg-white/95 px-[22px] py-3.5 backdrop-blur-md">
        <a
          href="#top"
          className="font-fd text-[22px] font-extrabold tracking-[-0.02em] text-rail"
        >
          {s.short}
        </a>
        <nav
          aria-label="Sections"
          className="ml-auto hidden gap-[22px] text-[15px] font-medium md:flex"
        >
          {links.map(([t, id]) => (
            <a key={id} href={"#" + id} className="text-mut hover:text-ink">
              {t}
            </a>
          ))}
        </nav>
        <a
          href={first ? `tel:${first.phones[0].tel}` : "#book"}
          className="ml-auto rounded-lg bg-rail px-5 py-[9px] text-[15px] font-semibold text-white md:ml-0"
        >
          Call us
        </a>
      </header>

      <main id="top">
        {/* Hero */}
        <section
          id="book"
          className="mx-auto max-w-[1140px] px-5 pb-14 pt-[30px] md:px-[22px] md:pt-12"
        >
          <h1 className="font-fd text-[clamp(38px,5.4vw,66px)] font-extrabold leading-[1.04] tracking-[-0.02em] text-rail">
            {s.headline}
          </h1>
          <p className="mt-5 max-w-[640px] text-[19px] text-mut">{s.tag}</p>
          <div className="mt-[34px] grid gap-6 md:grid-cols-2">
            {hotels.map((h) => (
              <article
                key={h.slug}
                className="flex flex-col overflow-hidden rounded-md border border-line bg-white"
              >
                <Img
                  src={h.image}
                  alt={h.name}
                  pos={h.imagePos}
                  className={`${PH} h-[260px] md:h-[340px]`}
                  sizes="(max-width:900px) 100vw, 50vw"
                  priority
                />
                <div className="flex flex-1 flex-col p-6">
                  <small className="font-semibold text-mut">{h.city}</small>
                  <h2 className="mb-2 mt-1 font-fd text-[clamp(26px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-rail">
                    {h.name}
                  </h2>
                  <p className="text-mut">{h.tagline}</p>
                  <ul className="mb-[22px] mt-4 flex list-none flex-wrap gap-x-[22px] gap-y-2 text-[15px] text-mut">
                    {h.trust.map((t) => (
                      <li
                        key={t}
                        className="before:mr-2 before:font-extrabold before:text-rail before:content-['✓']"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-3.5">
                    <Widget
                      slug={h.slug}
                      primary={s.embed.primary}
                      theme={s.embed.theme}
                      label={s.embed.label}
                    />
                    <a
                      href="#rooms"
                      className="font-semibold text-rail underline underline-offset-4"
                    >
                      See rooms
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 bg-rail text-white md:grid-cols-4">
          {s.stats.map(([a, b]) => (
            <div
              key={b}
              className="flex flex-col border-l border-white/[0.18] px-[22px] py-[30px] first:border-l-0 [&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l"
            >
              <b className="font-fd text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-sun">
                {a}
              </b>
              <span className="mt-1 text-sm text-[#c6d4e4]">{b}</span>
            </div>
          ))}
        </section>

        {/* About */}
        <section className={`${WRAP} grid items-center gap-14 md:grid-cols-[1fr_1.1fr]`}>
          <div className="grid grid-cols-2 gap-3.5">
            <Img
              src={s.aboutImages[0][0]}
              alt={s.aboutImages[0][1]}
              className={`${PH} mt-10 h-60 md:h-[380px]`}
              sizes="30vw"
            />
            <Img
              src={s.aboutImages[1][0]}
              alt={s.aboutImages[1][1]}
              className={`${PH} h-60 md:h-[380px]`}
              sizes="30vw"
            />
          </div>
          <div>
            <h2 className={`${H2} mb-1.5`}>A plain, honest place to stay</h2>
            {s.about.map((p) => (
              <p key={p} className="mt-3.5 text-mut">
                {p}
              </p>
            ))}
            <ul className="mt-[22px] list-none border-t border-line">
              {s.why.map((w) => (
                <li
                  key={w}
                  className="relative border-b border-line py-3 pl-[30px] before:absolute before:left-0 before:font-extrabold before:text-rail before:content-['✓']"
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Rooms */}
        <section className={WRAP} id="rooms">
          <div className={SH}>
            <h2 className={H2}>Rooms</h2>
            <p className={SH_P}>
              Three room types, the same at both hotels. See live rates in the
              booking window.
            </p>
          </div>
          {s.rooms.map((r, i) => (
            <article
              key={r.name}
              className="grid items-center gap-11 border-t border-line py-[34px] md:grid-cols-[1.1fr_1fr]"
            >
              <Img
                src={r.img}
                pos={r.pos}
                alt={r.name}
                className={`${PH} h-[280px] rounded-md md:h-[400px] ${i % 2 ? "md:order-2" : ""}`}
                sizes="(max-width:800px) 100vw, 45vw"
              />
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-[3px] text-[13px] font-bold ${
                    r.ac ? "bg-[#dff0ff] text-rail" : "bg-soft text-mut"
                  }`}
                >
                  {r.ac ? "AC" : "Non-AC"}
                </span>
                <h3 className="mb-2 mt-2.5 font-fd text-[30px] font-bold tracking-[-0.02em]">
                  {r.name}
                </h3>
                <p className="text-mut">{r.desc}</p>
                <dl className="my-4 flex gap-9">
                  <div>
                    <dt className="text-[13px] text-mut">Bed</dt>
                    <dd className="font-semibold">{r.beds}</dd>
                  </div>
                </dl>
                <ul className="flex list-none flex-wrap gap-2">
                  {r.perks.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-line px-3 py-1 text-sm"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        {/* Location & Landmarks */}
        {nearbyHotels.length > 0 && currentHotel && (
          <section className="bg-slate-50 py-16 sm:py-24" id="nearby">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Location &amp; Landmarks
                </span>
                <h2 className="mt-2 font-fd text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Around {currentHotel.name}
                </h2>
                {currentHotel.nearbyNote && (
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {currentHotel.nearbyNote}
                  </p>
                )}
              </div>

              <HotelSwitch
                items={nearbyHotels}
                active={activeNearby}
                onChange={setActiveNearby}
                label="Select hotel to see nearby places"
                className="mt-6"
              />

              <ul
                key={currentHotel.slug}
                aria-label={`Places near ${currentHotel.name}`}
                className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {currentHotel.nearby.map(([place, distance, type]) => (
                  <li
                    key={place}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {type}
                      </span>
                      <p className="mt-2 text-base font-semibold leading-snug text-slate-900">
                        {place}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-xl bg-rail/5 px-3.5 py-2.5 text-center">
                      <span className="block whitespace-nowrap font-fd text-base font-bold text-rail">
                        {distance}
                      </span>
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        away
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Facilities */}
        <section className={WRAP} id="facilities">
          <div className={SH}>
            <h2 className={H2}>What you get</h2>
            <p className={SH_P}>The basics, done properly.</p>
          </div>
          <ul className="grid list-none gap-x-14 md:grid-cols-2">
            {s.facilities.map(([i, t, d]) => (
              <li key={t} className="flex gap-[18px] border-b border-line py-[18px]">
                <span aria-hidden="true" className="w-9 text-[26px]">
                  {i}
                </span>
                <div>
                  <b>{t}</b>
                  <p className="text-[15px] text-mut">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Who stays with us */}
        <section className="bg-soft">
          <div className={WRAP}>
            <div className={`${SH} flex max-w-none flex-col items-start justify-between gap-4 sm:flex-row sm:items-end`}>
              <h2 className={H2}>Who stays with us</h2>
              <HotelSwitch
                items={hotels}
                active={activeUses}
                onChange={setActiveUses}
                label="Select hotel to see who stays there"
              />
            </div>
            <div className="grid gap-[22px] md:grid-cols-5 md:gap-0">
              {(currentUsesHotel.uses || s.uses).map(([t, d]) => (
                <div key={t} className="border-l-2 border-sun px-[22px] py-1">
                  <h3 className="mb-2 font-fd text-xl font-bold tracking-[-0.02em] text-rail">
                    {t}
                  </h3>
                  <p className="text-[15px] text-mut">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photos */}
        <section className={WRAP} id="photos">
          <div className={`${SH} flex max-w-none flex-col items-start justify-between gap-4 sm:flex-row sm:items-end`}>
            <div>
              <h2 className={H2}>Take a look</h2>
              <p className={SH_P}>A peek inside both hotels.</p>
            </div>
            <HotelSwitch
              items={hotels}
              active={activeGallery}
              onChange={setActiveGallery}
              label="Select hotel to see its photos"
            />
          </div>

          {(() => {
            const [ext, ...rest] = currentGallery.gallery;
            const oddCount = rest.length % 2 === 1;
            return (
              <div
                key={currentGallery.slug}
                className="grid items-start gap-3 md:grid-cols-12 md:gap-4"
              >
                {/* Hotel building: shown whole, never cropped */}
                <figure className="relative overflow-hidden rounded-2xl bg-soft shadow-sm ring-1 ring-black/5 md:col-span-5">
                  <Image
                    src={ext[0]}
                    alt={ext[1]}
                    width={ext[2]}
                    height={ext[3]}
                    sizes="(max-width:768px) 100vw, 460px"
                    className="block h-auto w-full"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-5 pb-4 pt-12 text-white">
                    <span className="block font-fd text-lg font-bold leading-tight">
                      {currentGallery.name}
                    </span>
                    <span className="text-sm text-white/80">
                      {currentGallery.city}
                    </span>
                  </figcaption>
                </figure>

                {/* Everything else: tidy cropped tiles */}
                <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:col-span-7 md:gap-4">
                  {rest.map(([src, alt, , , pos], i) => (
                    <figure
                      key={src}
                      className={`group relative overflow-hidden rounded-2xl bg-soft shadow-sm ring-1 ring-black/5 ${
                        oddCount && i === 0 ? "col-span-2" : ""
                      }`}
                    >
                      <Img
                        src={src}
                        alt={alt}
                        pos={pos || "center 62%"}
                        className={`${PH} h-full w-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105`}
                        sizes="(max-width:768px) 50vw, 340px"
                      />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3.5 pb-2.5 pt-8 text-[13px] font-medium text-white opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                        {alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* Good to know */}
        <section className={WRAP}>
          <div className={SH}>
            <h2 className={H2}>Good to know</h2>
          </div>
          <dl className="grid md:grid-cols-3">
            {s.info.map(([a, b]) => (
              <div key={a} className="border-t border-line py-5 pr-[22px]">
                <dt className="text-sm text-mut">{a}</dt>
                <dd className="text-lg font-semibold">{b}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* FAQ */}
        <section className={WRAP} id="faq">
          <div className={SH}>
            <h2 className={H2}>Questions guests ask</h2>
          </div>
          <div className={FAQ_STYLES}>
            <Faq items={s.faq} />
          </div>
        </section>

        {/* Find us */}
        <section className="bg-soft" id="contact">
          <div className="mx-auto grid max-w-[1140px] gap-8 px-5 py-[52px] md:px-[22px] md:py-[72px] lg:grid-cols-[1fr_1.2fr] lg:items-stretch lg:gap-12">
            <div>
              <h2 className={`${H2} mb-5`}>Find us</h2>
              <HotelSwitch
                items={hotels}
                active={activeContact}
                onChange={setActiveContact}
                label="Select hotel to see contact details"
                className="mb-6"
              />

              <div key={currentContact.slug} className="border-t border-line py-4">
                <h3 className="mb-1.5 font-fd text-[22px] font-bold tracking-[-0.02em]">
                  {currentContact.name}
                </h3>
                <p className="my-1 text-mut">
                  {currentContact.address || currentContact.city}
                </p>
                {currentContact.phones.length > 0 && (
                  <div className="my-2.5 flex flex-col gap-1.5 font-semibold text-rail">
                    {currentContact.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className="underline underline-offset-4">
                        Call {p.show}
                      </a>
                    ))}
                  </div>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentContact.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-rail underline underline-offset-4"
                >
                  Get directions
                </a>
              </div>

              {currentContact.reach && currentContact.reach.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-fd text-[22px] font-bold tracking-[-0.02em]">
                    How to reach {currentContact.name}
                  </h3>
                  <div className="grid gap-x-6 sm:grid-cols-2">
                    {currentContact.reach.map(([a, b]) => (
                      <div key={a} className="border-t border-line py-3">
                        <b>{a}</b>
                        <p className="text-[15px] text-mut">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map stretches to match the left column */}
            <div className="min-h-[360px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:min-h-[420px] lg:min-h-[520px] [&>*]:!h-full [&>*]:!min-h-[inherit] [&_iframe]:!h-full [&_iframe]:!min-h-[inherit] [&_iframe]:!w-full [&_iframe]:border-0">
              <Map h={currentContact} key={currentContact.slug} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-rail text-slate-200">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <a
                href="#top"
                className="font-fd text-2xl font-bold tracking-tight text-white"
              >
                {s.short}
              </a>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
                {s.tag}
              </p>
              <nav
                aria-label="Footer"
                className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm"
              >
                {links.map(([t, id]) => (
                  <a
                    key={id}
                    href={"#" + id}
                    className="text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {t}
                  </a>
                ))}
              </nav>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {hotels.map((h) => (
                <div
                  key={h.slug}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-sky-300">
                    {h.locality}
                  </p>
                  <h3 className="mt-1 font-fd text-lg font-semibold text-white">
                    {h.name}
                  </h3>

                  <div className="mt-4 flex items-start gap-3 text-sm text-slate-300">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="leading-relaxed">{h.address || h.city}</p>
                  </div>

                  {h.phones.length > 0 && (
                    <div className="mt-3 flex items-start gap-3 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-sky-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                      </svg>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {h.phones.map((p) => (
                          <a
                            key={p.tel}
                            href={`tel:${p.tel}`}
                            className="font-medium text-white underline-offset-4 hover:underline"
                          >
                            {p.show}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-rail"
                  >
                    Get directions
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
            <small>
              © {new Date().getFullYear()} {s.name}. All rights reserved.
            </small>
            <p>Both hotels open 24 hours</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
