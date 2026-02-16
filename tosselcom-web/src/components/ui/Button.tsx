import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading,
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98]";

    const variants = {
        primary: "bg-black text-white hover:bg-zinc-800",
        secondary: "bg-zinc-100 text-black hover:bg-zinc-200",
        outline: "border border-black text-black hover:bg-black hover:text-white",
        ghost: "text-zinc-400 hover:text-black",
    };

    const sizes = {
        sm: "px-4 py-2 text-[9px]",
        md: "px-8 py-3 text-[10px]",
        lg: "px-12 py-4 text-xs",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <span className="material-symbols-outlined animate-spin mr-2 text-sm">autorenew</span>
            ) : null}
            {children}
        </button>
    );
};
