import React from 'react';
import { Star, ArrowRight, Shield, Clock, TrendingUp, ChevronRight } from 'lucide-react';

// Import firm logos
import logoFtmo from '../assets/hero-logos/firm-ftmo.png';
import logo5ers from '../assets/hero-logos/firm-5ers.png';
import logoFundedNext from '../assets/hero-logos/firm-fundednext.png';
import logoAlpha from '../assets/hero-logos/firm-alpha.png';
import logoFundingPips from '../assets/hero-logos/firm-fundingpips.png';
import logoE8 from '../assets/hero-logos/firm-e8markets.png';
import logoThink from '../assets/hero-logos/firm-thinkcapital.png';
import logoTopOne from '../assets/hero-logos/firm-topone.png';
import logoBerry from '../assets/hero-logos/firm-berry.png';
import logoGft from '../assets/hero-logos/firm-gft.png';

interface FeaturedFirm {
    id: string;
    name: string;
    logo: string;
    bgColor: string;
    trustScore: number;
    profitSplit: string;
    evaluationType: string;
    payoutTime: string;
    minPrice: string;
    maxAccount: string;
    features: string[];
    badge?: string;
}

const FEATURED_FIRMS: FeaturedFirm[] = [
    {
        id: 'ftmo',
        name: 'FTMO',
        logo: logoFtmo,
        bgColor: '#121212',
        trustScore: 4.9,
        profitSplit: '80% - 90%',
        evaluationType: '2-Step',
        payoutTime: '24h',
        minPrice: '$155',
        maxAccount: '$200K',
        features: ['Bi-weekly Payouts', 'No Time Limit', 'Scaling Plan'],
        badge: '🏆 Top Rated'
    },
    {
        id: 'funding-pips',
        name: 'Funding Pips',
        logo: logoFundingPips,
        bgColor: '#121355',
        trustScore: 4.7,
        profitSplit: '80% - 90%',
        evaluationType: '2-Step',
        payoutTime: '48h',
        minPrice: '$59',
        maxAccount: '$300K',
        features: ['Low Cost', 'Fast Payouts', 'MT5'],
        badge: '🔥 Popular'
    },
    {
        id: 'e8-markets',
        name: 'E8 Markets',
        logo: logoE8,
        bgColor: '#000000',
        trustScore: 4.5,
        profitSplit: '80%',
        evaluationType: '1-Step',
        payoutTime: '48h',
        minPrice: '$98',
        maxAccount: '$400K',
        features: ['News Trading', 'Weekend Holding', 'Crypto'],
    },
    {
        id: 'the-5ers',
        name: 'The 5%ers',
        logo: logo5ers,
        bgColor: '#F59E0B',
        trustScore: 4.6,
        profitSplit: '80% - 100%',
        evaluationType: 'Instant',
        payoutTime: 'Weekly',
        minPrice: '$39',
        maxAccount: '$250K',
        features: ['Instant Funding', 'Low Entry', 'Scaling'],
        badge: '⚡ Best Value'
    },
    {
        id: 'fundednext',
        name: 'FundedNext',
        logo: logoFundedNext,
        bgColor: '#6366F1',
        trustScore: 4.4,
        profitSplit: '80% - 95%',
        evaluationType: '2-Step',
        payoutTime: '72h',
        minPrice: '$32',
        maxAccount: '$200K',
        features: ['Lowest Entry', 'Profit Sharing', 'Express Model'],
    },
    {
        id: 'alpha-capital',
        name: 'Alpha Capital',
        logo: logoAlpha,
        bgColor: '#3B82F6',
        trustScore: 4.8,
        profitSplit: '80% - 90%',
        evaluationType: '2-Step',
        payoutTime: '24h',
        minPrice: '$49',
        maxAccount: '$200K',
        features: ['Fast Payouts', 'cTrader', 'No Time Limit'],
        badge: '✅ Verified'
    },
];

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

interface FeaturedFirmsProps {
    onExplore?: () => void;
    onViewFirm?: (firmId: string) => void;
}

export const FeaturedFirms: React.FC<FeaturedFirmsProps> = ({ onExplore, onViewFirm }) => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid/50 to-dark pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Verified & Trusted</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Featured Prop <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary">Firms</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Handpicked and verified prop trading firms trusted by thousands of traders worldwide.
                    </p>
                </div>

                {/* Firm Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURED_FIRMS.map((firm, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-2xl border border-secondary/40 bg-[#0f0b1e]/90 backdrop-blur-md overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:border-secondary hover:shadow-[0_20px_50px_-12px_rgba(34,228,175,0.4)]"
                        >
                            {/* Badge */}
                            {firm.badge && (
                                <div className="absolute top-4 right-4 z-20 bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs font-semibold text-white">
                                    {firm.badge}
                                </div>
                            )}

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Card Content */}
                            <div className="relative z-10 p-6">

                                {/* Logo & Name */}
                                <div className="flex items-center space-x-4 mb-5">
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg shrink-0"
                                        style={{ backgroundColor: firm.bgColor }}
                                    >
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
                                        <span className="text-green-400 font-bold">{firm.minPrice}</span>
                                    </div>
                                    <div className="h-3 w-px bg-white/10"></div>
                                    <div>
                                        <span className="text-gray-500">Up to </span>
                                        <span className="text-secondary font-bold">{firm.maxAccount}</span>
                                    </div>
                                </div>

                                {/* Features Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {firm.features.map((feature, fIdx) => (
                                        <span
                                            key={fIdx}
                                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 font-medium"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button onClick={() => onViewFirm?.(firm.id)} className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/[0.04] hover:bg-secondary/20 border border-white/[0.06] hover:border-secondary/30 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 group/btn">
                                    <span>View Details</span>
                                    <ChevronRight className="w-4 h-4 text-secondary group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-14">
                    <button
                        onClick={onExplore}
                        className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-105 border border-white/10"
                    >
                        <span>Explore All Firms</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-gray-500 text-xs mt-4 font-light">50+ verified prop firms and counting</p>
                </div>
            </div>
        </section>
    );
};
