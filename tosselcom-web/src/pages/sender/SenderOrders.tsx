import { useEffect, useState } from 'react';
import { SenderLayout } from '../../components/layouts/SenderLayout';
import { orderService } from '../../services/orderService';

export const SenderOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Toutes');
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'weight'>('date');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const tabs = ['Toutes', 'Publiées', 'En attente', 'Confirmées', 'En cours', 'Livrées'];

    const fetchOrders = async () => {
        try {
            const data = await orderService.getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error("Erreur chargement commandes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleValidate = async (orderId: string) => {
        setActionLoading(orderId);
        try {
            await orderService.validateCourier(orderId);
            await fetchOrders();
        } catch (error) {
            console.error("Erreur validation:", error);
            alert("❌ Impossible de valider le livreur.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (orderId: string) => {
        if (!confirm("Êtes-vous sûr de vouloir refuser ce livreur ? La commande sera remise en ligne.")) return;
        setActionLoading(orderId);
        try {
            await orderService.rejectCourier(orderId);
            await fetchOrders();
        } catch (error) {
            console.error("Erreur refus:", error);
            alert("❌ Impossible de refuser le livreur.");
        } finally {
            setActionLoading(null);
        }
    };

    const statusMap: Record<string, { label: string; color: string; icon: string }> = {
        'PUBLIEE': { label: 'Publiée', color: 'text-purple-600 bg-purple-50 border-purple-200', icon: 'campaign' },
        'EN_ATTENTE': { label: 'En attente', color: 'text-orange-600 bg-orange-50 border-orange-200', icon: 'hourglass_top' },
        'CONFIRMEE': { label: 'Confirmée', color: 'text-blue-600 bg-blue-50 border-blue-200', icon: 'check' },
        'EN_COURS': { label: 'En cours', color: 'text-amber-600 bg-amber-50 border-amber-200', icon: 'local_shipping' },
        'LIVREE': { label: 'Livrée', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: 'done_all' },
    };

    const filteredOrders = orders
        .filter(o => {
            if (activeTab === 'Toutes') return true;
            if (activeTab === 'Publiées') return o.status === 'PUBLIEE';
            if (activeTab === 'En attente') return o.status === 'EN_ATTENTE';
            if (activeTab === 'Confirmées') return o.status === 'CONFIRMEE';
            if (activeTab === 'En cours') return o.status === 'EN_COURS';
            if (activeTab === 'Livrées') return o.status === 'LIVREE';
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'price') return (b.prix || 0) - (a.prix || 0);
            if (sortBy === 'weight') return (b.poids || 0) - (a.poids || 0);
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    // Compteur de commandes en attente
    const pendingCount = orders.filter(o => o.status === 'EN_ATTENTE').length;

    return (
        <SenderLayout>
            <div className="max-w-6xl mx-auto px-10 py-12">
                <div className="text-left mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-black tracking-tighter">MES COMMANDES</h1>
                        <p className="text-sm text-zinc-500 mt-2 uppercase tracking-widest font-medium">{orders.length} commande(s) au total</p>
                    </div>
                    {pendingCount > 0 && (
                        <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 px-6 py-3 animate-pulse">
                            <span className="material-symbols-outlined text-orange-500">notification_important</span>
                            <div>
                                <p className="text-xs font-black uppercase text-orange-600">{pendingCount} en attente</p>
                                <p className="text-[10px] text-orange-400">Validation requise</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 border-b border-black pb-4 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap relative ${activeTab === tab
                                ? 'bg-black text-white'
                                : 'text-zinc-400 hover:text-black'
                                }`}
                        >
                            {tab}
                            {tab === 'En attente' && pendingCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3 mb-8 text-left">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Trier par :</span>
                    {[
                        { key: 'date', label: 'Date', icon: 'schedule' },
                        { key: 'price', label: 'Prix', icon: 'payments' },
                        { key: 'weight', label: 'Poids', icon: 'scale' },
                    ].map(s => (
                        <button
                            key={s.key}
                            onClick={() => setSortBy(s.key as any)}
                            className={`flex items-center gap-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all ${sortBy === s.key ? 'bg-black text-white' : 'border border-zinc-200 text-zinc-500 hover:border-black'}`}
                        >
                            <span className="material-symbols-outlined text-xs">{s.icon}</span>
                            {s.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20 text-xs font-bold uppercase tracking-widest animate-pulse">Chargement...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <span className="material-symbols-outlined text-4xl text-zinc-300 mb-4">inbox</span>
                        <p className="text-zinc-400 text-sm">Aucune commande dans cette catégorie.</p>
                        <button
                            onClick={() => window.location.href = '/sender/new-order'}
                            className="mt-6 px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
                        >
                            Créer une commande
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map(order => {
                            const status = statusMap[order.status] || { label: order.status, color: 'text-zinc-600 bg-zinc-50 border-zinc-200', icon: 'help' };
                            const isExpanded = expandedId === order.id;
                            const isProcessing = actionLoading === order.id;

                            return (
                                <div key={order.id} className={`border transition-all text-left ${order.status === 'EN_ATTENTE' ? 'border-orange-300 bg-orange-50/30' : 'border-zinc-100 hover:border-black'}`}>
                                    <div
                                        className="flex items-center justify-between px-6 py-5 cursor-pointer"
                                        onClick={() => setExpandedId(isExpanded ? null : order.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 flex items-center justify-center border ${status.color}`}>
                                                <span className="material-symbols-outlined text-sm">{status.icon}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-zinc-400">
                                                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-black uppercase tracking-tight">
                                                    {order.origine} → {order.destination}
                                                </p>
                                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                                                    {order.description} • {order.poids} kg
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div>
                                                <p className="text-lg font-black tracking-tighter">{order.prix?.toFixed(2)} €</p>
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">Estimé</p>
                                            </div>
                                            <span className={`material-symbols-outlined text-zinc-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-6 pb-6 border-t border-zinc-100 pt-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                                <div>
                                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Enlèvement</p>
                                                    <p className="text-xs font-bold uppercase">{order.origine}</p>
                                                    <p className="text-[10px] text-zinc-400 mt-1">
                                                        {order.datePickup ? new Date(order.datePickup).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Non défini'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Livraison</p>
                                                    <p className="text-xs font-bold uppercase">{order.destination}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Livreur Assigné</p>
                                                    {order.livreur ? (
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100">
                                                                {order.livreur.image ? (
                                                                    <img src={order.livreur.image} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center">
                                                                        <span className="material-symbols-outlined text-zinc-300 text-sm">person</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold uppercase">{order.livreur.name}</p>
                                                                {order.livreur.phone && (
                                                                    <p className="text-[10px] text-zinc-400">{order.livreur.phone}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-zinc-300 italic">En attente d'un livreur...</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ========== BOUTONS DE VALIDATION (EN_ATTENTE) ========== */}
                                            {order.status === 'EN_ATTENTE' && (
                                                <div className="bg-orange-50 border border-orange-200 p-5 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-orange-500 text-xl">verified_user</span>
                                                        <div>
                                                            <p className="text-xs font-black uppercase text-orange-700">Action requise</p>
                                                            <p className="text-[10px] text-orange-500">Le livreur <strong>{order.livreur?.name || '...'}</strong> a accepté votre commande. Validez-le pour démarrer.</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleReject(order.id); }}
                                                            disabled={isProcessing}
                                                            className="px-6 py-3 border border-red-300 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all disabled:opacity-50"
                                                        >
                                                            <span className="material-symbols-outlined text-sm mr-1 align-middle">close</span>
                                                            Refuser
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleValidate(order.id); }}
                                                            disabled={isProcessing}
                                                            className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
                                                        >
                                                            {isProcessing ? 'Traitement...' : (
                                                                <>
                                                                    <span className="material-symbols-outlined text-sm mr-1 align-middle">check</span>
                                                                    Valider ce livreur
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </SenderLayout>
    );
};
