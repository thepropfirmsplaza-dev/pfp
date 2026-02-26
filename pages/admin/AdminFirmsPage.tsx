import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Loader2,
  Save,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  TrendingDown,
  Layers
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useModal } from '../../context/ModalContext';

interface Challenge {
  id?: string;
  name: string;
  account_size: string;
  price: string;
  profit_target: string;
  daily_drawdown: string;
  max_drawdown: string;
  min_trading_days: string;
  challenge_type?: '1-Step' | '2-Step' | '3-Step' | 'Instant';
}

interface Firm {
  id: string;
  name: string;
  website: string | null;
  affiliate_link: string | null;
  logo_url: string | null;
  favicon: string | null;
  rating: number;
  status: string;
  description?: string;
  founded_year?: string;
  hq_location?: string;
  profit_split?: string;
  platforms?: string[];
  challenges?: { id: string }[];
  // Payout Stats
  avg_payout_time?: string;
  payout_percentage?: number;
  last_30_days_payouts?: string;
  payout_growth?: string;
}

/* ─── Reusable FormField ─── */
const FormField = ({ label, name, icon, textarea, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</label>
    <div className={icon ? 'relative' : ''}>
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{icon}</span>}
      {textarea ? (
        <textarea name={name} rows={3} {...props} className="w-full bg-dark border border-brand-border rounded-lg px-3 py-2.5 text-white text-sm focus:border-primary outline-none transition-colors resize-none" />
      ) : (
        <input name={name} {...props} className={`w-full bg-dark border border-brand-border rounded-lg ${icon ? 'pl-9 pr-3' : 'px-3'} py-2.5 text-white text-sm focus:border-primary outline-none transition-colors`} />
      )}
    </div>
  </div>
);

/* ─── Reusable Toggle ─── */
const ToggleSwitch = ({ name, label, defaultChecked, className }: { name: string; label: string; defaultChecked?: boolean; className?: string }) => (
  <label className={`flex items-center gap-2.5 cursor-pointer select-none group ${className || ''}`}>
    <input type="checkbox" name={name} defaultChecked={defaultChecked} className="w-4 h-4 rounded border-brand-border bg-dark text-primary focus:ring-primary/30 transition-colors" />
    <span className="text-sm text-text-muted group-hover:text-white font-medium transition-colors">{label}</span>
  </label>
);

const AdminFirmsPage: React.FC = () => {
  const { showModal } = useModal();
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'challenges'>('details');
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [saving, setSaving] = useState(false);

  // Fetch Firms
  const fetchFirms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('firms')
        .select('*, challenges(id)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFirms(data || []);
    } catch (error) {
      console.error('Error fetching firms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Challenges for a Firm
  const fetchChallenges = async (firmId: string) => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('firm_id', firmId);

      if (!error && data) {
        setChallenges(data);
      } else {
        setChallenges([]);
      }
    } catch (err) {
      console.error("Error loading challenges", err);
      setChallenges([]);
    }
  };

  useEffect(() => {
    fetchFirms();
  }, []);

  useEffect(() => {
    if (selectedFirm) {
      fetchChallenges(selectedFirm.id);
    } else {
      setChallenges([]);
    }
  }, [selectedFirm]);

  const handleAddNew = () => {
    setSelectedFirm(null);
    setChallenges([]); // Clear challenges for new firm
    setActiveTab('details');
    setIsModalOpen(true);
  };

  const handleEdit = (firm: Firm) => {
    setSelectedFirm(firm);
    setActiveTab('details');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    showModal({
      type: 'confirm',
      title: 'Delete Firm',
      message: 'Are you sure you want to delete this firm? This will also delete all its challenges.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          const { error } = await supabase.from('firms').delete().eq('id', id);
          if (error) throw error;
          setFirms(firms.filter(f => f.id !== id));
          showModal({ type: 'success', title: 'Deleted', message: 'Firm deleted successfully.' });
        } catch (error) {
          console.error('Error deleting firm:', error);
          showModal({ type: 'error', title: 'Error', message: 'Failed to delete firm.' });
        }
      }
    });
  };

  // Handle Challenge Input Changes locally
  const updateChallenge = (index: number, field: keyof Challenge, value: string) => {
    setChallenges(prev => {
      const newChallenges = [...prev];
      newChallenges[index] = { ...newChallenges[index], [field]: value };
      // If updating challenge_type, ensure explicit value is stored
      return newChallenges;
    });
  };

  const addChallengeRow = () => {
    setChallenges([...challenges, {
      name: '2-Step Evaluation',
      challenge_type: '2-Step',
      account_size: '$10,000',
      price: '$99',
      profit_target: '8%',
      daily_drawdown: '5%',
      max_drawdown: '10%',
      min_trading_days: '5'
    }]);
  };

  const removeChallengeRow = (index: number) => {
    const newChallenges = [...challenges];
    newChallenges.splice(index, 1);
    setChallenges(newChallenges);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSave: Starting...");
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const platformsRaw = formData.get('platforms') as string || '';
    const firmData = {
      name: formData.get('name') as string,
      website: formData.get('website') as string,
      affiliate_link: formData.get('affiliate_link') as string,
      logo_url: formData.get('logo_url') as string,
      favicon: formData.get('favicon') as string,
      rating: parseFloat(formData.get('rating') as string) || 0,
      status: formData.get('status') as string,
      description: formData.get('description') as string,
      founded_year: formData.get('founded_year') as string,
      hq_location: formData.get('hq_location') as string,
      profit_split: formData.get('profit_split') as string,
      platforms: platformsRaw ? platformsRaw.split(',').map(p => p.trim()).filter(p => p) : [],
      // Trading Specs
      max_funding: parseInt(formData.get('max_funding') as string) || 0,
      drawdown: formData.get('drawdown') as string || '10%',
      tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t),
      leverage: formData.get('leverage') as string || '1:100',
      news_trading: formData.get('news_trading') === 'on',
      weekend_holding: formData.get('weekend_holding') === 'on',
      scaling_plan: formData.get('scaling_plan') === 'on',
      scaling_plan_details: formData.get('scaling_plan_details') as string || '',
      discount_code: formData.get('discount_code') as string || '',
      // Payout Stats
      avg_payout_time: formData.get('avg_payout_time') as string || '12 Hours',
      payout_percentage: parseInt(formData.get('payout_percentage') as string) || 95,
      last_30_days_payouts: formData.get('last_30_days_payouts') as string || '$4.2M+',
      payout_growth: formData.get('payout_growth') as string || '+12%',
    };

    console.log("handleSave: Prepared firmData", firmData);

    try {
      let firmId = selectedFirm?.id;

      if (selectedFirm) {
        console.log("handleSave: Updating existing firm...", firmId);
        // Update Firm
        const { error } = await supabase
          .from('firms')
          .update(firmData)
          .eq('id', selectedFirm.id);

        console.log("handleSave: Update result error:", error);
        if (error) throw error;

        // Optimistic UI Update
        setFirms(firms.map(f => (f.id === selectedFirm.id ? { ...f, ...firmData } : f)));
      } else {
        console.log("handleSave: Inserting new firm...");
        // Create Firm
        const { data, error } = await supabase
          .from('firms')
          .insert([firmData])
          .select()
          .single();

        console.log("handleSave: Insert result:", { data, error });
        if (error) throw error;

        if (!data) throw new Error("No data returned from insert");

        firmId = data.id;
        console.log("handleSave: New firm ID:", firmId);
        setFirms([data, ...firms]);
      }

      // Handle Challenges Save
      if (firmId && challenges.length > 0) {
        console.log("handleSave: Saving challenges...", challenges.length);
        // 1. Delete existing (simple strategy: delete all for this firm and re-insert to avoid syncing issues)
        // ONLY if editing. If new, we just insert. 
        if (selectedFirm) {
          await supabase.from('challenges').delete().eq('firm_id', firmId);
        }

        // 2. Insert current state
        const challengesToInsert = challenges.map(c => ({
          firm_id: firmId,
          name: c.name,
          challenge_type: c.challenge_type || '2-Step',
          account_size: c.account_size,
          price: c.price,
          profit_target: c.profit_target,
          daily_drawdown: c.daily_drawdown,
          max_drawdown: c.max_drawdown,
          min_trading_days: c.min_trading_days
        }));

        const { error: challengeError } = await supabase.from('challenges').insert(challengesToInsert);
        console.log("handleSave: Challenge insert result:", challengeError);
        if (challengeError) console.error("Error saving challenges:", challengeError);
      }

      console.log("handleSave: Completed successfully, closing modal.");
      setIsModalOpen(false);
      showModal({ type: 'success', title: 'Success', message: 'Firm saved successfully!' });
    } catch (error: any) {
      console.error('Error saving firm:', error);
      showModal({ type: 'error', title: 'Error', message: `Error: ${error.message || 'Unknown error occurred'}` });
    } finally {
      console.log("handleSave: Finally block executed, stopping spinner.");
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Firm Management</h2>
          <p className="text-brand-muted text-sm mt-1">Add, edit, or remove prop firms from the platform.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-primary text-brand-black px-4 py-2.5 rounded-lg font-bold hover:bg-primaryHover transition-colors shadow-lg shadow-brand-gold/20"
        >
          <Plus size={18} />
          Add New Firm
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
          <input
            type="text"
            placeholder="Search firms by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-charcoal border border-brand-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-brand-muted/50"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-brand-muted gap-2">
            <Loader2 className="animate-spin" size={24} />
            Loading firms...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-charcoal border-b border-brand-border">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Firm Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Challenges</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Founded</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-brand-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-white">
                {firms.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())).map((firm) => (
                  <tr key={firm.id} className="hover:bg-brand-surface/50 transition-colors group text-sm">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-brand-charcoal border border-brand-border flex items-center justify-center text-brand-muted overflow-hidden">
                          {firm.logo_url ? <img src={firm.logo_url} alt={firm.name} className="w-full h-full object-contain p-1" /> : <ImageIcon size={20} />}
                        </div>
                        <div>
                          <div className="font-bold text-white">{firm.name}</div>
                          <a href={firm.website || '#'} target="_blank" className="text-xs text-brand-muted hover:text-primary">{new URL(firm.website || 'https://example.com').hostname}</a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${firm.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-brand-border text-brand-muted'}`}>
                        {firm.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-muted font-bold text-white">{firm.challenges?.length || 0}</td>
                    <td className="px-6 py-4 text-brand-muted">{firm.hq_location || '-'}</td>
                    <td className="px-6 py-4 text-brand-muted">{firm.founded_year || '-'}</td>
                    <td className="px-6 py-4 text-primary font-bold">{firm.rating} / 5</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(firm)} className="p-2 hover:bg-brand-charcoal rounded-lg text-brand-muted hover:text-white transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(firm.id)} className="p-2 hover:bg-brand-charcoal rounded-lg text-brand-muted hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── Premium Firm Editor Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md overflow-y-auto" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <div className="w-full max-w-5xl my-6 mx-4 animate-fade-in">
            <form onSubmit={handleSave}>

              {/* ═══ HEADER ═══ */}
              <div className="bg-gradient-to-r from-primary/10 via-dark-card to-dark-card border border-brand-border rounded-t-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Live logo preview */}
                  <div className="h-14 w-14 rounded-xl bg-dark border-2 border-brand-border flex items-center justify-center overflow-hidden flex-shrink-0">
                    {selectedFirm?.logo_url
                      ? <img src={selectedFirm.logo_url} alt="" className="w-full h-full object-contain p-1.5" />
                      : <Plus size={24} className="text-brand-muted" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{selectedFirm ? `Editing — ${selectedFirm.name}` : '✦ Create New Prop Firm'}</h3>
                    <p className="text-sm text-text-muted mt-0.5">Fill out the sections below. All data is published live.</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors">
                  <XCircle size={22} />
                </button>
              </div>

              {/* ═══ TAB BAR ═══ */}
              <div className="flex bg-dark-card border-x border-brand-border">
                {[
                  { id: 'details' as const, label: '1. Firm Details', icon: '📋' },
                  { id: 'challenges' as const, label: '2. Account Types', icon: '⚡' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3.5 text-sm font-bold transition-all relative
                      ${activeTab === tab.id
                        ? 'text-primary bg-primary/5'
                        : 'text-text-muted hover:text-white hover:bg-white/[0.02]'}`}
                  >
                    <span className="mr-1.5">{tab.icon}</span>{tab.label}
                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>

              {/* ═══ BODY ═══ */}
              <div className="bg-dark-card border-x border-brand-border p-6 space-y-8">

                {/* ─── DETAILS TAB ─── */}
                <div className={activeTab === 'details' ? '' : 'hidden'}>

                  {/* SECTION 1 — Identity */}
                  <div className="rounded-xl border border-brand-border bg-dark/50 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-brand-border/20 border-b border-brand-border">
                      <span className="text-primary text-lg">🏢</span>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">Firm Identity</h4>
                    </div>
                    <div className="p-5 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Firm Name *" name="name" required defaultValue={selectedFirm?.name} placeholder="e.g. Apex Trader Funding" />
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</label>
                          <select name="status" defaultValue={selectedFirm?.status || 'draft'} className="w-full bg-dark border border-brand-border rounded-lg px-3 py-2.5 text-white text-sm focus:border-primary outline-none transition-colors">
                            <option value="active">🟢 Active (Visible)</option>
                            <option value="draft">🟡 Draft (Hidden)</option>
                            <option value="inactive">🔴 Inactive</option>
                          </select>
                        </div>
                      </div>
                      <FormField label="Description" name="description" defaultValue={selectedFirm?.description || ''} placeholder="Brief overview of the firm, its focus, and reputation..." textarea />
                    </div>
                  </div>

                  <div className="h-6" />

                  {/* SECTION 2 — Links & Media */}
                  <div className="rounded-xl border border-brand-border bg-dark/50 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-brand-border/20 border-b border-brand-border">
                      <span className="text-primary text-lg">🔗</span>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">Links & Media</h4>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Website URL" name="website" icon={<Globe size={15} />} defaultValue={selectedFirm?.website || ''} placeholder="https://firmname.com" />
                        <FormField label="Affiliate Link" name="affiliate_link" icon={<ExternalLink size={15} />} defaultValue={selectedFirm?.affiliate_link || ''} placeholder="https://...?ref=capital" />
                        <FormField label="Logo URL" name="logo_url" icon={<ImageIcon size={15} />} defaultValue={selectedFirm?.logo_url || ''} placeholder="https://.../logo.png" />
                        <FormField label="Favicon URL" name="favicon" icon={<ImageIcon size={15} />} defaultValue={selectedFirm?.favicon || ''} placeholder="https://.../favicon.ico" />
                      </div>
                    </div>
                  </div>

                  <div className="h-6" />

                  {/* SECTION 3 — Firm Specifics */}
                  <div className="rounded-xl border border-brand-border bg-dark/50 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-brand-border/20 border-b border-brand-border">
                      <span className="text-primary text-lg">📊</span>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">Firm Specifics</h4>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        <FormField label="Founded Year" name="founded_year" icon={<Calendar size={15} />} defaultValue={selectedFirm?.founded_year || ''} placeholder="2023" />
                        <FormField label="HQ Location" name="hq_location" icon={<MapPin size={15} />} defaultValue={selectedFirm?.hq_location || ''} placeholder="Dubai, UAE" />
                        <FormField label="Profit Split" name="profit_split" icon={<DollarSign size={15} />} defaultValue={selectedFirm?.profit_split || ''} placeholder="Up to 90%" />
                        <FormField label="Trust Score" name="rating" type="number" step="0.1" max="5" defaultValue={selectedFirm?.rating || 4.5} />
                      </div>
                      <div className="mt-5">
                        <FormField label="Platforms (comma separated)" name="platforms" icon={<Layers size={15} />} defaultValue={selectedFirm?.platforms?.join(', ') || ''} placeholder="MT4, MT5, cTrader, TradeLocker" />
                      </div>
                    </div>
                  </div>

                  <div className="h-6" />

                  {/* SECTION 4 — Trading Specs */}
                  <div className="rounded-xl border border-brand-border bg-dark/50 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-brand-border/20 border-b border-brand-border">
                      <TrendingDown size={16} className="text-primary" />
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">Trading Specifications</h4>
                    </div>
                    <div className="p-5 space-y-5">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        <FormField label="Max Funding ($)" name="max_funding" type="number" defaultValue={(selectedFirm as any)?.max_funding || 200000} placeholder="200000" />
                        <FormField label="Max Drawdown" name="drawdown" defaultValue={(selectedFirm as any)?.drawdown || '10%'} placeholder="10%" />
                        <FormField label="Leverage" name="leverage" defaultValue={(selectedFirm as any)?.leverage || '1:100'} placeholder="1:100" />
                        <FormField label="Discount Code" name="discount_code" defaultValue={(selectedFirm as any)?.discount_code || ''} placeholder="SAVE20" />
                      </div>
                      <FormField label="Tags (comma separated)" name="tags" defaultValue={(selectedFirm as any)?.tags?.join(', ') || ''} placeholder="FOREX, CRYPTO, INSTANT, BEGINNER_FRIENDLY" />

                      {/* Toggle Row */}
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
                        <ToggleSwitch name="news_trading" label="News Trading" defaultChecked={(selectedFirm as any)?.news_trading} />
                        <ToggleSwitch name="weekend_holding" label="Weekend Holding" defaultChecked={(selectedFirm as any)?.weekend_holding} />
                      </div>

                      {/* Scaling Plan */}
                      <div className="bg-dark-mid/50 border border-brand-border rounded-xl p-4 mt-2">
                        <ToggleSwitch name="scaling_plan" label="Enable Scaling Plan" defaultChecked={selectedFirm?.scaling_plan !== false} className="mb-3" />
                        <input name="scaling_plan_details" defaultValue={selectedFirm?.scaling_plan_details || 'Yes (every 3 months)'} className="w-full bg-dark border border-brand-border rounded-lg px-3 py-2.5 text-white text-sm focus:border-primary outline-none" placeholder="e.g. Scale 25% every 3 months" />
                      </div>
                    </div>
                  </div>

                  <div className="h-6" />

                  {/* SECTION 5 — Payout Stats */}
                  <div className="rounded-xl border border-brand-border bg-dark/50 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-brand-border/20 border-b border-brand-border">
                      <DollarSign size={16} className="text-primary" />
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">Payout Performance</h4>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        <FormField label="Avg Payout Time" name="avg_payout_time" defaultValue={selectedFirm?.avg_payout_time || '12 Hours'} placeholder="12 Hours" />
                        <FormField label="Payout % (24h)" name="payout_percentage" type="number" defaultValue={selectedFirm?.payout_percentage || 95} placeholder="95" />
                        <FormField label="Last 30d Payouts" name="last_30_days_payouts" defaultValue={selectedFirm?.last_30_days_payouts || '$4.2M+'} placeholder="$4.2M+" />
                        <FormField label="Payout Growth" name="payout_growth" defaultValue={selectedFirm?.payout_growth || '+12%'} placeholder="+12%" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── CHALLENGES TAB ─── */}
                <div className={activeTab === 'challenges' ? '' : 'hidden'}>
                  <div className="rounded-xl border border-brand-border bg-dark/50 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 bg-brand-border/20 border-b border-brand-border">
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-lg">⚡</span>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Funded Account Types</h4>
                        {challenges.length > 0 && <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-1">{challenges.length}</span>}
                      </div>
                      <button type="button" onClick={addChallengeRow} className="flex items-center gap-1.5 bg-primary text-dark font-bold text-xs px-3.5 py-2 rounded-lg hover:brightness-110 transition-all shadow-sm shadow-primary/20">
                        <Plus size={14} /> Add Type
                      </button>
                    </div>

                    <div className="p-5">
                      {challenges.length === 0 ? (
                        <div className="text-center py-16 rounded-xl border-2 border-dashed border-brand-border">
                          <Layers size={40} className="mx-auto text-brand-muted/30 mb-3" />
                          <p className="text-text-muted font-medium">No account types yet</p>
                          <p className="text-text-muted/60 text-sm mt-1">Click "Add Type" above to define funding challenges.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {challenges.map((challenge, idx) => (
                            <div key={idx} className="relative bg-dark border border-brand-border rounded-xl p-5 group hover:border-primary/30 transition-colors">
                              {/* Badge */}
                              <span className="absolute -top-2.5 left-4 text-[10px] font-bold bg-primary text-dark px-2 py-0.5 rounded-full">
                                #{idx + 1} {challenge.challenge_type || '2-Step'}
                              </span>
                              {/* Delete */}
                              <button type="button" onClick={() => removeChallengeRow(idx)} className="absolute top-3 right-3 p-1.5 rounded-lg text-brand-muted hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={14} />
                              </button>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Type</label>
                                  <select value={challenge.challenge_type || '2-Step'} onChange={(e) => { updateChallenge(idx, 'challenge_type', e.target.value); if (!challenge.name || challenge.name.includes('Step') || challenge.name === 'New Challenge') { updateChallenge(idx, 'name', e.target.value + ' Evaluation'); } }} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none">
                                    <option value="1-Step">1-Step</option>
                                    <option value="2-Step">2-Step</option>
                                    <option value="3-Step">3-Step</option>
                                    <option value="Instant">Instant</option>
                                  </select>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Display Name</label>
                                  <input value={challenge.name} onChange={(e) => updateChallenge(idx, 'name', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="Stellar 1-Step" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Account Size</label>
                                  <input value={challenge.account_size} onChange={(e) => updateChallenge(idx, 'account_size', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="$10,000" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Price</label>
                                  <input value={challenge.price} onChange={(e) => updateChallenge(idx, 'price', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="$99" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Profit Target</label>
                                  <input value={challenge.profit_target} onChange={(e) => updateChallenge(idx, 'profit_target', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="10%" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Daily Drawdown</label>
                                  <input value={challenge.daily_drawdown} onChange={(e) => updateChallenge(idx, 'daily_drawdown', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="5%" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Max Drawdown</label>
                                  <input value={challenge.max_drawdown} onChange={(e) => updateChallenge(idx, 'max_drawdown', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="10%" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Min Trading Days</label>
                                  <input value={challenge.min_trading_days} onChange={(e) => updateChallenge(idx, 'min_trading_days', e.target.value)} className="w-full bg-dark-mid border border-brand-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none" placeholder="5" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ FOOTER ═══ */}
              <div className="bg-dark-card border border-brand-border border-t-0 rounded-b-2xl px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-[11px] text-text-muted">⚡ Changes go live immediately upon save.</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-brand-border text-text-muted hover:text-white hover:bg-white/5 text-sm font-bold transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-7 py-2.5 rounded-xl bg-primary text-dark font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    {selectedFirm ? 'Update Firm' : 'Publish Firm'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFirmsPage;
