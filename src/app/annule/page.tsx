import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/15 text-3xl text-accent-2">
        ✕
      </span>
      <h1 className="mt-6 text-2xl font-black uppercase tracking-tight">
        Paiement annulé
      </h1>
      <p className="mt-3 text-muted">
        Votre commande n&apos;a pas été finalisée. Votre panier a été
        conservé, vous pouvez réessayer quand vous voulez.
      </p>
      <Link
        href="/panier"
        className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95"
      >
        Retour au panier
      </Link>
    </div>
  );
}
