import React from 'react';

type PlatformName = 'MT4' | 'MT5' | 'cTrader' | 'MatchTrader' | 'DXTrade' | 'TradeLocker' | 'NinjaTrader' | string;

interface PlatformLogoProps {
    platform?: PlatformName;
    src?: string;       // Direct image source (for firm logos)
    alt?: string;       // Alt text for image
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showName?: boolean;
}

const PlatformLogo: React.FC<PlatformLogoProps> = ({
    platform,
    src,
    alt = '',
    size = 'md',
    className = '',
    showName = false
}) => {
    // If src is provided, render as image (firm logo mode)
    if (src) {
        const imgSizeClasses: Record<string, string> = {
            sm: 'w-8 h-8',
            md: 'w-10 h-10',
            lg: 'w-14 h-14',
            xl: 'w-20 h-20',
        };
        return (
            <div className={`rounded-xl overflow-hidden flex items-center justify-center ${imgSizeClasses[size]} ${className}`}>
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
        );
    }

    // Platform badge mode (text label)
    if (!platform) return null;

    return (
        <span className={`inline-flex items-center rounded-md bg-brand-border px-2 py-1 text-xs font-bold text-white uppercase ${className}`}>
            {platform}
        </span>
    );
};

export default PlatformLogo;
