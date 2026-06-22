"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSearchBar = () => {
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const formatDate = (value: string) => new Intl.DateTimeFormat("es-UY", { day: "2-digit", month: "short" }).format(new Date(value));
  const dateLabel = checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : checkIn || checkOut ? formatDate(checkIn || checkOut) : "Agregar fechas";
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    router.push(params.toString() ? `/catalog?${params.toString()}` : "/catalog");
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col gap-2 rounded-[2rem] bg-white p-2 text-left shadow-xl md:flex-row md:items-center md:gap-0 md:p-1.5">
        <div className="rounded-2xl px-4 py-2 md:flex-1">
          <p className="text-xs font-semibold text-zinc-500">Dónde</p>
          <p className="text-base font-medium text-zinc-900">Montevideo, Uruguay</p>
        </div>
        <button type="button" onClick={() => setIsCalendarOpen((value) => !value)} className="rounded-2xl px-4 py-2 text-left transition hover:bg-zinc-100 md:flex-1">
          <p className="text-xs font-semibold text-zinc-500">Cuándo</p>
          <p className="text-base font-medium text-zinc-900">{dateLabel}</p>
        </button>
        <button type="button" onClick={handleSearch} className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-pink-700">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" /></svg>
          Buscar
        </button>
      </div>
      {isCalendarOpen && (
        <div className="mt-3 rounded-3xl bg-white p-4 shadow-xl">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Llegada
              <input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="mt-2 block w-full rounded-2xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900" />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Salida
              <input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="mt-2 block w-full rounded-2xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSearchBar;
