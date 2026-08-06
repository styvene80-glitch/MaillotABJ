"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { DEVISE_LABEL } from "@/lib/order-config";

function JerseyPlaceholder() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7 text-muted"
    >
      <path d="M7 3l3 2h4l3-2 4 4-3 3-1-1v11H7V9l-1 1-3-3 4-4z" />
    </svg>
  );
}

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
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-muted">Composez votre maillot en 2 minutes.</p>
        <Link
          href="/#commander"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95"
        >
          Commander un maillot
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-black uppercase tracking-tight">
        Votre panier
      </h1>
      <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-bg-card">
        {items.map((item) => (
          <li
            key={item.id}
            className="animate-slide-fade-in flex items-center gap-4 p-5"
          >
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-bg">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.club}
                  fill
                  className="object-cover"
                />
              ) : (
                <JerseyPlaceholder />
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold">{item.club}</p>
              <p className="text-sm text-muted">
                {item.type} · Taille {item.taille} ·{" "}
                {item.prix.toLocaleString("fr-FR")} {DEVISE_LABEL}
              </p>
              {(item.floqueNom || item.floqueNumero) && (
                <p className="mt-1 text-xs font-semibold text-accent">
                  Flocage : {item.floqueNom}
                  {item.floqueNom && item.floqueNumero ? " · " : ""}
                  {item.floqueNumero && `n° ${item.floqueNumero}`}
                </p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantite - 1)}
                  className="h-7 w-7 rounded-full border border-border transition hover:bg-white/10"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantite}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantite + 1)}
                  className="h-7 w-7 rounded-full border border-border transition hover:bg-white/10"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-sm font-semibold text-accent-2 hover:underline"
                >
                  Retirer
                </button>
              </div>
            </div>
            <p className="font-black">
              {(item.prix * item.quantite).toLocaleString("fr-FR")}{" "}
              {DEVISE_LABEL}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-bg-card px-5 py-4">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-black">
          {totalPrix.toLocaleString("fr-FR")} {DEVISE_LABEL}
        </span>
      </div>
      {error && (
        <p className="mt-4 rounded-xl border border-accent-2/40 bg-accent-2/10 p-4 text-sm text-accent-2">
          {error}
        </p>
      )}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-full bg-accent px-6 py-4 text-sm font-black uppercase tracking-wide text-accent-foreground transition hover:brightness-95 disabled:opacity-50"
      >
        {loading ? "Redirection..." : "Passer commande"}
      </button>
      <Link
        href="/#commander"
        className="mt-4 block text-center text-sm font-semibold text-accent hover:underline"
      >
        Ajouter un autre maillot
      </Link>
    </div>
  );
}
