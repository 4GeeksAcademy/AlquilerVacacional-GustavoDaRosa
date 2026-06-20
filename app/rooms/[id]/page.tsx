"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import BookingCard from "@/components/BookingCard";
import RoomGallery from "@/components/RoomGallery";
import RoomInfo from "@/components/RoomInfo";
import { MOCK_PROPERTIES } from "@/data/properties";
import type { Property, Room } from "@/types";

const toRoom = (property: Property): Room => ({ id: property.id, title: property.title, subtitle: property.location, location: property.location, rating: property.rating, reviewCount: property.reviewCount, guests: 4, beds: 2, baths: 1, pricePerNight: property.pricePerNight, images: [0, 1, 2, 3].map((index) => ({ id: `${property.id}-${index}`, url: index === 0 ? property.imageUrl : `https://picsum.photos/seed/${property.id}-${index}/1200/900`, alt: property.title })), host: { name: "Ernesto Gabriel", avatarUrl: "", yearsHosting: 3, isSuperhost: true }, amenities: ["Wifi", "Cocina", "Aire acondicionado", "Superhost", "Lavadora", "Vista al mar"].map((label) => ({ id: label, label, icon: null })) });

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true); setRoom(null); setError(null);
    const timer = setTimeout(() => {
      const property = MOCK_PROPERTIES.find((item) => item.id === id);
      property ? setRoom(toRoom(property)) : setError("No encontramos este alojamiento.");
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <main className="grid min-h-screen place-items-center bg-[#f7f7f2] text-zinc-600">Cargando...</main>;
  if (!room) return <main className="grid min-h-screen place-items-center bg-[#f7f7f2] p-6 text-center text-zinc-600">{error}</main>;
  return (
    <main className="min-h-screen bg-[#f7f7f2] pb-36 md:px-6 md:pb-10 md:pt-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="relative">
          <Link href="/catalog" className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm">← Volver</Link>
          <RoomGallery images={room.images} />
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_340px] md:items-start">
          <RoomInfo room={room} />
          <BookingCard pricePerNight={room.pricePerNight} minGuests={1} maxGuests={6} initialGuests={2} nights={2} checkInLabel="19 jun" checkOutLabel="21 jun" onReserve={() => undefined} />
        </div>
      </div>
    </main>
  );
}