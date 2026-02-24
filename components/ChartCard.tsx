import React from 'react';

interface ChartCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    cornerAction?: React.ReactNode;
    className?: string; // To allow arbitrary col-span or height adjustments
}

export const ChartCard: React.FC<ChartCardProps> = ({
    title,
    description,
    icon,
    children,
    cornerAction,
    className = ''
}) => {
    return (
        <div className={`relative group overflow-hidden rounded-[2rem] bg-[#0f0b1e]/60 backdrop-blur-xl border border-white/5 hover:border-secondary/30 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(34,228,175,0.15)] ${className}`}>

            {/* Subtle Gradient Atmosphere inside the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                {/* Standardized Premium Layout Header */}
                <div className="flex justify-between items-start mb-6 w-full">
                    <div className="flex items-start space-x-4 max-w-xl">
                        {icon && (
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-secondary/70 group-hover:text-secondary group-hover:border-secondary/30 transition-colors shadow-inner">
                                {icon}
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-md">{description}</p>
                        </div>
                    </div>
                    {/* Optional interactive corner action like time toggles or live pulse */}
                    {cornerAction && (
                        <div className="shrink-0 ml-4 pl-4 border-l border-white/10 hidden md:block h-full flex flex-col justify-center">
                            {cornerAction}
                        </div>
                    )}
                </div>

                {/* The flowing chart rendering section injected as children */}
                <div className="flex-grow w-full h-full relative rounded-xl bg-black/20 border border-white/[0.03] p-4 lg:p-6 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};
