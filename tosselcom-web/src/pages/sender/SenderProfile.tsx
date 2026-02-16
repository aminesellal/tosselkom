import { useState, useEffect } from 'react';
import { SenderLayout } from '../../components/layouts/SenderLayout';
import { authClient } from '../../lib/auth-client';
import { orderService } from '../../services/orderService';

export const SenderProfile = () => {
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setImage(session.user.image || '');
            setPhone((session.user as any).phone || '');
        }
    }, [session]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            await orderService.updateProfile({ name, phone, image });
            alert("✅ Profil mis à jour avec succès !");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("❌ Erreur lors de la mise à jour.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoClick = () => {
        const url = prompt("URL de la nouvelle photo :", image);
        if (url !== null) setImage(url);
    };

    return (
        <SenderLayout>
            <div className="min-h-full bg-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-zinc-50 rounded-full blur-3xl -ml-80 -mt-80 opacity-40"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zinc-50 rounded-full blur-3xl -mr-40 -mb-40 opacity-40"></div>

                <div className="max-w-5xl mx-auto px-10 py-20 relative z-10">
                    <header className="mb-20 text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[1px] bg-black"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Paramètres Compte</span>
                        </div>
                        <h1 className="text-6xl font-black text-black tracking-tighter uppercase leading-none">
                            Mon <br /> <span className="text-zinc-200">Profil</span>
                        </h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Left Side: Avatar */}
                        <div className="lg:col-span-4 flex flex-col items-start gap-8">
                            <div className="relative group">
                                <div className="w-48 h-48 bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                    {image ? (
                                        <img src={image} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                                            <span className="material-symbols-outlined text-zinc-200 text-6xl font-light">person</span>
                                        </div>
                                    )}
                                    <div
                                        onClick={handlePhotoClick}
                                        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                    >
                                        <span className="material-symbols-outlined text-white text-3xl mb-2">add_a_photo</span>
                                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Modifier</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-black text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest shadow-xl">
                                    Client
                                </div>
                            </div>

                            <div className="text-left space-y-4 pt-6">
                                <h2 className="text-xl font-black uppercase tracking-tight">{name || 'Client'}</h2>
                                <p className="text-xs text-zinc-400 leading-relaxed max-w-[200px]">
                                    Membre Tosselkom depuis {new Date(session?.user?.createdAt || Date.now()).getFullYear()}.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1.5 bg-black text-white text-[8px] font-black uppercase tracking-widest">Vérifié</span>
                                    <span className="px-3 py-1.5 border border-zinc-200 text-[8px] font-black uppercase tracking-widest">Client Premium</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:col-span-8">
                            <form className="space-y-16" onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                                {/* Personal Info */}
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black">01. Informations Personnelles</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Nom Complet</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-zinc-50 border-0 border-b border-zinc-200 py-4 px-4 text-sm font-bold focus:ring-0 focus:border-black transition-all"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Téléphone</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-zinc-50 border-0 border-b border-zinc-200 py-4 px-4 text-sm font-bold focus:ring-0 focus:border-black transition-all"
                                                placeholder="+33 6 00 00 00 00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black">02. Sécurité & Accès</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3 opacity-50">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">E-mail (Non modifiable)</label>
                                            <input
                                                type="email"
                                                value={session?.user?.email || ''}
                                                disabled
                                                className="w-full bg-transparent border-0 border-b border-zinc-100 py-4 px-4 text-sm font-medium cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Rôle</label>
                                            <p className="text-sm font-black uppercase py-4 px-4">Client Expéditeur</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="pt-10 flex items-center justify-between">
                                    <p className="text-[10px] text-zinc-400 max-w-[250px] italic">
                                        Ces informations sont partagées avec vos livreurs lors d'une mission.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-2xl active:scale-95 flex items-center gap-4 disabled:opacity-50"
                                    >
                                        {loading ? "Traitement..." : "Sauvegarder"}
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </SenderLayout>
    );
};
