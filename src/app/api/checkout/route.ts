import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  PRIX_UNITAIRE,
  DEVISE_STRIPE,
  TYPES_MAILLOT,
  TAILLES,
} from "@/lib/order-config";

type CheckoutItem = {
  club: string;
  type: string;
  taille: string;
  quantite: number;
  floqueNom?: string;
  floqueNumero?: string;
};

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Le paiement en ligne n'est pas encore configuré. Ajoutez votre clé STRIPE_SECRET_KEY dans .env.local (voir le README).",
      },
      { status: 500 }
    );
  }

  const body = await request.json();
  const items: CheckoutItem[] = body.items ?? [];

  if (items.length === 0) {
    return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
  }

  // Le prix unitaire est toujours recalculé côté serveur (prix fixe),
  // on ne fait jamais confiance à un montant envoyé par le client.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const club = String(item.club ?? "").trim().slice(0, 100);
    if (!club) {
      return NextResponse.json(
        { error: "Le nom du club est requis." },
        { status: 400 }
      );
    }
    const type = TYPES_MAILLOT.includes(item.type as (typeof TYPES_MAILLOT)[number])
      ? item.type
      : TYPES_MAILLOT[0];
    const taille = TAILLES.includes(item.taille as (typeof TAILLES)[number])
      ? item.taille
      : "M";
    const quantite = Math.max(1, Math.min(20, Math.floor(item.quantite)));
    const floqueNom = String(item.floqueNom ?? "").trim().slice(0, 20);
    const floqueNumero = String(item.floqueNumero ?? "")
      .replace(/[^0-9]/g, "")
      .slice(0, 2);
    const flocageLabel =
      floqueNom || floqueNumero
        ? ` · Flocage ${floqueNom}${floqueNom && floqueNumero ? " " : ""}${floqueNumero}`
        : "";

    line_items.push({
      quantity: quantite,
      price_data: {
        currency: DEVISE_STRIPE,
        unit_amount: PRIX_UNITAIRE,
        product_data: {
          name: `Maillot ${club} — ${type}`,
          description: `Taille ${taille} · Neuf · Authentique supporter${flocageLabel}`,
        },
      },
    });
  }

  const origin = request.headers.get("origin") ?? request.nextUrl.origin;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/annule`,
      shipping_address_collection: { allowed_countries: ["CI", "FR", "SN", "BF", "ML", "TG", "BJ"] },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 }
    );
  }
}
