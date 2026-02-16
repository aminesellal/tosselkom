import React, { useEffect, useState } from 'react';
import { CourierLayout } from '../../components/layouts/CourierLayout';
import { courierService } from '../../services/courierService';

export const CourierOffers = () => {
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedOfferId, setExpandedOfferId] = useState<string | null>(null);

    // Chargement des offres réelles
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await courierService.getOffers();
                setOffers(data);
            } catch (error) {
                console.error("Erreur chargement offres", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    // Filtrage local par ville
    const filteredOffers = offers.filter(offer =>
        offer.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleOffer = (id: string) => {
        setExpandedOfferId(expandedOfferId === id ? null : id);
    };

    const handleAcceptOffer = async (id: string) => {
        try {
            await courierService.acceptOffer(id);
            // Retirer l'offre de la liste (elle est maintenant CONFIRMEE)
            setOffers(prev => prev.filter(o => o.id !== id));
            setExpandedOfferId(null);
            alert("✅ Mission acceptée ! Rendez-vous dans 'Mes Livraisons'.");
        } catch (error) {
            console.error("Erreur acceptation:", error);
            alert("❌ Impossible d'accepter cette offre.");
        }
    };

    return (
        <CourierLayout>
            <div className="max-w-6xl mx-auto px-10 py-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left">
                    <div>
                        <h1 className="text-4xl font-black text-black tracking-tighter flex items-center gap-4">
                            TROUVER DES OFFRES
                            <span className="text-xs font-bold px-3 py-1 border border-black">{filteredOffers.length} DISPONIBLES</span>
                        </h1>
                        <p className="text-sm text-zinc-500 mt-2 uppercase tracking-widest font-medium">Flux d'opportunités logistiques en temps réel</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
                            <input
                                className="pl-10 pr-4 py-2 bg-white border border-black text-[10px] font-bold uppercase tracking-widest w-64 focus:ring-0 focus:border-black placeholder:text-zinc-300"
                                placeholder="RECHERCHER UNE VILLE..." type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-xs font-bold uppercase tracking-widest animate-pulse">Chargement des offres...</div>
                ) : (
                    <div className="flex flex-col text-left border-t border-zinc-100">
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-100">
                            <div className="col-span-4">Itinéraire</div>
                            <div className="col-span-2">Type</div>
                            <div className="col-span-2">Poids</div>
                            <div className="col-span-2 text-right">Rémunération</div>
                            <div className="col-span-2"></div>
                        </div>

                        <div className="divide-y divide-zinc-100">
                            {filteredOffers.length === 0 ? (
                                <div className="py-20 text-center text-zinc-400 text-sm">Aucune offre disponible pour le moment.</div>
                            ) : (
                                filteredOffers.map((offer) => (
                                    <div key={offer.id} className="transition-all hover:bg-zinc-50">
                                        {/* Ligne Résumé */}
                                        <div className="grid grid-cols-12 gap-4 px-6 py-8 items-center cursor-pointer" onClick={() => toggleOffer(offer.id)}>
                                            <div className="col-span-4 flex items-center gap-6">
                                                <div className="flex flex-col gap-2 relative pl-4 border-l border-zinc-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-[8px] h-[8px] border border-black bg-white rounded-full"></div>
                                                        <p className="text-[11px] font-black uppercase leading-none">{offer.origin}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-[8px] h-[8px] bg-black rounded-full"></div>
                                                        <p className="text-[11px] font-black uppercase leading-none">{offer.destination}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="px-2 py-1 bg-zinc-100 text-[9px] font-bold uppercase tracking-wider">{offer.type}</span>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs font-bold text-black uppercase">{offer.weight} kg</p>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <p className="text-lg font-black text-black tracking-tighter">{offer.price} €</p>
                                            </div>
                                            <div className="col-span-2 flex justify-end">
                                                <button className={`w-8 h-8 flex items-center justify-center border border-black transition-transform ${expandedOfferId === offer.id ? 'rotate-180 bg-black text-white' : 'bg-white text-black'}`}>
                                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Panneau Détail (Visible au clic) */}
                                        {expandedOfferId === offer.id && (
                                            <div className="px-6 pb-8 bg-zinc-50 border-t border-zinc-100 animate-in slide-in-from-top-2 duration-200">
                                                <div className="grid grid-cols-2 gap-8 pt-6">
                                                    <div>
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Description</h3>
                                                        <p className="text-sm font-medium text-zinc-800 leading-relaxed mb-4">{offer.description}</p>

                                                        <div className="flex gap-4">
                                                            <div>
                                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Client</h4>
                                                                <p className="text-xs font-bold">{offer.clientName}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date de dépôt</h4>
                                                                <p className="text-xs font-bold">{new Date(offer.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-end justify-end">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleAcceptOffer(offer.id); }}
                                                            className="px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95 flex items-center gap-3"
                                                        >
                                                            <span>Accepter la mission</span>
                                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </CourierLayout>
    );
};
