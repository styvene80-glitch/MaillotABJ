# Ma Boutique de Maillots ⚽

Boutique en ligne pour vendre des maillots de football, avec catalogue, panier
et paiement par carte via Stripe Checkout.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## 1. Ajouter tes vrais maillots

Modifie [`src/lib/products.ts`](src/lib/products.ts) : chaque maillot est un
objet avec `nom`, `equipe`, `saison`, `taille`, `etat`, `prix` (en euros),
`description` et `image`.

Ajoute tes photos dans `public/products/` (ex: `maillot-1.jpg`) puis
référence-les dans `image: "/products/maillot-1.jpg"`.

## 2. Configurer Stripe (paiement par carte)

1. Crée un compte gratuit sur [stripe.com](https://dashboard.stripe.com/register).
2. Dans le Dashboard Stripe, va dans **Développeurs > Clés API**.
3. Copie `.env.local.example` vers `.env.local` :
   ```bash
   cp .env.local.example .env.local
   ```
4. Colle ta **clé secrète** (commence par `sk_test_...` en mode test, ou
   `sk_live_...` en production) dans `STRIPE_SECRET_KEY`.
5. Redémarre `npm run dev`.

Tant que Stripe n'est pas configuré, le bouton "Passer commande" affichera un
message clair au lieu de planter.

**Mode test → Mode réel** : en mode test, utilise la carte `4242 4242 4242 4242`
avec n'importe quelle date future et n'importe quel CVC pour simuler un achat.
Quand tu es prêt·e à encaisser du vrai argent, active ton compte Stripe
(vérification d'identité + coordonnées bancaires) puis remplace `sk_test_...`
par ta clé `sk_live_...`.

## 3. Déployer en ligne (Vercel, gratuit)

1. Crée un compte sur [vercel.com](https://vercel.com) (tu peux te connecter
   avec GitHub).
2. Pousse ce projet sur un dépôt GitHub.
3. Sur Vercel, clique **Add New > Project** et importe ton dépôt.
4. Dans les paramètres du projet Vercel, section **Environment Variables**,
   ajoute `STRIPE_SECRET_KEY` avec ta clé Stripe (comme dans `.env.local`).
5. Clique **Deploy**. Ton site sera accessible via une URL du type
   `ton-projet.vercel.app`.

Après le premier déploiement, retourne dans le Dashboard Stripe pour créer un
**webhook** si tu veux être notifié·e automatiquement des commandes (optionnel
pour démarrer — tu reçois de toute façon un e-mail de Stripe à chaque vente).

## Structure du projet

- `src/lib/products.ts` — le catalogue (à modifier pour tes maillots)
- `src/lib/cart-context.tsx` — logique du panier (stocké dans le navigateur)
- `src/app/page.tsx` — page d'accueil / catalogue
- `src/app/produit/[slug]/page.tsx` — fiche produit
- `src/app/panier/page.tsx` — panier
- `src/app/api/checkout/route.ts` — création de la session de paiement Stripe
- `src/app/succes` / `src/app/annule` — pages après paiement
