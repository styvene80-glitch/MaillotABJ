import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aide & Contact — MaillotABJ",
  description: "Questions fréquentes et moyens de nous contacter.",
};

const FAQ = [
  {
    q: "Comment commander ?",
    a: "Choisis un maillot dans la page Commander (ou compose ta propre commande), indique ta taille et personnalise-le avec un flocage si tu veux, puis ajoute au panier et paie en ligne.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Le paiement en ligne par carte est disponible directement sur le site. Tu peux aussi nous contacter pour payer par Mobile Money ou Wave.",
  },
  {
    q: "Le maillot que je veux n'est pas dans la galerie, que faire ?",
    a: "Utilise le bouton « Commander un maillot personnalisé » sur la page Commander, ou contacte-nous directement (Instagram, WhatsApp ou email) avec le nom du club — on te trouve le maillot.",
  },
  {
    q: "Puis-je personnaliser mon maillot ?",
    a: "Oui, tu peux ajouter un flocage (nom + numéro) directement lors de la commande.",
  },
  {
    q: "Quels sont les délais et frais de livraison ?",
    a: "La livraison est rapide, partout. Contacte-nous pour connaître le délai exact selon ta zone.",
  },
];

const CONTACTS = [
  {
    label: "Instagram",
    value: "@maillotabj",
    href: "https://instagram.com/maillotabj",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    value: "+225 05 65 48 39 93",
    href: "https://wa.me/2250565483993",
    icon: (
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    ),
  },
  {
    label: "Email",
    value: "styvene80@gmail.com",
    href: "mailto:styvene80@gmail.com",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
];

export default function AidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Aide & Contact
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Une question ? Regarde la FAQ ci-dessous, ou contacte-nous
          directement.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CONTACTS.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-bg-card p-6 text-center transition hover:border-accent hover:-translate-y-1"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              {contact.icon}
            </svg>
            <span className="font-black uppercase tracking-tight">
              {contact.label}
            </span>
            <span className="text-sm text-muted">{contact.value}</span>
          </a>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-black uppercase tracking-tight">
          Questions fréquentes
        </h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-bg-card">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                {item.q}
                <span className="ml-4 shrink-0 text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
