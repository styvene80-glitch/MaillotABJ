import Link from "next/link";
import ClearCartOnLoad from "@/components/ClearCartOnLoad";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <ClearCartOnLoad />
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-accent-foreground">
        ✓
      </span>
      <h1 className="mt-6 text-2xl font-black uppercase tracking-tight">
        Merci pour votre commande !
      </h1>
      <p className="mt-3 text-muted">
        Votre paiement a bien été reçu. Vous recevrez un e-mail de
        confirmation avec les détails de livraison.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95"
      >
        Retour à la boutique
      </Link>
    </div>
  );
}
