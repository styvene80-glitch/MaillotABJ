"use client";

import Image from "next/image";
import type { Selection } from "./ShopExperience";

type Category = "Éditions spéciales" | "Domicile" | "Extérieur" | "Third";

const CATEGORY_ORDER: Category[] = [
  "Éditions spéciales",
  "Domicile",
  "Extérieur",
  "Third",
];

const PHOTOS: { src: string; club: string; type: string; category: Category }[] = [
  { src: "/products/arsenal-special.jpg", club: "Arsenal (édition spéciale)", type: "Domicile", category: "Éditions spéciales" },
  { src: "/products/losc-lille-domicile.jpg", club: "LOSC Lille", type: "Domicile", category: "Domicile" },
  { src: "/products/as-monaco-domicile.jpg", club: "AS Monaco", type: "Domicile", category: "Domicile" },
  { src: "/products/kafd-domicile.jpg", club: "KAFD", type: "Domicile", category: "Domicile" },
  { src: "/products/real-betis-domicile.jpg", club: "Real Betis", type: "Domicile", category: "Domicile" },
  { src: "/products/newcastle-domicile.jpg", club: "Newcastle", type: "Domicile", category: "Domicile" },
  { src: "/products/tottenham-domicile.jpg", club: "Tottenham", type: "Domicile", category: "Domicile" },
  { src: "/products/napoli-domicile.jpg", club: "Napoli", type: "Domicile", category: "Domicile" },
  { src: "/products/lyon-exterieur.jpg", club: "Olympique Lyonnais", type: "Extérieur", category: "Extérieur" },
  { src: "/products/fc-porto-third.jpg", club: "FC Porto", type: "Third", category: "Third" },
  { src: "/products/tottenham-third.jpg", club: "Tottenham", type: "Third", category: "Third" },
];

export default function Gallery({
  selected,
  onSelect,
}: {
  selected: Selection | null;
  onSelect: (item: Selection) => void;
}) {
  function handleClick(photo: (typeof PHOTOS)[number]) {
    onSelect({ club: photo.club, type: photo.type, image: photo.src });
    document
      .getElementById("commander")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="border-b border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Quelques modèles disponibles
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Clique sur un maillot pour choisir sa taille, puis personnalise-le
            — disponible dans toutes les tailles.
          </p>
        </div>

        {CATEGORY_ORDER.map((category) => {
          const photos = PHOTOS.filter((p) => p.category === category);
          if (photos.length === 0) return null;
          return (
            <div key={category} className="mt-12 first:mt-10">
              <h3 className="mb-5 flex items-center gap-3 text-sm font-black uppercase tracking-widest text-accent">
                {category}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {photos.map((photo) => {
                  const isSelected = selected?.image === photo.src;
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => handleClick(photo)}
                      className={`group relative overflow-hidden rounded-2xl border bg-bg-card text-left transition-all duration-300 ${
                        isSelected
                          ? "border-accent ring-2 ring-accent scale-[1.02]"
                          : "border-border hover:border-white/30 hover:-translate-y-1"
                      }`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={photo.src}
                          alt={`${photo.club} — ${photo.type}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className={`object-cover transition duration-300 ${
                            isSelected ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />
                        {isSelected && (
                          <span className="animate-check-in absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-foreground/80">
                        {photo.club}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
