import Image from "next/image";

const PHOTOS = [
  { src: "/products/fc-porto-third.jpg", label: "FC Porto — Third" },
  { src: "/products/losc-lille-domicile.jpg", label: "LOSC Lille — Domicile" },
  { src: "/products/as-monaco-domicile.jpg", label: "AS Monaco — Domicile" },
  { src: "/products/kafd-domicile.jpg", label: "KAFD — Domicile" },
  { src: "/products/arsenal-special.jpg", label: "Arsenal — Édition spéciale" },
  { src: "/products/real-betis-domicile.jpg", label: "Real Betis — Domicile" },
  { src: "/products/lyon-exterieur.jpg", label: "Olympique Lyonnais — Extérieur" },
  { src: "/products/tottenham-third.jpg", label: "Tottenham — Third" },
];

export default function Gallery() {
  return (
    <section className="border-b border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Quelques modèles disponibles
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Un aperçu de notre stock — indique le club de ton choix dans le
            formulaire, disponible dans toutes les tailles.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="group overflow-hidden rounded-2xl border border-border bg-bg-card"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <p className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-foreground/80">
                {photo.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
