export type Product = {
  slug: string;
  nom: string;
  equipe: string;
  saison: string;
  taille: "S" | "M" | "L" | "XL" | "XXL";
  etat: "Neuf" | "Comme neuf" | "Bon état" | "État correct";
  prix: number; // en euros
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "maillot-domicile-2023",
    nom: "Maillot Domicile",
    equipe: "Équipe A",
    saison: "2023/2024",
    taille: "M",
    etat: "Comme neuf",
    prix: 45,
    description:
      "Maillot domicile officiel, porté une seule fois. Aucune tache ni accroc, floquage impeccable.",
    image: "/products/placeholder-1.svg",
  },
  {
    slug: "maillot-exterieur-2022",
    nom: "Maillot Extérieur",
    equipe: "Équipe B",
    saison: "2022/2023",
    taille: "L",
    etat: "Bon état",
    prix: 35,
    description:
      "Maillot extérieur, quelques lavages mais toujours en très bon état général.",
    image: "/products/placeholder-2.svg",
  },
  {
    slug: "maillot-third-2021",
    nom: "Maillot Third",
    equipe: "Équipe C",
    saison: "2021/2022",
    taille: "S",
    etat: "État correct",
    prix: 25,
    description:
      "Édition third, petite trace d'usure sur la manche, décrite en photo. Bonne affaire pour les collectionneurs.",
    image: "/products/placeholder-3.svg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
