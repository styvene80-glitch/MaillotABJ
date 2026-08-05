import Link from "next/link";
import ClearCartOnLoad from "@/components/ClearCartOnLoad";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <ClearCartOnLoad />
      <h1 className="text-2xl font-bold">Merci pour votre commande ! 🎉</h1>
      <p className="mt-3 text-neutral-500">
        Votre paiement a bien été reçu. Vous recevrez un e-mail de
        confirmation avec les détails de livraison.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Retour à la boutique
      </Link>
    </div>
  );
}
