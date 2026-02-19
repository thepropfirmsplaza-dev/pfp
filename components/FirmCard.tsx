import React from 'react';
import { Firm } from '../types';
import { Star, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FirmCardProps {
  firm: Firm;
  onCompare: (firm: Firm) => void;
  isSelectedForCompare: boolean;
}

export const FirmCard: React.FC<FirmCardProps> = ({ firm, onCompare, isSelectedForCompare }) => {
  return (
    <div className="glass-card rounded-2xl p-0 relative flex flex-col h-full group overflow-hidden border-white/5 hover:border-primary/40">
        
        {/* Top Section */}
        <div className="p-6 relative z-10">
            <div className="flex justify-between items-start mb-6">
                 <div className="relative">
                     <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <img src={firm.logo} alt={firm.name} className="w-14 h-14 rounded-xl bg-dark-mid border border-white/10 relative z-10 object-cover" />
                 </div>
                 <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-1 bg-white/5 border border-white/5 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span className="text-xs font-bold text-white">{firm.trustScore}</span>
                      </div>
                      <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Trust Score</span>
                 </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{firm.name}</h3>
                <div className="flex items-center space-x-3 text-xs">
                     <span className="flex items-center text-text-muted">
                        <ShieldCheck className="w-3 h-3 mr-1 text-secondary" /> {firm.evaluationType}
                     </span>
                     <span className="w-1 h-1 rounded-full bg-white/20"></span>
                     <span className="text-text-muted">{firm.payoutTime} Payout</span>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Profit Split</div>
                    <div className="text-lg font-bold text-white">{firm.profitSplit}</div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Max Funds</div>
                    <div className="text-lg font-bold text-white tracking-tight">${(firm.maxAccountSize / 1000)}k</div>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6 min-h-[60px]">
                {firm.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start text-xs text-text-light/80">
                        <Check className="w-3.5 h-3.5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-auto p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-xs text-text-muted">From</span>
                <span className="text-lg font-bold text-white">${firm.price}</span>
            </div>
            
            <div className="flex items-center space-x-3">
                 <button 
                    onClick={() => onCompare(firm)}
                    className={`p-2.5 rounded-xl border transition-all ${
                        isSelectedForCompare 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-transparent text-text-muted border-white/10 hover:text-white hover:border-white/30'
                    }`}
                    title="Compare"
                 >
                    <Zap className="w-4 h-4" fill={isSelectedForCompare ? "currentColor" : "none"} />
                 </button>
                 <button className="btn-primary px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg flex items-center">
                    Visit <ArrowRight className="w-4 h-4 ml-1" />
                 </button>
            </div>
        </div>
    </div>
  );
};
