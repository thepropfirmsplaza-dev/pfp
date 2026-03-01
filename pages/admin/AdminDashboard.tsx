import React from 'react';
import {
    TrendingUp,
    Building2,
    Tag,
    Users,
    Star,
    AlertCircle,
    CheckCircle,
    Clock,
    Flag,
    BadgeDollarSign,
    ArrowUpRight,
    Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = React.useState({
        firmsCount: 0,
        offersCount: 0,
        usersCount: 0,
        clicksCount: 0,
        avgRating: '0.0'
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    { count: firmsCount, data: firmsData },
                    { count: offersCount },
                    { count: usersCount },
                    { data: firmsRatings },
                    { count: clicksCount, data: clicksData }
                ] = await Promise.all([
                    supabase.from('firms').select('id, name', { count: 'exact' }),
                    supabase.from('offers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                    supabase.from('profiles').select('*', { count: 'exact', head: true }),
                    supabase.from('firms').select('rating'),
                    supabase.from('clicks').select('user_id, firm_id', { count: 'exact' })
                ]);

                const totalRating = firmsRatings?.reduce((acc, curr) => acc + (curr.rating || 0), 0) || 0;
                const avgRating = firmsRatings?.length ? (totalRating / firmsRatings.length).toFixed(1) : '0.0';

                setStats({
                    firmsCount: firmsCount || 0,
                    offersCount: offersCount || 0,
                    usersCount: usersCount || 0,
                    clicksCount: clicksCount || 0,
                    avgRating
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            label: 'Listed Firms',
            value: loading ? null : stats.firmsCount,
            icon: Building2,
            color: 'text-primary',
            bg: 'bg-primary/10',
            border: 'border-primary/20',
            trend: '+2 this week',
            trendUp: true
        },
        {
            label: 'Active Offers',
            value: loading ? null : stats.offersCount,
            icon: Tag,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20',
            trend: '+5% new',
            trendUp: true
        },
        {
            label: 'Registered Users',
            value: loading ? null : stats.usersCount,
            icon: Users,
            color: 'text-accent',
            bg: 'bg-accent/10',
            border: 'border-accent/20',
            trend: 'Registered accounts',
            trendUp: null
        },
        {
            label: 'Avg Firm Rating',
            value: loading ? null : stats.avgRating,
            icon: Star,
            color: 'text-yellow-400',
            bg: 'bg-yellow-400/10',
            border: 'border-yellow-400/20',
            trend: 'Across all firms',
            trendUp: null
        },
        {
            label: 'Total Clicks',
            value: loading ? null : stats.clicksCount?.toLocaleString(),
            icon: TrendingUp,
            color: 'text-green-400',
            bg: 'bg-green-400/10',
            border: 'border-green-400/20',
            trend: '+18% this month',
            trendUp: true
        }
    ];

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Platform Overview</h2>
                    <p className="text-white/40 text-sm mt-1">PropFirms Plaza admin dashboard — live metrics and queue.</p>
                </div>
                <div className="flex gap-3">
                    <select className="bg-[#161229] border border-[#122417] text-white/70 text-sm rounded-lg px-3 py-1.5 focus:border-primary outline-none transition-colors">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((card) => (
                    <div key={card.label} className={`bg-[#0f1a12] border border-[#122417] hover:border-[#15a13c] p-5 rounded-xl flex flex-col gap-1 transition-all group relative overflow-hidden`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider leading-tight">{card.label}</span>
                            <div className={`${card.bg} ${card.border} border p-1.5 rounded-lg`}>
                                <card.icon size={14} className={card.color} />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-white tracking-tight">
                            {card.value === null ? (
                                <Loader2 size={18} className="animate-spin text-white/30" />
                            ) : (
                                card.value
                            )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            {card.trendUp === true && <ArrowUpRight size={12} className="text-green-400" />}
                            <span className={`text-[11px] ${card.trendUp === true ? 'text-green-400 font-bold' : 'text-white/30'}`}>{card.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main grid: Chart + Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Firm Growth Chart */}
                <div className="lg:col-span-2 bg-[#0f1a12] border border-[#122417] rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-bold">Firm Listing Growth</h3>
                            <p className="text-white/30 text-xs mt-0.5">Listed prop firms over the last 6 months</p>
                        </div>
                    </div>
                    <div className="relative w-full h-[200px]">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
                            <defs>
                                <linearGradient id="cmChartGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#1fd655" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#1fd655" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Grid Lines */}
                            {[160, 120, 80, 40].map(y => (
                                <line key={y} stroke="#122417" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1={y} y2={y} />
                            ))}
                            {/* Chart Line */}
                            <path d="M0,180 C60,175 100,160 160,140 C220,120 260,135 320,105 C380,75 420,95 480,65 C540,45 580,70 640,40 C700,15 750,25 800,20"
                                fill="none" stroke="#1fd655" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                            {/* Area */}
                            <path d="M0,180 C60,175 100,160 160,140 C220,120 260,135 320,105 C380,75 420,95 480,65 C540,45 580,70 640,40 C700,15 750,25 800,20 V200 H0 Z"
                                fill="url(#cmChartGradient)" opacity="0.6" />
                            {/* Data Points */}
                            {[[160, 140], [320, 105], [480, 65], [640, 40], [800, 20]].map(([cx, cy]) => (
                                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} fill="#0f1a12" r="4" stroke="#1fd655" strokeWidth="2" />
                            ))}
                            {/* Tooltip */}
                            <g transform="translate(640, 20)">
                                <rect fill="#1fd655" height="22" rx="4" width="66" x="-33" y="-32" />
                                <text fill="#030014" fontSize="11" fontWeight="bold" textAnchor="middle" x="0" y="-16">45 Firms</text>
                            </g>
                        </svg>
                    </div>
                    <div className="flex justify-between mt-3 px-2 text-[10px] font-bold text-white/25 uppercase tracking-wider">
                        {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map(m => <span key={m}>{m}</span>)}
                    </div>
                </div>

                {/* Needs Attention Queue */}
                <div className="bg-[#0f1a12] border border-[#122417] rounded-xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold">Needs Attention</h3>
                        <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full">3 Pending</span>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[240px]">

                        <AttentionItem
                            icon={<Building2 size={16} className="text-blue-400" />}
                            iconBg="bg-blue-400/10"
                            title="New Firm Application"
                            desc="Apex Capital submitted a listing request."
                            time="2m ago"
                            action="Review"
                        />
                        <AttentionItem
                            icon={<Flag size={16} className="text-orange-400" />}
                            iconBg="bg-orange-400/10"
                            title="Flagged Review #8921"
                            desc="User report flagged for suspicious activity."
                            time="15m ago"
                            action="Moderate"
                        />
                        <AttentionItem
                            icon={<BadgeDollarSign size={16} className="text-green-400" />}
                            iconBg="bg-green-400/10"
                            title="Payout Verification"
                            desc="$12,450.00 claim requires approval."
                            time="1h ago"
                            action="Verify"
                        />
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-[#0f1a12] border border-[#122417] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#122417] flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h3 className="text-white font-bold">Firm Applications</h3>
                        <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-md">Pending Approval</span>
                    </div>
                    <select className="bg-[#161229] border border-[#122417] text-white/50 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-primary">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 border-b border-[#122417] text-[10px] uppercase text-white/30 font-bold tracking-wider">
                                <th className="px-6 py-3.5">Firm Name</th>
                                <th className="px-6 py-3.5">Submitted</th>
                                <th className="px-6 py-3.5">Max Account Size</th>
                                <th className="px-6 py-3.5">Trust Level</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#161229] text-sm">
                            <ApplicationRow
                                name="Nova Capital Group"
                                type="Proprietary Trading"
                                submitted="Feb 20, 2026"
                                maxAccount="$200K"
                                trust="High"
                                status="pending"
                            />
                            <ApplicationRow
                                name="Apex Funded Traders"
                                type="Challenge-Based"
                                submitted="Feb 22, 2026"
                                maxAccount="$100K"
                                trust="Medium"
                                status="pending"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AttentionItem = ({ icon, iconBg, title, desc, time, action }: {
    icon: React.ReactNode; iconBg: string; title: string; desc: string; time: string; action: string;
}) => (
    <div className="flex gap-3 items-start p-3 rounded-lg bg-black/30 border border-[#122417] hover:border-primary/20 transition-colors cursor-pointer group">
        <div className={`${iconBg} p-2 rounded-lg mt-0.5`}>{icon}</div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
                <h4 className="text-white text-xs font-semibold truncate">{title}</h4>
                <span className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">{time}</span>
            </div>
            <p className="text-white/40 text-[11px] mb-2">{desc}</p>
            <button className="text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20">
                {action}
            </button>
        </div>
    </div>
);

const ApplicationRow = ({ name, type, submitted, maxAccount, trust, status }: {
    name: string; type: string; submitted: string; maxAccount: string; trust: string; status: string;
}) => (
    <tr className="group hover:bg-white/[0.02] transition-colors">
        <td className="px-6 py-4">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Building2 size={14} className="text-primary" />
                </div>
                <div>
                    <div className="font-bold text-white text-sm">{name}</div>
                    <div className="text-white/30 text-[11px]">{type}</div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 text-white/50 text-sm tabular-nums">{submitted}</td>
        <td className="px-6 py-4 text-white font-mono text-sm">{maxAccount}</td>
        <td className="px-6 py-4">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${trust === 'High' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>{trust}</span>
        </td>
        <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Pending
            </span>
        </td>
        <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Reject">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <button className="p-1.5 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors" title="Approve">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
            </div>
        </td>
    </tr>
);

export default AdminDashboard;
