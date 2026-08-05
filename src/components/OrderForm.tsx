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
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <form
      id="commander"
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg scroll-mt-24 rounded-3xl border border-border bg-bg-card p-6 shadow-2xl shadow-black/40 sm:p-8"
    >
      <h2 className="text-xl font-black uppercase tracking-tight">
        Compose ton maillot
      </h2>
      <p className="mt-1 text-sm text-muted">
        Choisis ton club, le type et ta taille.
      </p>

      <div className="mt-6">
        <label htmlFor="club" className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">
          Club ou sélection nationale
        </label>
        <input
          id="club"
          type="text"
          required
          value={club}
          onChange={(e) => setClub(e.target.value)}
          placeholder="ex: PSG, Côte d'Ivoire, Real Madrid..."
          className="w-full rounded-xl border border-border bg-bg px-4 py-3.5 text-base outline-none transition placeholder:text-muted/70 focus:border-accent"
        />
      </div>

      <div className="mt-6">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">
          Type
        </span>
        <div className="grid grid-cols-3 gap-2">
          {TYPES_MAILLOT.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                type === t
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-bg text-foreground/80 hover:border-white/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">
          Taille
        </span>
        <div className="grid grid-cols-5 gap-2">
          {TAILLES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTaille(t)}
              className={`rounded-xl border py-3 text-sm font-bold transition ${
                taille === t
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-bg text-foreground/80 hover:border-white/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">
          Quantité
        </span>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-bg px-2 py-1.5">
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-lg font-bold transition hover:bg-white/10"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span className="w-6 text-center font-bold">{quantite}</span>
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.min(20, q + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-lg font-bold transition hover:bg-white/10"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <span className="text-sm text-muted">Prix unitaire</span>
        <span className="text-lg font-black">
          {PRIX_UNITAIRE.toLocaleString("fr-FR")} {DEVISE_LABEL}
        </span>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-accent px-6 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95"
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>

      {added && (
        <button
          type="button"
          onClick={() => router.push("/panier")}
          className="mt-3 w-full rounded-full border border-border px-6 py-3.5 text-sm font-bold transition hover:bg-white/5"
        >
          Voir le panier
        </button>
      )}
    </form>
  );
}
