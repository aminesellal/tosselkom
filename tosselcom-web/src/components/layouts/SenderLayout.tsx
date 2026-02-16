import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../dashboard/Sidebar';
import { authClient } from '../../lib/auth-client';

/**
 * Layout principal pour les Expéditeurs (Seners)
 * Fournit la sidebar de navigation et la structure de la page.
 */

interface SenderLayoutProps {
    children: React.ReactNode;
}

export const SenderLayout = ({ children }: SenderLayoutProps) => {
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();

    // Configuration des menus pour l'expéditeur
    const menuItems = [
        { name: 'Tableau de bord', icon: 'grid_view', path: '/sender/dashboard' },
        { name: 'Nouvelle Commande', icon: 'add_circle', path: '/sender/new-order' },
        { name: 'Mes Commandes', icon: 'inventory_2', path: '/sender/orders' },
    ];

    const handleLogout = async () => {
        await authClient.signOut();
        navigate('/auth');
    };

    // Préparation des données utilisateur pour la Sidebar
    const user = {
        name: session?.user?.name || 'CLIENT',
        tier: 'Client Premium',
        avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'C'}&background=000&color=fff`
    };

    return (
        <div className="antialiased font-sans h-screen flex overflow-hidden bg-white text-black">
            <Sidebar
                menuItems={menuItems}
                profilePath="/sender/profile"
                user={user}
                onLogout={handleLogout}
            />
            <main className="flex-1 overflow-y-auto bg-white">
                {children}
            </main>
        </div>
    );
};
