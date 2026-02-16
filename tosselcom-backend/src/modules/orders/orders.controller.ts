import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { auth } from '../../lib/auth';

// Créer une nouvelle commande
export const createOrder = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const userId = session.user.id;
        const { origine, destination, poids, description, datePickup } = req.body;

        // Calcul du prix : 5€ base + 2€/kg
        const prixEstime = 5.0 + (parseFloat(poids) * 2.0);

        const newOrder = await prisma.order.create({
            data: {
                clientId: userId,
                origine,
                destination,
                poids: parseFloat(poids),
                quantite: 1,
                description,
                datePickup: new Date(datePickup),
                prix: prixEstime,
                status: "PUBLIEE"
            }
        });

        console.log(`✅ [COMMANDE] Nouvelle commande créée par ${session.user.name} : ${newOrder.id}`);
        res.status(201).json(newOrder);

    } catch (error) {
        console.error("Erreur création commande:", error);
        res.status(500).json({ error: "Impossible de créer la commande" });
    }
};

// Voir ses propres commandes (avec infos livreur si assigné)
export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const orders = await prisma.order.findMany({
            where: { clientId: session.user.id },
            include: {
                livreur: {
                    select: {
                        name: true,
                        phone: true,
                        image: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(orders);
    } catch (error) {
        console.error("Erreur récupération commandes:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// Mettre à jour le profil du Sender
export const updateSenderProfile = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { name, phone, image } = req.body;
        const userId = session.user.id;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (image) updateData.image = image;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        console.log(`👤 [SENDER PROFILE] Profil de ${userId} mis à jour.`);
        res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("Erreur mise à jour profil sender:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// Le Client valide le livreur proposé (EN_ATTENTE → CONFIRMEE)
export const validateCourier = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { orderId } = req.params;

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ error: "Commande introuvable" });
        if (order.clientId !== session.user.id) return res.status(403).json({ error: "Ce n'est pas votre commande" });
        if (order.status !== "EN_ATTENTE") return res.status(400).json({ error: "Cette commande n'est pas en attente de validation" });

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status: "CONFIRMEE" }
        });

        console.log(`✅ [VALIDATE] Client ${session.user.name} a validé le livreur pour la commande ${orderId}`);
        res.json(updated);

    } catch (error) {
        console.error("Erreur validation livreur:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// Le Client refuse le livreur (EN_ATTENTE → PUBLIEE, et on retire le livreur)
export const rejectCourier = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return res.status(401).json({ error: "Non autorisé" });

        const { orderId } = req.params;

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ error: "Commande introuvable" });
        if (order.clientId !== session.user.id) return res.status(403).json({ error: "Ce n'est pas votre commande" });
        if (order.status !== "EN_ATTENTE") return res.status(400).json({ error: "Cette commande n'est pas en attente de validation" });

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status: "PUBLIEE", livreurId: null }
        });

        console.log(`❌ [REJECT] Client ${session.user.name} a refusé le livreur. Commande ${orderId} remise en PUBLIEE.`);
        res.json(updated);

    } catch (error) {
        console.error("Erreur refus livreur:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
