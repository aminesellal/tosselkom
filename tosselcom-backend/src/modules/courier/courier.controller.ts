import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { auth } from '../../lib/auth';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session) {
            return res.status(401).json({ error: "Non autorisé" });
        }

        const userId = session.user.id;

        // Récupérer les infos de l'utilisateur
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        // Statistiques réelles
        const totalDeliveries = await prisma.order.count({
            where: { livreurId: userId, status: 'LIVREE' }
        });

        const aggregations = await prisma.order.aggregate({
            _sum: { prix: true },
            where: { livreurId: userId, status: 'LIVREE' }
        });

        const balance = aggregations._sum.prix || 0;

        const recentOrders = await prisma.order.findMany({
            where: { livreurId: userId },
            take: 3,
            orderBy: { createdAt: 'desc' }
        });

        const dashboardData = {
            stats: {
                totalDeliveries: totalDeliveries,
                deliveryGrowth: "+0%",
                rating: 5.0,
                ratingLabel: "Nouveau",
                kilometers: 0,
                balance: balance,
                balanceCurrency: "€",
                status: "Disponible"
            },
            recentActivity: recentOrders.map(order => ({
                id: order.id.substring(0, 8).toUpperCase(),
                date: new Date(order.updatedAt).toLocaleDateString('fr-FR', { weekday: 'short', hour: '2-digit', minute: '2-digit' }),
                origin: order.origine,
                destination: order.destination,
                price: order.prix,
                status: order.status,
                icon: "local_shipping"
            })),
            vehicle: {
                model: (user as any)?.vehicle || "Non renseigné",
                type: "Standard",
                batteryLevel: 100,
                maintenanceText: (user as any)?.vehicle ? "Véhicule opérationnel" : "Enregistrez un véhicule.",
                icon: "directions_car"
            }
        };

        res.json(dashboardData);

    } catch (error) {
        console.error("Erreur Dashboard Livreur:", error);
        res.status(500).json({ error: "Impossible de charger le tableau de bord" });
    }
};

export const getAvailableOffers = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const offers = await prisma.order.findMany({
            where: { status: "PUBLIEE", livreurId: null },
            include: { client: { select: { name: true, role: true } } },
            orderBy: { createdAt: 'desc' }
        });

        const formattedOffers = offers.map(offer => ({
            id: offer.id,
            origin: offer.origine,
            destination: offer.destination,
            price: offer.prix,
            weight: offer.poids,
            type: "Standard",
            description: offer.description,
            clientName: offer.client.name,
            createdAt: offer.createdAt
        }));

        res.json(formattedOffers);

    } catch (error) {
        console.error("Récupération offres:", error);
        res.status(500).json({ error: "Impossible de charger les offres" });
    }
};

export const acceptOffer = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { orderId } = req.params;
        const userId = session.user.id;

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ error: "Commande introuvable" });
        if (order.status !== "PUBLIEE") return res.status(400).json({ error: "Cette offre n'est plus disponible" });

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { livreurId: userId, status: "EN_ATTENTE" }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const getMyDeliveries = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const deliveries = await prisma.order.findMany({
            where: { livreurId: session.user.id },
            include: { client: { select: { name: true, phone: true } } },
            orderBy: { updatedAt: 'desc' }
        });

        const formatted = deliveries.map(d => ({
            id: d.id,
            shortId: "CMD-" + d.id.substring(0, 4).toUpperCase(),
            origin: d.origine,
            destination: d.destination,
            description: d.description,
            weight: d.poids,
            price: d.prix,
            status: d.status,
            clientName: d.client.name,
            clientPhone: d.client.phone,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const startDelivery = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { orderId } = req.params;
        const updated = await prisma.order.update({
            where: { id: orderId, livreurId: session.user.id },
            data: { status: "EN_COURS" }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const completeDelivery = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { orderId } = req.params;
        const updated = await prisma.order.update({
            where: { id: orderId, livreurId: session.user.id },
            data: { status: "LIVREE" }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// ============================
// METTRE À JOUR LE PROFIL
// ============================
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { name, phone, vehicle, image } = req.body;
        const userId = session.user.id;

        // On construit l'objet de données dynamiquement
        // pour éviter de faire planter Prisma si la colonne 'vehicle' manque
        const updateData: any = {
            name,
            phone,
            image
        };

        // On n'ajoute vehicle que si on est sûr (ou on catch l'erreur spécifique après)
        if (vehicle) {
            updateData.vehicle = vehicle;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        console.log(`👤 [PROFILE] Profil de ${userId} mis à jour.`);
        res.json({ success: true, user: updatedUser });

    } catch (error: any) {
        console.error("❌ [ERREUR PROFILE]:", error.message);

        // Si l'erreur dit que 'vehicle' n'existe pas, on réessaie sans
        if (error.message.includes('vehicle')) {
            console.log("⚠️ Colonne 'vehicle' manquante, tentative sans ce champ...");
            try {
                const { vehicle, ...safeData }: any = req.body;
                const updatedUser = await prisma.user.update({
                    where: { id: (session as any).user.id },
                    data: { name: safeData.name, phone: safeData.phone, image: safeData.image }
                });
                return res.json({ success: true, user: updatedUser, warning: "Vehicle non enregistré (DB non migrée)" });
            } catch (retryError) {
                return res.status(500).json({ error: "Erreur critique lors de la mise à jour" });
            }
        }

        res.status(500).json({ error: "Erreur serveur lors de la mise à jour du profil" });
    }
};
