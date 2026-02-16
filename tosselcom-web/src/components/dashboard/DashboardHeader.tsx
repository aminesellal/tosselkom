import React from 'react';

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export const DashboardHeader = ({ title, subtitle, actions }: DashboardHeaderProps) => {
    return (
        <header className="h-32 px-16 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-zinc-50">
            <div className="text-left">
                <h1 className="text-3xl font-light text-black tracking-tight uppercase">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] mt-2 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-8">
                    {actions}
                </div>
            )}
        </header>
    );
};
