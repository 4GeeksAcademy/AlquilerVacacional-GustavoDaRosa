"use client";

import { useState } from "react";
import type { RoomImage } from "@/types";

const RoomGallery = ({ images, initialIndex = 0 }: { images: RoomImage[]; initialIndex?: number }) => {
  const [index, setIndex] = useState(initialIndex);
  const current = images[index];
  const move = (step: number) => setIndex((value) => (value + step + images.length) % images.length);

  return (
    <section className="space-y-3">
      <div className="relative overflow-hidden rounded-b-[30px] bg-zinc-200 md:rounded-[32px]">
        <img src={current.url} alt={current.alt} className="h-72 w-full object-cover md:h-[30rem]" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-4 text-white">
          <button type="button" onClick={() => move(-1)} className="rounded-full bg-white/20 px-3 py-2 text-sm backdrop-blur">Anterior</button>
          <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium">{index + 1}/{images.length}</span>
          <button type="button" onClick={() => move(1)} className="rounded-full bg-white/20 px-3 py-2 text-sm backdrop-blur">Siguiente</button>
        </div>
      </div>
      <div className="hidden grid-cols-3 gap-3 md:grid">
        {images.slice(0, 3).map((image, imageIndex) => (
          <img key={image.id} src={image.url} alt={image.alt} className={["h-28 w-full rounded-2xl object-cover", imageIndex === index ? "ring-2 ring-zinc-900" : "opacity-80"].join(" ")} />
        ))}
      </div>
    </section>
  );
};

export default RoomGallery;