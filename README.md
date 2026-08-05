# Ma Boutique de Maillots ⚽

Boutique en ligne pour vendre des maillots de football sur commande : le
client choisit le club/la sélection, le type (domicile/extérieur/third) et sa
taille, ajoute au panier et paie par carte via Stripe Checkout. Prix fixe :
20 000 F CFA (XOF) par maillot.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## 1. Configurer l'offre

Modifie [`src/lib/order-config.ts`](src/lib/order-config.ts) pour changer le
prix unitaire (`PRIX_UNITAIRE`), la devise (`DEVISE_STRIPE` — doit être un
code devise supporté par Stripe), les types de maillots ou les tailles
disponibles.

## 2. Ajouter des photos (optionnel)

Le formulaire de commande ne montre pas encore de photos (le client précise
juste le club, le type et la taille). Si tu veux ajouter une galerie
d'exemples, dépose tes images dans `public/products/` et intègre-les dans
[`src/app/page.tsx`](src/app/page.tsx).

## 3. Configurer Stripe (paiement par carte)

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

## 4. Déployer en ligne (Vercel, gratuit)

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

- `src/lib/order-config.ts` — prix, devise, types et tailles disponibles
- `src/lib/cart-context.tsx` — logique du panier (stocké dans le navigateur)
- `src/components/OrderForm.tsx` — formulaire de commande (club, type, taille, quantité)
- `src/app/page.tsx` — page d'accueil avec le formulaire
- `src/app/panier/page.tsx` — panier
- `src/app/api/checkout/route.ts` — création de la session de paiement Stripe (prix recalculé côté serveur)
- `src/app/succes` / `src/app/annule` — pages après paiement

## Note sur la devise (F CFA)

Stripe accepte le XOF comme devise de paiement, mais vérifie lors de la
création de ton compte Stripe que le pays choisi permet bien de facturer en
XOF (sinon, adapte `DEVISE_STRIPE` dans `order-config.ts` vers l'euro ou une
autre devise supportée par ton compte).
