import React from 'react';
import { Target, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

const STEPS = [
    {
        icon: Target,
        title: "1. Match & Connect",
        description: "Use our AI tool to instantly find the prop firm that perfectly fits your exact trading style, budget, and risk tolerance.",
        color: "from-secondary/20 to-secondary/5",
        iconColor: "text-secondary",
        borderColor: "border-secondary/20"
    },
    {
        icon: TrendingUp,
        title: "2. Pass the Evaluation",
        description: "Prove your skills by hitting the firm's profit targets without breaching their drawdown rules. Trade your strategy on your terms.",
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-400",
        borderColor: "border-purple-500/20"
    },
    {
        icon: DollarSign,
        title: "3. Get Funded & Scale",
        description: "Receive your live funded account. Keep up to 100% of your profits and scale your capital up to millions as you prove consistency.",
        color: "from-primary/20 to-primary/5",
        iconColor: "text-primary",
        borderColor: "border-primary/20"
    }
];

export const HowItWorks: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-dark pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary">Funded Excellence</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        We simplify the complex world of proprietary trading. From finding your perfect match to securing your first six-figure payout.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-secondary/20 via-purple-500/20 to-primary/20 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={`glass-card p-10 rounded-3xl border ${step.borderColor} relative group hover:-translate-y-2 transition-all duration-500`}
                            >
                                {/* Background Gradient Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Step Number Background */}
                                <div className="absolute -right-4 -bottom-4 text-9xl font-black text-white/[0.02] pointer-events-none select-none z-0">
                                    0{index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <button
                        onClick={onStartQuiz}
                        className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-sm transition-all duration-300 group shadow-lg"
                    >
                        <span>Find Your Match</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </section>
    );
};
