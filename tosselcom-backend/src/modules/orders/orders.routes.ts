import { Router } from 'express';
import { createOrder, getMyOrders, updateSenderProfile, validateCourier, rejectCourier } from './orders.controller';

const router = Router();

// Créer une commande (Sender)
router.post('/create', createOrder);

// Voir mes commandes (Sender)
router.get('/my-orders', getMyOrders);

// Mettre à jour le profil (Sender)
router.post('/profile/update', updateSenderProfile);

// Valider le livreur (EN_ATTENTE → CONFIRMEE)
router.patch('/:orderId/validate', validateCourier);

// Refuser le livreur (EN_ATTENTE → PUBLIEE)
router.patch('/:orderId/reject', rejectCourier);

export default router;
