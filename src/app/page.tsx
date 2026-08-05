import OrderForm from "@/components/OrderForm";
import { PRIX_UNITAIRE, DEVISE_LABEL, ETAT_LABEL } from "@/lib/order-config";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Maillots de football, tous clubs et sélections
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-500">
          Maillots domicile, extérieur et third — clubs comme équipes
          nationales, toutes tailles disponibles. {ETAT_LABEL}, prix unique à{" "}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {PRIX_UNITAIRE.toLocaleString("fr-FR")} {DEVISE_LABEL}
          </span>
          .
        </p>
      </div>

      <OrderForm />

      <p className="mt-6 text-center text-sm text-neutral-500">
        Indique le club ou la sélection de ton choix, le type de maillot et
        ta taille — on s&apos;occupe du reste.
      </p>
    </div>
  );
}
