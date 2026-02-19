import { Firm } from './types';
import { BadgeDollarSign, Zap, ShieldCheck, TrendingUp, Trophy, Globe, GraduationCap } from 'lucide-react';

export const MOCK_FIRMS: Firm[] = [
  {
    id: '1',
    name: 'Alpha Capital',
    logo: 'https://picsum.photos/64/64?random=1',
    healthScore: 98,
    minAccountSize: 5000,
    maxAccountSize: 200000,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    trustScore: 4.9,
    price: 49,
    features: ['Bi-weekly Payouts', 'No Time Limit', 'Scaling Plan'],
    description: 'Industry leader with the highest payout reliability score.',
    payoutTime: '24h',
    platforms: ['MT5', 'cTrader'],
    instruments: ['Forex', 'Indices', 'Commodities'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%'
  },
  {
    id: '2',
    name: 'TradeFunding',
    logo: 'https://picsum.photos/64/64?random=2',
    healthScore: 92,
    minAccountSize: 10000,
    maxAccountSize: 100000,
    profitSplit: '80%',
    evaluationType: '1-Step',
    trustScore: 4.5,
    price: 99,
    features: ['News Trading Allowed', 'Weekend Holding'],
    description: 'Perfect for aggressive traders who want fast funding.',
    payoutTime: '48h',
    platforms: ['MT4', 'MT5'],
    instruments: ['Forex', 'Crypto'],
    maxDrawdown: '6%',
    dailyDrawdown: '4%'
  },
  {
    id: '3',
    name: 'Apex Prop',
    logo: 'https://picsum.photos/64/64?random=3',
    healthScore: 88,
    minAccountSize: 25000,
    maxAccountSize: 300000,
    profitSplit: '90%',
    evaluationType: '1-Step',
    trustScore: 4.2,
    price: 147,
    features: ['High Frequency Trading', 'Lowest Spreads'],
    description: 'Built for algorithmic traders and scalpers.',
    payoutTime: 'Monthly',
    platforms: ['Rithmic', 'Tradovate'],
    instruments: ['Futures'],
    maxDrawdown: 'Trailing 4%',
    dailyDrawdown: 'None'
  },
  {
    id: '4',
    name: 'BlueSky Traders',
    logo: 'https://picsum.photos/64/64?random=4',
    healthScore: 95,
    minAccountSize: 5000,
    maxAccountSize: 100000,
    profitSplit: '75%',
    evaluationType: 'Instant',
    trustScore: 4.7,
    price: 250,
    features: ['Instant Funding', 'No Evaluation', 'Weekly Payouts'],
    description: 'Skip the challenge and start earning immediately.',
    payoutTime: 'Weekly',
    platforms: ['MT5'],
    instruments: ['Forex', 'Indices'],
    maxDrawdown: '5%',
    dailyDrawdown: '3%'
  },
  {
    id: '5',
    name: 'NextGen Prop',
    logo: 'https://picsum.photos/64/64?random=5',
    healthScore: 85,
    minAccountSize: 10000,
    maxAccountSize: 200000,
    profitSplit: '85%',
    evaluationType: '2-Step',
    trustScore: 4.0,
    price: 89,
    features: ['Crypto Payouts', 'High Leverage'],
    description: 'A solid choice for crypto-native traders.',
    payoutTime: '7 Days',
    platforms: ['MT4', 'cTrader'],
    instruments: ['Forex', 'Crypto', 'Stocks'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%'
  }
];

export const NAV_ITEMS = [
  { id: 'discovery', label: 'Discover', icon: Globe },
  { id: 'compare', label: 'Compare', icon: TrendingUp },
  { id: 'quiz', label: 'Match AI', icon: Zap },
  { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
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
