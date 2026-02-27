import React, { useState, useEffect } from 'react';
import { Share, Star, Plus, X, ChevronDown, Trophy, Shield, Calendar, DollarSign } from 'lucide-react';
import { FirmService } from '../lib/services';
import { Firm } from '../types';
import PlatformLogo from '../components/PlatformLogo';
import { useComparison } from '../context/ComparisonContext';

const ComparePage: React.FC = () => {
  const { selectedFirms, removeFirm, toggleFirm } = useComparison();
  const [allFirms, setAllFirms] = useState<Firm[]>([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [openEditDropdownIndex, setOpenEditDropdownIndex] = useState<number | null>(null);

  // Array of 3 slots, filled with selected firms
  const slots = [0, 1, 2].map(i => selectedFirms[i] || null);

  useEffect(() => {
    // We still fetch all firms to populate the dropdowns/add buttons
    const fetchFirms = async () => {
      const data = await FirmService.getActiveFirms();
      setAllFirms(data || []);
    };
    fetchFirms();
  }, []);

  const handleSelectFirm = (firmId: string) => {
    const firm = allFirms.find(f => f.id === firmId);
    if (firm) toggleFirm(firm);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-black text-white font-sans">
      <main className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-20">
        <div className="w-full max-w-[1200px] flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 text-sm">
            <a className="text-brand-muted hover:text-white transition-colors" href="/#/">Home</a>
            <span className="text-brand-muted">/</span>
            <span className="text-brand-gold font-medium">Compare</span>
          </nav>

          {/* Heading */}
          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end pb-4 border-b border-brand-border">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Compare Firms</h1>
              <p className="text-brand-muted text-base max-w-2xl">Select up to 3 prop firms to analyze trading conditions, fees, and rules side-by-side.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-border hover:bg-brand-charcoal text-white text-sm font-medium transition-colors">
                <Share size={18} />
                Share
              </button>
            </div>
          </div>

          {/* Comparison Container */}
          <div className="w-full overflow-hidden rounded-xl border border-brand-border bg-brand-charcoal shadow-2xl">
            {/* Selection Header (Grid) */}
            <div className="grid grid-cols-[160px_1fr_1fr_1fr] md:grid-cols-[200px_1fr_1fr_1fr] bg-brand-black border-b border-brand-border sticky top-0 z-10">
              {/* Corner */}
              <div className="p-4 flex items-end border-r border-brand-border pb-6">
                <span className="text-brand-muted text-xs font-bold uppercase tracking-wider">Parameters</span>
              </div>

              {/* Firm Selectors */}
              {[0, 1, 2].map((index) => {
                const selectedFirm = slots[index];
                return (
                  <div key={index} className="p-4 border-r border-brand-border relative group last:border-r-0 min-w-[150px]">
                    {selectedFirm ? (
                      <div className="flex flex-col h-full justify-between gap-4">
                        <div className="flex items-start justify-between">
                          <div className="shrink-0">
                            <PlatformLogo src={selectedFirm.logo} alt={selectedFirm.name} size="md" className="rounded-xl" />
                          </div>
                          <button onClick={() => removeFirm(selectedFirm.id)} className="text-brand-muted hover:text-red-400 transition-colors">
                            <X size={20} />
                          </button>
                        </div>

                        <div>
                          <h3 className="font-bold text-white leading-none truncate mb-1">{selectedFirm.name}</h3>
                          <div className="flex items-center gap-1 mb-3">
                            <Star size={12} className="text-brand-gold fill-brand-gold" />
                            <span className="text-xs text-brand-muted font-bold">{selectedFirm.rating}</span>
                            <span className="text-[10px] text-brand-muted">({selectedFirm.reviewCount || 0} reviews)</span>
                          </div>

                          <div className="relative">
                            <button
                              className="w-full bg-brand-charcoal border border-brand-border rounded-lg text-xs md:text-sm text-white px-3 py-2 flex justify-between items-center appearance-none cursor-pointer outline-none transition-all hover:border-brand-gold/50"
                              onClick={() => setOpenEditDropdownIndex(openEditDropdownIndex === index ? null : index)}
                            >
                              <span className="truncate">{selectedFirm.name}</span>
                              <ChevronDown className="text-brand-muted shrink-0" size={14} />
                            </button>

                            {openEditDropdownIndex === index && (
                              <>
                                <div className="fixed inset-0 z-20" onClick={() => setOpenEditDropdownIndex(null)}></div>
                                <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-brand-charcoal border border-brand-border rounded-xl p-2 shadow-2xl max-h-[200px] overflow-y-auto custom-scrollbar">
                                  {allFirms.map(f => (
                                    <button
                                      key={f.id}
                                      onClick={() => {
                                        handleSelectFirm(f.id);
                                        setOpenEditDropdownIndex(null);
                                      }}
                                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedFirm.id === f.id ? 'bg-brand-gold text-brand-black font-bold' : 'text-brand-muted hover:bg-brand-black hover:text-white'}`}
                                    >
                                      {f.name}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center min-h-[140px]">
                        <div className="relative h-full flex flex-col items-center w-full">
                          {openDropdownIndex === index ? (
                            <div className="absolute inset-x-0 -top-2 z-20 bg-brand-charcoal border border-brand-border rounded-xl p-2 flex flex-col shadow-2xl max-h-[250px] min-h-[150px]">
                              <div className="flex justify-between items-center mb-2 px-2">
                                <h4 className="text-xs font-bold text-brand-muted uppercase">Select Firm</h4>
                                <button onClick={() => setOpenDropdownIndex(null)} className="text-brand-muted hover:text-red-400">
                                  <X size={14} />
                                </button>
                              </div>
                              <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                {allFirms.filter(f => !selectedFirms.some(sf => sf?.id === f.id)).length > 0 ? (
                                  allFirms.filter(f => !selectedFirms.some(sf => sf?.id === f.id)).map(f => (
                                    <button
                                      key={f.id}
                                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-brand-gold hover:text-brand-black transition-colors"
                                      onClick={() => {
                                        handleSelectFirm(f.id);
                                        setOpenDropdownIndex(null);
                                      }}
                                    >
                                      {f.name}
                                    </button>
                                  ))
                                ) : (
                                  <div className="text-xs text-brand-muted text-center py-4">No more firms available</div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="border-2 border-dashed border-brand-border hover:border-brand-gold/50 hover:bg-brand-charcoal/50 rounded-xl h-full w-full flex flex-col items-center justify-center gap-3 transition-all group-hover:border-brand-gold/30 cursor-pointer absolute inset-0"
                              onClick={() => setOpenDropdownIndex(index)}
                            >
                              <div className="size-10 rounded-full bg-brand-black border border-brand-border text-brand-muted flex items-center justify-center group-hover:text-white transition-colors">
                                <Plus size={24} />
                              </div>
                              <span className="text-sm font-bold text-brand-muted group-hover:text-white transition-colors">Add Firm</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Comparison Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] table-fixed">
                <colgroup>
                  <col className="w-[160px] md:w-[200px]" />
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                </colgroup>

                {/* SECTION: KEY METRICS */}
                <tbody>
                  <tr className="bg-brand-charcoal border-b border-brand-border">
                    <td className="px-5 py-2 text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-wider bg-black/20" colSpan={4}>
                      Key Metrics
                    </td>
                  </tr>

                  {/* Profit Split */}
                  <tr className="border-b border-brand-border hover:bg-brand-black/20 transition-colors">
                    <td className="px-5 py-4 text-sm text-brand-muted font-medium border-r border-brand-border flex items-center gap-2 h-full">
                      <Trophy size={16} className="text-brand-gold" /> Profit Split
                    </td>
                    {[0, 1, 2].map(i => (
                      <td key={i} className="px-4 py-4 text-sm border-r last:border-r-0 border-brand-border text-center">
                        {slots[i] ? (
                          <span className="font-bold text-white text-lg">{slots[i]?.profitSplit || '80%'}</span>
                        ) : <span className="text-brand-muted/30">--</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Trust Score */}
                  <tr className="border-b border-brand-border hover:bg-brand-black/20 transition-colors">
                    <td className="px-5 py-4 text-sm text-brand-muted font-medium border-r border-brand-border flex items-center gap-2 h-full">
                      <Shield size={16} className={"text-green-500"} /> Trust Score
                    </td>
                    {[0, 1, 2].map(i => (
                      <td key={i} className="px-4 py-4 text-sm border-r last:border-r-0 border-brand-border text-center">
                        {slots[i] ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-2 w-16 bg-brand-black rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: `${((slots[i]?.trustScore || 0) / 5) * 100}%` }}></div>
                            </div>
                            <span className="font-bold text-white">{slots[i]?.trustScore || 0}/5</span>
                          </div>
                        ) : <span className="text-brand-muted/30">--</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Max Funding */}
                  <tr className="border-b border-brand-border hover:bg-brand-black/20 transition-colors">
                    <td className="px-5 py-4 text-sm text-brand-muted font-medium border-r border-brand-border flex items-center gap-2 h-full">
                      <DollarSign size={16} className="text-blue-400" /> Max Funding
                    </td>
                    {[0, 1, 2].map(i => (
                      <td key={i} className="px-4 py-4 text-sm border-r last:border-r-0 border-brand-border text-center">
                        {slots[i] ? (
                          <span className="font-medium text-white text-base">${(slots[i]?.maxFunding || 0).toLocaleString()}</span>
                        ) : <span className="text-brand-muted/30">--</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Drawdown */}
                  <tr className="border-b border-brand-border hover:bg-brand-black/20 transition-colors">
                    <td className="px-5 py-4 text-sm text-brand-muted font-medium border-r border-brand-border flex items-center gap-2 h-full">
                      <div className="size-4 rounded bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-[10px]">D</div> Drawdown Limit
                    </td>
                    {[0, 1, 2].map(i => (
                      <td key={i} className="px-4 py-4 text-sm border-r last:border-r-0 border-brand-border text-center">
                        {slots[i] ? (
                          <span className="font-medium text-white">{slots[i]?.drawdown || '10%'}</span>
                        ) : <span className="text-brand-muted/30">--</span>}
                      </td>
                    ))}
                  </tr>
                </tbody>

                {/* SECTION: COMPANY INFO */}
                <tbody>
                  <tr className="bg-brand-charcoal border-b border-brand-border">
                    <td className="px-5 py-2 text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-wider bg-black/20" colSpan={4}>
                      Company Info
                    </td>
                  </tr>

                  <tr className="border-b border-brand-border hover:bg-brand-black/20 transition-colors">
                    <td className="px-5 py-4 text-sm text-brand-muted font-medium border-r border-brand-border flex items-center gap-2 h-full">
                      <Calendar size={16} /> Founded Year
                    </td>
                    {[0, 1, 2].map(i => (
                      <td key={i} className="px-4 py-4 text-sm border-r last:border-r-0 border-brand-border text-center">
                        {slots[i] ? (
                          <span className="text-white">{slots[i]?.foundedYear || slots[i]?.founded}</span>
                        ) : <span className="text-brand-muted/30">--</span>}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-brand-border hover:bg-brand-black/20 transition-colors">
                    <td className="px-5 py-4 text-sm text-brand-muted font-medium border-r border-brand-border flex items-center gap-2 h-full">
                      HQ Location
                    </td>
                    {[0, 1, 2].map(i => (
                      <td key={i} className="px-4 py-4 text-sm border-r last:border-r-0 border-brand-border text-center">
                        {slots[i] ? (
                          <span className="text-white">{slots[i]?.hqLocation || 'Unknown'}</span>
                        ) : <span className="text-brand-muted/30">--</span>}
                      </td>
                    ))}
                  </tr>
                </tbody>

                {/* Footer / CTAs */}
                <tfoot>
                  <tr>
                    <td className="p-4 border-r border-brand-border bg-brand-charcoal"></td>
                    {[0, 1, 2].map(i => {
                      const firm = slots[i];
                      return (
                        <td key={i} className="p-6 border-r last:border-r-0 border-brand-border bg-brand-charcoal">
                          {firm ? (
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  FirmService.trackClick(firm.id, 'comparison_table');
                                  window.open(firm.website, '_blank');
                                }}
                                className="w-full max-w-[180px] bg-brand-gold hover:bg-brand-goldHover text-brand-black text-center py-2.5 rounded-lg font-bold text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(246,174,19,0.15)]"
                              >
                                Visit Site
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center"><span className="text-brand-muted text-sm">--</span></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div >
      </main >
    </div >
  );
};

export default ComparePage;