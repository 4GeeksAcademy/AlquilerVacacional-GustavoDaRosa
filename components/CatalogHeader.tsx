import type { CatalogHeaderProps, SortOrder } from "@/types";

const OPTIONS: Array<{ value: SortOrder; label: string }> = [
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
];

export default function CatalogHeader({ totalResults, sortOrder, onSortChange }: CatalogHeaderProps) {
  return (
    <section className="flex flex-col gap-3 border-b border-zinc-200/80 px-5 py-4 md:px-0 md:py-2" aria-label="Encabezado del catalogo">
      <p className="text-[13px] font-medium tracking-tight text-zinc-900">{totalResults} alojamientos en Montevideo</p>
      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
        Ordenar por
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as SortOrder)}
          className="rounded-2xl border border-zinc-300/80 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900"
        >
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}