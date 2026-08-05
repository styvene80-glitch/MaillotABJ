"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import {
  PRIX_UNITAIRE,
  DEVISE_LABEL,
  TYPES_MAILLOT,
  TAILLES,
  TypeMaillot,
  Taille,
} from "@/lib/order-config";

export default function OrderForm() {
  const { addItem } = useCart();
  const router = useRouter();
  const [club, setClub] = useState("");
  const [type, setType] = useState<TypeMaillot>(TYPES_MAILLOT[0]);
  const [taille, setTaille] = useState<Taille>("M");
  const [quantite, setQuantite] = useState(1);
  const [added, setAdded] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!club.trim()) return;
    addItem({ club: club.trim(), type, taille, quantite });
    setAdded(true);
    setClub("");
    setQuantite(1);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md space-y-5 rounded-2xl border border-black/10 p-6 dark:border-white/10"
    >
      <div>
        <label htmlFor="club" className="mb-1 block text-sm font-medium">
          Club ou sélection nationale
        </label>
        <input
          id="club"
          type="text"
          required
          value={club}
          onChange={(e) => setClub(e.target.value)}
          placeholder="ex: PSG, Côte d'Ivoire, Real Madrid..."
          className="w-full rounded-lg border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-blue-600 dark:border-white/10"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as TypeMaillot)}
            className="w-full rounded-lg border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-blue-600 dark:border-white/10"
          >
            {TYPES_MAILLOT.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="taille" className="mb-1 block text-sm font-medium">
            Taille
          </label>
          <select
            id="taille"
            value={taille}
            onChange={(e) => setTaille(e.target.value as Taille)}
            className="w-full rounded-lg border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-blue-600 dark:border-white/10"
          >
            {TAILLES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="quantite" className="mb-1 block text-sm font-medium">
          Quantité
        </label>
        <input
          id="quantite"
          type="number"
          min={1}
          max={20}
          value={quantite}
          onChange={(e) => setQuantite(Math.max(1, Number(e.target.value)))}
          className="w-full rounded-lg border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-blue-600 dark:border-white/10"
        />
      </div>

      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>Prix unitaire</span>
        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
          {PRIX_UNITAIRE.toLocaleString("fr-FR")} {DEVISE_LABEL}
        </span>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>

      {added && (
        <button
          type="button"
          onClick={() => router.push("/panier")}
          className="w-full rounded-full border border-black/10 px-6 py-3 font-semibold transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
        >
          Voir le panier
        </button>
      )}
    </form>
  );
}
