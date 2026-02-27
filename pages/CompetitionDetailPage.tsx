import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Trophy, Calendar, DollarSign, Timer, Lock, CheckCircle, ArrowRight, Users, Share2, Sparkles, Clock, Target, ExternalLink } from 'lucide-react';

interface Task {
    id: string;
    type: 'twitter' | 'discord' | 'youtube' | 'instagram' | 'telegram' | 'generic';
    text: string;
    url: string;
}

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
    tasks?: Task[];
    participants?: number;
    max_participants?: number;
}

// Sample competitions so detail page works even without DB
const SAMPLE_COMPETITIONS: Record<string, Competition> = {
    'comp-1': {
        id: 'comp-1', firm_name: 'FTMO', title: 'FTMO Trading Championship 2026',
        description: 'Compete against the best traders worldwide for a chance to win a $200,000 funded account. Show your skills in forex, indices, and commodities trading. This is the ultimate test of trading excellence — consistency, risk management, and strategy all count. Top performers will receive funded accounts and exclusive mentorship opportunities.',
        prize_pool: '$500,000', entry_fee: 'FREE', start_date: '2026-03-15', end_date: '2026-04-15',
        join_url: 'https://ftmo.com', image_url: 'https://ftmo.com/wp-content/uploads/2022/02/cropped-favicon-192x192.png',
        status: 'upcoming', participants: 2847, max_participants: 10000,
        tasks: [
            { id: 't1', type: 'twitter', text: 'Follow FTMO on Twitter', url: 'https://twitter.com/FTMO_com' },
            { id: 't2', type: 'discord', text: 'Join FTMO Discord Server', url: 'https://discord.gg/ftmo' },
            { id: 't3', type: 'youtube', text: 'Subscribe to FTMO YouTube', url: 'https://youtube.com/@ftmo' },
        ]
    },
    'comp-2': {
        id: 'comp-2', firm_name: 'Funding Pips', title: 'Pips Masters League - Season 3',
        description: 'Join the most competitive trading league with weekly prizes. Trade forex pairs and climb the leaderboard to earn your funded account. Weekly rewards and a massive final prize pool await the most consistent traders.',
        prize_pool: '$150,000', entry_fee: '$49', start_date: '2026-03-01', end_date: '2026-03-31',
        join_url: 'https://fundingpips.com', image_url: 'https://fundingpips.com/wp-content/uploads/2023/06/favicon.png',
        status: 'active', participants: 5120, max_participants: 8000,
        tasks: [
            { id: 't1', type: 'twitter', text: 'Follow Funding Pips on Twitter', url: 'https://twitter.com/FundingPips' },
            { id: 't2', type: 'telegram', text: 'Join Telegram Channel', url: 'https://t.me/fundingpips' },
        ]
    },
    'comp-3': {
        id: 'comp-3', firm_name: 'E8 Markets', title: 'E8 Crypto Trading Cup',
        description: 'A crypto-focused trading competition with massive prizes. Trade BTC, ETH, and altcoin pairs for a shot at the grand prize. Designed for crypto enthusiasts who want to prove their edge.',
        prize_pool: '$250,000', entry_fee: '$29', start_date: '2026-04-01', end_date: '2026-04-30',
        join_url: 'https://e8markets.com', image_url: 'https://e8markets.com/favicon.ico',
        status: 'upcoming', participants: 1203, max_participants: 5000,
        tasks: []
    },
    'comp-4': {
        id: 'comp-4', firm_name: 'Alpha Capital', title: 'Alpha Scalpers Challenge',
        description: 'Prove your scalping skills in this fast-paced competition. Quick trades, quick wins — the fastest traders take home the biggest prizes. Perfect for day traders and scalpers.',
        prize_pool: '$100,000', entry_fee: 'FREE', start_date: '2026-02-20', end_date: '2026-03-20',
        join_url: 'https://alphacapitalgroup.co.uk', image_url: 'https://alphacapitalgroup.co.uk/wp-content/uploads/2023/06/favicon.png',
        status: 'active', participants: 3890, max_participants: 6000,
        tasks: [
            { id: 't1', type: 'twitter', text: 'Retweet the competition post', url: 'https://twitter.com/AlphaCapital' },
        ]
    },
    'comp-5': {
        id: 'comp-5', firm_name: 'The 5%ers', title: '5%ers Global Trading Marathon',
        description: 'A month-long endurance trading event. Consistency is king — maintain steady returns to climb the ranks and win funded accounts worth up to $100K.',
        prize_pool: '$300,000', entry_fee: '$59', start_date: '2026-05-01', end_date: '2026-05-31',
        join_url: 'https://the5ers.com', image_url: 'https://the5ers.com/wp-content/uploads/2023/03/favicon.png',
        status: 'upcoming', participants: 890, max_participants: 15000,
        tasks: [
            { id: 't1', type: 'twitter', text: 'Follow The 5%ers on Twitter', url: 'https://twitter.com/the5erstrading' },
            { id: 't2', type: 'youtube', text: 'Watch the intro video', url: 'https://youtube.com/@the5ers' },
        ]
    },
    'comp-6': {
        id: 'comp-6', firm_name: 'Funded Next', title: 'NextGen Trading Showdown',
        description: 'Open to all skill levels — beginners and pros alike. Trade indices and forex for your chance to win from the massive prize pool. Weekly leaderboards and grand final prizes.',
        prize_pool: '$200,000', entry_fee: '$39', start_date: '2026-02-15', end_date: '2026-03-15',
        join_url: 'https://fundednext.com', image_url: 'https://fundednext.com/favicon.ico',
        status: 'active', participants: 6540, max_participants: 10000,
        tasks: [
            { id: 't1', type: 'discord', text: 'Join the FundedNext Discord', url: 'https://discord.gg/fundednext' },
        ]
    },
};

const CompetitionDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [competition, setCompetition] = useState<Competition | null>(null);
    const [loading, setLoading] = useState(true);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        if (id) fetchCompetition(id);
    }, [id]);

    useEffect(() => {
        if (competition?.tasks) {
            if (competition.tasks.length === 0) {
                setIsUnlocked(true);
            } else {
                const allCompleted = competition.tasks.every(t => completedTasks.includes(t.id));
                setIsUnlocked(allCompleted);
            }
        }
    }, [completedTasks, competition]);

    const fetchCompetition = async (compId: string) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('competitions')
                .select('*')
                .eq('id', compId)
                .single();

            if (error || !data) {
                // Fallback to sample data
                const sample = SAMPLE_COMPETITIONS[compId];
                if (sample) {
                    setCompetition(sample);
                }
            } else {
                setCompetition(data);
            }
        } catch (error) {
            const sample = SAMPLE_COMPETITIONS[compId || ''];
            if (sample) setCompetition(sample);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskClick = (task: Task) => {
        window.open(task.url, '_blank');
        if (!completedTasks.includes(task.id)) {
            setTimeout(() => {
                setCompletedTasks(prev => [...prev, task.id]);
            }, 2000);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        });
    };

    const getDaysRemaining = (targetDate?: string) => {
        if (!targetDate) return 0;
        const diff = new Date(targetDate).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    const getProgressPercentage = (current: number, max: number) => {
        return Math.min((current / max) * 100, 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!competition) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <Trophy size={48} className="mx-auto mb-4 text-primary/30" />
                    <h2 className="text-2xl font-bold text-white mb-2">Competition Not Found</h2>
                    <p className="text-gray-500 mb-6">This competition may have ended or doesn't exist.</p>
                    <button onClick={() => navigate('/competitions')} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all">
                        Back to Competitions
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark font-sans text-white">
            {/* Hero Section */}
            <div className="pt-28 pb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <button onClick={() => navigate('/competitions')} className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors group">
                        <ArrowRight className="rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" size={20} /> Back to Competitions
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* Left: Main Info (3 cols) */}
                        <div className="lg:col-span-3">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-20 w-20 bg-white/5 rounded-2xl border border-white/10 p-3 flex items-center justify-center">
                                    <img
                                        src={competition.image_url}
                                        alt={competition.firm_name}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/80/0f0b1e/8B5CF6?text=${competition.firm_name.charAt(0)}`; }}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${competition.status === 'active'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            }`}>
                                            {competition.status === 'active' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>}
                                            {competition.status}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">{competition.title}</h1>
                                    <div className="text-primary font-semibold text-lg mt-1">{competition.firm_name}</div>
                                </div>
                            </div>

                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                {competition.description}
                            </p>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                                <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy size={10} /> Prize Pool</div>
                                    <div className="text-2xl font-bold text-white">{competition.prize_pool}</div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={10} /> Entry Fee</div>
                                    <div className="text-2xl font-bold text-primary">{competition.entry_fee}</div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar size={10} /> End Date</div>
                                    <div className="text-lg font-semibold text-white">{formatDate(competition.end_date)}</div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={10} /> Time Left</div>
                                    <div className="text-lg font-semibold text-white font-mono">{getDaysRemaining(competition.end_date)} Days</div>
                                </div>
                            </div>

                            {/* Participants Progress */}
                            {competition.participants && competition.max_participants && (
                                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mb-8">
                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="text-white font-semibold flex items-center gap-2"><Users size={16} className="text-primary" /> Participants</span>
                                        <span className="text-gray-400">{competition.participants.toLocaleString()} / {competition.max_participants.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full transition-all duration-1000"
                                            style={{ width: `${getProgressPercentage(competition.participants, competition.max_participants)}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-xs text-gray-500 mt-2">
                                        {(competition.max_participants - competition.participants).toLocaleString()} spots remaining
                                    </div>
                                </div>
                            )}

                            {/* Timeline */}
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-primary" /> Event Timeline</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                                        <div>
                                            <div className="text-white font-medium">Registration Opens</div>
                                            <div className="text-gray-500 text-sm">{formatDate(competition.start_date)}</div>
                                        </div>
                                    </div>
                                    <div className="border-l-2 border-dashed border-white/10 h-6 ml-[5px]"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                                        <div>
                                            <div className="text-white font-medium">Competition Ends</div>
                                            <div className="text-gray-500 text-sm">{formatDate(competition.end_date)}</div>
                                        </div>
                                    </div>
                                    <div className="border-l-2 border-dashed border-white/10 h-6 ml-[5px]"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <div>
                                            <div className="text-white font-medium">Winners Announced</div>
                                            <div className="text-gray-500 text-sm">Within 7 days of end date</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Task Locker (2 cols) */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-28 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 relative z-10">
                                    {isUnlocked ? <UnlockIcon /> : <Lock className="text-primary" size={24} />}
                                    {isUnlocked ? 'Entry Unlocked!' : 'Unlock Entry'}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 relative z-10">
                                    {isUnlocked
                                        ? "You've completed all steps. Good luck!"
                                        : "Complete the tasks below to reveal the official join link."}
                                </p>

                                <div className="space-y-3 mb-8 relative z-10">
                                    {competition.tasks && competition.tasks.length > 0 ? (
                                        competition.tasks.map((task) => {
                                            const isCompleted = completedTasks.includes(task.id);
                                            return (
                                                <div
                                                    key={task.id}
                                                    onClick={() => !isCompleted && handleTaskClick(task)}
                                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${isCompleted
                                                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                        : 'bg-white/[0.03] border-white/[0.06] hover:border-primary/50 hover:bg-primary/5'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-9 w-9 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500/20' : 'bg-white/10'}`}>
                                                            {getTaskIcon(task.type)}
                                                        </div>
                                                        <span className={`font-medium ${isCompleted ? 'text-green-100' : 'text-white'}`}>{task.text}</span>
                                                    </div>
                                                    {isCompleted ? <CheckCircle size={20} /> : <ExternalLink size={16} className="opacity-40" />}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20 text-primary text-sm flex items-center justify-center gap-2">
                                            <Sparkles size={16} /> No tasks required — Free entry!
                                        </div>
                                    )}
                                </div>

                                {/* Progress indicator */}
                                {competition.tasks && competition.tasks.length > 0 && (
                                    <div className="mb-6 relative z-10">
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-gray-400">{completedTasks.length} of {competition.tasks.length} completed</span>
                                            <span className="text-primary font-medium">{Math.round((completedTasks.length / competition.tasks.length) * 100)}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full transition-all duration-500"
                                                style={{ width: `${(completedTasks.length / competition.tasks.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <a
                                    href={isUnlocked ? competition.join_url : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full transition-all duration-300 relative z-10 ${!isUnlocked ? 'pointer-events-none opacity-50 grayscale' : ''}`}
                                >
                                    <button className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-bold transition-all duration-300 ${isUnlocked
                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5'
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        }`}>
                                        {isUnlocked ? (
                                            <>JOIN COMPETITION NOW <ArrowRight size={20} /></>
                                        ) : (
                                            <><Lock size={18} /> LOCKED</>
                                        )}
                                    </button>
                                </a>

                                {!isUnlocked && competition.tasks && (
                                    <div className="text-center mt-3 text-xs text-gray-500 flex items-center justify-center gap-1 relative z-10">
                                        <Lock size={12} /> Complete {competition.tasks.length - completedTasks.length} more task{competition.tasks.length - completedTasks.length !== 1 ? 's' : ''} to unlock
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getTaskIcon = (type: string) => {
    const iconClass = "text-[16px]";
    switch (type) {
        case 'twitter': return <span className={`material-symbols-outlined ${iconClass}`}>tag</span>;
        case 'discord': return <span className={`material-symbols-outlined ${iconClass}`}>forum</span>;
        case 'youtube': return <span className={`material-symbols-outlined ${iconClass}`}>play_circle</span>;
        case 'instagram': return <span className={`material-symbols-outlined ${iconClass}`}>photo_camera</span>;
        case 'telegram': return <span className={`material-symbols-outlined ${iconClass}`}>send</span>;
        default: return <span className={`material-symbols-outlined ${iconClass}`}>link</span>;
    }
};

const UnlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></svg>
);

export default CompetitionDetailPage;
