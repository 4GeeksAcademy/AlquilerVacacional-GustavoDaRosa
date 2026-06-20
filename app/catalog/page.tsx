"use client";

import { useMemo, useState } from "react";
import CatalogHeader from "@/components/CatalogHeader";
import MapPlaceholder from "@/components/MapPlaceholder";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_PROPERTIES } from "@/data/properties";
import type { SortOrder } from "@/types";

export default function CatalogPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("price-asc");
  const sortedProperties = useMemo(() => {
    const items = [...MOCK_PROPERTIES];
    return items.sort((left, right) => sortOrder === "price-asc" ? left.pricePerNight - right.pricePerNight : right.pricePerNight - left.pricePerNight);
  }, [sortOrder]);

  return (
    <main className="min-h-screen bg-[#f7f7f2] pb-8 md:px-6 md:pt-6">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-zinc-200/70 bg-[#f7f7f2]/95 px-4 py-3 backdrop-blur md:mx-auto md:mb-6 md:max-w-6xl md:rounded-full md:border md:bg-white/95 md:px-5 md:shadow-sm">
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300/80 bg-white text-zinc-700 shadow-sm" aria-label="Volver">←</button>
        <div className="flex-1 rounded-full border border-zinc-300/80 bg-white px-4 py-2.5 shadow-sm">
          <p className="text-sm font-semibold leading-none text-zinc-900">Montevideo</p>
          <p className="mt-1 text-[11px] text-zinc-500">Fechas flexibles · 1 huesped</p>
        </div>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300/80 bg-white text-zinc-700 shadow-sm" aria-label="Filtros">☰</button>
      </header>
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-[minmax(0,1fr)_380px] md:items-start md:gap-6">
        <section className="relative z-10 -mt-7 rounded-t-[28px] bg-[#f7f7f2] pt-2 shadow-[0_-8px_24px_rgba(0,0,0,0.04)] md:order-first md:mt-0 md:rounded-[28px] md:bg-transparent md:pt-0 md:shadow-none">
          <div className="rounded-[28px] bg-[#f7f7f2] md:bg-transparent">
            <CatalogHeader totalResults={sortedProperties.length} sortOrder={sortOrder} onSortChange={setSortOrder} />
            <ul className="grid grid-cols-1 gap-4 px-4 py-4 md:px-0 lg:grid-cols-2 xl:gap-5">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </ul>
          </div>
        </section>
        <div className="order-first overflow-hidden md:order-last md:sticky md:top-28">
          <MapPlaceholder />
        </div>
      </div>
    </main>
  );
}