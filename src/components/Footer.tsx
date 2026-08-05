import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Logo />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} MaillotABJ — Tous les clubs, toutes
            les tailles.
          </p>
        </div>
      </div>
    </footer>
  );
}
