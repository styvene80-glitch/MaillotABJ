"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { PRIX_UNITAIRE, TYPES_MAILLOT, TAILLES, TypeMaillot, Taille } from "./order-config";

export type CartItem = {
  id: string;
  club: string;
  type: TypeMaillot;
  taille: Taille;
  quantite: number;
  prix: number;
  image?: string;
  floqueNom?: string;
  floqueNumero?: string;
};

type NewCartItem = Omit<CartItem, "id" | "prix">;

type CartContextType = {
  items: CartItem[];
  addItem: (item: NewCartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantite: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrix: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
// v2: schéma "commande sur mesure" (club/type/taille), incompatible avec
// l'ancien schéma "catalogue fixe" (nom/slug/image) — clé renommée pour ne
// pas réhydrater d'anciens paniers dans un format inconnu.
const STORAGE_KEY = "maillots-shop-cart-v2";

function isValidCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.club === "string" &&
    v.club.trim().length > 0 &&
    TYPES_MAILLOT.includes(v.type as TypeMaillot) &&
    TAILLES.includes(v.taille as Taille) &&
    typeof v.quantite === "number" &&
    v.quantite > 0 &&
    (v.image === undefined || typeof v.image === "string") &&
    (v.floqueNom === undefined || typeof v.floqueNom === "string") &&
    (v.floqueNumero === undefined || typeof v.floqueNumero === "string") &&
    typeof v.prix === "number"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter(isValidCartItem));
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addItem(item: NewCartItem) {
    setItems((prev) => [
      ...prev,
      {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        prix: PRIX_UNITAIRE,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id: string, quantite: number) {
    if (quantite <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantite } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantite, 0),
    [items]
  );
  const totalPrix = useMemo(
    () => items.reduce((sum, i) => sum + i.quantite * i.prix, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrix,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
