import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { FeaturedFirms } from './components/FeaturedFirms';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { FirmDetail } from './components/FirmDetail';
import { FirmCard } from './components/FirmCard';
import { ComparisonTable } from './components/ComparisonTable';
import { VisualComparisonHub } from './components/VisualComparisonHub';
import { FirmFinderQuiz } from './components/FirmFinderQuiz';
import { MOCK_FIRMS } from './constants';
import { Firm, ViewState } from './types';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const getInitialState = () => {
    const path = window.location.pathname;
    if (path.startsWith('/firm/')) {
        const id = path.split('/')[2];
        return { view: 'firm-detail' as ViewState, firmId: id };
    }
    if (path === '/firms') return { view: 'discovery' as ViewState, firmId: null };
    if (path === '/compare') return { view: 'compare' as ViewState, firmId: null };
    if (path === '/quiz') return { view: 'quiz' as ViewState, firmId: null };
    if (path === '/dashboard') return { view: 'dashboard' as ViewState, firmId: null };
    return { view: 'home' as ViewState, firmId: null };
};

const getPathForView = (view: ViewState, firmId?: string | null) => {
    if (view === 'firm-detail' && firmId) return `/firm/${firmId}`;
    if (view === 'discovery') return '/firms';
    if (view === 'home') return '/';
    return `/${view}`;
};

export default function App() {
    const initialState = getInitialState();
    const [currentView, setView] = useState<ViewState>(initialState.view);
    const [selectedFirms, setSelectedFirms] = useState<Firm[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFirmId, setSelectedFirmId] = useState<string | null>(initialState.firmId);

    useEffect(() => {
        const handlePopState = () => {
            const state = getInitialState();
            setView(state.view);
            setSelectedFirmId(state.firmId);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleSetView = (view: ViewState) => {
        setView(view);
        if (view !== 'firm-detail') setSelectedFirmId(null);
        window.history.pushState({}, '', getPathForView(view));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigateToFirm = (firmId: string) => {
        setSelectedFirmId(firmId);
        setView('firm-detail');
        window.history.pushState({}, '', getPathForView('firm-detail', firmId));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleCompare = (firm: Firm) => {
        if (selectedFirms.find(f => f.id === firm.id)) {
            setSelectedFirms(selectedFirms.filter(f => f.id !== firm.id));
        } else {
            if (selectedFirms.length < 4) {
                setSelectedFirms([...selectedFirms, firm]);
            } else {
                alert("You can compare up to 4 firms at once.");
            }
        }
    };

    const filteredFirms = MOCK_FIRMS.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <>
                        <Hero onStartQuiz={() => handleSetView('quiz')} onExplore={() => handleSetView('discovery')} />
                        <FeaturedFirms onExplore={() => handleSetView('discovery')} onViewFirm={navigateToFirm} />
                        <HowItWorks onStartQuiz={() => handleSetView('quiz')} />
                        <FAQSection />
                    </>
                );

            case 'firm-detail':
                return selectedFirmId ? (
                    <FirmDetail firmId={selectedFirmId} onBack={() => handleSetView('home')} />
                ) : null;

            case 'quiz':
                return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <FirmFinderQuiz onComplete={() => { }} />
                    </div>
                );

            case 'compare':
                return (
                    <div className="w-full">
                        <VisualComparisonHub
                            firms={selectedFirms}
                            onRemove={(id) => setSelectedFirms(selectedFirms.filter(f => f.id !== id))}
                            onExplore={() => handleSetView('discovery')}
                        />
                    </div>
                );

            case 'dashboard':
                return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <h2 className="text-4xl font-bold mb-10">Trader Dashboard</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Stats */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="glass-panel p-8 rounded-3xl border border-white/5">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-bold text-white">Payout History</h3>
                                        <select className="bg-dark text-sm border border-white/10 rounded-lg px-3 py-1 text-text-muted focus:outline-none">
                                            <option>Last 6 Months</option>
                                        </select>
                                    </div>
                                    <div className="h-72 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={[
                                                { month: 'Jan', amount: 1200 },
                                                { month: 'Feb', amount: 3500 },
                                                { month: 'Mar', amount: 2100 },
                                                { month: 'Apr', amount: 5600 },
                                            ]}>
                                                <XAxis dataKey="month" stroke="#475569" axisLine={false} tickLine={false} />
                                                <YAxis stroke="#475569" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0F0B1E', border: '1px solid #7C3AED', borderRadius: '12px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                />
                                                <Bar dataKey="amount" fill="#7C3AED" radius={[6, 6, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <div className="glass-card p-8 rounded-3xl border border-secondary/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] pointer-events-none"></div>
                                    <div className="text-sm text-text-muted mb-2 uppercase tracking-wider font-semibold">Total Rewards</div>
                                    <div className="text-4xl font-bold text-white mb-6">2,450 <span className="text-secondary text-base align-top">CMP</span></div>
                                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-sm font-medium transition-colors">Redeem Points</button>
                                </div>

                                <div className="glass-card p-8 rounded-3xl">
                                    <h3 className="font-bold mb-6 text-lg">Active Challenges</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-dark-mid rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                                            <div className="flex justify-between text-sm mb-3">
                                                <span className="font-bold text-white">Alpha Capital</span>
                                                <span className="text-secondary bg-secondary/10 px-2 py-0.5 rounded text-xs">Active</span>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-2 mb-3">
                                                <div className="bg-gradient-to-r from-secondary to-primary w-2/3 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-xs text-text-muted">Phase 1</div>
                                                <div className="text-xs font-mono text-white">Day 14/30</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'discovery':
            default:
                return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-4 mb-10">
                            <div className="relative flex-grow group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search firms, features, or instruments..."
                                    className="w-full bg-dark-mid border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.02] transition-all shadow-sm placeholder:text-text-muted/50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center justify-center px-6 py-4 bg-dark-mid border border-white/10 rounded-2xl text-text-muted hover:text-white hover:border-white/20 transition-all">
                                <SlidersHorizontal className="w-5 h-5 mr-2" /> Filters
                            </button>
                            <button className="flex items-center justify-center px-6 py-4 bg-dark-mid border border-white/10 rounded-2xl text-text-muted hover:text-white hover:border-white/20 transition-all">
                                <ArrowUpDown className="w-5 h-5 mr-2" /> Sort
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredFirms.map(firm => (
                                <FirmCard
                                    key={firm.id}
                                    firm={firm}
                                    onCompare={toggleCompare}
                                    isSelectedForCompare={!!selectedFirms.find(f => f.id === firm.id)}
                                />
                            ))}
                        </div>

                        {/* Compare Sticky Bar */}
                        {selectedFirms.length > 0 && (
                            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-dark-mid/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl flex items-center space-x-6 animate-fade-in ring-1 ring-white/10">
                                <span className="text-sm font-bold text-white">{selectedFirms.length} Selected</span>
                                <div className="h-6 w-px bg-white/10"></div>
                                <button onClick={() => handleSetView('compare')} className="text-sm font-bold text-primary hover:text-white transition-colors uppercase tracking-wider">
                                    Compare Now
                                </button>
                                <button onClick={() => setSelectedFirms([])} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                    <ArrowUpDown className="w-4 h-4 text-text-muted" />
                                </button>
                            </div>
                        )}
                    </div>
                );
        }
    }

    return (
        <Layout currentView={currentView} setView={handleSetView}>
            {renderContent()}
        </Layout>
    );
}
