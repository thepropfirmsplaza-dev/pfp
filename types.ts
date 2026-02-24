export interface Firm {
  id: string;
  name: string;
  logo: string;
  healthScore: number;
  minAccountSize: number;
  maxAccountSize: number;
  profitSplit: string;
  evaluationType: '1-Step' | '2-Step' | 'Instant' | '3-Step';
  trustScore: number; // 0-5
  price: number; // For smallest account
  features: string[];
  description: string;
  payoutTime: string; // e.g., "24h"
  platforms: string[]; // MT4, MT5, cTrader
  instruments: string[];
  maxDrawdown: string;
  dailyDrawdown: string;
}

export interface QuizPreferences {
  experienceLevel: string;
  tradingStyle: string;
  budget: number;
  preferredPlatform: string;
  riskAppetite: string;
}

export type ViewState = 'home' | 'discovery' | 'compare' | 'quiz' | 'dashboard' | 'firm-detail';
