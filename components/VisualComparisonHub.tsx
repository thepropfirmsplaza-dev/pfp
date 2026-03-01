import React, { useState } from 'react';
import { Firm } from '../types';
import { X, CheckCircle, TrendingUp, Shield, Zap, Target, Clock, AlertTriangle, Layers, ChevronRight, SlidersHorizontal, Monitor, Calendar, CreditCard, Award } from 'lucide-react';
import { PayoutGrowthChart } from './PayoutGrowthChart';
import { FirmDNARadar } from './FirmDNARadar';
import { useComparison } from '../context/ComparisonContext';
import { useNavigate } from 'react-router-dom';

interface VisualComparisonHubProps { }

export const VisualComparisonHub: React.FC<VisualComparisonHubProps> = () => {
    const { selectedFirms: firms, removeFirm: onRemove } = useComparison();
    const navigate = useNavigate();
    const onExplore = () => navigate('/firms');
    const [timeRange, setTimeRange] = useState<'12m' | '6m' | '30d' | '7d'>('12m');

    if (firms.length === 0) {
        return (
            <div className="text-center py-32 bg-gradient-to-br from-[#0f1a12] to-black rounded-[2rem] border border-dashed border-secondary/30 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/30 shadow-[0_0_30px_rgba(34,228,175,0.15)] relative z-10">
                    <SlidersHorizontal className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl pt-2 font-bold text-white mb-3 relative z-10">Compare Prop Firms</h3>
                <p className="text-gray-400 max-w-md relative z-10">Select up to 5 firms from the directory to meticulously compare their rules, scaling plans, and payouts side-by-side.</p>

                <div className="mt-12 text-center relative z-20">
                    <button onClick={onExplore} className="bg-[#0f1a12] text-white border border-secondary/30 hover:bg-secondary/20 hover:border-secondary hover:shadow-[0_0_30px_rgba(34,228,175,0.3)] transition-all px-10 py-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-3 mx-auto group">
                        <SlidersHorizontal className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                        <span>Browse Directory to Select Firms</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative min-h-screen rounded-[2rem] bg-[#0F0A1E] text-white border border-white/5 overflow-hidden pt-24 pb-12">
            {/* Dynamic Canvas Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(246, 174, 19,0.05),transparent_70%)]"></div>
                {/* Subtle Horizontal Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_40px]"></div>
            </div>

            {/* Global Control Bar (Sticky) */}
            <div className="sticky top-[90px] z-50 w-full bg-[#0f1a12]/95 backdrop-blur-xl border-b border-t border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative mb-8">


                {/* Firm Selector Pills */}
                <div className="flex items-center space-x-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    <span className="text-xs font-mono text-gray-400 mr-2 uppercase tracking-wide whitespace-nowrap">{firms.length}/5 Selected</span>
                    {firms.map(firm => (
                        <div key={firm.id} className="group relative flex items-center space-x-2 bg-white/[0.05] border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap overflow-hidden transition-all hover:-translate-y-0.5" style={{ borderColor: 'rgba(246, 174, 19,0.3)' }}>
                            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: '#7C3AED' }}></div>
                            <img src={firm.logo} alt={firm.name} className="w-4 h-4 rounded-full" />
                            <span className="text-sm font-bold relative z-10">{firm.name}</span>
                            <div className="w-2 h-2 rounded-full relative z-10 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: '#7C3AED', color: '#7C3AED' }}></div>
                            <button onClick={() => onRemove(firm.id)} className="ml-1 text-gray-400 hover:text-white relative z-10">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Time Range Selector */}
                <div className="flex bg-black/40 border border-white/10 p-1 rounded-xl whitespace-nowrap shrink-0 overflow-x-auto w-full md:w-auto">
                    {(['12m', '6m', '30d', '7d'] as const).map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${timeRange === range ? 'bg-secondary/20 text-secondary shadow-[0_0_15px_rgba(34,228,175,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {range.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Grid Area */}
            <div className="relative z-10 p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto min-h-[60vh]">

                {/* Hero Chart: Payout Growth Stream */}
                <div className="w-full">
                    <PayoutGrowthChart activeFirms={firms} timeRange={timeRange} />
                </div>

                {/* Secondary Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Spider Chart spans both columns on large screens */}
                    <FirmDNARadar activeFirms={firms} />

                    {/* Placeholders for upcoming charts */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 h-[320px] flex items-center justify-center flex-col">
                        <AlertTriangle className="w-8 h-8 text-secondary/30 mb-2" />
                        <p className="text-gray-500 font-bold">Drawdown Risk Curve (Pending)</p>
                    </div>
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 h-[320px] flex items-center justify-center flex-col">
                        <Shield className="w-8 h-8 text-secondary/30 mb-2" />
                        <p className="text-gray-500 font-bold">Trust Score Flow (Pending)</p>
                    </div>

                </div>

            </div>

        </div>
    );
};
