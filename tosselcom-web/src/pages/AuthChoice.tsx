import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';

export const AuthChoice = () => {
    const [role, setRole] = useState<'sender' | 'courier'>('sender');
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
            // Redirection selon le rôle choisi (ou idéalement selon le rôle retourné par le backend)
            navigate(role === 'courier' ? '/courier/dashboard' : '/sender/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f7f7f7] text-[#141414] min-h-screen flex flex-col font-sans selection:bg-[#141414] selection:text-white relative">
            {/* Navbar */}
            <nav className="w-full px-6 py-6 absolute top-0 left-0">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo size="md" />
                    </Link>
                    <a className="text-sm font-medium hover:underline decoration-1 underline-offset-4" href="#">Aide</a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#141414 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>

                <div className="w-full max-w-md bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative z-10 border border-neutral-100">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold mb-2 text-[#141414]">Bienvenue</h1>
                        <p className="text-neutral-500 text-sm">Sélectionnez votre profil pour continuer</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div aria-label="Role selection" className="grid grid-cols-2 gap-4" role="group">
                            <label className="cursor-pointer group relative">
                                <input
                                    className="peer sr-only"
                                    name="role"
                                    type="radio"
                                    value="sender"
                                    checked={role === 'sender'}
                                    onChange={() => setRole('sender')}
                                />
                                <div className="h-32 flex flex-col items-center justify-center border border-neutral-200 rounded-xl transition-all duration-300 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary hover:border-neutral-400 bg-white peer-checked:border-[#141414] peer-checked:border-2 peer-checked:bg-[#f7f7f7]">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${role === 'sender' ? 'bg-[#141414] text-white' : 'bg-neutral-100 text-[#141414]'}`}>
                                        <span className="material-icons text-xl">inventory_2</span>
                                    </div>
                                    <span className="font-semibold text-sm">Expéditeur</span>
                                </div>
                                <div className={`absolute top-2 right-2 transition-opacity duration-200 ${role === 'sender' ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="material-icons text-[#141414] text-lg">check_circle</span>
                                </div>
                            </label>

                            <label className="cursor-pointer group relative">
                                <input
                                    className="peer sr-only"
                                    name="role"
                                    type="radio"
                                    value="courier"
                                    checked={role === 'courier'}
                                    onChange={() => setRole('courier')}
                                />
                                <div className="h-32 flex flex-col items-center justify-center border border-neutral-200 rounded-xl transition-all duration-300 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary hover:border-neutral-400 bg-white peer-checked:border-[#141414] peer-checked:border-2 peer-checked:bg-[#f7f7f7]">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${role === 'courier' ? 'bg-[#141414] text-white' : 'bg-neutral-100 text-[#141414]'}`}>
                                        <span className="material-icons text-xl">local_shipping</span>
                                    </div>
                                    <span className="font-semibold text-sm">Livreur</span>
                                </div>
                                <div className={`absolute top-2 right-2 transition-opacity duration-200 ${role === 'courier' ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="material-icons text-[#141414] text-lg">check_circle</span>
                                </div>
                            </label>
                        </div>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-neutral-200"></div>
                            <span className="flex-shrink-0 mx-4 text-neutral-400 text-xs uppercase tracking-wider font-bold">Connexion</span>
                            <div className="flex-grow border-t border-neutral-200"></div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <input
                                    className="block w-full px-4 py-3 bg-transparent border border-neutral-300 rounded-lg text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] focus:border-[#141414] peer placeholder-transparent transition-all"
                                    id="email"
                                    placeholder="Adresse e-mail"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="absolute left-4 top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#141414] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white pointer-events-none" htmlFor="email">
                                    Adresse e-mail
                                </label>
                            </div>
                            <div className="relative group text-left">
                                <input
                                    className="block w-full px-4 py-3 bg-transparent border border-neutral-300 rounded-lg text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] focus:border-[#141414] peer placeholder-transparent transition-all"
                                    id="password"
                                    placeholder="Mot de passe"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="absolute left-4 top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#141414] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white pointer-events-none" htmlFor="password">
                                    Mot de passe
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <Link className="text-xs font-medium text-neutral-500 hover:text-[#141414] hover:underline transition-colors" to="/forgot-password">Mot de passe oublié ?</Link>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <Button
                                type="submit"
                                className="w-full py-4 rounded-lg flex justify-center py-3.5 px-4"
                                loading={loading}
                            >
                                Continuer
                            </Button>
                            <div className="text-center mt-6">
                                <p className="text-sm text-neutral-500">
                                    Pas encore de compte ?
                                    <Link to={`/register/${role}`} className="font-semibold text-[#141414] hover:underline decoration-1 underline-offset-2 ml-1 text-center">
                                        Créer un compte
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <footer className="py-6 text-center">
                <p className="text-xs text-neutral-400">© 2026 TOSSELKOM. Tous droits réservés.</p>
            </footer>
        </div>
    );
};
