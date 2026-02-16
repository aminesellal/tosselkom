import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';

/**
 * Sidebar component for the Dashboard
 * 
 * Displays the main navigation, user profile summary, and logout button.
 * Uses the custom Logo component for consistent branding.
 */

interface SidebarProps {
    menuItems: { name: string; icon: string; path: string }[];
    profilePath: string;
    user: {
        name: string;
        tier: string;
        avatar: string;
    };
    onLogout: () => void;
}

export const Sidebar = ({ menuItems, profilePath, user, onLogout }: SidebarProps) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-72 bg-white border-r border-zinc-100 flex flex-col flex-shrink-0 h-full relative z-20 overflow-hidden">
            {/* Ambient decorative blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

            {/* Brand Header */}
            <div className="p-10 relative">
                <Link to="/" className="inline-block transform hover:scale-[1.02] transition-transform duration-300">
                    <Logo size="lg" />
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-6 space-y-1 relative">
                <div className="pb-4 px-4 text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] cursor-default">
                    Navigation principale
                </div>

                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={isActive(item.path)
                            ? "flex items-center gap-3 px-4 py-4 text-[11px] font-black text-black border-l-2 border-black bg-zinc-50 tracking-widest uppercase transition-all"
                            : "flex items-center gap-3 px-4 py-4 text-[11px] font-bold text-zinc-400 hover:text-black hover:bg-zinc-50/50 transition-all duration-300 tracking-widest uppercase hover:translate-x-1"
                        }
                    >
                        <span className={`material-symbols-outlined text-lg ${isActive(item.path) ? 'text-black' : 'text-zinc-300'}`}>
                            {item.icon}
                        </span>
                        {item.name}
                    </Link>
                ))}

                <div className="pt-10 pb-4 px-4 text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] cursor-default">
                    Paramètres compte
                </div>

                <Link
                    to={profilePath}
                    className={isActive(profilePath)
                        ? "flex items-center gap-3 px-4 py-4 text-[11px] font-black text-black border-l-2 border-black bg-zinc-50 tracking-widest uppercase transition-all"
                        : "flex items-center gap-3 px-4 py-4 text-[11px] font-bold text-zinc-400 hover:text-black hover:bg-zinc-50/50 transition-all duration-300 tracking-widest uppercase hover:translate-x-1"
                    }
                >
                    <span className={`material-symbols-outlined text-lg ${isActive(profilePath) ? 'text-black' : 'text-zinc-300'}`}>
                        person
                    </span>
                    Mon Profil
                </Link>
            </nav>

            {/* User Profile Footer */}
            <div className="p-8 relative">
                <div className="flex items-center gap-4 p-5 bg-black text-white group cursor-pointer transition-all duration-500 hover:bg-zinc-900 shadow-2xl overflow-hidden rounded-2xl">
                    <div className="relative flex-shrink-0">
                        <img
                            alt="User avatar"
                            className="w-10 h-10 object-cover border border-white/10 rounded-lg transition-transform duration-500 group-hover:scale-110"
                            src={user.avatar}
                        />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full shadow-sm"></div>
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-[10px] font-black truncate tracking-wider uppercase leading-tight">
                            {user.name}
                        </p>
                        <p className="text-[8px] text-zinc-500 font-bold truncate uppercase tracking-[0.1em] mt-0.5">
                            {user.tier}
                        </p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onLogout();
                        }}
                        className="material-symbols-outlined text-xl text-zinc-600 hover:text-white transition-all transform hover:rotate-12 flex-shrink-0"
                        title="Se déconnecter"
                    >
                        logout
                    </button>
                </div>
            </div>
        </aside>
    );
};
