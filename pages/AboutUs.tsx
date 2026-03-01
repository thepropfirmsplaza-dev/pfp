import React from 'react';
import { Target, Shield, Users, Zap } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-dark pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryHover">PropFirms Plaza</span>
                    </h1>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        We are building the internet's most trusted discovery and analytics engine for the proprietary trading industry.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-brand-card border border-brand-border rounded-2xl p-8 hover:border-primary/30 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                            <Target size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-brand-muted leading-relaxed">
                            To empower retail traders by providing transparent, data-driven insights into proprietary trading firms. We cut through the noise so you can find the funding partner that actually matches your edge.
                        </p>
                    </div>

                    <div className="bg-brand-card border border-brand-border rounded-2xl p-8 hover:border-primary/30 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Unbiased Verification</h3>
                        <p className="text-brand-muted leading-relaxed">
                            Trust is our currency. We actively verify payout proofs, track hidden drawdown rules, and independently audit firm metrics to ensure our community never falls for a scam.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-brand-card border border-brand-border rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-white mb-6">Built For Traders, By Traders</h2>
                    <div className="space-y-6 text-brand-muted leading-relaxed">
                        <p>
                            The proprietary trading space has exploded in recent years, bringing incredible opportunities but also overwhelming complexity. As active traders ourselves, we grew tired of sifting through deceptive marketing, hidden rules, and unverified payout claims.
                        </p>
                        <p>
                            PropFirms Plaza was born out of necessity. We created Plaza AI to instantly analyze your trading profile against over 40+ data points per firm, guaranteeing you find a challenge that respects your strategy.
                        </p>
                        <p>
                            Whether you are a scalper looking for high leverage and raw spreads, or a swing trader needing unlimited time and weekend holding, we have the analytics to back your decision.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10 shadow-lg">
                        <div className="flex-1 bg-dark-mid border border-white/5 rounded-xl p-6 text-center">
                            <div className="text-3xl font-black text-white mb-2">400+</div>
                            <div className="text-sm text-brand-muted uppercase tracking-wider font-bold">Firms Tracked</div>
                        </div>
                        <div className="flex-1 bg-dark-mid border border-white/5 rounded-xl p-6 text-center">
                            <div className="text-3xl font-black text-white mb-2">$50M+</div>
                            <div className="text-sm text-brand-muted uppercase tracking-wider font-bold">Payouts Verified</div>
                        </div>
                        <div className="flex-1 bg-dark-mid border border-white/5 rounded-xl p-6 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={48} /></div>
                            <div className="text-3xl font-black text-primary mb-2 relative z-10">Plaza AI</div>
                            <div className="text-sm text-brand-muted uppercase tracking-wider font-bold relative z-10">Powered Engine</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
