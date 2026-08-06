import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(215,255,43,0.16) 0%, rgba(215,255,43,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "rgba(255,59,48,0.14)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #fff 0 2px, transparent 2px 40px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
          Nouvelle saison disponible
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Ton maillot.
          <br />
          <span className="text-accent">Ton club.</span> Ta légende.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
          Clubs et sélections nationales, tous types, toutes tailles.
          Maillots neufs, authentiques supporter — commandés en 2 minutes.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/commander"
            className="w-full rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95 sm:w-auto"
          >
            Commander maintenant
          </Link>
          <span className="text-sm font-semibold text-muted">
            20 000 F CFA · prix unique
          </span>
        </div>
      </div>
    </section>
  );
}
