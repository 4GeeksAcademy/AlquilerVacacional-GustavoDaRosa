export default function MapPlaceholder() {
  return (
    <section className="relative min-h-[360px] overflow-hidden rounded-none bg-neutral-100 md:min-h-[calc(100vh-7rem)] md:rounded-[28px]" aria-label="Mapa interactivo de Montevideo">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.95),_transparent_28%),linear-gradient(180deg,_rgba(245,245,244,0.96),_rgba(229,231,235,0.9))]" />
      <div className="relative h-full min-h-[360px] p-2 md:p-0">
        <iframe
          title="Mapa interactivo de Montevideo"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-56.2475%2C-34.9361%2C-56.0815%2C-34.8541&layer=mapnik&marker=-34.9011%2C-56.1645"
          className="h-full min-h-[344px] w-full rounded-[24px] border-0 md:min-h-[calc(100vh-7rem)] md:rounded-[28px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}