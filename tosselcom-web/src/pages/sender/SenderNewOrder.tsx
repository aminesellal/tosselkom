import { useState } from 'react';
import { SenderLayout } from '../../components/layouts/SenderLayout';
import { orderService } from '../../services/orderService';

export const SenderNewOrder = () => {
    const [deliveryType, setDeliveryType] = useState<'express' | 'normal'>('express');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // State pour les champs du formulaire
    const [form, setForm] = useState({
        origine: '',
        destination: '',
        phone: '',
        datePickup: '',
        poids: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await orderService.createOrder({
                origine: form.origine,
                destination: form.destination,
                poids: parseFloat(form.poids),
                description: form.description,
                datePickup: form.datePickup
            });
            setSuccess(true);
            // Reset form
            setForm({ origine: '', destination: '', phone: '', datePickup: '', poids: '', description: '' });
        } catch (error) {
            console.error("Erreur création commande:", error);
            alert("❌ Impossible de créer la commande. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setForm({ origine: '', destination: '', phone: '', datePickup: '', poids: '', description: '' });
        setSuccess(false);
    };

    if (success) {
        return (
            <SenderLayout>
                <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
                    <span className="material-symbols-outlined text-6xl text-emerald-500 mb-6">check_circle</span>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Commande publiée !</h2>
                    <p className="text-sm text-zinc-500 mb-8 max-w-md">Votre colis est maintenant visible par les livreurs. Vous serez notifié quand un livreur acceptera votre commande.</p>
                    <div className="flex gap-4">
                        <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                            Nouvelle commande
                        </button>
                        <button onClick={() => window.location.href = '/sender/orders'} className="px-8 py-3 border border-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-all">
                            Voir mes commandes
                        </button>
                    </div>
                </div>
            </SenderLayout>
        );
    }

    return (
        <SenderLayout>
            <header className="h-24 px-10 flex items-center justify-between border-b border-zinc-50 sticky top-0 bg-white z-10">
                <div className="text-left">
                    <h1 className="text-xl font-bold text-black tracking-tight uppercase">Nouvelle Commande</h1>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Formulaire d'expédition premium</p>
                </div>
                <div className="flex items-center gap-8 text-left">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-black">01</span>
                        <div className="h-0.5 w-8 bg-black mt-1"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-gray-300">02</span>
                        <div className="h-0.5 w-8 bg-gray-100 mt-1"></div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto w-full px-10 py-16 text-left">
                <form className="space-y-12" onSubmit={handleSubmit}>
                    <section>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 font-sans">Type de livraison</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                onClick={() => setDeliveryType('express')}
                                className={`border p-8 flex flex-col items-center gap-4 transition-all duration-300 cursor-pointer ${deliveryType === 'express' ? 'border-black bg-black text-white' : 'border-zinc-100'}`}
                            >
                                <span className={`material-symbols-outlined text-4xl font-light ${deliveryType === 'express' ? 'text-white' : 'text-zinc-400'}`}>bolt</span>
                                <div className="text-center">
                                    <h3 className="text-sm font-bold uppercase tracking-widest">Express</h3>
                                    <p className="text-[10px] uppercase mt-1 opacity-60">Priorité 24H</p>
                                </div>
                            </div>
                            <div
                                onClick={() => setDeliveryType('normal')}
                                className={`border p-8 flex flex-col items-center gap-4 transition-all duration-300 cursor-pointer ${deliveryType === 'normal' ? 'border-black bg-black text-white' : 'border-zinc-100'}`}
                            >
                                <span className={`material-symbols-outlined text-4xl font-light ${deliveryType === 'normal' ? 'text-white' : 'text-zinc-400'}`}>package</span>
                                <div className="text-center">
                                    <h3 className="text-sm font-bold uppercase tracking-widest">Normal</h3>
                                    <p className="text-[10px] uppercase mt-1 opacity-60">Délai standard</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">Détails de l'expédition</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-black">Adresse de collecte</label>
                                <input name="origine" value={form.origine} onChange={handleChange} className="w-full border-0 border-b border-black py-3 px-0 focus:ring-0 focus:border-black rounded-none text-sm placeholder:text-zinc-200 bg-transparent" placeholder="RUE ET VILLE D'ORIGINE" required type="text" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-black">Adresse de livraison</label>
                                <input name="destination" value={form.destination} onChange={handleChange} className="w-full border-0 border-b border-black py-3 px-0 focus:ring-0 focus:border-black rounded-none text-sm placeholder:text-zinc-200 bg-transparent" placeholder="RUE ET VILLE DE DESTINATION" required type="text" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-black">Numéro du destinataire</label>
                                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border-0 border-b border-black py-3 px-0 focus:ring-0 focus:border-black rounded-none text-sm placeholder:text-zinc-200 bg-transparent" placeholder="+33 -- -- -- --" type="tel" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-black">Date souhaitée</label>
                                <input name="datePickup" value={form.datePickup} onChange={handleChange} className="w-full border-0 border-b border-black py-3 px-0 focus:ring-0 focus:border-black rounded-none text-sm bg-transparent" required type="date" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-black">Poids Estimé (KG)</label>
                                <input name="poids" value={form.poids} onChange={handleChange} className="w-full border-0 border-b border-black py-3 px-0 focus:ring-0 focus:border-black rounded-none text-sm placeholder:text-zinc-200 bg-transparent" placeholder="0.00" required step="0.01" type="number" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-black">Nature du colis</label>
                                <input name="description" value={form.description} onChange={handleChange} className="w-full border-0 border-b border-black py-3 px-0 focus:ring-0 focus:border-black rounded-none text-sm placeholder:text-zinc-200 bg-transparent" placeholder="DESCRIPTION DU CONTENU" required type="text" />
                            </div>
                        </div>
                    </section>

                    <div className="flex items-center justify-between pt-12 border-t border-gray-100 text-left">
                        <button onClick={handleClear} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors" type="button">
                            Effacer le formulaire
                        </button>
                        <button
                            disabled={loading}
                            className="bg-black text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                            type="submit"
                        >
                            {loading ? 'Envoi en cours...' : 'Confirmer la commande'}
                        </button>
                    </div>
                </form>
            </div>

            <footer className="mt-auto px-10 py-6 border-t border-zinc-50 flex justify-between items-center text-left">
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">© 2026 TOSSELKOM LOGISTICS</p>
                <div className="flex gap-6">
                    <a className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-black" href="#">Conditions</a>
                    <a className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-black" href="#">Confidentialité</a>
                </div>
            </footer>
        </SenderLayout>
    );
};
