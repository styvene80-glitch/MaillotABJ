import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "Choisis ton maillot",
    text: "Club ou sélection nationale, domicile, extérieur, third ou édition spéciale.",
  },
  {
    n: "2",
    title: "Personnalise",
    text: "Ta taille, et un flocage nom + numéro si tu veux.",
  },
  {
    n: "3",
    title: "Paiement & livraison",
    text: "Paiement sécurisé en ligne, livraison rapide partout.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-black uppercase tracking-tight sm:text-3xl">
          Comment ça marche
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-border bg-bg-card p-6 text-center"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-black text-accent-foreground">
                {step.n}
              </span>
              <h3 className="mt-4 font-black uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/commander"
            className="inline-block rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95"
          >
            Voir les maillots
          </Link>
        </div>
      </div>
    </section>
  );
}
