import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';

export const RegisterCourier = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        phone: '',
        adresse: '',
        dob: '',
        vehicule: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                'courier',
                formData.phone
            );
            // On peut rediriger vers le dashboard ou une page de succès
            navigate('/courier/dashboard');
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
                            <h1 className="text-3xl font-light tracking-tight mb-2 uppercase text-black">Inscription Livreur</h1>
                            <p className="text-neutral-400 text-sm tracking-wide">Devenez partenaire et commencez à livrer</p>
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
                                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="email">Email professionnel</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg">mail</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="email" name="email" placeholder="exemple@tosselcom.com" required type="email"
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
                                        id="phone" name="phone" placeholder="02 03 04 05 06" required type="tel"
                                        value={formData.phone} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left text-left">
                                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black text-left" htmlFor="adresse">Adresse de résidence</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg">location_on</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black placeholder:text-neutral-300 text-sm transition-all"
                                        id="adresse" name="adresse" placeholder="Adresse complète" required type="text"
                                        value={formData.adresse} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <div className="space-y-1.5 text-left">
                                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="dob">Date de naissance</label>
                                    <input
                                        className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black text-sm transition-all"
                                        id="dob" name="dob" required type="date"
                                        value={formData.dob} onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-black" htmlFor="vehicule">Type de véhicule</label>
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none px-4 py-3 bg-white border border-black/20 rounded-none focus:ring-0 focus:border-black text-sm transition-all pr-10"
                                            id="vehicule" name="vehicule" required
                                            value={formData.vehicule} onChange={handleChange}
                                        >
                                            <option disabled value="">Sélectionner...</option>
                                            <option value="moto">Moto</option>
                                            <option value="voiture">Voiture</option>
                                            <option value="camionnette">Camionnette</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    className="w-full py-4 text-xs shadow-xl active:scale-[0.98]"
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
