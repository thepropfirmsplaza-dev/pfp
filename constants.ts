import { Firm } from './types';
import { BadgeDollarSign, Zap, ShieldCheck, TrendingUp, Trophy, Globe, GraduationCap } from 'lucide-react';

// Import Firm Logos
import logoFtmo from './assets/hero-logos/firm-ftmo.png';
import logo5ers from './assets/hero-logos/firm-5ers.png';
import logoFundedNext from './assets/hero-logos/firm-fundednext.png';
import logoAlpha from './assets/hero-logos/firm-alpha.png';
import logoFundingPips from './assets/hero-logos/firm-fundingpips.png';
import logoE8 from './assets/hero-logos/firm-e8markets.png';

export const MOCK_FIRMS: Firm[] = [
  {
    id: 'ftmo',
    name: 'FTMO',
    logo: logoFtmo,
    healthScore: 99,
    minAccountSize: 10000,
    maxAccountSize: 200000,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    trustScore: 4.9,
    price: 155,
    features: ['Bi-weekly Payouts', 'No Time Limit', 'Scaling Plan'],
    description: 'Industry leader with the highest payout reliability score and longest track record.',
    payoutTime: '24h',
    platforms: ['MT5', 'DXtrade', 'cTrader'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%'
  },
  {
    id: 'funding-pips',
    name: 'Funding Pips',
    logo: logoFundingPips,
    healthScore: 95,
    minAccountSize: 5000,
    maxAccountSize: 300000,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    trustScore: 4.7,
    price: 59,
    features: ['Low Cost', 'Fast Payouts', 'MT5'],
    description: 'Extremely popular for tight spreads and some of the lowest entry barriers in the industry.',
    payoutTime: '48h',
    platforms: ['MT5', 'MatchTrader'],
    instruments: ['Forex', 'Crypto', 'Metals'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%'
  },
  {
    id: 'e8-markets',
    name: 'E8 Markets',
    logo: logoE8,
    healthScore: 92,
    minAccountSize: 25000,
    maxAccountSize: 400000,
    profitSplit: '80%',
    evaluationType: '1-Step',
    trustScore: 4.5,
    price: 98,
    features: ['News Trading', 'Weekend Holding', 'Crypto'],
    description: 'A modern prop firm known for its custom built tracking dashboard and 1-step challenges.',
    payoutTime: '48h',
    platforms: ['MT4', 'MT5'],
    instruments: ['Forex', 'Crypto', 'Indices'],
    maxDrawdown: '8%',
    dailyDrawdown: '4%'
  },
  {
    id: 'the-5ers',
    name: 'The 5%ers',
    logo: logo5ers,
    healthScore: 96,
    minAccountSize: 5000,
    maxAccountSize: 250000,
    profitSplit: '80% - 100%',
    evaluationType: 'Instant',
    trustScore: 4.6,
    price: 39,
    features: ['Instant Funding', 'Low Entry', 'Scaling'],
    description: 'Unique instant funding models allowing traders to earn from day one without evaluations.',
    payoutTime: 'Weekly',
    platforms: ['MT5'],
    instruments: ['Forex', 'Metals', 'Indices'],
    maxDrawdown: '6%',
    dailyDrawdown: '3%'
  },
  {
    id: 'fundednext',
    name: 'FundedNext',
    logo: logoFundedNext,
    healthScore: 94,
    minAccountSize: 6000,
    maxAccountSize: 200000,
    profitSplit: '80% - 95%',
    evaluationType: '2-Step',
    trustScore: 4.4,
    price: 32,
    features: ['Lowest Entry', 'Profit Sharing', 'Express Model'],
    description: 'The only firm that pays you a 15% profit share from the profits you make during the challenge phases.',
    payoutTime: '72h',
    platforms: ['MT4', 'MT5', 'cTrader'],
    instruments: ['Forex', 'Commodities', 'Indices'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%'
  },
  {
    id: 'alpha-capital',
    name: 'Alpha Capital',
    logo: logoAlpha,
    healthScore: 97,
    minAccountSize: 10000,
    maxAccountSize: 200000,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    trustScore: 4.8,
    price: 49,
    features: ['Fast Payouts', 'cTrader', 'No Time Limit'],
    description: 'Excellent community and intuitive ruleset making it a fast-growing favorite amongst traders.',
    payoutTime: '24h',
    platforms: ['cTrader', 'MT5'],
    instruments: ['Forex', 'Indices', 'Commodities'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%'
  }
];

export const NAV_ITEMS = [
  { id: 'discovery', label: 'Firms', icon: Globe, path: '/firms' },
  { id: 'compare', label: 'Compare', icon: TrendingUp, path: '/compare' },
  { id: 'competitions', label: 'Competitions', icon: Trophy, path: '/competitions' },
  { id: 'quiz', label: 'Match AI', icon: Zap, path: '/quiz' },
  { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck, path: '/dashboard' },
];

export const FEATURE_CARDS = [
  {
    title: 'AI Matching',
    desc: 'Find your perfect firm in under 90 seconds with our proprietary AI algorithm.',
    icon: Zap
  },
  {
    title: 'Verified Reviews',
    desc: 'Trust scores based on verified payout proofs and community feedback.',
    icon: ShieldCheck
  },
  {
    title: 'Real-time Data',
    desc: 'Live spreads, payout times, and rule changes updated daily.',
    icon: TrendingUp
  },
  {
    title: 'Trader Education',
    desc: 'Master the challenge with our specific prep courses and tools.',
    icon: GraduationCap
  }
];
