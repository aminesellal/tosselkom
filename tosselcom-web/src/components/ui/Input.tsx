import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: string;
}

export const Input = ({ label, icon, className = '', ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-1.5 text-left w-full">
            {label && (
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-0.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-black text-lg">
                        {icon}
                    </span>
                )}
                <input
                    className={`
                        w-full bg-transparent border-0 border-b border-zinc-100 py-3 
                        focus:ring-0 focus:border-black transition-colors 
                        text-sm font-medium placeholder:text-zinc-200
                        ${icon ? 'pl-8' : 'px-0'}
                        ${className}
                    `}
                    {...props}
                />
            </div>
        </div>
    );
};
