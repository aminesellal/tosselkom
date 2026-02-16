import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../dashboard/Sidebar';
import { authClient } from '../../lib/auth-client';

/**
 * Layout principal pour les Livreurs (Couriers)
 * Fournit la sidebar de navigation et la structure de la page.
 */

interface CourierLayoutProps {
    children: React.ReactNode;
}

export const CourierLayout = ({ children }: CourierLayoutProps) => {
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();

    // Configuration des menus pour le livreur
    const menuItems = [
        { name: 'Tableau de bord', icon: 'dashboard', path: '/courier/dashboard' },
        { name: 'Trouver des offres', icon: 'explore', path: '/courier/offers' },
        { name: 'Mes Livraisons', icon: 'local_shipping', path: '/courier/deliveries' },
        { name: 'Historique', icon: 'history', path: '/courier/history' },
    ];

    const handleLogout = async () => {
        await authClient.signOut();
        navigate('/auth');
    };

    // Préparation des données utilisateur pour la Sidebar
    const user = {
        name: session?.user?.name || 'LIVREUR',
        tier: (session?.user as any)?.role === 'courier' ? 'Livreur Partenaire' : 'Membre',
        avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'L'}&background=000&color=fff`
    };

    return (
        <div className="antialiased font-sans h-screen flex overflow-hidden bg-white text-black">
            <Sidebar
                menuItems={menuItems}
                profilePath="/courier/profile"
                user={user}
                onLogout={handleLogout}
            />
            <main className="flex-1 overflow-y-auto bg-white">
                {children}
            </main>
        </div>
    );
};
