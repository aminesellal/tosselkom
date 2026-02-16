import React from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'full' | 'icon';
}

/**
 * Logo Tosselkom — Version Premium CSS (Sans fichier image requis)
 * Design minimaliste symbolisant le mouvement et la précision.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'full' }) => {
    const sizes = {
        sm: { box: 'h-6 w-6', font: 'text-sm', sub: 'text-[6px]' },
        md: { box: 'h-8 w-8', font: 'text-base', sub: 'text-[7px]' },
        lg: { box: 'h-11 w-11', font: 'text-xl', sub: 'text-[9px]' },
        xl: { box: 'h-14 w-14', font: 'text-2xl', sub: 'text-[11px]' }
    };

    const current = sizes[size];

    return (
        <div className={`flex items-center gap-3 ${className} group cursor-pointer`}>
            {/* Icône Géométrique Minimaliste */}
            <div className={`relative ${current.box} bg-black overflow-hidden transition-all duration-500 group-hover:rotate-45 shadow-lg flex-shrink-0`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Les lignes du "T" stylisé */}
                    <div className="w-[60%] h-[2px] bg-white absolute top-[40%]"></div>
                    <div className="w-[2px] h-[60%] bg-white absolute left-[50%] top-[40%]"></div>
                </div>
                {/* Point d'accent logistique */}
                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Texte de la Marque */}
            {variant === 'full' && (
                <div className="flex flex-col leading-none">
                    <span className={`${current.font} font-black tracking-tighter uppercase text-black group-hover:text-zinc-700 transition-colors whitespace-nowrap`}>
                        Tosselkom
                    </span>
                    <span className={`${current.sub} font-bold tracking-[0.3em] uppercase text-zinc-400 mt-0.5`}>
                        Logistics
                    </span>
                </div>
            )}
        </div>
    );
};
