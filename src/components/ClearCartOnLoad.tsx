"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";

export default function ClearCartOnLoad() {
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  return null;
}
