"use client";

import { useState } from "react";
import Gallery from "./Gallery";
import OrderForm from "./OrderForm";

export type Selection = { club: string; type: string; image: string };

export default function ShopExperience() {
  const [selected, setSelected] = useState<Selection | null>(null);

  return (
    <>
      <Gallery selected={selected} onSelect={setSelected} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <OrderForm selected={selected} onClearSelection={() => setSelected(null)} />
        <p className="mt-6 text-center text-sm text-muted">
          Indique le club ou la sélection de ton choix, le type de maillot et
          ta taille — on s&apos;occupe du reste.
        </p>
      </div>
    </>
  );
}
