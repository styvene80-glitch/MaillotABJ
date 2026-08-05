import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

type CheckoutItem = { slug: string; quantite: number };

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

  // On recalcule les prix côté serveur à partir du catalogue,
  // pour ne jamais faire confiance aux prix envoyés par le client.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product) {
      return NextResponse.json(
        { error: `Produit inconnu: ${item.slug}` },
        { status: 400 }
      );
    }
    const quantite = Math.max(1, Math.min(99, Math.floor(item.quantite)));
    line_items.push({
      quantity: quantite,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(product.prix * 100),
        product_data: {
          name: `${product.nom} — ${product.equipe} (${product.saison})`,
          description: `Taille ${product.taille} · ${product.etat}`,
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
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 }
    );
  }
}
