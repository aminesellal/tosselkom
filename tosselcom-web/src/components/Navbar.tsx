import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './common/Logo';

/**
 * Navbar — Barre de navigation principale (Landing Page)
 * 
 * Liens :
 * - "Comment ça marche" → scrolle vers la section #how-it-works
 * - "Connexion" → /auth
 * - "Inscription" → /register
 */
export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <Logo size="md" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <button onClick={() => scrollTo('#how-it-works')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Comment ça marche</button>
                        <button onClick={() => scrollTo('#stats')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Chiffres</button>
                        <button onClick={() => scrollTo('#cta')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Rejoindre</button>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/auth" className="text-slate-700 font-semibold hover:text-slate-900 transition-colors text-sm">Connexion</Link>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-black/10"
                        >
                            Inscription
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-4">
                    <button onClick={() => scrollTo('#how-it-works')} className="block text-slate-600 hover:text-slate-900 font-medium w-full text-left">Comment ça marche</button>
                    <button onClick={() => scrollTo('#stats')} className="block text-slate-600 hover:text-slate-900 font-medium w-full text-left">Chiffres</button>
                    <div className="pt-4 flex flex-col gap-3">
                        <button onClick={() => navigate('/auth')} className="w-full py-3 border border-slate-200 rounded-lg font-semibold text-sm hover:bg-slate-50">Connexion</button>
                        <button onClick={() => navigate('/register')} className="w-full py-3 bg-black text-white rounded-lg font-semibold text-sm hover:bg-zinc-800">Inscription</button>
                    </div>
                </div>
            )}
        </nav>
    );
};
