type NavbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-zinc-50/95 px-4 py-3 backdrop-blur md:px-6">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3">
        <p className="text-xl font-black tracking-tight text-zinc-900">MonteviStay</p>
        <div className="order-3 flex w-full items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-2 md:order-2 md:flex-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Busca en Montevideo"
            className="w-full bg-transparent text-sm text-zinc-800 outline-none"
            aria-label="Buscar alojamientos"
          />
        </div>
        <div className="order-2 ml-auto flex items-center gap-2 md:order-3">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 bg-white" aria-label="Cambiar idioma">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-700" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button type="button" className="flex h-10 items-center gap-2 rounded-full border border-zinc-300 bg-white px-3" aria-label="Menu de usuario">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-700" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-zinc-800 text-xs text-white">U</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
