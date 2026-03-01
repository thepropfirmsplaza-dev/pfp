import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Calendar, DollarSign, Timer, ArrowRight, Users, Flame, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface Competition {
    id: string;
    firm_name: string;
    title: string;
    description: string;
    prize_pool: string;
    entry_fee: string;
    start_date: string;
    end_date: string;
    join_url: string;
    image_url: string;
    status: 'upcoming' | 'active' | 'ended';
    participants?: number;
    max_participants?: number;
}

// Sample competitions data for when the DB table is empty
const SAMPLE_COMPETITIONS: Competition[] = [
    {
        id: 'comp-1',
        firm_name: 'FTMO',
        title: 'FTMO Trading Championship 2026',
        description: 'Compete against the best traders worldwide for a chance to win a $200,000 funded account. Show your skills in forex, indices, and commodities trading.',
        prize_pool: '$500,000',
        entry_fee: 'FREE',
        start_date: '2026-03-15',
        end_date: '2026-04-15',
        join_url: 'https://ftmo.com',
        image_url: 'https://ftmo.com/wp-content/uploads/2022/02/cropped-favicon-192x192.png',
        status: 'upcoming',
        participants: 2847,
        max_participants: 10000,
    },
    {
        id: 'comp-2',
        firm_name: 'Funding Pips',
        title: 'Pips Masters League - Season 3',
        description: 'Join the most competitive trading league with weekly prizes. Trade forex pairs and climb the leaderboard to earn your funded account.',
        prize_pool: '$150,000',
        entry_fee: '$49',
        start_date: '2026-03-01',
        end_date: '2026-03-31',
        join_url: 'https://fundingpips.com',
        image_url: 'https://fundingpips.com/wp-content/uploads/2023/06/favicon.png',
        status: 'active',
        participants: 5120,
        max_participants: 8000,
    },
    {
        id: 'comp-3',
        firm_name: 'E8 Markets',
        title: 'E8 Crypto Trading Cup',
        description: 'A crypto-focused trading competition with massive prizes. Trade BTC, ETH, and altcoin pairs for a shot at the grand prize.',
        prize_pool: '$250,000',
        entry_fee: '$29',
        start_date: '2026-04-01',
        end_date: '2026-04-30',
        join_url: 'https://e8markets.com',
        image_url: 'https://e8markets.com/favicon.ico',
        status: 'upcoming',
        participants: 1203,
        max_participants: 5000,
    },
    {
        id: 'comp-4',
        firm_name: 'Alpha Capital',
        title: 'Alpha Scalpers Challenge',
        description: 'Prove your scalping skills in this fast-paced competition. Quick trades, quick wins — the fastest traders take home the biggest prizes.',
        prize_pool: '$100,000',
        entry_fee: 'FREE',
        start_date: '2026-02-20',
        end_date: '2026-03-20',
        join_url: 'https://alphacapitalgroup.co.uk',
        image_url: 'https://alphacapitalgroup.co.uk/wp-content/uploads/2023/06/favicon.png',
        status: 'active',
        participants: 3890,
        max_participants: 6000,
    },
    {
        id: 'comp-5',
        firm_name: 'The 5%ers',
        title: '5%ers Global Trading Marathon',
        description: 'A month-long endurance trading event. Consistency is king — maintain steady returns to climb the ranks and win funded accounts.',
        prize_pool: '$300,000',
        entry_fee: '$59',
        start_date: '2026-05-01',
        end_date: '2026-05-31',
        join_url: 'https://the5ers.com',
        image_url: 'https://the5ers.com/wp-content/uploads/2023/03/favicon.png',
        status: 'upcoming',
        participants: 890,
        max_participants: 15000,
    },
    {
        id: 'comp-6',
        firm_name: 'Funded Next',
        title: 'NextGen Trading Showdown',
        description: 'Open to all skill levels — beginners and pros alike. Trade indices and forex for your chance to win from the massive prize pool.',
        prize_pool: '$200,000',
        entry_fee: '$39',
        start_date: '2026-02-15',
        end_date: '2026-03-15',
        join_url: 'https://fundednext.com',
        image_url: 'https://fundednext.com/favicon.ico',
        status: 'active',
        participants: 6540,
        max_participants: 10000,
    },
];

const CompetitionsPage = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'upcoming'>('all');

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('competitions')
                .select('*')
                .order('start_date', { ascending: true });

            if (error || !data || data.length === 0) {
                // Use sample data when DB table doesn't exist or is empty
                setCompetitions(SAMPLE_COMPETITIONS);
            } else {
                setCompetitions(data);
            }
        } catch (error) {
            console.error('Error fetching competitions:', error);
            setCompetitions(SAMPLE_COMPETITIONS);
        } finally {
            setLoading(false);
        }
    };

    const filteredCompetitions = competitions.filter(comp =>
        filter === 'all' ? comp.status !== 'ended' : comp.status === filter
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    const getDaysRemaining = (targetDate: string) => {
        const diff = new Date(targetDate).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    const getProgressPercentage = (current: number, max: number) => {
        return Math.min((current / max) * 100, 100);
    };

    // Stats
    const totalPrize = competitions.reduce((sum, c) => {
        const num = parseInt(c.prize_pool.replace(/[^0-9]/g, ''));
        return sum + (isNaN(num) ? 0 : num);
    }, 0);
    const activeCount = competitions.filter(c => c.status === 'active').length;
    const upcomingCount = competitions.filter(c => c.status === 'upcoming').length;

    return (
        <div className="min-h-screen bg-dark pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-semibold mb-8">
                        <Trophy size={16} /> Elite Trading Tournaments
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        Prove Your Edge in Global <br className="hidden md:block" />
                        Trading <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Competitions</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Test your skills against the best traders worldwide. Win funded accounts,
                        cash prizes, and prove you have what it takes.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                    <div className="col-span-2 md:col-span-1 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 text-center group hover:border-primary/30 transition-all duration-300">
                        <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">${(totalPrize / 1000).toFixed(0)}K+</div>
                        <div className="text-gray-500 text-xs uppercase tracking-widest font-medium">Total Prizes</div>
                    </div>
                    <div className="col-span-1 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 text-center group hover:border-green-500/30 transition-all duration-300">
                        <div className="text-3xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{activeCount}</div>
                        <div className="text-gray-500 text-xs uppercase tracking-widest font-medium">Live Now</div>
                    </div>
                    <div className="col-span-1 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 text-center group hover:border-blue-500/30 transition-all duration-300">
                        <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{upcomingCount}</div>
                        <div className="text-gray-500 text-xs uppercase tracking-widest font-medium">Upcoming</div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-1.5 rounded-2xl flex gap-1">
                        {(['all', 'active', 'upcoming'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === f
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {f === 'all' ? 'All Events' : f === 'active' ? '🔴 Live Now' : '📅 Upcoming'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                    </div>
                )}

                {/* Featured Competition (first active one) */}
                {!loading && filteredCompetitions.length > 0 && filter !== 'upcoming' && (() => {
                    const featured = filteredCompetitions.find(c => c.status === 'active') || filteredCompetitions[0];
                    return (
                        <div className="mb-12 group">
                            <div className="relative bg-gradient-to-br from-primary/10 via-white/[0.02] to-accent/10 border border-primary/20 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(31, 214, 85, 0.4)]">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                                    {/* Left: Info */}
                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                {featured.status === 'active' ? 'Live Now' : 'Featured'}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 flex items-center gap-1.5">
                                                <Flame size={12} /> Hot
                                            </span>
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">{featured.title}</h2>
                                        <p className="text-primary font-semibold text-lg mb-3">{featured.firm_name}</p>
                                        <p className="text-gray-400 mb-8 leading-relaxed">{featured.description}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy size={12} /> Prize Pool</div>
                                                <div className="text-2xl font-bold text-white">{featured.prize_pool}</div>
                                            </div>
                                            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={12} /> Entry Fee</div>
                                                <div className="text-2xl font-bold text-primary">{featured.entry_fee}</div>
                                            </div>
                                        </div>

                                        {/* Participants progress */}
                                        {featured.participants && featured.max_participants && (
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-400 flex items-center gap-1"><Users size={14} /> {featured.participants.toLocaleString()} joined</span>
                                                    <span className="text-gray-500">{featured.max_participants.toLocaleString()} spots</span>
                                                </div>
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                                                        style={{ width: `${getProgressPercentage(featured.participants, featured.max_participants)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <Link to={`/competition/${featured.id}`} className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-primary/25 hover:shadow-primary/40 w-fit">
                                            View Competition <ArrowRight size={18} />
                                        </Link>
                                    </div>

                                    {/* Right: Visual */}
                                    <div className="flex items-center justify-center">
                                        <div className="relative">
                                            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-8 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                <img
                                                    src={featured.image_url}
                                                    alt={featured.firm_name}
                                                    className="w-full h-full object-contain drop-shadow-2xl"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/0f1a12/1fd655?text=${featured.firm_name.charAt(0)}`; }}
                                                />
                                            </div>
                                            {/* Countdown badge */}
                                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dark border border-primary/30 rounded-xl px-6 py-3 shadow-xl min-w-max">
                                                <div className="text-gray-500 text-[10px] uppercase tracking-widest text-center mb-0.5 whitespace-nowrap">Ends In</div>
                                                <div className="text-white font-bold text-lg font-mono text-center whitespace-nowrap">{getDaysRemaining(featured.end_date)} Days</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Competition Cards Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompetitions.map((comp, index) => (
                            <div
                                key={comp.id}
                                className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(31, 214, 85, 0.4)] flex flex-col h-full"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image Banner */}
                                <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden p-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                                    <img
                                        src={comp.image_url || 'https://placehold.co/150/0f1a12/1fd655?text=CM'}
                                        alt={comp.firm_name}
                                        className="h-20 w-auto object-contain z-10 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/150/0f1a12/1fd655?text=${comp.firm_name.charAt(0)}`; }}
                                    />

                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${comp.status === 'active'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : comp.status === 'upcoming'
                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                            }`}>
                                            {comp.status === 'active' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>}
                                            {comp.status}
                                        </span>
                                    </div>

                                    {/* Entry Fee badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${comp.entry_fee === 'FREE'
                                            ? 'bg-primary/20 text-primary border border-primary/30'
                                            : 'bg-white/10 text-white border border-white/10'
                                            }`}>
                                            {comp.entry_fee === 'FREE' ? '✨ FREE ENTRY' : comp.entry_fee}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-4">
                                        <div className="text-primary text-sm font-semibold mb-1">{comp.firm_name}</div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">{comp.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{comp.description}</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                                            <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                <Trophy size={10} /> Prize Pool
                                            </div>
                                            <div className="text-white font-bold text-lg">{comp.prize_pool}</div>
                                        </div>
                                        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                                            <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                <Timer size={10} /> {comp.status === 'active' ? 'Ends In' : 'Starts In'}
                                            </div>
                                            <div className="text-white font-bold text-lg font-mono">
                                                {getDaysRemaining(comp.status === 'active' ? comp.end_date : comp.start_date)}d
                                            </div>
                                        </div>
                                    </div>

                                    {/* Participants Progress */}
                                    {comp.participants && comp.max_participants && (
                                        <div className="mb-5">
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="text-gray-500 flex items-center gap-1"><Users size={11} /> {comp.participants.toLocaleString()} joined</span>
                                                <span className="text-gray-600">{Math.round(getProgressPercentage(comp.participants, comp.max_participants))}% full</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                                    style={{ width: `${getProgressPercentage(comp.participants, comp.max_participants)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action */}
                                    <div className="mt-auto">
                                        <Link
                                            to={`/competition/${comp.id}`}
                                            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white/[0.04] hover:bg-primary/20 border border-white/[0.06] hover:border-primary/30 text-white hover:text-primary font-semibold rounded-xl transition-all duration-300 group/btn"
                                        >
                                            View Details
                                            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredCompetitions.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Trophy size={32} className="text-primary/50" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No competitions found</h3>
                        <p className="text-gray-500">Check back soon — new competitions are added regularly!</p>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-r from-primary/10 via-white/[0.02] to-accent/10 border border-primary/20 rounded-2xl px-10 py-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Want to host a competition?</h3>
                        <p className="text-gray-400 mb-5">Partner with PropFirms Plaza to reach thousands of active traders.</p>
                        <a href="mailto:admin@propfirmsplaza.com" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/25">
                            Contact Us <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompetitionsPage;
