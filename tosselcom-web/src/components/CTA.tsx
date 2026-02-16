import { useNavigate } from 'react-router-dom';

export const CTA = () => {
    const navigate = useNavigate();
    return (
        <section className="py-20 bg-white border-t border-slate-100" id="cta">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-900 rounded-3xl p-12 text-center shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10 tracking-tight">Prêt à simplifier votre logistique ?</h2>
                    <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">Rejoignez des milliers d'utilisateurs et de livreurs sur la plateforme la plus fiable de la ville. Inscrivez-vous gratuitement dès aujourd'hui.</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <button
                            onClick={() => navigate('/register/sender')}
                            className="bg-white text-slate-900 font-bold py-4 px-8 rounded-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-lg transform active:scale-95 text-sm uppercase tracking-widest"
                        >
                            Expédier un colis
                        </button>
                        <button
                            onClick={() => navigate('/register/courier')}
                            className="bg-transparent border border-slate-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/5 transition-all hover:border-white transform active:scale-95 text-sm uppercase tracking-widest"
                        >
                            Devenir Livreur
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
