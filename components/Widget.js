// PureBook booking engine. The engine.js script is loaded once in app/layout.js.
export default function Widget({
  slug,
  primary,
  theme = "light",
  label = "Reserve now",
}) {
  return (
    <hotel-booking-engine
      data-primary={primary}
      data-theme={theme}
      data-button-label={label}
      data-hotel={slug}
    ></hotel-booking-engine>
  );
}
