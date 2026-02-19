import React from 'react';
import { Firm } from '../types';
import { X, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface ComparisonTableProps {
  firms: Firm[];
  onRemove: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ firms, onRemove }) => {
  if (firms.length === 0) {
    return (
      <div className="text-center py-24 bg-dark-mid/30 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Firms Selected</h3>
        <p className="text-text-muted max-w-sm">Browse the directory and select up to 4 firms to compare their features side-by-side.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4 rounded-3xl border border-white/5 bg-dark-mid/20 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-6 min-w-[200px] bg-dark-mid/90 backdrop-blur-md sticky left-0 z-20 border-b border-white/10 border-r border-white/5">
              <span className="text-sm uppercase tracking-wider text-text-muted font-semibold">Comparison</span>
            </th>
            {firms.map(firm => (
              <th key={firm.id} className="p-6 min-w-[280px] bg-dark-mid/40 border-b border-white/10 border-l border-white/5 relative">
                <button 
                  onClick={() => onRemove(firm.id)}
                  className="absolute top-4 right-4 text-text-muted hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-16 h-16 rounded-2xl bg-dark border border-white/10 p-2 mb-4 shadow-lg">
                        <img src={firm.logo} className="w-full h-full object-cover rounded-xl" alt={firm.name} />
                    </div>
                    <span className="font-bold text-white text-xl mb-1">{firm.name}</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {firm.healthScore} Health
                        </span>
                    </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
            {[
                { label: 'Evaluation Type', key: 'evaluationType' },
                { label: 'Profit Split', key: 'profitSplit', highlight: true },
                { label: 'Max Allocation', key: 'maxAccountSize', format: (v: number) => <span className="font-mono text-lg">${v.toLocaleString()}</span> },
                { label: 'Min Price', key: 'price', format: (v: number) => <span className="font-mono text-secondary font-bold">${v}</span> },
                { label: 'Drawdown (Max)', key: 'maxDrawdown' },
                { label: 'Drawdown (Daily)', key: 'dailyDrawdown' },
                { label: 'Platforms', key: 'platforms', format: (v: string[]) => <div className="flex flex-wrap gap-2 justify-center">{v.map(p => <span key={p} className="text-xs border border-white/10 px-2 py-1 rounded bg-white/5">{p}</span>)}</div> },
                { label: 'Payout Time', key: 'payoutTime' },
                { label: 'Trust Score', key: 'trustScore', format: (v: number) => <div className="flex items-center justify-center text-accent font-bold"><CheckCircle className="w-4 h-4 mr-2"/> {v}/5.0</div> },
            ].map((row, idx) => (
                 <tr key={idx} className={`group hover:bg-white/[0.02] transition-colors`}>
                    <td className="p-6 font-medium text-text-muted sticky left-0 bg-dark-mid/95 backdrop-blur-md z-10 border-r border-white/5 group-hover:text-white transition-colors">
                        {row.label}
                    </td>
                    {firms.map(firm => (
                        <td key={firm.id} className={`p-6 text-center border-l border-white/5 ${row.highlight ? 'text-primary font-bold text-lg' : 'text-white'}`}>
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
