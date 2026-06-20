import Link from "next/link";
import type { Property } from "@/types";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <li className="list-none">
      <Link href={`/rooms/${property.id}`} className="block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600">
        <div className="relative">
          <img src={property.imageUrl} alt={property.title} className="h-52 w-full object-cover" />
          {property.isGuestFavorite && <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-xs font-semibold text-zinc-800">Favorito</span>}
        </div>
        <div className="space-y-1.5 p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900">{property.title}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700">★ {property.rating.toFixed(2)}</span>
          </div>
          <p className="text-xs text-zinc-600">{property.location}</p>
          <p className="text-sm text-zinc-900"><span className="font-semibold">USD {property.pricePerNight}</span> por noche</p>
        </div>
      </Link>
    </li>
  );
}
