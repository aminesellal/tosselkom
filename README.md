# 📦 TOSSELCOM — Plateforme de Livraison Premium

> Mise en relation entre **Expéditeurs** (Senders) et **Livreurs** (Couriers) avec un workflow sécurisé de bout en bout.

---

## 🧭 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Tech Stack](#-tech-stack)
- [Architecture du projet](#-architecture-du-projet)
- [Installation](#-installation--lancement)
- [Variables d'environnement](#-variables-denvironnement)
- [Base de données](#-base-de-données)
- [Workflow métier](#-workflow-de-livraison)
- [Structure des fichiers](#-structure-des-fichiers)
- [API Reference](#-api-reference)
- [Conventions d'équipe](#-conventions-déquipe)
- [Contribuer](#-contribuer)

---

## 🎯 Vue d'ensemble

TOSSELCOM permet à un **client** de publier des commandes de livraison et à des **livreurs** de les accepter. Un système de validation mutuelle protège les deux parties.

| Rôle     | Fonctionnalités                                                                 |
| -------- | ------------------------------------------------------------------------------- |
| **Sender** (Client)  | Créer des commandes, suivre leur statut, valider/refuser un livreur, gérer son profil |
| **Courier** (Livreur) | Voir les offres disponibles, accepter des missions, gérer ses livraisons, consulter son historique |

---

## 🛠 Tech Stack

### Frontend (`tosselcom-web/`)
| Technologie       | Rôle                                |
| ------------------ | ----------------------------------- |
| React 18 + Vite    | Framework UI + build tool           |
| TypeScript         | Typage statique                     |
| Tailwind CSS       | Styling utilitaire                  |
| React Router DOM   | Navigation SPA                      |
| Axios              | Requêtes HTTP (API métier)          |
| Better Auth Client | Authentification (sessions/cookies) |

### Backend (`tosselcom-backend/`)
| Technologie   | Rôle                                         |
| ------------- | -------------------------------------------- |
| Node.js + Express | Serveur API REST                          |
| TypeScript     | Typage statique                              |
| Prisma ORM     | Accès base de données PostgreSQL             |
| Better Auth    | Authentification, sessions, reset mot de passe |
| Nodemailer     | Envoi d'emails (reset password)              |
| Zod            | Validation de schémas                        |

---

## 📐 Architecture du projet

```
tosselcom/
├── tosselcom-backend/         # API REST (Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma      # Schéma de la base de données
│   │   └── migrations/        # Historique des migrations
│   └── src/
│       ├── server.ts          # Point d'entrée du serveur
│       ├── app.ts             # Configuration Express (CORS, routes, auth)
│       ├── lib/               # Librairies partagées
│       │   ├── auth.ts        # Configuration Better Auth
│       │   ├── email.ts       # Service d'envoi d'emails (Nodemailer)
│       │   └── prisma.ts      # Instance Prisma Client
│       └── modules/           # Modules métier (controller + routes)
│           ├── courier/
│           │   ├── courier.controller.ts
│           │   └── courier.routes.ts
│           └── orders/
│               ├── orders.controller.ts
│               └── orders.routes.ts
│
├── tosselcom-web/             # Frontend SPA (React + Vite)
│   └── src/
│       ├── App.tsx            # Routeur principal
│       ├── main.tsx           # Point d'entrée React
│       ├── index.css          # Styles globaux
│       ├── lib/               # Configuration des clients
│       │   ├── auth-client.ts # Client Better Auth (signIn, signUp, etc.)
│       │   └── axios.ts       # Instance Axios pré-configurée
│       ├── types/
│       │   └── index.ts       # Types partagés (UserRole, etc.)
│       ├── services/          # Couche d'accès API
│       │   ├── authService.ts     # Login, Register, Logout, Forgot/Reset Password
│       │   ├── orderService.ts    # CRUD commandes (Sender)
│       │   └── courierService.ts  # Dashboard, offres, livraisons (Courier)
│       ├── components/        # Composants réutilisables
│       │   ├── common/        # Logo, éléments partagés
│       │   ├── ui/            # Button, Badge, Input
│       │   ├── layouts/       # CourierLayout, SenderLayout
│       │   ├── dashboard/     # Sidebar, StatCard, DashboardHeader
│       │   ├── Navbar.tsx     # Barre de navigation landing
│       │   ├── Hero.tsx       # Section héro landing
│       │   ├── Stats.tsx      # Statistiques landing
│       │   ├── HowItWorks.tsx # Section "Comment ça marche"
│       │   ├── CTA.tsx        # Call-to-action landing
│       │   └── Footer.tsx     # Pied de page
│       └── pages/             # Pages (1 fichier = 1 route)
│           ├── AuthChoice.tsx         # /auth - Choix connexion
│           ├── LoginCourier.tsx       # /login/courier
│           ├── RegisterChoice.tsx     # /register - Choix inscription
│           ├── RegisterCourier.tsx    # /register/courier
│           ├── RegisterSender.tsx     # /register/sender
│           ├── ForgotPassword.tsx     # /forgot-password
│           ├── ResetPassword.tsx      # /reset-password
│           ├── courier/               # Pages dashboard livreur
│           │   ├── CourierDashboard.tsx
│           │   ├── CourierOffers.tsx
│           │   ├── CourierDeliveries.tsx
│           │   ├── CourierHistory.tsx
│           │   └── CourierProfile.tsx
│           └── sender/               # Pages dashboard client
│               ├── SenderDashboard.tsx
│               ├── SenderNewOrder.tsx
│               ├── SenderOrders.tsx
│               └── SenderProfile.tsx
│
└── .gitignore
```

---

## 🚀 Installation & Lancement

### Pré-requis
- **Node.js** v18+
- **PostgreSQL** installé et lancé
- **npm** (inclus avec Node.js)

### 1. Cloner le dépôt
```bash
git clone <url-du-repo>
cd tosselcom
```

### 2. Backend
```bash
cd tosselcom-backend
npm install

# Créer le fichier .env (voir section ci-dessous)
cp .env.example .env   # ou créer manuellement

# Appliquer les migrations et générer le client Prisma
npx prisma migrate dev --name init
npx prisma generate

# Lancer le serveur de développement
npm run dev
# → Le serveur démarre sur http://127.0.0.1:3000
```

### 3. Frontend
```bash
cd tosselcom-web
npm install
npm run dev
# → L'app démarre sur http://127.0.0.1:5173 (ou 5174, 5176...)
```

> ⚠️ **IMPORTANT** : Utilisez **toujours** `http://127.0.0.1:xxxx` (et **jamais** `localhost:xxxx`). Les cookies de session sont liés au domaine exact. Si vous mélangez `localhost` et `127.0.0.1`, vous aurez deux sessions séparées et vos données n'apparaîtront pas.

---

## 🔐 Variables d'environnement

### Backend (`tosselcom-backend/.env`)
```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/tosselcom"

# Serveur
PORT=3000

# Email (optionnel - pour la feature "mot de passe oublié")
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@ethereal.email
SMTP_PASS=your-password
SMTP_FROM=noreply@tosselcom.com

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
```

> 💡 Pour tester les emails localement, créez un compte gratuit sur [Ethereal](https://ethereal.email/) et utilisez les identifiants fournis.

---

## 🗄 Base de données

### Modèles principaux (Prisma)

| Modèle         | Description                                    |
| -------------- | ---------------------------------------------- |
| `User`         | Utilisateur (sender ou courier), avec `phone`, `role`, `vehicle?` |
| `Session`      | Sessions d'authentification (géré par Better Auth) |
| `Account`      | Comptes liés (email/password, géré par Better Auth) |
| `Verification` | Tokens de vérification (reset password, etc.) |
| `Order`        | Commandes de livraison                         |

### Statuts d'une commande (`Order.status`)

| Statut       | Signification                                      |
| ------------ | -------------------------------------------------- |
| `PUBLIEE`    | Visible par les livreurs, en attente d'acceptation  |
| `EN_ATTENTE` | Un livreur a accepté → le client doit valider       |
| `CONFIRMEE`  | Le client a validé le livreur                       |
| `EN_COURS`   | Le livreur a démarré la course                      |
| `LIVREE`     | Livraison terminée                                  |

### Commandes utiles Prisma
```bash
npx prisma studio          # Interface visuelle pour la DB
npx prisma migrate dev     # Appliquer les migrations
npx prisma generate        # Régénérer le client après un changement de schéma
npx prisma db push         # Push rapide du schéma (sans migration)
```

---

## 🔄 Workflow de livraison

```
Client crée une commande
         │
         ▼
    ┌──────────┐
    │  PUBLIEE │ ← Visible par tous les livreurs
    └────┬─────┘
         │  Livreur clique "Accepter"
         ▼
   ┌───────────┐
   │ EN_ATTENTE│ ← Le client doit valider ou refuser le livreur
   └─────┬─────┘
    ┌────┴────┐
    │         │
 Valider   Refuser → retour à PUBLIEE (livreur retiré)
    │
    ▼
 ┌──────────┐
 │CONFIRMEE │ ← Le livreur peut démarrer la course
 └────┬─────┘
      │  Livreur clique "Démarrer"
      ▼
  ┌────────┐
  │EN_COURS│ ← Colis en route
  └───┬────┘
      │  Livreur clique "Marquer comme livrée"
      ▼
  ┌────────┐
  │ LIVREE │ ← Terminé ✓
  └────────┘
```

---

## 📡 API Reference

Le backend expose ses routes sous `http://127.0.0.1:3000`.

### Authentification (Better Auth)
| Méthode | Route                             | Description                |
| ------- | --------------------------------- | -------------------------- |
| `ALL`   | `/api/auth/*`                     | Géré automatiquement par Better Auth (login, register, session, etc.) |

### Routes Commandes (Sender)
| Méthode | Route                             | Description                |
| ------- | --------------------------------- | -------------------------- |
| `POST`  | `/api/orders/create`              | Créer une nouvelle commande |
| `GET`   | `/api/orders/my-orders`           | Récupérer ses commandes (avec infos livreur) |
| `POST`  | `/api/orders/profile/update`      | Mettre à jour le profil sender |
| `PATCH` | `/api/orders/:orderId/validate`   | Valider un livreur         |
| `PATCH` | `/api/orders/:orderId/reject`     | Refuser un livreur         |

### Routes Livreur (Courier)
| Méthode | Route                                    | Description                |
| ------- | ---------------------------------------- | -------------------------- |
| `GET`   | `/api/courier/dashboard`                 | Données du tableau de bord |
| `GET`   | `/api/courier/offers`                    | Liste des offres disponibles |
| `POST`  | `/api/courier/offers/:orderId/accept`    | Accepter une offre         |
| `GET`   | `/api/courier/deliveries`                | Mes livraisons en cours    |
| `PATCH` | `/api/courier/deliveries/:orderId/start` | Démarrer une course        |
| `PATCH` | `/api/courier/deliveries/:orderId/complete`| Marquer comme livrée     |
| `POST`  | `/api/courier/profile/update`            | Mettre à jour le profil    |
| `GET`   | `/health`                                | Health check               |

> 🔒 Toutes les routes métier nécessitent une **session authentifiée** (cookie transmis via `withCredentials: true`).

---

## 📏 Conventions d'équipe

### Structure des fichiers

| Dossier / Fichier         | Convention                                        |
| ------------------------- | ------------------------------------------------- |
| `pages/`                  | 1 fichier = 1 route. Nom = `PascalCase.tsx`       |
| `components/ui/`          | Composants atomiques réutilisables (Button, Input) |
| `components/layouts/`     | Layouts spécifiques par rôle                       |
| `components/dashboard/`   | Composants partagés entre dashboards               |
| `services/`               | 1 fichier = 1 domaine métier. Contient les appels API |
| `lib/`                    | Clients et configurations (axios, auth)            |
| `modules/` (backend)      | 1 dossier = 1 domaine. Contient `*.controller.ts` + `*.routes.ts` |

### Nommage
- **Composants React** : `PascalCase` → `SenderNewOrder.tsx`
- **Services** : `camelCase` → `orderService.ts`
- **Routes backend** : kebab-case → `/api/courier/my-orders`
- **Statuts** : `UPPER_SNAKE_CASE` → `EN_ATTENTE`

### Couche Services (Frontend)
Les pages n'appellent **jamais** directement `axios` ou `authClient`. Elles passent toujours par les **services** :

```
Page → Service → axios/authClient → Backend
```

| Service             | Responsabilité                          | Client utilisé |
| ------------------- | --------------------------------------- | -------------- |
| `authService.ts`    | Login, Register, Logout, Reset Password | Better Auth Client |
| `orderService.ts`   | CRUD commandes (côté Sender)            | Axios          |
| `courierService.ts` | Dashboard, offres, livraisons (Courier) | Axios          |

### Authentification
- Le **login/register** utilise `better-auth` client directement (il gère les cookies de session).
- Les **appels API métier** (commandes, offres) utilisent `axios` avec `withCredentials: true` pour transmettre le cookie de session.
- Le backend vérifie chaque requête via `auth.api.getSession({ headers: req.headers })`.

---

## 🤝 Contribuer

### Ajouter une nouvelle page (Frontend)

1. Créer le fichier dans `src/pages/` (ou un sous-dossier par rôle).
2. Ajouter la route dans `src/App.tsx`.
3. Si la page appelle l'API, créer ou enrichir un service dans `src/services/`.

### Ajouter un nouveau module (Backend)

1. Créer un dossier dans `src/modules/<nom>/`.
2. Créer `<nom>.controller.ts` avec les handlers Express.
3. Créer `<nom>.routes.ts` avec le routeur.
4. Brancher les routes dans `src/app.ts` :
   ```typescript
   import monModuleRoutes from './modules/<nom>/<nom>.routes';
   app.use('/api/<nom>', monModuleRoutes);
   ```

### Modifier la base de données

1. Éditer `prisma/schema.prisma`.
2. Lancer : `npx prisma migrate dev --name description_du_changement`
3. Le client Prisma est régénéré automatiquement.

---

## 📝 Notes techniques

- **CORS** : Le backend autorise `localhost:5173`, `localhost:5176`, `127.0.0.1:5173`, `127.0.0.1:5176`. Si votre Vite utilise un autre port, ajoutez-le dans `src/app.ts` **et** dans `src/lib/auth.ts` (`trustedOrigins`).
- **Feature "Mot de passe oublié"** : Les pages et routes frontend sont en place (`/forgot-password`, `/reset-password`). L'envoi d'email nécessite une configuration SMTP valide dans le `.env` du backend.
- **Fichier `apiService.ts`** : Ancien service (legacy), conservé comme référence. Le code actif utilise `orderService.ts` et `courierService.ts`.

---

## 📊 Scripts disponibles

### Backend
```bash
npm run dev              # Lancer en mode développement (hot reload)
npm run build            # Compiler TypeScript
npm run start            # Lancer la version compilée
npm run prisma:generate  # Régénérer le client Prisma
npm run prisma:migrate   # Lancer les migrations
```

### Frontend
```bash
npm run dev      # Lancer le serveur de développement Vite
npm run build    # Compiler pour la production
npm run preview  # Prévisualiser le build de production
```

---

<p align="center">
  <strong>© 2026 TOSSELCOM Logistics</strong> — L'excellence au service de vos colis.
</p>
