type HeroProps = {
  title: string;
  description: string;
};

export function Hero({ title, description }: HeroProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
        Alquiler Vacacional
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h1>
      <p className="max-w-2xl text-lg text-zinc-600">{description}</p>
    </section>
  );
}
