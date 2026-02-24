import React from 'react';
import { Firm } from '../types';
import { Star, Clock, TrendingUp, ChevronRight, Zap } from 'lucide-react';

interface FirmCardProps {
    firm: Firm;
    onCompare: (firm: Firm) => void;
    isSelectedForCompare: boolean;
    onViewFirm?: (firmId: string) => void;
}

const StarRating: React.FC<{ score: number }> = ({ score }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= Math.floor(score) ? 'text-yellow-400 fill-yellow-400' : star <= score ? 'text-yellow-400 fill-yellow-400/50' : 'text-gray-600'}`}
                />
            ))}
            <span className="text-xs text-gray-400 ml-1 font-medium">{score.toFixed(1)}</span>
        </div>
    );
};

export const FirmCard: React.FC<FirmCardProps> = ({ firm, onCompare, isSelectedForCompare, onViewFirm }) => {
    return (
        <div className="group relative rounded-2xl border border-secondary/40 bg-[#0f0b1e]/90 backdrop-blur-md overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:border-secondary hover:shadow-[0_20px_50px_-12px_rgba(34,228,175,0.4)] flex flex-col h-full">

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Card Content */}
            <div className="relative z-10 p-6 flex flex-col flex-grow">

                {/* Logo & Name */}
                <div className="flex items-center space-x-4 mb-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg shrink-0 bg-white/[0.03]">
                        <img src={firm.logo} alt={firm.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{firm.name}</h3>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${star <= Math.floor(firm.trustScore) ? 'text-yellow-400 fill-yellow-400' : star <= firm.trustScore ? 'text-yellow-400 fill-yellow-400/50' : 'text-gray-600'}`}
                                />
                            ))}
                            <span className="text-xs text-gray-400 ml-1 font-medium">{firm.trustScore.toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Compare Action */}
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
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                        <div className="flex items-center space-x-1.5 mb-1">
                            <TrendingUp className="w-3 h-3 text-secondary" />
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Profit Split</span>
                        </div>
                        <span className="text-white font-bold text-sm">{firm.profitSplit}</span>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                        <div className="flex items-center space-x-1.5 mb-1">
                            <Clock className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Payout</span>
                        </div>
                        <span className="text-white font-bold text-sm">{firm.payoutTime}</span>
                    </div>
                </div>

                {/* Details Row */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-5 px-1">
                    <div>
                        <span className="text-gray-500">Type: </span>
                        <span className="text-white font-medium">{firm.evaluationType}</span>
                    </div>
                    <div className="h-3 w-px bg-white/10"></div>
                    <div>
                        <span className="text-gray-500">From </span>
                        <span className="text-green-400 font-bold">${firm.price}</span>
                    </div>
                    <div className="h-3 w-px bg-white/10"></div>
                    <div>
                        <span className="text-gray-500">Up to </span>
                        <span className="text-secondary font-bold">${firm.maxAccountSize / 1000}K</span>
                    </div>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {firm.features.slice(0, 3).map((feature, fIdx) => (
                        <span
                            key={fIdx}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 font-medium"
                        >
                            {feature}
                        </span>
                    ))}
                    {firm.features.length > 3 && (
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.02] border border-transparent text-gray-500 font-medium">
                            +{firm.features.length - 3} more
                        </span>
                    )}
                </div>

                {/* CTA */}
                <button
                    onClick={() => {
                        if (onViewFirm) {
                            onViewFirm(firm.id);
                        } else {
                            // Fallback to pushState logic
                            window.history.pushState({}, '', `/firm/${firm.id}`);
                            window.dispatchEvent(new PopStateEvent('popstate'));
                        }
                    }}
                    className="mt-auto w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/[0.04] hover:bg-secondary/20 border border-white/[0.06] hover:border-secondary/30 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 group/btn"
                >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 text-secondary group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
