import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Shield, Clock, TrendingUp, DollarSign,
  CheckCircle2, AlertTriangle, Monitor, BarChart3, Users,
  ExternalLink, Zap, Globe, Award, Target,
  Scale, Timer, Layers, BadgeCheck, Heart, MessageSquare, Loader2
} from 'lucide-react';
import { FirmService } from '../lib/services';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useModal } from '../context/ModalContext';

// Generate favicon URL from firm website
function getFaviconUrl(website: string): string {
  if (!website) return '';
  try {
    const domain = new URL(website).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${website}&sz=128`;
  }
}

// Star Rating Component
const StarRating: React.FC<{ score: number; size?: string }> = ({ score, size = 'w-4 h-4' }) => (
  <div className="flex items-center space-x-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${size} ${star <= Math.floor(score) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ))}
  </div>
);

const FirmDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showModal } = useModal();

  const [firm, setFirm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    const fetchFirmDetails = async () => {
      if (!id) return;
      try {
        const data = await FirmService.getFirmDetails(id);
        setFirm(data);
      } catch (error) {
        console.error('Failed to load firm details', error);
      } finally {
        setLoading(false);
      }
    };

    const checkSavedStatus = async () => {
      if (!user || !id) return;
      try {
        const { data } = await supabase
          .from('saved_firms')
          .select('*')
          .eq('user_id', user.id)
          .eq('firm_id', id)
          .maybeSingle();
        setIsSaved(!!data);
      } catch (e) { /* silently fail if table missing */ }
    };

    const fetchReviews = async () => {
      if (!id) return;
      try {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .eq('firm_id', id)
          .order('created_at', { ascending: false });
        if (data) setReviews(data);
      } catch (e) { /* silently fail if table missing */ }
    };

    fetchFirmDetails();
    checkSavedStatus();
    fetchReviews();
  }, [id, user]);

  const toggleSave = async () => {
    if (!user) {
      showModal({ type: 'info', title: 'Login Required', message: 'Please log in to save firms to your favorites.' });
      return;
    }
    try {
      if (isSaved) {
        await supabase.from('saved_firms').delete().match({ user_id: user.id, firm_id: id });
        setIsSaved(false);
      } else {
        await supabase.from('saved_firms').insert({ user_id: user.id, firm_id: id });
        setIsSaved(true);
      }
    } catch (e) { console.error('Failed to toggle save', e); }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id, firm_id: id,
        rating: newReview.rating, comment: newReview.comment, status: 'pending'
      });
      if (error) throw error;
      showModal({ type: 'success', title: 'Review Submitted', message: 'Your review has been submitted!' });
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      const { data } = await supabase.from('reviews').select('*').eq('firm_id', id).order('created_at', { ascending: false });
      if (data) setReviews(data);
    } catch (err) {
      showModal({ type: 'error', title: 'Review Failed', message: 'Failed to post review.' });
    }
  };

  // --- Derived values from Supabase data ---
  const getLogoSrc = () => {
    if (!firm) return '';
    return getFaviconUrl(firm.website);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Firm Not Found</h2>
        <p className="text-gray-400">The firm you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/firms')} className="btn-primary px-6 py-3 rounded-full text-sm font-bold">Go Back</button>
      </div>
    );
  }

  const logoSrc = getLogoSrc();
  const trustScore = Number(firm.rating) || 4.5;
  const challenges = firm.challenges || [];
  const platforms = firm.platforms || [];
  const tags = firm.tags || [];

  return (
    <div className="relative pt-28 pb-20">
      {/* ─── HERO SECTION ─── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid/30 to-dark pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Firms</span>
          </button>

          {/* Firm Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl shrink-0 bg-[#0f1a12]">
              <img src={logoSrc} alt={firm.name} className="w-full h-full object-contain p-2" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{firm.name}</h1>
                <div className="flex items-center space-x-1 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-semibold text-green-400">Verified</span>
                </div>
              </div>
              <p className="text-gray-400 text-lg font-light mb-3">{firm.description?.substring(0, 100) || `Premium prop trading firm.`}</p>
              <div className="flex items-center space-x-4 flex-wrap gap-y-2">
                <div className="flex items-center space-x-2">
                  <StarRating score={trustScore} />
                  <span className="text-white font-bold text-sm">{trustScore.toFixed(1)}</span>
                  <span className="text-gray-500 text-xs">({reviews.length} reviews)</span>
                </div>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-400">Founded {firm.foundedYear || firm.founded_year || '—'}</span>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-400">{firm.hqLocation || firm.hq_location || '—'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={toggleSave}
                className={`p-3 rounded-xl border transition-all ${isSaved ? 'bg-primary text-white border-primary' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
              >
                <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <a
                href={firm.affiliate_link || firm.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => FirmService.trackClick(firm.id, 'firm_detail')}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 hover:scale-105"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discount Code Banner */}
          {(() => {
            const code = (!firm.discount_code || ['SPOT', 'CAPITAL'].includes(firm.discount_code.toUpperCase())) ? 'PLAZA' : firm.discount_code;
            return (
              <div
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  showModal({ type: 'success', title: 'Code Copied!', message: `Promo code "${code}" copied to clipboard!` });
                }}
                className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 cursor-pointer hover:bg-primary/20 transition-all group"
              >
                <span className="text-primary text-sm font-medium">Promo Code</span>
                <span className="w-px h-4 bg-primary/40"></span>
                <span className="text-white font-bold tracking-wider">{code}</span>
                <span className="text-primary text-xs group-hover:scale-110 transition-transform">📋</span>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10">

        {/* ─── QUICK STATS BAR ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: DollarSign, label: 'Profit Split', value: firm.profitSplit || firm.profit_split || '80%', color: 'text-green-400' },
            { icon: Clock, label: 'Payout Speed', value: firm.avgPayoutTime || firm.avg_payout_time || '24h', color: 'text-blue-400' },
            { icon: Target, label: 'Max Account', value: `$${(Number(firm.max_funding) / 1000)}K`, color: 'text-accent' },
            { icon: TrendingUp, label: 'Leverage', value: firm.leverage || '1:100', color: 'text-yellow-400' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">{stat.label}</div>
              <div className="text-white font-bold text-lg">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* ─── ABOUT ─── */}
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>About {firm.name}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed font-light">
              {firm.description || `${firm.name} is a trusted prop trading firm offering competitive trading conditions and reliable payouts.`}
            </p>
          </div>
        </div>

        {/* ─── ACCOUNT PRICING TABLE ─── */}
        {challenges.length > 0 && (
          <div className="w-full max-w-[1600px] mx-auto my-12">
            <div className="bg-[#0f1a12] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="p-6 md:p-8 bg-gradient-to-r from-white/[0.02] to-transparent border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-secondary animate-pulse" />
                    <span>Account Pricing & Challenges</span>
                  </h2>
                  <p className="text-sm text-gray-500">Compare available account sizes and rules for {firm.name}.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-black/40 text-xs uppercase tracking-wider text-gray-400">
                      <th className="px-8 py-5 font-semibold">Account Size</th>
                      <th className="px-8 py-5 font-semibold">Type</th>
                      <th className="px-8 py-5 font-semibold">Profit Target</th>
                      <th className="px-8 py-5 font-semibold">Daily Drawdown</th>
                      <th className="px-8 py-5 font-semibold">Max Drawdown</th>
                      <th className="px-8 py-5 font-semibold">Profit Split</th>
                      <th className="px-8 py-5 font-semibold text-right">Price</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {challenges.map((c: any, idx: number) => (
                      <tr key={c.id || idx} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <span className="text-white font-bold text-xl">{c.accountSize || c.account_size}</span>
                        </td>
                        <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                          {c.challengeType || c.challenge_type}
                        </td>
                        <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                          {c.profitTarget || c.profit_target || '10%'}
                        </td>
                        <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                          {c.dailyDrawdown || c.daily_drawdown || '5%'}
                        </td>
                        <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                          {c.maxDrawdown || c.max_drawdown || '10%'}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <span className="text-[15px] font-bold text-secondary">{firm.profitSplit || firm.profit_split || '80%'}</span>
                            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden hidden md:flex">
                              <div className="w-[80%] bg-gradient-to-r from-secondary/80 to-secondary h-full rounded-full"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-white font-bold text-xl">{c.price}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <a
                            href={firm.affiliate_link || firm.website || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => FirmService.trackClick(firm.id, 'challenge_buy')}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white text-[15px] font-bold shadow-[0_0_20px_rgba(10,193,201,)] hover:shadow-[0_0_30px_rgba(34,228,175,0.4)] transition-all hover:-translate-y-0.5 border border-white/10 hover:border-secondary/30"
                          >
                            Buy
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TRADING RULES & CONDITIONS ─── */}
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Trading Rules */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:col-span-3">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Scale className="w-5 h-5 text-primary" />
                <span>Trading Rules</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Max Drawdown', value: firm.drawdown || '10%', icon: AlertTriangle, color: 'text-red-400' },
                  { label: 'Profit Split', value: firm.profitSplit || firm.profit_split || '80%', icon: DollarSign, color: 'text-green-400' },
                  { label: 'Leverage', value: firm.leverage || '1:100', icon: Layers, color: 'text-cyan-400' },
                  { label: 'Payout Speed', value: firm.avgPayoutTime || firm.avg_payout_time || '24h', icon: Clock, color: 'text-blue-400' },
                  { label: 'Max Funding', value: `$${(Number(firm.max_funding) / 1000)}K`, icon: Target, color: 'text-accent' },
                  { label: 'Founded', value: firm.foundedYear || firm.founded_year || '—', icon: Timer, color: 'text-yellow-400' },
                ].map((rule, idx) => (
                  <div key={idx} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
                    <div className="flex items-center space-x-2 mb-2">
                      <rule.icon className={`w-3.5 h-3.5 ${rule.color}`} />
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{rule.label}</span>
                    </div>
                    <span className="text-white font-bold">{rule.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Conditions */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:col-span-2">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Trading Conditions</span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Scaling Plan', allowed: firm.scalingPlan ?? firm.scaling_plan ?? true },
                  { label: 'News Trading', allowed: firm.newsTrading ?? firm.news_trading ?? false },
                  { label: 'Weekend Holding', allowed: firm.weekendHolding ?? firm.weekend_holding ?? false },
                ].map((condition, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    {condition.allowed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${condition.allowed ? 'text-white' : 'text-gray-500'}`}>{condition.label}</span>
                  </div>
                ))}
              </div>

              {/* Scaling Plan Details */}
              {(firm.scalingPlan || firm.scaling_plan) && (firm.scalingPlanDetails || firm.scaling_plan_details) && (
                <div className="mt-4 bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider flex items-center gap-1.5 mb-1">
                    <TrendingUp size={14} className="text-primary" /> Scaling Details
                  </span>
                  <p className="text-white text-sm">{firm.scalingPlanDetails || firm.scaling_plan_details}</p>
                </div>
              )}
            </div>
          </div>

          {/* ─── PLATFORMS & TAGS ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-primary" />
                <span>Platforms</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {platforms.length > 0 ? platforms.map((p: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-primary">{p}</span>
                )) : <span className="text-gray-500 text-sm">Not specified</span>}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Tags & Features</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? tags.map((tag: string, idx: number) => {
                  const readable = tag.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
                  return (
                    <span key={idx} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm font-medium text-gray-300">{readable}</span>
                  );
                }) : <span className="text-gray-500 text-sm">No tags</span>}
              </div>
            </div>
          </div>

          {/* ─── PAYOUT PERFORMANCE ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-400">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-medium">Average Payout Time</div>
                  <div className="text-white text-2xl font-bold">{firm.avgPayoutTime || firm.avg_payout_time || '24h'}</div>
                </div>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-secondary rounded-full" style={{ width: `${firm.payout_percentage || 95}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{firm.payout_percentage || 95}% of requests processed on time</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 text-sm font-medium">Last 30 Days Payouts</div>
                  <div className="text-white text-2xl font-bold">{firm.last_30_days_payouts || '$4.2M+'}</div>
                </div>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-bold">{firm.payout_growth || '+12%'} vs last month</span>
              </div>
              <div className="flex gap-2 mt-4 items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-dark bg-white/10 flex items-center justify-center text-xs text-white">
                      <Users size={14} />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 ml-2">Verified trader proofs available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── REVIEWS SECTION ─── */}
      <div className="mt-20 border-t border-white/[0.06] bg-gradient-to-b from-dark-card/50 to-dark pt-16 pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
              <Users className="w-7 h-7 text-primary" />
              <span>Trader Reviews</span>
            </h2>
            <div className="flex items-center space-x-3">
              <StarRating score={trustScore} />
              <span className="text-white font-bold">{trustScore.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">{reviews.length} verified reviews</span>
            </div>
          </div>
          <button
            onClick={() => user ? setShowReviewForm(true) : showModal({ type: 'info', title: 'Login Required', message: 'Please log in to write a review.' })}
            className="btn-primary px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4">Write your review</h4>
              <form onSubmit={submitReview} className="flex flex-col gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`p-1 transition-transform hover:scale-110 ${newReview.rating >= star ? 'text-yellow-400' : 'text-gray-600'}`}>
                        <Star fill={newReview.rating >= star ? 'currentColor' : 'none'} size={24} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Your Experience</label>
                  <textarea value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience..."
                    className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none min-h-[100px]" required />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary px-6 py-2 rounded-lg text-sm font-bold">Submit Review</button>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="px-6 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white border border-white/10">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Review Cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review: any) => (
                <div key={review.id} className="bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-primary/30 transition-colors p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-white text-lg border border-white/[0.08]">
                        {(review.profiles?.full_name || review.user_id || 'T').toString().charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center space-x-2">
                          <span>{review.profiles?.full_name || 'Trader'}</span>
                          <BadgeCheck className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        <div className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <StarRating score={review.rating} size="w-3.5 h-3.5" />
                  </div>
                  <p className="text-gray-400 leading-relaxed font-light text-[15px]">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No reviews yet. Be the first to review {firm.name}!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirmDetailPage;