import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Logo />
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-foreground/80 transition hover:text-foreground">
              Accueil
            </Link>
            <Link href="/commander" className="text-foreground/80 transition hover:text-foreground">
              Commander
            </Link>
            <Link href="/aide" className="text-foreground/80 transition hover:text-foreground">
              Aide
            </Link>
          </nav>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} MaillotABJ
          </p>
        </div>
      </div>
    </footer>
  );
}
