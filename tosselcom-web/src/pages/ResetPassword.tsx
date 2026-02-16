import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';
import { authService } from '../services/authService';

export const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (!token) {
            setError('Veuillez entrer le code de vérification');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await authService.resetPassword(token, password);
            setSuccess(true);
            setTimeout(() => navigate('/auth'), 3000);
        } catch (err: any) {
            setError(err.message || 'Code invalide ou expiré');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col bg-white text-black font-sans antialiased">
                <main className="flex-grow flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-[440px] text-center">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Mot de passe réinitialisé</h1>
                        <p className="text-neutral-500 mb-8">
                            Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion.
                        </p>
                        <Link to="/auth">
                            <Button className="w-full py-4 rounded-lg">
                                Se connecter maintenant
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
            <nav className="w-full px-8 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <Logo size="md" />
                    </Link>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-[440px]">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tight mb-3">Réinitialisation</h1>
                        <p className="text-neutral-500 text-base">Entrez le code reçu par email et votre nouveau mot de passe.</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider text-left">
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-1 text-left">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1" htmlFor="token">Code de vérification</label>
                                <input
                                    className="w-full px-4 py-4 bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-neutral-300 font-mono"
                                    id="token"
                                    placeholder="Entrez votre code ou collez le lien"
                                    required
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1 text-left">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1" htmlFor="password">Nouveau mot de passe</label>
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
                                <div className="space-y-1 text-left">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                                    <input
                                        className="w-full px-4 py-4 bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-neutral-300"
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        required
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                Réinitialiser le mot de passe
                                <span className="material-symbols-outlined text-lg">lock_reset</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
