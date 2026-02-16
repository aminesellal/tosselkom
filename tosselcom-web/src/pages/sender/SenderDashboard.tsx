import { useEffect, useState } from 'react';
import { SenderLayout } from '../../components/layouts/SenderLayout';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { Button } from '../../components/ui/Button';
import { orderService } from '../../services/orderService';

export const SenderDashboard = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await orderService.getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error("Erreur chargement dashboard sender:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // Calcul des statistiques réelles
    const activeShipments = orders.filter(o => o.status === 'EN_COURS').length;
    const pendingActions = orders.filter(o => o.status === 'PUBLIEE').length;
    const totalSpent = orders.reduce((acc, curr) => acc + (curr.prix || 0), 0);

    // On ne garde que les 3 dernières pour l'affichage
    const recentOrders = orders.slice(0, 3);

    if (loading) {
        return (
            <SenderLayout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-xs uppercase tracking-[0.2em] animate-pulse font-bold">Initialisation...</p>
                </div>
            </SenderLayout>
        );
    }

    return (
        <SenderLayout>
            <DashboardHeader
                title="Vue d'ensemble"
                subtitle={new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                actions={
                    <>
                        <Link to="/sender/new-order">
                            <Button size="sm">
                                <span className="material-symbols-outlined text-base mr-2">add</span>
                                Nouvelle Demande
                            </Button>
                        </Link>
                    </>
                }
            />

            <div className="p-16 space-y-20 text-left">
                <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <StatCard label="Expéditions Actives" value={activeShipments.toString()} subValue="En cours" active />
                    <StatCard label="Actions Requises" value={pendingActions.toString()} subValue="En attente" />
                    <StatCard label="Dépenses Totales" value={(totalSpent / 1000).toFixed(1)} subValue="k €" />
                    <StatCard label="Commandes" value={orders.length.toString()} subValue="Total" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Mouvements Récents</h2>
                            <Link to="/sender/orders" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">Voir tout</Link>
                        </div>
                        <div className="space-y-0">
                            {recentOrders.length === 0 ? (
                                <p className="py-10 text-zinc-300 text-sm italic">Aucune commande récente.</p>
                            ) : (
                                recentOrders.map((order, index) => (
                                    <div key={order.id} className="group flex items-center py-6 border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors -mx-4 px-4 rounded-sm">
                                        <div className="w-16">
                                            <div className="w-8 h-8 border border-zinc-200 text-black flex items-center justify-center">
                                                <span className="material-symbols-outlined text-sm">local_shipping</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-[11px] font-bold text-black uppercase tracking-wide">#{order.id.substring(0, 8).toUpperCase()}</p>
                                                <p className="text-[10px] text-zinc-400 mt-1 uppercase">{order.description}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Itinéraire</p>
                                                <p className="text-[11px] font-medium text-black uppercase truncate">{order.origine} → {order.destination}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Statut</p>
                                                <p className="text-[11px] font-bold uppercase text-black">{order.status}</p>
                                            </div>
                                        </div>
                                        <div className="text-right pl-4">
                                            <span className="text-[10px] font-mono text-zinc-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="mb-8 border-b border-zinc-100 pb-4 text-left">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Guide Rapide</h2>
                        </div>
                        <div className="relative pl-6 space-y-12 text-left">
                            <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-zinc-100"></div>
                            <div className="relative">
                                <div className="absolute -left-[24px] top-1.5 w-[11px] h-[11px] rounded-full bg-black border-2 border-white"></div>
                                <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1">Étape 1</p>
                                <p className="text-sm font-medium text-black leading-snug">Créez votre commande en précisant l'origine et le poids.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[24px] top-1.5 w-[11px] h-[11px] rounded-full bg-white border-2 border-zinc-300"></div>
                                <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1">Étape 2</p>
                                <p className="text-sm font-medium text-black leading-snug">Attendez qu'un livreur accepte votre mission.</p>
                            </div>
                        </div>
                        <div className="mt-12 bg-black text-white p-8 text-center">
                            <p className="text-lg font-black tracking-tight mb-2">PRÊT À ENVOYER ?</p>
                            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-6">Service Premium 24/7</p>
                            <Link to="/sender/new-order" className="block w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all">
                                LANCER UN COLIS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </SenderLayout>
    );
};
