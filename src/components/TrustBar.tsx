const ITEMS = [
  {
    label: "100% Authentique supporter",
    icon: (
      <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
    ),
  },
  {
    label: "Livraison rapide",
    icon: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
      </>
    ),
  },
  {
    label: "Paiement sécurisé",
    icon: (
      <>
        <rect x="3" y="10" width="18" height="10" rx="2" />
        <path d="M7 10V7a5 5 0 0110 0v3" />
      </>
    ),
  },
];

export default function TrustBar() {
  return (
    <div className="border-b border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-accent"
            >
              {item.icon}
            </svg>
            <span className="text-sm font-semibold text-foreground/90">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
