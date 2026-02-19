import React, { useState } from 'react';
import { Firm, QuizPreferences } from '../types';
import { MOCK_FIRMS } from '../constants';
import { generateMatchExplanation } from '../services/geminiService';
import { Loader2, Zap, ArrowRight, CheckCircle2, RefreshCcw } from 'lucide-react';

interface FirmFinderQuizProps {
  onComplete: () => void;
}

const QUESTIONS = [
  {
    key: 'experienceLevel',
    question: "What's your trading experience?",
    options: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
  },
  {
    key: 'tradingStyle',
    question: "How do you trade?",
    options: ['Scalping', 'Day Trading', 'Swing Trading', 'Algorithmic']
  },
  {
    key: 'budget',
    question: "Budget for first challenge?",
    options: [50, 100, 250, 500, 1000],
    format: (v: number) => `Up to $${v}`
  },
  {
    key: 'riskAppetite',
    question: "What is your risk appetite?",
    options: ['Conservative (Low Drawdown)', 'Moderate', 'Aggressive (High Leverage)']
  },
  {
    key: 'preferredPlatform',
    question: "Preferred Platform?",
    options: ['MT4', 'MT5', 'cTrader', 'TradingView']
  }
];

export const FirmFinderQuiz: React.FC<FirmFinderQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizPreferences>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ firm: Firm; explanation: string } | null>(null);

  const handleOptionSelect = async (key: string, value: any) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Finish
      setIsAnalyzing(true);
      await processResults(newAnswers as QuizPreferences);
    }
  };

  const processResults = async (finalAnswers: QuizPreferences) => {
    let matchedFirm = MOCK_FIRMS[0]; 
    if (finalAnswers.tradingStyle === 'Algorithmic') {
        matchedFirm = MOCK_FIRMS.find(f => f.name.includes('Apex')) || MOCK_FIRMS[0];
    } else if (finalAnswers.budget && finalAnswers.budget > 200) {
         matchedFirm = MOCK_FIRMS.find(f => f.name.includes('BlueSky')) || MOCK_FIRMS[0];
    } else if (finalAnswers.riskAppetite?.includes('Aggressive')) {
         matchedFirm = MOCK_FIRMS.find(f => f.name.includes('TradeFunding')) || MOCK_FIRMS[0];
    }

    const explanation = await generateMatchExplanation(matchedFirm, finalAnswers);
    setResult({ firm: matchedFirm, explanation });
    setIsAnalyzing(false);
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center relative overflow-hidden rounded-3xl glass-panel border-0">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative z-10">
            <div className="relative mb-8 inline-block">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-40 animate-pulse"></div>
                <Loader2 className="w-20 h-20 text-primary animate-spin relative z-10" />
            </div>
            <h3 className="text-3xl font-bold mt-4 text-white">AI Analysis in Progress</h3>
            <div className="flex flex-col items-center mt-4 space-y-2">
                <p className="text-text-muted animate-pulse">Scanning 400+ firms...</p>
                <p className="text-text-muted animate-pulse animation-delay-500">Verifying payout proofs...</p>
                <p className="text-text-muted animate-pulse animation-delay-1000">Matching risk profile...</p>
            </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
         <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-6 ring-1 ring-secondary/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Zap className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Perfect Match Found</h2>
            <p className="text-text-muted text-lg">Our AI has selected the optimal funding partner for you.</p>
         </div>

         <div className="glass-panel p-0 rounded-3xl border border-primary/30 relative overflow-hidden shadow-2xl">
            {/* Top Match Banner */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-1 flex justify-center">
                 <span className="text-xs font-bold tracking-widest text-white uppercase flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-2 text-secondary" /> 98% Compatibility Score
                 </span>
            </div>

            <div className="p-8 md:p-10">
                <div className="flex items-start md:items-center flex-col md:flex-row gap-8 mb-8 border-b border-white/5 pb-8">
                    <img src={result.firm.logo} className="w-24 h-24 rounded-2xl bg-dark-mid border border-white/10 shadow-lg object-cover" alt="Logo" />
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{result.firm.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {result.firm.features.map(f => (
                                <span key={f} className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full text-text-light">{f}</span>
                            ))}
                        </div>
                    </div>
                    <div className="md:ml-auto text-right bg-white/[0.03] p-4 rounded-xl border border-white/5 min-w-[140px]">
                        <div className="text-3xl font-mono font-bold text-secondary tracking-tight">${result.firm.price}</div>
                        <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">Starting Price</div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-dark-mid to-dark p-6 rounded-2xl border border-primary/20 mb-8 relative">
                    <div className="absolute top-4 right-4 text-primary/20">
                        <Zap className="w-12 h-12" />
                    </div>
                    <h4 className="text-sm font-bold text-primary mb-3 flex items-center uppercase tracking-wider">
                         AI Analysis Report
                    </h4>
                    <p className="text-text-light text-lg leading-relaxed font-light italic opacity-90 relative z-10">
                        "{result.explanation}"
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <div className="text-xs text-text-muted uppercase mb-1">Profit Split</div>
                        <div className="font-bold text-white text-lg">{result.firm.profitSplit}</div>
                    </div>
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <div className="text-xs text-text-muted uppercase mb-1">Target</div>
                        <div className="font-bold text-white text-lg">8% / 5%</div>
                    </div>
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <div className="text-xs text-text-muted uppercase mb-1">Max Drawdown</div>
                        <div className="font-bold text-white text-lg">{result.firm.maxDrawdown}</div>
                    </div>
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <div className="text-xs text-text-muted uppercase mb-1">Payout</div>
                        <div className="font-bold text-white text-lg">{result.firm.payoutTime}</div>
                    </div>
                </div>

                <button className="w-full btn-primary py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center">
                    Start Challenge with {result.firm.name} <ArrowRight className="ml-2 w-5 h-5" />
                </button>
            </div>
         </div>

         <div className="text-center mt-10">
            <button onClick={() => { setStep(0); setResult(null); }} className="text-text-muted hover:text-white text-sm flex items-center justify-center mx-auto transition-colors">
                <RefreshCcw className="w-4 h-4 mr-2" /> Retake Assessment
            </button>
         </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto py-10">
        <div className="mb-10">
            <div className="flex justify-between text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                <span>Assessment Progress</span>
                <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
            </div>
        </div>

        <div className="glass-card p-10 rounded-3xl border border-white/10 shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight relative z-10">{currentQ.question}</h2>
            <div className="space-y-4 relative z-10">
                {currentQ.options.map((opt: any, idx) => (
                    <button
                        key={opt}
                        onClick={() => handleOptionSelect(currentQ.key, opt)}
                        className="w-full text-left p-5 rounded-xl bg-white/[0.03] hover:bg-primary/10 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between group hover:pl-6 duration-300"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <span className="font-medium text-lg text-text-light group-hover:text-white">
                            {/* @ts-ignore */}
                            {currentQ.format ? currentQ.format(opt) : opt}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary text-text-muted group-hover:text-white transition-all">
                             <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};
