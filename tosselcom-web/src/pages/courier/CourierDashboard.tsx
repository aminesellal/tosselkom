import React, { useEffect, useState } from 'react';
import { CourierLayout } from '../../components/layouts/CourierLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { Button } from '../../components/ui/Button';
import { courierService, CourierDashboardData } from '../../services/courierService';

export const CourierDashboard = () => {
    const [data, setData] = useState<CourierDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    // Ajout d'un état pour l'erreur
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const dashboardData = await courierService.getDashboard();
                setData(dashboardData);
            } catch (err) {
                console.error("Erreur chargement dashboard", err);
                setError("Impossible de charger les données. Veuillez vous reconnecter.");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <CourierLayout>
                <div className="flex items-center justify-center h-screen bg-white">
                    <p className="text-xs uppercase tracking-[0.2em] animate-pulse font-bold">Chargement...</p>
                </div>
            </CourierLayout>
        );
    }

    if (error || !data) {
        return (
            <CourierLayout>
                <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
                    <span className="material-symbols-outlined text-4xl mb-4 text-red-500">error_outline</span>
                    <h2 className="text-xl font-bold uppercase tracking-tight mb-2">Erreur de connexion</h2>
                    <p className="text-sm text-zinc-500 mb-8 max-w-md">{error || "Une erreur est survenue."}</p>
                    <Button onClick={() => window.location.reload()}>Réessayer</Button>
                </div>
            </CourierLayout>
        );
    }

    const stats = [
        { label: 'Livraisons totales', value: data.stats.totalDeliveries.toLocaleString(), trend: data.stats.deliveryGrowth },
        { label: 'Note moyenne', value: data.stats.rating.toString(), subValue: '/ 5', trend: data.stats.ratingLabel },
        { label: 'Km parcourus', value: data.stats.kilometers.toLocaleString(), trend: 'Premium' },
        { label: 'Solde actuel', value: data.stats.balance.toLocaleString(), subValue: data.stats.balanceCurrency, trend: data.stats.status }
    ];

    return (
        <CourierLayout>
            <div className="flex flex-col gap-8 p-16">
                <header className="flex justify-between items-end border-b border-zinc-100 pb-8">
                    <div>
                        <h1 className="text-3xl font-light uppercase tracking-tight mb-2">Tableau de Bord</h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Dernière mise à jour : À l'instant</p>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" size="sm">
                            <span className="material-symbols-outlined text-base mr-2">download</span>
                            Rapport
                        </Button>
                        <Button size="sm">
                            <span className="material-symbols-outlined text-base mr-2">explore</span>
                            Offres
                        </Button>
                    </div>
                </header>

                {/* Statistics Grid */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            label={stat.label}
                            value={stat.value}
                            subValue={stat.subValue}
                            trend={stat.trend}
                            active={index === 0}
                        />
                    ))}
                </section>

                <div className="grid grid-cols-12 gap-16 mt-8">
                    {/* Activité Récente */}
                    <div className="col-span-8">
                        <div className="flex items-center justify-between mb-10 border-b border-zinc-100 pb-5">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black">Activité Récente</h2>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">Tout voir</button>
                        </div>

                        <div className="space-y-4">
                            {data.recentActivity.map((activity) => (
                                <div key={activity.id} className="group flex items-center p-6 border border-zinc-50 hover:border-black transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center mr-6 group-hover:bg-black group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">{activity.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <p className="text-[11px] font-bold uppercase tracking-tight">Livraison #{activity.id}</p>
                                            <p className="text-[10px] font-mono text-zinc-400">{activity.date}</p>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{activity.origin} → {activity.destination}</p>
                                    </div>
                                    <div className="ml-10 text-right">
                                        <p className="text-xs font-bold">+ {activity.price.toFixed(2)} €</p>
                                        <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">{activity.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Statut Véhicule */}
                    <div className="col-span-4">
                        <div className="mb-10 border-b border-zinc-100 pb-5">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black">Statut Véhicule</h2>
                        </div>
                        <div className="bg-zinc-50 p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="material-symbols-outlined text-3xl">{data.vehicle.icon}</span>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight">{data.vehicle.model}</p>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{data.vehicle.type}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-1.5">
                                        <span>Batterie</span>
                                        <span>{data.vehicle.batteryLevel}%</span>
                                    </div>
                                    <div className="h-[2px] bg-zinc-200">
                                        <div
                                            className="h-full bg-black"
                                            style={{ width: `${data.vehicle.batteryLevel}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-zinc-400 mt-6 leading-relaxed">{data.vehicle.maintenanceText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CourierLayout>
    );
};
