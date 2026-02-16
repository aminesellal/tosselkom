import { Router } from "express";
import {
    getDashboardStats,
    getAvailableOffers,
    acceptOffer,
    getMyDeliveries,
    startDelivery,
    completeDelivery,
    updateProfile
} from "./courier.controller";

const router = Router();

// Dashboard Livreur
router.get("/dashboard", getDashboardStats);

// Offres disponibles
router.get("/offers", getAvailableOffers);

// Profil
router.post("/profile/update", updateProfile);

// Accepter une offre (PUBLIEE → CONFIRMEE)
router.post("/offers/:orderId/accept", acceptOffer);

// Mes livraisons
router.get("/deliveries", getMyDeliveries);

// Démarrer une course (CONFIRMEE → EN_COURS)
router.patch("/deliveries/:orderId/start", startDelivery);

// Marquer comme livrée (EN_COURS → LIVREE)
router.patch("/deliveries/:orderId/complete", completeDelivery);

export default router;
