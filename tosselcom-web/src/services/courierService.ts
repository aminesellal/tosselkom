import api from '../lib/axios';

export interface CourierDashboardData {
    stats: {
        totalDeliveries: number;
        deliveryGrowth: string;
        rating: number;
        ratingLabel: string;
        kilometers: number;
        balance: number;
        balanceCurrency: string;
        status: string;
    };
    recentActivity: Array<{
        id: string;
        date: string;
        origin: string;
        destination: string;
        price: number;
        status: string;
        icon: string;
    }>;
    vehicle: {
        model: string;
        type: string;
        batteryLevel: number;
        maintenanceText: string;
        icon: string;
    };
}

export interface Offer {
    id: string;
    origin: string;
    destination: string;
    price: number;
    weight: number;
    type: string;
    description: string;
    clientName: string;
    createdAt: string;
}

export interface Delivery {
    id: string;
    shortId: string;
    origin: string;
    destination: string;
    description: string;
    weight: number;
    price: number;
    status: string;
    clientName: string;
    clientPhone: string;
    createdAt: string;
    updatedAt: string;
}

export const courierService = {
    getDashboard: async (): Promise<CourierDashboardData> => {
        const response = await api.get('/courier/dashboard');
        return response.data;
    },

    getOffers: async (): Promise<Offer[]> => {
        const response = await api.get('/courier/offers');
        return response.data;
    },

    acceptOffer: async (orderId: string) => {
        const response = await api.post(`/courier/offers/${orderId}/accept`);
        return response.data;
    },

    getMyDeliveries: async (): Promise<Delivery[]> => {
        const response = await api.get('/courier/deliveries');
        return response.data;
    },

    startDelivery: async (orderId: string) => {
        const response = await api.patch(`/courier/deliveries/${orderId}/start`);
        return response.data;
    },

    completeDelivery: async (orderId: string) => {
        const response = await api.patch(`/courier/deliveries/${orderId}/complete`);
        return response.data;
    },

    updateProfile: async (data: { name: string; phone: string; vehicle: string; image: string }) => {
        const response = await api.post('/courier/profile/update', data);
        return response.data;
    }
};
