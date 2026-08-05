import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group overflow-hidden rounded-xl border border-black/10 transition hover:shadow-lg dark:border-white/10"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={product.image}
          alt={`${product.nom} - ${product.equipe}`}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          {product.equipe} · {product.saison}
        </p>
        <h3 className="mt-1 font-semibold">{product.nom}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            Taille {product.taille} · {product.etat}
          </span>
          <span className="font-bold">{product.prix} €</span>
        </div>
      </div>
    </Link>
  );
}
