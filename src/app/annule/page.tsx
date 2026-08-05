import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Paiement annulé</h1>
      <p className="mt-3 text-neutral-500">
        Votre commande n&apos;a pas été finalisée. Votre panier a été
        conservé, vous pouvez réessayer quand vous voulez.
      </p>
      <Link
        href="/panier"
        className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Retour au panier
      </Link>
    </div>
  );
}
