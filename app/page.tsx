"use client";

import { useEffect, useMemo, useState } from "react";
import type { Property } from "@/types";
import { MOCK_PROPERTIES } from "@/data/properties";
import Navbar from "../components/Navbar";
import CategoryFilters from "../components/CategoryFilters";
import HeroSearchBar from "../components/HeroSearchBar";
import PropertyCard from "../components/PropertyCard";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setProperties([]);
    const timer = setTimeout(() => {
      setProperties(MOCK_PROPERTIES);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesCategory = activeCategoryId ? property.categoryId === activeCategoryId : true;
      const matchesText =
        query.length === 0 ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query);
      return matchesCategory && matchesText;
    });
  }, [properties, searchQuery, activeCategoryId]);

  return (
    <main className="min-h-screen bg-zinc-50 pb-10">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <section className="mx-auto mt-4 max-w-6xl px-4 md:px-6">
        <article className="relative overflow-hidden rounded-[30px] shadow-lg">
          <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop" alt="Sala moderna en Montevideo" className="h-[27rem] w-full object-cover md:h-[34rem]" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 text-sm font-semibold text-white">
            <span>airbnb</span>
            <span>Tu espacio en Airbnb</span>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center text-white">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">Alojamientos vacacionales en Montevideo</h1>
              <p className="text-lg font-medium text-white/90">Busca y reserva un alojamiento unico en Airbnb</p>
            </div>
            <HeroSearchBar />
          </div>
        </article>
      </section>
      <section className="mx-auto mt-6 max-w-6xl px-4 md:px-6">
        <h2 className="text-lg font-semibold text-zinc-900">Alojamientos mejor valorados</h2>
      </section>
      <CategoryFilters activeCategoryId={activeCategoryId} onChange={setActiveCategoryId} />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        {isLoading ? (
          <>
            <p className="col-span-full rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700">Cargando...</p>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-2xl bg-zinc-200" />
            ))}
          </>
        ) : (
          filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)
        )}
      </section>
    </main>
  );
};

export default HomePage;
