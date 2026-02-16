import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';

export const RegisterSender = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        phone: '',
        adresse: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authService.register(
                formData.email,
                formData.password,
                `${formData.prenom} ${formData.nom}`,
                'sender',
                formData.phone
            );
            navigate('/sender/dashboard');
        } catch (err: any) {
            setError(err.message || "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col antialiased selection:bg-black selection:text-white bg-white text-black font-sans">
            <header className="w-full px-8 py-8 flex justify-between items-center bg-white border-b border-neutral-50 text-left">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <Logo size="md" />
                </Link>
                <Link to="/auth" className="text-xs font-medium uppercase tracking-widest hover:opacity-60 transition-opacity">Retour</Link>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 py-12 bg-white">
                <div className="w-full max-w-xl">
                    <div className="bg-white p-10 border border-black/5 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-light tracking-tight mb-2 uppercase text-black">Inscription Expéditeur</h1>
                            <p className="text-neutral-400 text-sm tracking-wide">Commencez à envoyer vos colis dès aujourd'hui</p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider text-left mb-6">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5 text-left">
                                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="nom">Nom</label>
                                    <input
                                        className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="nom" name="nom" placeholder="Votre nom" required type="text"
                                        value={formData.nom} onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="prenom">Prénom</label>
                                    <input
                                        className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="prenom" name="prenom" placeholder="Votre prénom" required type="text"
                                        value={formData.prenom} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="email">Email</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg">mail</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="email" name="email" placeholder="votre@email.com" required type="email"
                                        value={formData.email} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="password">Mot de passe</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg">lock</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="password" name="password" placeholder="••••••••" required type="password"
                                        value={formData.password} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="phone">Numéro de téléphone</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg">call</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="phone" name="phone" placeholder="06 00 00 00 00" required type="tel"
                                        value={formData.phone} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="adresse">Adresse de facturation</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg">location_on</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="adresse" name="adresse" placeholder="Adresse complète" required type="text"
                                        value={formData.adresse} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    className="w-full py-4 text-xs font-bold uppercase tracking-[0.3em] shadow-xl active:scale-[0.98]"
                                    type="submit"
                                    loading={loading}
                                >
                                    S'inscrire
                                </Button>
                            </div>

                            <div className="text-center pt-4">
                                <p className="text-xs text-neutral-400">
                                    Déjà inscrit ?
                                    <Link to="/auth" className="text-black font-bold border-b border-black hover:opacity-60 transition-opacity ml-1 pb-0.5 text-center">Connexion</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="w-full py-8 text-center border-t border-neutral-50 bg-white">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">© 2026 Tosselkom • Premium Delivery Logistics</p>
            </footer>
        </div>
    );
};
