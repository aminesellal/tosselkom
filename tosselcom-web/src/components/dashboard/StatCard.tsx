import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    subValue?: string;
    trend?: string;
    active?: boolean;
}

export const StatCard = ({ label, value, subValue, trend, active = false }: StatCardProps) => {
    return (
        <div className={`
            group flex flex-col justify-between h-32 pl-6 transition-all hover:pl-8
            ${active ? 'border-l-2 border-black' : 'border-l border-zinc-200 hover:border-black'}
        `}>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                {label}
            </span>
            <div className="flex items-end gap-2 text-left">
                <span className={`
                    text-6xl font-light tracking-tighter leading-none transition-colors
                    ${active ? 'text-black' : 'text-zinc-300 group-hover:text-black'}
                `}>
                    {value}
                </span>
                {subValue && (
                    <span className="text-sm font-medium text-black mb-1">
                        {subValue}
                    </span>
                )}
            </div>
            {trend && (
                <div className="mt-2 flex items-center gap-1">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 border border-black uppercase">
                        {trend}
                    </span>
                </div>
            )}
        </div>
    );
};
