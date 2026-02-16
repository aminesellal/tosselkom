import api from '../lib/axios';
import { CourierStats, Order } from '../types';

export const courierService = {
    getStats: async (): Promise<CourierStats> => {
        const response = await api.get('/courier/stats');
        return response.data;
    },

    getOffers: async (): Promise<Order[]> => {
        const response = await api.get('/courier/offers');
        return response.data;
    },

    acceptOffer: async (offerId: string) => {
        const response = await api.post(`/courier/offers/${offerId}/accept`);
        return response.data;
    }
};

export const senderService = {
    getDashboardStats: async () => {
        const response = await api.get('/sender/stats');
        return response.data;
    },

    createOrder: async (orderData: any) => {
        const response = await api.post('/sender/orders', orderData);
        return response.data;
    },

    getMyOrders: async (): Promise<Order[]> => {
        const response = await api.get('/sender/orders');
        return response.data;
    }
};
