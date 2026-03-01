import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Shield, Clock, TrendingUp, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// Generate favicon URL from firm website
function getFaviconUrl(website: string): string {
    if (!website) return '';
    try {
        const domain = new URL(website).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
        return `https://www.google.com/s2/favicons?domain=${website}&sz=128`;
    }
}

// Map firm names to badge labels
const BADGE_MAP: Record<string, string> = {
    'FTMO': '🏆 Top Rated',
    'The 5%ers': '⚡ Best Value',
    'Alpha Capital': '✅ Verified',
    'Funding Pips': '🔥 Popular',
};

interface FeaturedFirmsProps {
    onExplore?: () => void;
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

export const FeaturedFirms: React.FC<FeaturedFirmsProps> = ({ onExplore, onViewFirm }) => {
    const navigate = useNavigate();
    const [firms, setFirms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFirms = async () => {
            try {
                const { data, error } = await supabase
                    .from('firms')
                    .select('*, challenges(*)')
                    .eq('status', 'active')
                    .order('rating', { ascending: false })
                    .limit(6);

                if (error) throw error;
                setFirms(data || []);
            } catch (err) {
                console.error('Failed to load featured firms:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFirms();
    }, []);

    const handleViewFirm = (firmId: string) => {
        if (onViewFirm) {
            onViewFirm(firmId);
        } else {
            navigate(`/firm/${firmId}`);
        }
    };

    // Derive display values from Supabase data
    const getLogoSrc = (firm: any) => {
        return getFaviconUrl(firm.website);
    };

    const getMinPrice = (firm: any): string => {
        if (firm.challenges && firm.challenges.length > 0) {
            // Find the cheapest challenge
            const cheapest = firm.challenges.reduce((min: any, c: any) => {
                const price = parseInt(String(c.price).replace(/[^0-9]/g, ''));
                const minPrice = parseInt(String(min.price).replace(/[^0-9]/g, ''));
                return price < minPrice ? c : min;
            }, firm.challenges[0]);
            return cheapest.price?.startsWith?.('$') ? cheapest.price : `$${cheapest.price}`;
        }
        return 'N/A';
    };

    const getMaxAccount = (firm: any): string => {
        if (firm.max_funding) {
            const val = Number(firm.max_funding);
            if (val >= 1000) return `$${val / 1000}K`;
            return `$${val}`;
        }
        return 'N/A';
    };

    const getFeatures = (firm: any): string[] => {
        const features: string[] = [];
        if (firm.tags && firm.tags.length > 0) {
            // Convert tags to readable features
            firm.tags.slice(0, 3).forEach((tag: string) => {
                const readable = tag.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
                features.push(readable);
            });
        }
        if (features.length === 0) {
            if (firm.scaling_plan) features.push('Scaling Plan');
            if (firm.news_trading) features.push('News Trading');
            if (firm.weekend_holding) features.push('Weekend Holding');
        }
        return features.slice(0, 3);
    };

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
                        Featured Prop <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">Firms</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Handpicked and verified prop trading firms trusted by thousands of traders worldwide.
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="ml-3 text-gray-400">Loading firms...</span>
                    </div>
                ) : firms.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p>No firms available yet. Check back soon!</p>
                    </div>
                ) : (
                    /* Firm Cards Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {firms.map((firm, idx) => {
                            const badge = BADGE_MAP[firm.name];
                            const logoSrc = getLogoSrc(firm);
                            const trustScore = Number(firm.rating) || 4.5;
                            const profitSplit = firm.profit_split || '80%';
                            const payoutTime = firm.avg_payout_time || '24h';
                            const minPrice = getMinPrice(firm);
                            const maxAccount = getMaxAccount(firm);
                            const features = getFeatures(firm);
                            const challengeType = firm.challenges?.[0]?.challenge_type || '2-Step';

                            return (
                                <div
                                    key={firm.id}
                                    className="group relative rounded-2xl border border-secondary/40 bg-[#0f1a12]/90 backdrop-blur-md overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:border-secondary hover:shadow-[0_20px_50px_-12px_rgba(34,228,175,0.4)]"
                                >
                                    {/* Badge */}
                                    {badge && (
                                        <div className="absolute top-4 right-4 z-20 bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs font-semibold text-white">
                                            {badge}
                                        </div>
                                    )}

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Card Content */}
                                    <div className="relative z-10 p-6">

                                        {/* Logo & Name */}
                                        <div className="flex items-center space-x-4 mb-5">
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg shrink-0 bg-white/[0.03]"
                                            >
                                                <img src={logoSrc} alt={firm.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{firm.name}</h3>
                                                <StarRating score={trustScore} />
                                            </div>
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
                                                <span className="text-white font-medium">{challengeType}</span>
                                            </div>
                                            <div className="h-2.5 w-px bg-white/10 hidden min-[360px]:block"></div>
                                            <div className="flex items-center gap-0.5">
                                                <span className="text-gray-500">From</span>
                                                <span className="text-green-400 font-bold">{minPrice}</span>
                                            </div>
                                            <div className="h-2.5 w-px bg-white/10 hidden sm:block"></div>
                                            <div className="flex items-center gap-0.5">
                                                <span className="text-gray-500">Up to</span>
                                                <span className="text-secondary font-bold">{maxAccount}</span>
                                            </div>
                                        </div>

                                        {/* Features Tags */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {features.map((feature, fIdx) => (
                                                <span
                                                    key={fIdx}
                                                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 font-medium"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <button onClick={() => handleViewFirm(firm.id)} className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/[0.04] hover:bg-secondary/20 border border-white/[0.06] hover:border-secondary/30 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 group/btn">
                                            <span>View Details</span>
                                            <ChevronRight className="w-4 h-4 text-secondary group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="text-center mt-14">
                    <button
                        onClick={() => navigate('/firms')}
                        className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-[0_0_30px_rgba(10,193,201,)] hover:shadow-[0_0_40px_rgba(10,193,201,)] transition-all duration-300 hover:scale-105 border border-white/10"
                    >
                        <span>Explore All Firms</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-gray-500 text-xs mt-4 font-light">{firms.length}+ verified prop firms and counting</p>
                </div>
            </div>
        </section>
    );
};
