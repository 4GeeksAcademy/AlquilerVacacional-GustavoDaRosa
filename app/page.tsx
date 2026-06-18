import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16">
      <Hero
        title="Proyecto Next.js 16 listo"
        description="Base inicial con TypeScript, Tailwind CSS y App Router. Usa la carpeta /components para centralizar componentes reutilizables de la interfaz."
      />
    </main>
  );
}
