export const PRIX_UNITAIRE = 20000; // en F CFA (XOF)
export const DEVISE_LABEL = "F CFA";
export const DEVISE_STRIPE = "xof"; // XOF est une devise "zéro décimale" chez Stripe

export const TYPES_MAILLOT = ["Domicile", "Extérieur", "Third"] as const;
export type TypeMaillot = (typeof TYPES_MAILLOT)[number];

export const TAILLES = ["S", "M", "L", "XL", "XXL"] as const;
export type Taille = (typeof TAILLES)[number];

export const ETAT_LABEL = "Neuf — authentique supporter";
