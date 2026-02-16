export const Stats = () => {
    return (
        <div className="bg-white py-12 border-y border-slate-100" id="stats">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-white divide-x divide-slate-100">
                    <div>
                        <p className="text-4xl font-black text-slate-900 mb-1">15k+</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Livraisons</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-slate-900 mb-1">98%</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">À l'heure</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-slate-900 mb-1">500+</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Livreurs</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-slate-900 mb-1">24/7</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Support</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
