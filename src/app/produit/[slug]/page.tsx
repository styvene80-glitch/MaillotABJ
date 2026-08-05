import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(
  props: PageProps<"/produit/[slug]">
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={product.image}
            alt={`${product.nom} - ${product.equipe}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            {product.equipe} · {product.saison}
          </p>
          <h1 className="mt-1 text-2xl font-bold">{product.nom}</h1>
          <p className="mt-4 text-3xl font-bold">{product.prix} €</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-neutral-500">Taille</dt>
              <dd className="font-medium">{product.taille}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">État</dt>
              <dd className="font-medium">{product.etat}</dd>
            </div>
          </dl>
          <p className="mt-6 text-neutral-600 dark:text-neutral-400">
            {product.description}
          </p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
