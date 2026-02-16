import { Link } from 'react-router-dom';
import { Logo } from './common/Logo';

/**
 * Footer — Pied de page de la Landing Page
 * 
 * Contient le logo, les liens utiles et les réseaux sociaux.
 * Les liens Plateforme redirigent vers /register (côté sender ou courier).
 */
export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8 text-slate-500 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo + Description */}
                    <div className="col-span-1">
                        <div className="mb-6">
                            <Logo size="md" />
                        </div>
                        <p className="leading-relaxed font-light">
                            Le moyen le plus intelligent d'envoyer et de recevoir des colis. Rapide, sécurisé et toujours fiable.
                        </p>
                    </div>

                    {/* Plateforme */}
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4 tracking-wide uppercase text-xs">Plateforme</h5>
                        <ul className="space-y-3 font-light">
                            <li><Link to="/register/sender" className="hover:text-slate-900 transition-colors">Portail Expéditeur</Link></li>
                            <li><Link to="/register/courier" className="hover:text-slate-900 transition-colors">Portail Livreur</Link></li>
                            <li><Link to="/auth" className="hover:text-slate-900 transition-colors">Connexion</Link></li>
                        </ul>
                    </div>

                    {/* Entreprise */}
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4 tracking-wide uppercase text-xs">Entreprise</h5>
                        <ul className="space-y-3 font-light">
                            <li><button onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Comment ça marche</button></li>
                            <li><button onClick={() => document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Nos chiffres</button></li>
                            <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Haut de page</button></li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4 tracking-wide uppercase text-xs">Légal</h5>
                        <ul className="space-y-3 font-light">
                            <li><span className="text-slate-400 cursor-default">Confidentialité</span></li>
                            <li><span className="text-slate-400 cursor-default">Conditions d'utilisation</span></li>
                            <li><span className="text-slate-400 cursor-default">Cookies</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs">© 2026 Tosselkom. Tous droits réservés.</p>
                    <div className="flex space-x-6">
                        <span className="text-xs font-medium text-slate-400 cursor-default">FB</span>
                        <span className="text-xs font-medium text-slate-400 cursor-default">TW</span>
                        <span className="text-xs font-medium text-slate-400 cursor-default">IN</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
