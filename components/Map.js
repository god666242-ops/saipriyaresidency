export default function Map({ h }) {
  return (<iframe className="map" title={"Map of " + h.name} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen src={h.mapSrc} />);
}
