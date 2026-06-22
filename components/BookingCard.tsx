"use client";

import { useState } from "react";
import type { BookingCardProps } from "@/types";

const BookingCard = ({ pricePerNight, minGuests, maxGuests, initialGuests = 1, nights, checkInLabel, checkOutLabel, onReserve, isLoading }: BookingCardProps) => {
  const [guests, setGuests] = useState(initialGuests);
  const change = (step: number) => setGuests((value) => Math.min(maxGuests, Math.max(minGuests, value + step)));

  return (
    <aside className="fixed inset-x-0 bottom-0 z-20 rounded-t-[28px] border-t border-zinc-200 bg-white p-4 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] md:sticky md:top-24 md:rounded-[28px] md:border md:p-5 md:shadow-sm">
      <div className="mb-4 flex items-end justify-between">
        <p className="text-2xl font-semibold text-zinc-900">USD {pricePerNight}<span className="text-sm font-normal text-zinc-500"> / noche</span></p>
        <p className="text-xs text-zinc-500">{nights} noches</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 p-3 text-sm text-zinc-700">
        <p>{checkInLabel} · {checkOutLabel}</p>
        <div className="mt-3 flex items-center justify-between">
          <span>Huéspedes</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => change(-1)} disabled={guests === minGuests} className="grid h-8 w-8 place-items-center rounded-full border border-zinc-300 disabled:opacity-40">-</button>
            <span className="w-4 text-center font-semibold text-zinc-900">{guests}</span>
            <button type="button" onClick={() => change(1)} disabled={guests === maxGuests} className="grid h-8 w-8 place-items-center rounded-full border border-zinc-300 disabled:opacity-40">+</button>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => onReserve(guests)} disabled={isLoading} className="mt-4 w-full rounded-2xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">Reservar ahora</button>
    </aside>
  );
};

export default BookingCard;