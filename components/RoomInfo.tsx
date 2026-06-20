import type { Room } from "@/types";

export default function RoomInfo({ room }: { room: Room }) {
  const initials = room.host.name.split(" ").slice(0, 2).map((part) => part[0]).join("");

  return (
    <section className="space-y-6">
      <div className="space-y-2 border-b border-zinc-200 pb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{room.title}</h1>
        <p className="text-sm text-zinc-600">★ {room.rating.toFixed(2)} · {room.reviewCount} reseñas · {room.location}</p>
        <p className="text-sm text-zinc-700">{room.guests} huéspedes · {room.beds} camas · {room.baths} baño</p>
      </div>
      <div className="flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-zinc-900 text-sm font-semibold text-white">{initials}</div>
        <div>
          <p className="font-semibold text-zinc-900">Anfitrión: {room.host.name}</p>
          <p className="text-sm text-zinc-600">{room.host.yearsHosting} años como anfitrión{room.host.isSuperhost ? " · Superhost" : ""}</p>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900">Lo que este lugar ofrece</h2>
        <ul className="grid grid-cols-2 gap-3 text-sm text-zinc-700 md:grid-cols-3">
          {room.amenities.map((amenity) => (
            <li key={amenity.id} className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-900" aria-hidden="true"><path d="M12 3l2 4 4 .6-3 3 .7 4.4-3.7-2-3.7 2 .7-4.4-3-3L10 7z" fill="currentColor" /></svg>
              {amenity.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}