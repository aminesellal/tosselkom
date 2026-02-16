import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';

export const RegisterChoice = () => {
    const [role, setRole] = useState<'sender' | 'courier'>('sender');
    const navigate = useNavigate();

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

                <div className="w-full max-w-md bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative z-10 border border-neutral-100 font-sans">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold mb-2 text-[#141414]">Inscription</h1>
                        <p className="text-neutral-500 text-sm">Sélectionnez votre profil pour commencer l'inscription</p>
                    </div>

                    <div className="space-y-8">
                        <div aria-label="Role selection" className="grid grid-cols-2 gap-4" role="group">
                            {/* Expéditeur Card */}
                            <label className="cursor-pointer group relative">
                                <input
                                    className="peer sr-only"
                                    name="role"
                                    type="radio"
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

                            {/* Livreur Card */}
                            <label className="cursor-pointer group relative">
                                <input
                                    className="peer sr-only"
                                    name="role"
                                    type="radio"
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

                        <div className="pt-2">
                            <button
                                onClick={() => navigate(`/register/${role === 'courier' ? 'courier' : 'sender'}`)}
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#141414] hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg"
                            >
                                Créer un compte
                            </button>
                            <div className="text-center mt-6">
                                <p className="text-sm text-neutral-500">
                                    Déjà un compte ?
                                    <Link to="/auth" className="font-semibold text-[#141414] hover:underline ml-1">
                                        Se connecter
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-6 text-center">
                <p className="text-xs text-neutral-400">© 2026 TOSSELKOM. Tous droits réservés.</p>
            </footer>
        </div>
    );
};
