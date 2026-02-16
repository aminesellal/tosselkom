import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';

export const LoginCourier = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authService.login(email, password);
            navigate('/courier/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col selection:bg-black selection:text-white bg-white text-black font-sans antialiased">
            <nav className="w-full px-8 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <Logo size="md" />
                    </Link>
                    <a className="text-sm font-medium hover:underline underline-offset-4" href="#">Besoin d'aide ?</a>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-[440px]">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tight mb-3">Connexion</h1>
                        <p className="text-neutral-500 text-base">Identifiez-vous en tant que livreur</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4" role="radiogroup">
                            <Link to="/auth" className="relative cursor-pointer group">
                                <div className="h-36 flex flex-col items-center justify-center border border-neutral-200 rounded-xl transition-all duration-200 group-hover:border-neutral-400">
                                    <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center mb-3 transition-colors">
                                        <span className="material-symbols-outlined text-2xl">package_2</span>
                                    </div>
                                    <span className="font-semibold text-sm text-neutral-400 text-center">Expéditeur</span>
                                </div>
                            </Link>
                            <div className="relative cursor-default">
                                <div className="h-36 flex flex-col items-center justify-center border-2 border-black bg-neutral-50 rounded-xl transition-all duration-200">
                                    <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center mb-3 transition-colors">
                                        <span className="material-symbols-outlined text-2xl">local_shipping</span>
                                    </div>
                                    <span className="font-semibold text-sm text-center">Livreur</span>
                                </div>
                                <div className="absolute top-3 right-3 opacity-100">
                                    <span className="material-symbols-outlined text-black text-xl">check_circle</span>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider text-left">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div className="space-y-1 text-left">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1" htmlFor="email">Email professionnel</label>
                                <input
                                    className="w-full px-4 py-4 bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-neutral-300"
                                    id="email"
                                    placeholder="nom@livreur.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1 text-left">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="password">Mot de passe</label>
                                    <a className="text-[11px] font-semibold text-neutral-400 hover:text-black transition-colors" href="#">Oublié ?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-4 bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-neutral-300"
                                        id="password"
                                        placeholder="••••••••"
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full py-4 rounded-lg flex items-center justify-center gap-2"
                                loading={loading}
                            >
                                Continuer
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Button>
                            <p className="text-center mt-8 text-sm text-neutral-500">
                                Nouveau livreur ?
                                <Link to="/register/courier" className="font-bold text-black hover:underline underline-offset-2 ml-1 text-center">S'inscrire ici</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="py-8 border-t border-neutral-100">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-neutral-400 uppercase tracking-widest text-left">
                    <p>© 2026 TOSSELKOM LOGISTICS</p>
                    <div className="flex gap-8">
                        <a className="hover:text-black transition-colors" href="#">Conditions</a>
                        <a className="hover:text-black transition-colors" href="#">Confidentialité</a>
                        <a className="hover:text-black transition-colors" href="#">Sécurité</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
