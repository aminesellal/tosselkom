import api from '../lib/axios';

export const orderService = {
    // Créer une commande (Sender)
    createOrder: async (data: {
        origine: string;
        destination: string;
        poids: number;
        description: string;
        datePickup: string;
    }) => {
        const response = await api.post('/orders/create', data);
        return response.data;
    },

    // Voir mes commandes (Sender) - inclut les infos livreur
    getMyOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },

    // Mettre à jour le profil (Sender)
    updateProfile: async (data: { name: string; phone: string; image: string }) => {
        const response = await api.post('/orders/profile/update', data);
        return response.data;
    },

    // Valider le livreur proposé (EN_ATTENTE → CONFIRMEE)
    validateCourier: async (orderId: string) => {
        const response = await api.patch(`/orders/${orderId}/validate`);
        return response.data;
    },

    // Refuser le livreur (EN_ATTENTE → PUBLIEE)
    rejectCourier: async (orderId: string) => {
        const response = await api.patch(`/orders/${orderId}/reject`);
        return response.data;
    }
};
