"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrix } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Impossible de contacter le serveur de paiement.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Votre panier est vide</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Voir les maillots
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">Votre panier</h1>
      <ul className="mt-6 divide-y divide-black/10 dark:divide-white/10">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <Image src={item.image} alt={item.nom} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.nom}</p>
              <p className="text-sm text-neutral-500">{item.prix} €</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.slug, item.quantite - 1)}
                  className="h-7 w-7 rounded-full border border-black/10 dark:border-white/10"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantite}</span>
                <button
                  onClick={() => updateQuantity(item.slug, item.quantite + 1)}
                  className="h-7 w-7 rounded-full border border-black/10 dark:border-white/10"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="ml-4 text-sm text-red-600 hover:underline"
                >
                  Retirer
                </button>
              </div>
            </div>
            <p className="font-semibold">{item.prix * item.quantite} €</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-6 dark:border-white/10">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-bold">{totalPrix} €</span>
      </div>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Redirection..." : "Passer commande"}
      </button>
    </div>
  );
}
