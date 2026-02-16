# 📦 Tosselkom Logistics - Système de Gestion de Livraison Premium

Bienvenue dans le dépôt officiel de **Tosselkom Logistics**, une plateforme moderne et robuste de mise en relation entre expéditeurs (Clients) et coursiers (Livreurs). Ce projet a été conçu avec une attention méticuleuse portée à l'expérience utilisateur (UX), au design premium et à la fiabilité technique.

---

## 🛠 Tech Stack Complète

Le projet est divisé en deux parties majeures (Backend et Frontend), utilisant les technologies les plus performantes du marché actuel.

### 🎨 Frontend (Web)
*   **Framework** : [React 18](https://reactjs.org/) avec [Vite](https://vitejs.dev/) pour une compilation ultra-rapide.
*   **Langage** : [TypeScript](https://www.typescriptlang.org/) pour une robustesse de code maximum et une détection d'erreurs en temps réel.
*   **Styling** : [Tailwind CSS](https://tailwindcss.com/) pour un design responsive et entièrement personnalisable.
*   **Icônes** : [Lucide React](https://lucide.dev/) pour des visuels minimalistes et élégants.
*   **Authentification** : [Better Auth Client](https://www.better-auth.com/) pour une gestion sécurisée des sessions.
*   **Animations** : Transitions CSS natives et micro-interactions progressives pour un ressenti "Premium".

### ⚙️ Backend (API)
*   **Runtime** : [Node.js](https://nodejs.org/) avec [TypeScript](https://www.typescriptlang.org/).
*   **Framework** : [Express.js](https://expressjs.com/) pour une API REST flexible et performante.
*   **Base de Données** : [PostgreSQL](https://www.postgresql.org/), un standard industriel pour la fiabilité des données.
*   **ORM** : [Prisma](https://www.prisma.io/) pour une manipulation simplifiée et sécurisée de la base de données.
*   **Authentification** : [Better Auth](https://www.better-auth.com/) gérant les rôles (Sender/Courier) et la protection des routes.

---

## 🏗 Architecture de la Base de Données

Le schéma de données a été modélisé pour refléter fidèlement le flux logistique réel. Voici les entités principales définies via **Prisma ORM** :

### 1. Utilisateurs (`User`)
*   **Rôles** : `sender` (Expéditeur) ou `courier` (Livreur).
*   **Profil** : Nom, Email, Téléphone, Photo de profil, et Type de véhicule (pour les livreurs).
*   **Relations** : Un utilisateur possède des commandes en tant que client ou des livraisons en tant que livreur.

### 2. Commandes/Livraisons (`Order`)
C'est le cœur du système. Chaque commande contient :
*   **Lieux** : Origine et Destination.
*   **Détails** : Poids, Quantité, Description, Prix estimé.
*   **Date** : Date prévue de prise en charge.
*   **Statuts (Workflow)** :
    *   `PUBLIEE` : La commande est en ligne, visible par les livreurs.
    *   `EN_ATTENTE` : Un livreur a accepté l'offre, le client doit maintenant valider son profil.
    *   `CONFIRMEE` : Le client a validé le livreur.
    *   `EN_COURS` : Le colis est en route.
    *   `LIVREE` : Livraison terminée.

---

## 🔄 Workflow de Livraison Implémenté

Nous avons implémenté un cycle de vie sécurisé pour protéger à la fois l'expéditeur et le livreur :

1.  **Publication** : Le Client remplit un formulaire détaillé pour publier sa demande.
2.  **Offre** : Les Livreurs parcourent les offres disponibles sur leur tableau de bord et cliquent sur "Accepter".
3.  **Vérification (Étape Critique)** : Au lieu de démarrer immédiatement, la commande passe en `EN_ATTENTE`. Le Client reçoit une notification, consulte le profil du livreur (nom, véhicule), et peut choisir de **Valider** ou **Refuser** (Remise en ligne).
4.  **Exécution** : Une fois validé, le livreur procède à la récupération et met à jour le statut en temps réel.
5.  **Finalisation** : Confirmation mutuelle de la livraison.

---

## 💎 Design & Esthétique

L'interface a été entièrement revue pour offrir un look "State-of-the-Art" :
*   **Logo** : Un design en pur CSS (Logo.tsx), géométrique et minimaliste, garantissant zéro temps de chargement et une netteté parfaite sur tous les écrans.
*   **Typographie** : Utilisation de polices premium comme *Outfit* ou *Inter* pour une lisibilité maximale.
*   **Glassmorphism** : Cartes semi-transparentes avec flou d'arrière-plan pour les éléments interactifs.
*   **Dark Mode Friendly** : Palette de couleurs basée sur des gris profonds, du blanc pur et du noir intense pour un contraste élégant.

---

## 🚀 Installation et Lancement

### Pré-requis
*   Node.js (v18+)
*   PostgreSQL installé et lancé

### Étape 1 : Backend
```bash
cd tosselcom-backend
npm install
# Configurez votre .env avec DATABASE_URL="postgresql://user:password@localhost:5432/tosselcom"
npx prisma migrate dev --name init
npm run dev
```

### Étape 2 : Frontend (Web)
```bash
cd tosselcom-web
npm install
npm run dev
```

---

## 🔒 Sécurité et Performance
*   **Protection des Routes** : Les dashboards sont protégés. Un livreur ne peut pas accéder aux outils de création de commande d'un client.
*   **Validation côté Serveur** : Toutes les actions de changement de statut (Validation de livreur, etc.) vérifient que l'utilisateur est bien le propriétaire légitime de la commande.
*   **Optimisation Vite** : Chargement paresseux des composants pour une performance mobile optimale.

---

© 2026 **Tosselkom Logistics** • *L'excellence au service de vos colis.*
