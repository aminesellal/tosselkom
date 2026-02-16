import { useState } from 'react';
import { Box, MapPin, Truck, Search, DollarSign, Star } from 'lucide-react';

/**
 * HowItWorks — Section "Comment ça marche" de la Landing Page
 * 
 * Affiche les étapes pour Clients ou pour Livreurs selon l'onglet actif.
 */
export const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState<'client' | 'livreur'>('client');

    // Étapes pour les Clients
    const clientSteps = [
        {
            icon: Box,
            title: '1. Créer une Commande',
            description: "Entrez les détails de prise en charge et de livraison. Spécifiez la taille du colis et les instructions spéciales en quelques secondes."
        },
        {
            icon: MapPin,
            title: '2. Validation du Livreur',
            description: "Un livreur accepte votre commande. Vous validez ou refusez le livreur proposé avant que la course ne démarre."
        },
        {
            icon: Truck,
            title: '3. Livrer & Suivre',
            description: "Suivez votre colis en temps réel et soyez notifié lors de la livraison réussie."
        }
    ];

    // Étapes pour les Livreurs
    const livreurSteps = [
        {
            icon: Search,
            title: '1. Trouver des Offres',
            description: "Parcourez les commandes disponibles dans votre zone. Filtrez par distance, poids et prix pour trouver les meilleures missions."
        },
        {
            icon: DollarSign,
            title: '2. Accepter & Livrer',
            description: "Acceptez une offre. Le client valide votre profil, puis vous démarrez la course et livrez le colis."
        },
        {
            icon: Star,
            title: '3. Gagner de l\'argent',
            description: "Votre solde est crédité dès la livraison confirmée. Consultez votre historique et vos gains depuis le tableau de bord."
        }
    ];

    const steps = activeTab === 'client' ? clientSteps : livreurSteps;

    return (
        <section className="py-24 bg-white relative" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Comment ça marche</h2>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">Conçu pour la simplicité. Choisissez votre chemin et commencez en quelques minutes.</p>
                </div>

                {/* Tab Switcher (fonctionnel !) */}
                <div className="flex justify-center mb-16">
                    <div className="bg-slate-50 p-1 rounded-xl inline-flex items-center shadow-sm border border-slate-100">
                        <button
                            onClick={() => setActiveTab('client')}
                            className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'client'
                                    ? 'bg-white shadow-sm border border-slate-100 text-slate-900'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Pour Clients
                        </button>
                        <button
                            onClick={() => setActiveTab('livreur')}
                            className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'livreur'
                                    ? 'bg-white shadow-sm border border-slate-100 text-slate-900'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Pour Livreurs
                        </button>
                    </div>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[20%] left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10 border-t-2 border-dashed border-slate-200"></div>

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="group text-center">
                                <div className="w-20 h-20 mx-auto bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-slate-900/20 group-hover:-translate-y-2">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed px-4">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
