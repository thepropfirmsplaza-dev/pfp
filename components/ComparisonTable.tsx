import React from 'react';
import { Firm } from '../types';
import { X, CheckCircle, TrendingUp, Shield, Zap, Target, Clock, AlertTriangle, Layers, ChevronRight, SlidersHorizontal, Monitor, Calendar, CreditCard, Award } from 'lucide-react';

interface ComparisonTableProps {
  firms: Firm[];
  onRemove: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ firms, onRemove }) => {
  if (firms.length === 0) {
    return (
      <div className="text-center py-32 bg-gradient-to-br from-[#0f1a12] to-black rounded-[2rem] border border-dashed border-secondary/30 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/30 shadow-[0_0_30px_rgba(34,228,175,0.15)] relative z-10">
          <SlidersHorizontal className="w-10 h-10 text-secondary" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Compare Prop Firms</h3>
        <p className="text-gray-400 max-w-md relative z-10">Select up to 4 firms from the directory to meticulously compare their rules, scaling plans, and payouts side-by-side.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4 rounded-3xl border border-secondary/30 bg-[#0f1a12]/80 shadow-[0_20px_50px_-12px_rgba(34,228,175,0.1)] backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-8 min-w-[200px] bg-black/40 backdrop-blur-xl sticky left-0 z-20 border-b border-white/10 border-r border-white/5">
              <div className="flex items-center space-x-2 text-secondary">
                <SlidersHorizontal className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider font-bold">Comparison</span>
              </div>
            </th>
            {firms.map(firm => (
              <th key={firm.id} className="p-8 min-w-[300px] bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/10 border-l border-white/5 relative group">
                {/* Glow behind logo */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-secondary/20 rounded-full blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <button
                  onClick={() => onRemove(firm.id)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center text-center mt-2 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/10 p-2.5 mb-5 shadow-2xl relative overflow-hidden group-hover:border-secondary/40 transition-colors">
                    <img src={firm.logo} className="w-full h-full object-cover rounded-xl" alt={firm.name} />
                  </div>
                  <span className="font-bold text-white text-2xl mb-2">{firm.name}</span>
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="flex items-center space-x-1 text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-bold shadow-[0_0_10px_rgba(34,228,175,0.1)]">
                      <Shield className="w-3 h-3" />
                      <span>{firm.trustScore.toFixed(1)}/5.0</span>
                    </span>
                  </div>
                  <a href={`/firm/${firm.id}`} onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/firm/${firm.id}`); window.dispatchEvent(new PopStateEvent('popstate')); }} className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-bold text-gray-300 hover:text-white hover:bg-secondary/20 hover:border-secondary/40 hover:shadow-[0_0_20px_rgba(34,228,175,0.2)] transition-all flex items-center justify-center space-x-2 group/btn">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 text-secondary group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            { label: 'Evaluation Phase', key: 'evaluationType', icon: Layers },
            { label: 'Profit Split', key: 'profitSplit', icon: TrendingUp, highlight: true },
            { label: 'Starting Price', key: 'price', icon: CreditCard, highlight: true, format: (v: number) => <span className="font-mono text-secondary font-bold text-lg">${v}</span> },
            { label: 'Up to Allocation', key: 'maxAccountSize', icon: Target, format: (v: number) => <span className="font-bold text-gray-200">${v.toLocaleString()}</span> },
            { label: 'Max Drawdown', key: 'maxDrawdown', icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Daily Drawdown', key: 'dailyDrawdown', icon: AlertTriangle, color: 'text-orange-400' },
            { label: 'First Payout', key: 'payoutTime', icon: Clock },
            { label: 'Supported Platforms', key: 'platforms', icon: Monitor, format: (v: string[]) => <div className="flex flex-wrap gap-1.5 justify-center">{v.map(p => <span key={p} className="text-[11px] font-medium border border-white/10 px-2 py-1 rounded-md bg-white/5 text-gray-300">{p}</span>)}</div> },
            { label: 'Trust Score', key: 'trustScore', icon: Award, format: (v: number) => <div className="flex items-center justify-center font-bold text-yellow-400"><CheckCircle className="w-4 h-4 mr-1.5" /> {v}/5.0</div> },
          ].map((row, idx) => (
            <tr key={idx} className={`group hover:bg-white/[0.04] transition-colors ${idx % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}>
              <td className="p-6 md:p-8 font-semibold text-gray-400 sticky left-0 bg-[#0f1a12]/95 backdrop-blur-xl z-10 border-r border-white/5 group-hover:text-white transition-colors">
                <div className="flex items-center space-x-3">
                  {row.icon && <row.icon className={`w-5 h-5 ${row.color || 'text-gray-500'}`} />}
                  <span>{row.label}</span>
                </div>
              </td>
              {firms.map(firm => (
                <td key={firm.id} className={`p-6 md:p-8 text-center border-l border-white/5 ${row.highlight ? 'text-secondary font-bold text-xl drop-shadow-[0_0_10px_rgba(34,228,175,0.3)]' : 'text-gray-200 font-medium'}`}>
                  {/* @ts-ignore */}
                  {row.format ? row.format(firm[row.key]) : firm[row.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
