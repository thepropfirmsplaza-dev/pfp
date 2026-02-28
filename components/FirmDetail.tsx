import React from 'react';
import {
  ArrowLeft, Star, Shield, Clock, TrendingUp, DollarSign,
  CheckCircle2, AlertTriangle, Monitor, BarChart3, Users,
  ExternalLink, ChevronRight, Zap, Globe, Award, Target,
  Scale, Timer, Layers, BadgeCheck
} from 'lucide-react';

// Import firm logos
import logoFtmo from '../assets/hero-logos/firm-ftmo.png';
import logo5ers from '../assets/hero-logos/firm-5ers.png';
import logoFundedNext from '../assets/hero-logos/firm-fundednext.png';
import logoAlpha from '../assets/hero-logos/firm-alpha.png';
import logoFundingPips from '../assets/hero-logos/firm-fundingpips.png';
import logoE8 from '../assets/hero-logos/firm-e8markets.png';
import logoThink from '../assets/hero-logos/firm-thinkcapital.png';
import logoTopOne from '../assets/hero-logos/firm-topone.png';
import logoBerry from '../assets/hero-logos/firm-berry.png';
import logoGft from '../assets/hero-logos/firm-gft.png';

// Extended firm data for detail pages
interface FirmDetailData {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  tagline: string;
  description: string;
  website: string;
  founded: string;
  headquarters: string;
  trustScore: number;
  totalReviews: number;
  profitSplit: string;
  evaluationType: string;
  payoutTime: string;
  payoutMethod: string[];
  minAccountSize: string;
  maxAccountSize: string;
  startingPrice: string;
  platforms: string[];
  instruments: string[];
  maxDrawdown: string;
  dailyDrawdown: string;
  profitTarget: string;
  minTradingDays: string;
  maxTradingPeriod: string;
  leverage: string;
  scalingPlan: boolean;
  newsTrading: boolean;
  weekendHolding: boolean;
  eaAllowed: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  accountSizes: { size: string; price: string }[];
  reviews: { user: string; rating: number; text: string; date: string }[];
}

const FIRM_DETAILS: Record<string, FirmDetailData> = {
  'ftmo': {
    id: 'ftmo',
    name: 'FTMO',
    logo: logoFtmo,
    bgColor: '#121212',
    tagline: 'The industry standard in proprietary trading.',
    description: 'FTMO is one of the most established and trusted prop trading firms in the world. Known for their rigorous evaluation process and reliable payouts, they have funded thousands of traders globally since 2015. Their 2-step evaluation ensures only serious traders get funded.',
    website: 'https://ftmo.com',
    founded: '2015',
    headquarters: 'Prague, Czech Republic',
    trustScore: 4.9,
    totalReviews: 12450,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    payoutTime: '24-48 hours',
    payoutMethod: ['Bank Transfer', 'Skrill', 'Crypto'],
    minAccountSize: '$10,000',
    maxAccountSize: '$200,000',
    startingPrice: '$155',
    platforms: ['MT4', 'MT5', 'cTrader', 'DXtrade'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%',
    profitTarget: '10% / 5%',
    minTradingDays: '4 days',
    maxTradingPeriod: 'Unlimited',
    leverage: '1:100',
    scalingPlan: true,
    newsTrading: true,
    weekendHolding: true,
    eaAllowed: true,
    features: ['Bi-weekly Payouts', 'No Time Limit', 'Scaling Plan', 'Free Retake', 'Performance Coach'],
    pros: ['Industry-leading reputation', 'Reliable and fast payouts', 'Wide platform support', 'Free retake on profit', 'Excellent support'],
    cons: ['Higher starting price', 'Strict drawdown rules', '2-step process takes longer'],
    accountSizes: [
      { size: '$10,000', price: '$155' },
      { size: '$25,000', price: '$250' },
      { size: '$50,000', price: '$345' },
      { size: '$100,000', price: '$540' },
      { size: '$200,000', price: '$1,080' },
    ],
    reviews: [
      { user: 'Alex T.', rating: 5, text: 'Best prop firm out there. Got my payout in 24 hours. Clean process, no tricks.', date: 'Feb 2026' },
      { user: 'Sarah M.', rating: 5, text: 'The free retake policy is amazing. I failed once but came back stronger. Now funded!', date: 'Jan 2026' },
      { user: 'James K.', rating: 4, text: 'Great firm overall. The 2-step can be stressful but its worth it. Reliable payouts.', date: 'Jan 2026' },
    ]
  },
  'funding-pips': {
    id: 'funding-pips',
    name: 'Funding Pips',
    logo: logoFundingPips,
    bgColor: '#121355',
    tagline: 'Trade smart, get funded fast.',
    description: 'Funding Pips offers competitive pricing with a streamlined evaluation process. Known for their trader-friendly rules and fast growing community, they\'ve become a popular choice for both beginners and experienced traders looking for affordable entry into prop trading.',
    website: 'https://fundingpips.com',
    founded: '2022',
    headquarters: 'Dubai, UAE',
    trustScore: 4.7,
    totalReviews: 5230,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    payoutTime: '48 hours',
    payoutMethod: ['Bank Transfer', 'Crypto', 'Wise'],
    minAccountSize: '$5,000',
    maxAccountSize: '$300,000',
    startingPrice: '$36',
    platforms: ['MT5', 'cTrader'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    maxDrawdown: '8%',
    dailyDrawdown: '4%',
    profitTarget: '8% / 5%',
    minTradingDays: '3 days',
    maxTradingPeriod: 'Unlimited',
    leverage: '1:100',
    scalingPlan: true,
    newsTrading: true,
    weekendHolding: true,
    eaAllowed: true,
    features: ['Low Cost Entry', 'Fast Payouts', 'MT5 & cTrader', 'Scaling Plan', 'Dashboard Analytics'],
    pros: ['Very affordable starting price', 'Growing fast with good reputation', 'Modern dashboard', 'Trader-friendly rules'],
    cons: ['Relatively newer firm', 'Limited platform options', 'Smaller community than FTMO'],
    accountSizes: [
      { size: '$5,000', price: '$36' },
      { size: '$10,000', price: '$59' },
      { size: '$25,000', price: '$139' },
      { size: '$50,000', price: '$259' },
      { size: '$100,000', price: '$479' },
    ],
    reviews: [
      { user: 'David R.', rating: 5, text: 'Incredible value for money. The cheapest quality firm in the market right now.', date: 'Feb 2026' },
      { user: 'Mira H.', rating: 4, text: 'Love the dashboard. Payouts are consistent. Only wish they had MT4 support.', date: 'Jan 2026' },
      { user: 'Chris P.', rating: 5, text: 'Got funded on my first try. Rules are fair and the support team is responsive.', date: 'Dec 2025' },
    ]
  },
  'e8-markets': {
    id: 'e8-markets',
    name: 'E8 Markets',
    logo: logoE8,
    bgColor: '#000000',
    tagline: 'One step closer to funding.',
    description: 'E8 Markets simplified the funding process with their 1-step evaluation model. They offer one of the highest account sizes in the industry at $400K, making them attractive for serious traders who want to scale quickly with minimal barriers.',
    website: 'https://e8markets.com',
    founded: '2021',
    headquarters: 'Dallas, USA',
    trustScore: 4.5,
    totalReviews: 7890,
    profitSplit: '80%',
    evaluationType: '1-Step',
    payoutTime: '48 hours',
    payoutMethod: ['Bank Transfer', 'Crypto'],
    minAccountSize: '$25,000',
    maxAccountSize: '$400,000',
    startingPrice: '$98',
    platforms: ['MT4', 'MT5'],
    instruments: ['Forex', 'Indices', 'Crypto', 'Commodities'],
    maxDrawdown: '8%',
    dailyDrawdown: '4%',
    profitTarget: '8%',
    minTradingDays: '5 days',
    maxTradingPeriod: 'Unlimited',
    leverage: '1:50',
    scalingPlan: true,
    newsTrading: true,
    weekendHolding: true,
    eaAllowed: false,
    features: ['1-Step Evaluation', 'High Max Account', 'News Trading', 'Weekend Holding', 'Bi-weekly Payouts'],
    pros: ['Simple 1-step evaluation', 'Up to $400K accounts', 'Fast payouts', 'Transparent rules'],
    cons: ['No EA trading', 'Limited platform options', 'Lower leverage than competitors'],
    accountSizes: [
      { size: '$25,000', price: '$98' },
      { size: '$50,000', price: '$178' },
      { size: '$100,000', price: '$338' },
      { size: '$250,000', price: '$588' },
      { size: '$400,000', price: '$988' },
    ],
    reviews: [
      { user: 'Tommy L.', rating: 5, text: 'The 1-step model is a game changer. Got funded in under 2 weeks.', date: 'Feb 2026' },
      { user: 'Anya S.', rating: 4, text: 'Great for scalpers. The spreads are tight and rules are straightforward.', date: 'Jan 2026' },
      { user: 'Ricardo M.', rating: 4, text: 'Solid firm. Wish they allowed EAs but otherwise no complaints.', date: 'Jan 2026' },
    ]
  },
  'the-5ers': {
    id: 'the-5ers',
    name: 'The 5%ers',
    logo: logo5ers,
    bgColor: '#F59E0B',
    tagline: 'Instant funding, no challenge needed.',
    description: 'The 5%ers is one of the pioneers in prop trading, offering both evaluation-based and instant funding options. Their unique low-cost entry and scaling plan make them perfect for traders who want to grow their account organically without the pressure of evaluation deadlines.',
    website: 'https://the5ers.com',
    founded: '2016',
    headquarters: 'Ra\'anana, Israel',
    trustScore: 4.6,
    totalReviews: 9870,
    profitSplit: '80% - 100%',
    evaluationType: 'Instant / 2-Step',
    payoutTime: 'Weekly',
    payoutMethod: ['Bank Transfer', 'PayPal', 'Crypto'],
    minAccountSize: '$6,000',
    maxAccountSize: '$250,000',
    startingPrice: '$39',
    platforms: ['MT5'],
    instruments: ['Forex', 'Indices', 'Metals'],
    maxDrawdown: '4% - 10%',
    dailyDrawdown: '3% - 5%',
    profitTarget: '6% - 8%',
    minTradingDays: 'None',
    maxTradingPeriod: 'Unlimited',
    leverage: '1:30 - 1:100',
    scalingPlan: true,
    newsTrading: true,
    weekendHolding: false,
    eaAllowed: true,
    features: ['Instant Funding', 'Low Entry Cost', 'Scaling to $4M', 'Weekly Payouts', 'No Time Pressure'],
    pros: ['Instant funding option available', 'Very affordable entry', 'Scaling up to $4M', 'Pioneer in the industry', 'Weekly payouts'],
    cons: ['Lower leverage on instant funding', 'MT5 only', 'Stricter drawdown on lower accounts'],
    accountSizes: [
      { size: '$6,000', price: '$39' },
      { size: '$20,000', price: '$95' },
      { size: '$60,000', price: '$275' },
      { size: '$100,000', price: '$455' },
      { size: '$250,000', price: '$899' },
    ],
    reviews: [
      { user: 'Mark D.', rating: 5, text: 'The instant funding is incredible. Started trading with real capital from day 1!', date: 'Feb 2026' },
      { user: 'Linda W.', rating: 5, text: 'Love the scaling plan. Started small and now managing a $100K account.', date: 'Jan 2026' },
      { user: 'Osman Y.', rating: 4, text: 'Great firm, been with them since 2020. Weekly payouts are reliable.', date: 'Dec 2025' },
    ]
  },
  'fundednext': {
    id: 'fundednext',
    name: 'FundedNext',
    logo: logoFundedNext,
    bgColor: '#6366F1',
    tagline: 'Where your trading career begins.',
    description: 'FundedNext has rapidly grown to become one of the largest prop trading firms globally. They offer the industry\'s lowest starting prices and a unique profit-sharing model during the evaluation phase, meaning you earn even before getting fully funded.',
    website: 'https://fundednext.com',
    founded: '2022',
    headquarters: 'Ajman, UAE',
    trustScore: 4.4,
    totalReviews: 15200,
    profitSplit: '80% - 95%',
    evaluationType: '2-Step / Express',
    payoutTime: '72 hours',
    payoutMethod: ['Bank Transfer', 'Crypto', 'Wise', 'Payoneer'],
    minAccountSize: '$6,000',
    maxAccountSize: '$200,000',
    startingPrice: '$32',
    platforms: ['MT4', 'MT5'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%',
    profitTarget: '10% / 5%',
    minTradingDays: '5 days',
    maxTradingPeriod: 'Unlimited',
    leverage: '1:100',
    scalingPlan: true,
    newsTrading: false,
    weekendHolding: true,
    eaAllowed: true,
    features: ['Lowest Entry Price', 'Profit During Eval', 'Express Model', 'Scaling Plan', 'MT4 & MT5'],
    pros: ['Cheapest starting price ($32)', 'Earn during evaluation', 'Huge trader community', 'Fast scaling', 'Multiple payout options'],
    cons: ['No news trading', 'Newer firm', '72h payout wait'],
    accountSizes: [
      { size: '$6,000', price: '$32' },
      { size: '$15,000', price: '$79' },
      { size: '$25,000', price: '$129' },
      { size: '$50,000', price: '$229' },
      { size: '$100,000', price: '$429' },
    ],
    reviews: [
      { user: 'Jake R.', rating: 5, text: 'Unbeatable value. $32 to start? No brainer. Got funded within 3 weeks.', date: 'Feb 2026' },
      { user: 'Priya K.', rating: 4, text: 'The profit-sharing during eval is a brilliant touch. Earned $150 before even getting funded.', date: 'Jan 2026' },
      { user: 'Thomas B.', rating: 4, text: 'Good firm. The Express model is great for experienced traders. Payouts take 3 days though.', date: 'Jan 2026' },
    ]
  },
  'alpha-capital': {
    id: 'alpha-capital',
    name: 'Alpha Capital',
    logo: logoAlpha,
    bgColor: '#3B82F6',
    tagline: 'Premium funding for serious traders.',
    description: 'Alpha Capital combines premium service with competitive trading conditions. Known for their fast payouts and excellent customer support, they cater to serious traders who value reliability and professional-grade infrastructure.',
    website: 'https://alphacapitalgroup.com',
    founded: '2021',
    headquarters: 'London, UK',
    trustScore: 4.8,
    totalReviews: 4560,
    profitSplit: '80% - 90%',
    evaluationType: '2-Step',
    payoutTime: '24 hours',
    payoutMethod: ['Bank Transfer', 'Crypto', 'Wise'],
    minAccountSize: '$5,000',
    maxAccountSize: '$200,000',
    startingPrice: '$49',
    platforms: ['MT5', 'cTrader'],
    instruments: ['Forex', 'Indices', 'Commodities'],
    maxDrawdown: '10%',
    dailyDrawdown: '5%',
    profitTarget: '8% / 5%',
    minTradingDays: '5 days',
    maxTradingPeriod: 'Unlimited',
    leverage: '1:100',
    scalingPlan: true,
    newsTrading: true,
    weekendHolding: true,
    eaAllowed: true,
    features: ['Fast 24h Payouts', 'cTrader Support', 'No Time Limit', 'Scaling Plan', 'Premium Support'],
    pros: ['Fastest payouts in industry', 'cTrader support', 'Excellent customer service', 'UK-regulated', 'Transparent rules'],
    cons: ['Smaller community', 'Only two platform options', 'Limited instrument range'],
    accountSizes: [
      { size: '$5,000', price: '$49' },
      { size: '$10,000', price: '$89' },
      { size: '$25,000', price: '$189' },
      { size: '$50,000', price: '$299' },
      { size: '$100,000', price: '$499' },
    ],
    reviews: [
      { user: 'Emma L.', rating: 5, text: 'The fastest payout I have ever received from any prop firm. Truly 24 hours.', date: 'Feb 2026' },
      { user: 'Ahmed H.', rating: 5, text: 'Premium experience from start to finish. Their support team knows trading.', date: 'Jan 2026' },
      { user: 'Diego S.', rating: 4, text: 'Great firm. cTrader support is a big plus. Wish they had more instruments.', date: 'Dec 2025' },
    ]
  },
};

// Helper to find firm by any identifier
export const getFirmById = (id: string): FirmDetailData | undefined => {
  return FIRM_DETAILS[id];
};

export const FIRM_IDS = Object.keys(FIRM_DETAILS);

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

interface FirmDetailProps {
  firmId: string;
  onBack: () => void;
}

export const FirmDetail: React.FC<FirmDetailProps> = ({ firmId, onBack }) => {
  const firm = getFirmById(firmId);

  if (!firm) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Firm Not Found</h2>
        <p className="text-gray-400 mb-8">The firm you're looking for doesn't exist.</p>
        <button onClick={onBack} className="btn-primary px-6 py-3 rounded-full text-sm font-bold">Go Back</button>
      </div>
    );
  }

  return (
    <div className="relative pt-28 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid/30 to-dark pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Firms</span>
          </button>

          {/* Firm Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl shrink-0"
              style={{ backgroundColor: firm.bgColor }}
            >
              <img src={firm.logo} alt={firm.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{firm.name}</h1>
                <div className="flex items-center space-x-1 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-semibold text-green-400">Verified</span>
                </div>
              </div>
              <p className="text-gray-400 text-lg font-light mb-3">{firm.tagline}</p>
              <div className="flex items-center space-x-4 flex-wrap gap-y-2">
                <div className="flex items-center space-x-2">
                  <StarRating score={firm.trustScore} />
                  <span className="text-white font-bold text-sm">{firm.trustScore}</span>
                  <span className="text-gray-500 text-xs">({firm.totalReviews.toLocaleString()} reviews)</span>
                </div>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-400">Founded {firm.founded}</span>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-400">{firm.headquarters}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <a
                href={firm.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 hover:scale-105"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10">

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: DollarSign, label: 'Profit Split', value: firm.profitSplit, color: 'text-green-400' },
            { icon: Clock, label: 'Payout Speed', value: firm.payoutTime, color: 'text-blue-400' },
            { icon: Target, label: 'Max Account', value: firm.maxAccountSize, color: 'text-accent' },
            { icon: TrendingUp, label: 'From', value: firm.startingPrice, color: 'text-yellow-400' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">{stat.label}</div>
              <div className="text-white font-bold text-lg">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main Content - Centered (Top Section) */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* About */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>About {firm.name}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed font-light">{firm.description}</p>
          </div>
        </div>

        {/* Detailed Account Pricing Table - Full Width */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 my-12">
          <div className="bg-[#0f0b1e] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
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
              <table className="w-full text-left whitespace-nowrap min-w-[1000px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-black/40 text-xs uppercase tracking-wider text-gray-400">
                    <th className="px-8 py-5 font-semibold">Account Size</th>
                    <th className="px-8 py-5 font-semibold">Steps</th>
                    <th className="px-8 py-5 font-semibold">Profit Target</th>
                    <th className="px-8 py-5 font-semibold">Daily Loss</th>
                    <th className="px-8 py-5 font-semibold">Max Loss</th>
                    <th className="px-8 py-5 font-semibold">Profit Split</th>
                    <th className="px-8 py-5 font-semibold text-right">Price</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {firm.accountSizes.map((account, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <span className="text-white font-bold text-xl">{account.size}</span>
                      </td>
                      <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                        {firm.evaluationType}
                      </td>
                      <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                        {firm.profitTarget}
                      </td>
                      <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                        {firm.dailyDrawdown}
                      </td>
                      <td className="px-8 py-6 text-[15px] font-medium text-gray-300">
                        {firm.maxDrawdown}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-[15px] font-bold text-secondary">{firm.profitSplit}</span>
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden hidden md:flex">
                            <div className="w-[80%] bg-gradient-to-r from-secondary/80 to-secondary h-full rounded-full"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-white font-bold text-xl">{account.price}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <a href={firm.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white text-[15px] font-bold shadow-[0_0_20px_rgba(246, 174, 19,0.3)] hover:shadow-[0_0_30px_rgba(34,228,175,0.4)] transition-all hover:-translate-y-0.5 border border-white/10 hover:border-secondary/30">
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

        {/* Main Content - Centered (Bottom Section) */}
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Trading Rules & Conditions Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            {/* Trading Rules */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:col-span-3">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Scale className="w-5 h-5 text-primary" />
                <span>Trading Rules</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Max Drawdown', value: firm.maxDrawdown, icon: AlertTriangle, color: 'text-red-400' },
                  { label: 'Daily Drawdown', value: firm.dailyDrawdown, icon: AlertTriangle, color: 'text-orange-400' },
                  { label: 'Profit Target', value: firm.profitTarget, icon: Target, color: 'text-green-400' },
                  { label: 'Min Trading Days', value: firm.minTradingDays, icon: Timer, color: 'text-blue-400' },
                  { label: 'Max Duration', value: firm.maxTradingPeriod, icon: Clock, color: 'text-accent' },
                  { label: 'Leverage', value: firm.leverage, icon: Layers, color: 'text-cyan-400' },
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
                  { label: 'Scaling Plan', allowed: firm.scalingPlan },
                  { label: 'News Trading', allowed: firm.newsTrading },
                  { label: 'Weekend Holding', allowed: firm.weekendHolding },
                  { label: 'EA / Bots Allowed', allowed: firm.eaAllowed },
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
            </div>

          </div>

          {/* Platforms, Instruments & Payout Methods Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-primary" />
                <span>Platforms</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {firm.platforms.map((platform, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-primary">{platform}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Instruments</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {firm.instruments.map((instrument, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm font-medium text-gray-300">{instrument}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span>Payout Methods</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {firm.payoutMethod.map((method, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm font-medium text-gray-300">{method}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features, Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Key Features</span>
              </h3>
              <ul className="space-y-3">
                {firm.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-400" />
                <span>Pros</span>
              </h3>
              <ul className="space-y-3">
                {firm.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <span>Cons</span>
              </h3>
              <ul className="space-y-3">
                {firm.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-400">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Full Width Animated Reviews Section */}
      <div className="mt-20 border-t border-white/[0.06] bg-gradient-to-b from-dark-card/50 to-dark pt-16 pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
              <Users className="w-7 h-7 text-primary" />
              <span>Trader Reviews</span>
            </h2>
            <div className="flex items-center space-x-3">
              <StarRating score={firm.trustScore} />
              <span className="text-white font-bold">{firm.trustScore}</span>
              <span className="text-gray-500 text-sm">Based on {firm.totalReviews.toLocaleString()} verified reviews</span>
            </div>
          </div>
          <button className="btn-primary px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-[0_0_30px_rgba(246, 174, 19,0.4)] transition-all flex items-center space-x-2">
            <span>Write a Review</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-x-hidden group">
          {/* Fade masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Content - To create infinite effect we double the array */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap py-4">
            {[...firm.reviews, ...firm.reviews, ...firm.reviews, ...firm.reviews].map((review, idx) => (
              <div
                key={idx}
                className="inline-flex flex-col w-[400px] md:w-[480px] p-6 mx-4 bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-primary/30 transition-colors whitespace-normal flex-shrink-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-white text-lg border border-white/[0.08]">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center space-x-2">
                        <span>{review.user}</span>
                        <BadgeCheck className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <StarRating score={review.rating} size="w-3.5 h-3.5" />
                </div>
                <p className="text-gray-400 leading-relaxed font-light text-[15px]">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
