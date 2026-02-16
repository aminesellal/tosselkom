import { ArrowRight, Package, Check, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            {/* Background blobs simplified */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-slate-900 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-slate-400 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-slate-900 text-sm font-semibold mb-6 border border-slate-200">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Disponible maintenant
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                            La Logistique Simplifiée <br />
                            <span className="text-slate-500">Pour tout le monde.</span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Que vous envoyiez un colis à travers la ville ou que vous cherchiez à gagner de l'argent en tant que livreur,
                            <span className="font-bold text-slate-900 mx-1">Tosselkom</span> vous connecte instantanément. <span className="font-medium text-slate-900 border-b-2 border-slate-100">Sûr, Rapide, Fiable.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button onClick={() => navigate('/register')} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 hover:scale-[1.02] transform transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group">
                                Commencer
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
                            >
                                En savoir plus
                            </button>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                        User
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                    +2k
                                </div>
                            </div>
                            <p>Confiance de +2,000 utilisateurs</p>
                        </div>
                    </div>

                    {/* Minimalist Hero Image/Graphic */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Abstract Background Shapes */}
                            <div className="absolute inset-0 bg-slate-50 rounded-2xl transform rotate-3 scale-95 border border-slate-100 shadow-xl"></div>

                            {/* Main Image Container */}
                            <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500 flex items-center justify-center group">
                                {/* Replaced Image with Icon for Pure Minimalism as per request, or keep image if preferred. User asked for HTML replica, so keeping structure similar but cleaner */}
                                <div className="bg-slate-50 p-12 rounded-full mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <Package size={120} className="text-slate-900" strokeWidth={1} />
                                </div>

                                {/* Floating Card */}
                                <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Check size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Statut</p>
                                        <p className="text-sm font-bold text-slate-900">Livré</p>
                                    </div>
                                </div>

                                <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-pulse">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-slate-900">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">En cours</p>
                                        <p className="text-sm font-bold text-slate-900">Arrive dans 5 min</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
