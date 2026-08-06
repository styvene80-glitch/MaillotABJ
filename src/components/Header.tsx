"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import Logo from "./Logo";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#commander"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground sm:block"
          >
            Commander
          </Link>
          <Link
            href="/panier"
            className="relative flex items-center gap-2 rounded-full bg-bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline">Panier</span>
            {totalItems > 0 && (
              <span
                key={totalItems}
                className="animate-pop flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
