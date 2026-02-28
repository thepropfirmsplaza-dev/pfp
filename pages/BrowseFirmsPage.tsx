import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List, CheckCircle2, Flame, Star, Zap, ShieldCheck, Mail } from 'lucide-react';
import { FirmCard } from '../components/FirmCard';
import { FirmService } from '../lib/services';
import { Firm } from '../types';

const BrowseFirmsPage: React.FC = () => {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Real Data
  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const data = await FirmService.getActiveFirms();
        setFirms(data);
      } catch (err) {
        console.error('Failed to load firms', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFirms();
  }, []);

  // Filter States
  const [profitSplit, setProfitSplit] = useState(80);
  const [maxDrawdown, setMaxDrawdown] = useState(10);
  const [minRating, setMinRating] = useState(4);
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Dynamic Date Logic
  const { dynamicTitle, todayDate } = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDate();
    const targetDate = currentDay > 21
      ? new Date(now.getFullYear(), now.getMonth() + 1, 1)
      : now;

    const monthName = targetDate.toLocaleString('en-US', { month: 'long' });
    const year = targetDate.getFullYear();

    const formattedToday = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return {
      dynamicTitle: `Top Prop Trading Firms ${monthName} ${year}`,
      todayDate: formattedToday
    };
  }, []);

  const filteredFirms = firms.filter(firm => {
    const tagMatch = firm.tags ? firm.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) : false;
    const matchesSearch = !searchTerm || firm.name.toLowerCase().includes(searchTerm.toLowerCase()) || tagMatch;
    const matchesRating = firm.rating >= minRating;

    const profitSplitStr = firm.profitSplit || '80';
    const profitNumbers = profitSplitStr.match(/\d+/g);
    const maxProfitSplit = profitNumbers ? Math.max(...profitNumbers.map(Number)) : 80;
    const matchesProfitSplit = maxProfitSplit >= profitSplit;

    const drawdownStr = firm.drawdown || '10%';
    const drawdownNum = parseInt(drawdownStr.replace(/[^0-9]/g, '')) || 10;
    const matchesDrawdown = drawdownNum <= maxDrawdown;

    let matchesType = true;
    if (selectedAccountType) {
      const typeMap: Record<string, string> = {
        'One Step': '1-Step',
        'Two Step': '2-Step',
        'Three Step': '3-Step',
        'Instant': 'Instant'
      };
      const targetType = typeMap[selectedAccountType];
      matchesType = firm.challenges ? firm.challenges.some(c => c.challengeType === targetType) : true;
    }

    return matchesSearch && matchesRating && matchesProfitSplit && matchesDrawdown && matchesType;
  });

  return (
    <main className="flex-grow pt-24 pb-20 bg-dark min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-[100%] blur-[120px] pointer-events-none opacity-50"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 mt-10">

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && (
          <>
            {/* Page Heading */}
            <div className="mb-12 border-b border-white/5 pb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Discovery Engine Active</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                    {dynamicTitle.replace(dynamicTitle.split(' ').pop() || '', '')}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{dynamicTitle.split(' ').pop()}</span>
                  </h1>
                  <p className="text-gray-400 text-lg md:text-xl font-light">Compare, review, and discover the world's leading proprietary trading firms designed for professional traders.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Real-time intel updated: <span className="text-white font-medium">{todayDate}</span></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* Sidebar Filters */}
              <aside className="w-full lg:w-80 shrink-0 space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" /> Filters
                  </h3>
                  <button
                    onClick={() => { setSearchTerm(''); setProfitSplit(80); setMaxDrawdown(10); setMinRating(4); setSelectedAccountType(null); }}
                    className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Filter Group: Search */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Search Firms</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-primary transition-colors">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#0f0b1e] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder-gray-600 outline-none transition-all shadow-inner"
                      placeholder="e.g. FTMO, Alpha"
                    />
                  </div>
                </div>

                {/* Filter Group: Account Type (Toggle) */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Evaluation Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['One Step', 'Two Step', 'Three Step', 'Instant'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedAccountType(selectedAccountType === type ? null : type)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedAccountType === type
                          ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(10,193,201,)]'
                          : 'bg-[#0f0b1e] text-gray-400 border-white/10 hover:border-primary/50 hover:text-white'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Group: Profit Split */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Min Profit Split</label>
                    <span className="text-sm text-white bg-white/10 px-2 py-0.5 rounded font-bold">{profitSplit}%</span>
                  </div>
                  <div className="px-1">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={profitSplit}
                      onChange={(e) => setProfitSplit(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-3 text-xs font-medium text-gray-500">
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Filter Group: Max Drawdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Max Drawdown</label>
                    <span className="text-sm text-white bg-white/10 px-2 py-0.5 rounded font-bold">{maxDrawdown}%</span>
                  </div>
                  <div className="px-1">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={maxDrawdown}
                      onChange={(e) => setMaxDrawdown(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-3 text-xs font-medium text-gray-500">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                {/* Filter Group: Rating */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Trust Score</label>
                  <div className="flex flex-col gap-3">
                    {[4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${minRating === rating ? 'bg-primary border-primary' : 'bg-[#0f0b1e] border-white/20 group-hover:border-primary/50'}`}>
                          {minRating === rating && <CheckCircle2 className="w-3.h-3 text-white" />}
                        </div>
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="sr-only"
                        />
                        <div className="flex text-yellow-500">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-4 h-4 ${s <= rating ? 'fill-current' : 'text-gray-700'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">& Up</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter Group: Asset Type */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Tradable Assets</label>
                  <div className="space-y-3">
                    {['Forex', 'Indices', 'Commodities', 'Crypto'].map((asset) => (
                      <label key={asset} className="flex items-center gap-3 group cursor-pointer select-none">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${['Indices', 'Forex'].includes(asset) ? 'bg-primary border-primary' : 'bg-[#0f0b1e] border-white/20 group-hover:border-primary/50'}`}>
                          {['Indices', 'Forex'].includes(asset) && <CheckCircle2 className="w-3.h-3 text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked={['Indices', 'Forex'].includes(asset)}
                          className="sr-only"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{asset}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA Block */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0b1e] to-primary/10 border border-primary/20 text-center space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto text-primary relative z-10 border border-primary/30">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-white font-bold mb-1">Get Exclusive Deals</h4>
                    <p className="text-sm text-gray-400 mb-5">Join 15,000+ traders getting weekly prop firm discounts.</p>
                    <button className="w-full py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 duration-200">Subscribe Free</button>
                  </div>
                </div>
              </aside>

              {/* Grid Content */}
              <div className="flex-1 flex flex-col min-w-0">

                {/* Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#0f0b1e]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-sm text-gray-400">Found <span className="text-primary font-bold text-base px-1">{filteredFirms.length}</span> verified match{filteredFirms.length !== 1 && 'es'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest hidden sm:block">Sort</span>
                      <select className="bg-dark border border-white/10 text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-2.5 cursor-pointer outline-none shadow-inner">
                        <option>Highest Trust Score</option>
                        <option>Lowest Price</option>
                        <option>Highest Max Funding</option>
                        <option>Fastest Payouts</option>
                      </select>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                    <div className="flex bg-dark border border-white/10 rounded-xl p-1 shadow-inner">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                      >
                        <LayoutGrid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Empty State */}
                {filteredFirms.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-16 text-center border border-white/5 rounded-3xl bg-[#0f0b1e]/50 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No perfect match found</h3>
                    <p className="text-gray-400 max-w-md">Try adjusting your filters (profit split or drawdown requirements) to discover more proprietary trading firms.</p>
                    <button
                      onClick={() => { setSearchTerm(''); setProfitSplit(80); setMaxDrawdown(10); setMinRating(4); setSelectedAccountType(null); }}
                      className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}

                {/* Grid */}
                {filteredFirms.length > 0 && (
                  <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}`}>
                    {filteredFirms.map((firm) => (
                      <FirmCard
                        key={firm.id}
                        firm={firm}
                      />
                    ))}
                  </div>
                )}

                {/* Load More */}
                {filteredFirms.length > 0 && (
                  <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-[#0f0b1e] hover:bg-white/5 border border-white/10 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl group">
                      <span className="flex items-center gap-2">
                        Load More Matches
                        <Zap className="w-4 h-4 text-primary group-hover:fill-primary transition-all" />
                      </span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default BrowseFirmsPage;