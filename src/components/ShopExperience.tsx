"use client";

import { useState } from "react";
import Gallery from "./Gallery";
import OrderForm from "./OrderForm";

export type Selection = { club: string; type: string; image: string };

export default function ShopExperience() {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [showForm, setShowForm] = useState(false);

  function handleSelect(item: Selection) {
    setSelected(item);
    setShowForm(true);
  }

  function handleClearSelection() {
    setSelected(null);
  }

  return (
    <>
      <Gallery selected={selected} onSelect={handleSelect} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        {showForm ? (
          <div id="commander" className="animate-slide-fade-in scroll-mt-24">
            <OrderForm selected={selected} onClearSelection={handleClearSelection} />
            <p className="mt-6 text-center text-sm text-muted">
              Indique le club ou la sélection de ton choix, le type de
              maillot et ta taille — on s&apos;occupe du reste.
            </p>
          </div>
        ) : (
          <div id="commander" className="scroll-mt-24 text-center">
            <p className="text-muted">
              Choisis un maillot ci-dessus pour commencer, ou compose ta
              propre commande.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-6 rounded-full border border-border px-8 py-4 text-sm font-black uppercase tracking-wide transition hover:bg-white/5"
            >
              Commander un maillot personnalisé
            </button>
          </div>
        )}
      </div>
    </>
  );
}
