import React from 'react';
import { Star, Clock, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FirmCardProps {
    firm: any;
    onCompare?: (firm: any) => void;
    isSelectedForCompare?: boolean;
    onViewFirm?: (firmId: string) => void;
}

export const FirmCard: React.FC<FirmCardProps> = ({ firm, onCompare, isSelectedForCompare, onViewFirm }) => {
    const navigate = useNavigate();

    const handleView = () => {
        if (onViewFirm) {
            onViewFirm(firm.id);
        } else {
            navigate(`/firm/${firm.id}`);
        }
    };

    // Normalize field access — support both snake_case (Supabase) and camelCase (mapped)
    const logoSrc = firm.logo || firm.logo_url || '';
    const trustScore = Number(firm.trustScore ?? firm.rating ?? 0);
    const profitSplit = firm.profitSplit || firm.profit_split || '80%';
    const payoutTime = firm.payoutTime || firm.avg_payout_time || '24h';
    const evalType = firm.evaluationType || firm.challenges?.[0]?.challenge_type || '2-Step';
    const price = firm.price || 0;
    const maxAccount = firm.maxAccountSize || firm.max_funding || 0;
    const features = firm.features || firm.tags || [];

    return (
        <div className="group relative rounded-2xl border border-secondary/40 bg-[#0f1a12]/90 backdrop-blur-md overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:border-secondary hover:shadow-[0_20px_50px_-12px_rgba(34,228,175,0.4)] flex flex-col h-full">

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Card Content */}
            <div className="relative z-10 p-6 flex flex-col flex-grow">

                {/* Logo & Name */}
                <div className="flex items-center space-x-4 mb-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg shrink-0 bg-white/[0.03]">
                        <img 
                            src={logoSrc} 
                            alt={firm.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { 
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(firm.name)}&background=1f2937&color=10b981&bold=true`; 
                            }} 
                        />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{firm.name}</h3>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${star <= Math.floor(trustScore) ? 'text-yellow-400 fill-yellow-400' : star <= trustScore ? 'text-yellow-400 fill-yellow-400/50' : 'text-gray-600'}`}
                                />
                            ))}
                            <span className="text-xs text-gray-400 ml-1 font-medium">{trustScore.toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Compare Action */}
                    {onCompare && (
                        <button
                            onClick={() => onCompare(firm)}
                            className={`ml-auto p-2.5 rounded-xl border transition-all shrink-0 ${isSelectedForCompare
                                ? 'bg-secondary text-dark border-secondary shadow-[0_0_15px_rgba(34,228,175,0.4)]'
                                : 'bg-white/[0.03] text-gray-500 border-white/[0.06] hover:text-white hover:border-secondary/50'
                                }`}
                            title="Compare"
                        >
                            <Zap className="w-4 h-4" fill={isSelectedForCompare ? "currentColor" : "none"} />
                        </button>
                    )}
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                    <div className="bg-white/[0.03] rounded-xl px-2 py-2.5 border border-white/[0.04] overflow-hidden">
                        <div className="flex items-center space-x-1 mb-1 whitespace-nowrap">
                            <TrendingUp className="w-2.5 h-2.5 text-secondary shrink-0" />
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 font-semibold truncate">Profit Split</span>
                        </div>
                        <span className="text-white font-bold text-xs sm:text-sm block truncate">{profitSplit}</span>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl px-2 py-2.5 border border-white/[0.04] overflow-hidden">
                        <div className="flex items-center space-x-1 mb-1 whitespace-nowrap">
                            <Clock className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 font-semibold truncate">Payout</span>
                        </div>
                        <span className="text-white font-bold text-xs sm:text-sm block truncate">{payoutTime}</span>
                    </div>
                </div>

                {/* Details Row */}
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] sm:text-[11px] text-gray-400 mb-5 px-0.5 w-full">
                    <div className="flex items-center gap-0.5">
                        <span className="text-gray-500">Type:</span>
                        <span className="text-white font-medium">{evalType}</span>
                    </div>
                    <div className="h-2.5 w-px bg-white/10 hidden min-[360px]:block"></div>
                    <div className="flex items-center gap-0.5">
                        <span className="text-gray-500">From</span>
                        <span className="text-green-400 font-bold">
                            {typeof price === 'number' && price > 0 ? `$${price}` : (firm.challenges?.[0]?.price || 'N/A')}
                        </span>
                    </div>
                    <div className="h-2.5 w-px bg-white/10 hidden sm:block"></div>
                    <div className="flex items-center gap-0.5">
                        <span className="text-gray-500">Up to</span>
                        <span className="text-secondary font-bold">
                            {typeof maxAccount === 'number' && maxAccount >= 1000 ? `$${maxAccount / 1000}K` : (maxAccount || 'N/A')}
                        </span>
                    </div>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {features.slice(0, 3).map((feature: string, fIdx: number) => {
                        const readable = feature.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
                        return (
                            <span
                                key={fIdx}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 font-medium"
                            >
                                {readable}
                            </span>
                        );
                    })}
                    {features.length > 3 && (
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.02] border border-transparent text-gray-500 font-medium">
                            +{features.length - 3} more
                        </span>
                    )}
                </div>

                {/* CTA */}
                <button
                    onClick={handleView}
                    className="mt-auto w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/[0.04] hover:bg-secondary/20 border border-white/[0.06] hover:border-secondary/30 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 group/btn"
                >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 text-secondary group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
