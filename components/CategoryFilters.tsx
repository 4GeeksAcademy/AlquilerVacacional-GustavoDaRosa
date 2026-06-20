type CategoryFiltersProps = {
  activeCategoryId: string;
  onChange: (categoryId: string) => void;
};

const CATEGORIES = ["Playa", "Mansiones", "Tendencias", "Cabana", "Piscina", "Centro"] as const;

export default function CategoryFilters({ activeCategoryId, onChange }: CategoryFiltersProps) {
  return (
    <section className="overflow-x-auto px-4 py-3 md:px-6" aria-label="Filtros por categoria">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-max min-w-full gap-2">
          {CATEGORIES.map((categoryId) => {
            const isActive = activeCategoryId === categoryId;
            return (
              <button
                key={categoryId}
                type="button"
                onClick={() => onChange(isActive ? "" : categoryId)}
                aria-pressed={isActive}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-pink-600 bg-pink-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400",
                ].join(" ")}
              >
                {categoryId}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
