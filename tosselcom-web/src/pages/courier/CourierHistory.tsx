import { useEffect, useState } from 'react';
import { CourierLayout } from '../../components/layouts/CourierLayout';
import { courierService, Delivery } from '../../services/courierService';

export const CourierHistory = () => {
    const [history, setHistory] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await courierService.getMyDeliveries();
                // On ne garde que les livraisons complétées pour l'historique
                const completed = data.filter(d => d.status === 'LIVREE');
                setHistory(completed);
            } catch (error) {
                console.error("Erreur chargement historique:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // Calcul du total des gains
    const totalGains = history.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <CourierLayout>
            <div className="max-w-5xl mx-auto px-12 py-16 text-left">
                <div className="mb-16">
                    <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Historique des Livraisons</h1>
                    <p className="text-xs text-zinc-400 mt-2 uppercase tracking-[0.3em] font-semibold">Archives des flux logistiques terminés</p>
                </div>

                <div className="mb-10 flex items-center justify-between border-b border-black pb-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Période : Toutes</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-black">Total : {totalGains.toFixed(2)} €</div>
                </div>

                <div className="w-full">
                    {loading ? (
                        <div className="text-center py-20 text-xs font-bold uppercase tracking-widest animate-pulse">Chargement...</div>
                    ) : history.length === 0 ? (
                        <div className="text-center py-20 text-zinc-300 text-sm">Aucune archive disponible.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                <div className="col-span-2">Date</div>
                                <div className="col-span-5">Itinéraire (A → B)</div>
                                <div className="col-span-2">Statut</div>
                                <div className="col-span-3 text-right">Gains</div>
                            </div>

                            <div className="divide-y divide-zinc-100">
                                {history.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 px-4 py-8 items-center border-b border-zinc-50 hover:bg-zinc-50 transition-colors cursor-pointer">
                                        <div className="col-span-2">
                                            <p className="text-[11px] font-bold text-black">{new Date(item.updatedAt).toLocaleDateString()}</p>
                                            <p className="text-[10px] text-zinc-400 font-mono">#{item.shortId}</p>
                                        </div>
                                        <div className="col-span-5">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs font-bold text-black uppercase truncate">{item.origin}</p>
                                                <span className="material-symbols-outlined text-xs text-zinc-300">south</span>
                                                <p className="text-xs font-bold text-black uppercase truncate">{item.destination}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="inline-block px-2 py-1 border border-black text-[9px] font-bold uppercase tracking-tighter bg-zinc-50">LIVRÉE</span>
                                        </div>
                                        <div className="col-span-3 text-right">
                                            <p className="text-sm font-black text-black">{item.price.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </CourierLayout>
    );
};
