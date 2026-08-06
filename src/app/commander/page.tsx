import type { Metadata } from "next";
import ShopExperience from "@/components/ShopExperience";

export const metadata: Metadata = {
  title: "Commander — MaillotABJ",
  description:
    "Choisis ton maillot, sélectionne ta taille et personnalise-le avec un flocage.",
};

export default function CommanderPage() {
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Compose ton maillot
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Choisis un modèle ci-dessous, indique ta taille et personnalise-le
          si tu veux — 20 000 F CFA, prix unique.
        </p>
      </div>
      <ShopExperience />
    </div>
  );
}
