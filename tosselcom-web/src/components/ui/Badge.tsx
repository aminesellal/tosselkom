import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'black' | 'outline' | 'ghost';
    className?: string;
}

export const Badge = ({ children, variant = 'outline', className = '' }: BadgeProps) => {
    const variants = {
        black: "bg-black text-white border-black",
        outline: "bg-transparent text-black border-black",
        ghost: "bg-transparent text-zinc-400 border-zinc-100",
    };

    return (
        <span className={`
            px-2 py-0.5 border text-[9px] font-bold uppercase tracking-widest leading-none
            ${variants[variant]}
            ${className}
        `}>
            {children}
        </span>
    );
};
