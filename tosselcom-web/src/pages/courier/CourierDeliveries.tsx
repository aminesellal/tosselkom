import { useEffect, useState } from 'react';
import { CourierLayout } from '../../components/layouts/CourierLayout';
import { courierService, Delivery } from '../../services/courierService';

export const CourierDeliveries = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Toutes');

    const tabs = ['Toutes', 'En attente', 'Confirmées', 'En cours', 'Terminées'];

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const data = await courierService.getMyDeliveries();
            setDeliveries(data);
        } catch (error) {
            console.error("Erreur chargement livraisons:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async (id: string) => {
        try {
            await courierService.startDelivery(id);
            fetchDeliveries(); // Recharger la liste
        } catch (error) {
            console.error("Erreur démarrage:", error);
            alert("❌ Impossible de démarrer cette course.");
        }
    };

    const handleComplete = async (id: string) => {
        try {
            await courierService.completeDelivery(id);
            fetchDeliveries(); // Recharger la liste
            alert("✅ Livraison terminée ! Votre solde a été mis à jour.");
        } catch (error) {
            console.error("Erreur livraison:", error);
            alert("❌ Impossible de marquer comme livrée.");
        }
    };

    const statusMap: Record<string, { label: string; color: string }> = {
        'EN_ATTENTE': { label: 'En attente client', color: 'text-orange-600 bg-orange-50 border-orange-200' },
        'CONFIRMEE': { label: 'Confirmée', color: 'text-blue-600 bg-blue-50 border-blue-200' },
        'EN_COURS': { label: 'En cours', color: 'text-amber-600 bg-amber-50 border-amber-200' },
        'LIVREE': { label: 'Livrée', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    };

    const filteredDeliveries = deliveries.filter(d => {
        if (activeTab === 'Toutes') return true;
        if (activeTab === 'En attente') return d.status === 'EN_ATTENTE';
        if (activeTab === 'Confirmées') return d.status === 'CONFIRMEE';
        if (activeTab === 'En cours') return d.status === 'EN_COURS';
        if (activeTab === 'Terminées') return d.status === 'LIVREE';
        return true;
    });

    return (
        <CourierLayout>
            <div className="max-w-6xl mx-auto px-10 py-12">
                <div className="text-left mb-10">
                    <h1 className="text-4xl font-black text-black tracking-tighter">MES LIVRAISONS</h1>
                    <p className="text-sm text-zinc-500 mt-2 uppercase tracking-widest font-medium">{deliveries.length} commande(s) au total</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-black pb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === tab
                                ? 'bg-black text-white'
                                : 'text-zinc-400 hover:text-black'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20 text-xs font-bold uppercase tracking-widest animate-pulse">Chargement...</div>
                ) : filteredDeliveries.length === 0 ? (
                    <div className="text-center py-20 text-zinc-400 text-sm">Aucune livraison dans cette catégorie.</div>
                ) : (
                    <div className="space-y-6">
                        {filteredDeliveries.map(delivery => {
                            const status = statusMap[delivery.status] || { label: delivery.status, color: 'text-zinc-600 bg-zinc-50 border-zinc-200' };

                            return (
                                <div key={delivery.id} className="border border-zinc-100 hover:border-black transition-all text-left">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${status.color}`}>
                                                {status.label}
                                            </span>
                                            <span className="text-xs font-black tracking-tight">#{delivery.shortId}</span>
                                        </div>
                                        <span className="text-lg font-black tracking-tighter">{delivery.price} €</span>
                                    </div>

                                    {/* Body */}
                                    <div className="px-6 py-6 grid grid-cols-12 gap-6 items-start">
                                        {/* Itinéraire */}
                                        <div className="col-span-5">
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-sm text-zinc-400 mt-0.5">radio_button_unchecked</span>
                                                    <div>
                                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Enlèvement</p>
                                                        <p className="text-xs font-black uppercase">{delivery.origin}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-sm text-black mt-0.5">location_on</span>
                                                    <div>
                                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Livraison</p>
                                                        <p className="text-xs font-black uppercase">{delivery.destination}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Détails */}
                                        <div className="col-span-4 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-zinc-400">inventory_2</span>
                                                <div>
                                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Contenu</p>
                                                    <p className="text-xs font-bold">{delivery.description} ({delivery.weight} kg)</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-zinc-400">person</span>
                                                <div>
                                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Client</p>
                                                    <p className="text-xs font-bold">{delivery.clientName}</p>
                                                </div>
                                            </div>
                                            {delivery.clientPhone && (
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm text-zinc-400">call</span>
                                                    <p className="text-xs font-bold">{delivery.clientPhone}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-3 flex flex-col items-end gap-3">
                                            {delivery.status === 'EN_ATTENTE' && (
                                                <div className="w-full px-4 py-3 bg-orange-50 border border-orange-200 text-center">
                                                    <span className="material-symbols-outlined text-orange-500 text-lg">hourglass_top</span>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 mt-1">En attente de validation</p>
                                                    <p className="text-[9px] text-orange-400 mt-0.5">Le client doit confirmer</p>
                                                </div>
                                            )}
                                            {delivery.status === 'CONFIRMEE' && (
                                                <button
                                                    onClick={() => handleStart(delivery.id)}
                                                    className="w-full px-4 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                                                    Démarrer la course
                                                </button>
                                            )}
                                            {delivery.status === 'EN_COURS' && (
                                                <button
                                                    onClick={() => handleComplete(delivery.id)}
                                                    className="w-full px-4 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                                    Marquer comme livrée
                                                </button>
                                            )}
                                            {delivery.status === 'LIVREE' && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">✓ Terminée</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </CourierLayout>
    );
};
