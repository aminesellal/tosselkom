import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';
import { authService } from '../services/authService';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authService.forgotPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col bg-white text-black font-sans antialiased">
                <nav className="w-full px-8 py-8">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-3">
                            <Logo size="md" />
                        </Link>
                    </div>
                </nav>

                <main className="flex-grow flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-[440px] text-center">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-3xl">mail</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Email envoyé</h1>
                        <p className="text-neutral-500 mb-8">
                            Si un compte existe pour <strong>{email}</strong>, vous recevrez un code de vérification pour réinitialiser votre mot de passe.
                        </p>
                        <Link to="/reset-password">
                            <Button className="w-full py-4 rounded-lg">
                                Entrer le code
                            </Button>
                        </Link>
                        <p className="mt-6 text-sm">
                            <Link to="/auth" className="text-neutral-400 hover:text-black transition-colors font-medium">
                                Retour à la connexion
                            </Link>
                        </p>
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
                    <a className="text-sm font-medium hover:underline underline-offset-4" href="#">Aide</a>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-[440px]">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tight mb-3">Mot de passe oublié ?</h1>
                        <p className="text-neutral-500 text-base">Entrez votre email pour recevoir un code de vérification.</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider text-left">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div className="space-y-1 text-left">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1" htmlFor="email">Email</label>
                                <input
                                    className="w-full px-4 py-4 bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-neutral-300"
                                    id="email"
                                    placeholder="nom@exemple.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full py-4 rounded-lg flex items-center justify-center gap-2"
                                loading={loading}
                            >
                                Envoyer le code
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Button>
                            <p className="text-center mt-8 text-sm">
                                <Link to="/auth" className="font-bold text-black hover:underline underline-offset-2">Retour à la connexion</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="py-8 border-t border-neutral-100 mt-auto">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-neutral-400 uppercase tracking-widest">
                    <p>© 2026 TOSSELKOM LOGISTICS</p>
                    <div className="flex gap-8">
                        <a className="hover:text-black transition-colors" href="#">Conditions</a>
                        <a className="hover:text-black transition-colors" href="#">Confidentialité</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
