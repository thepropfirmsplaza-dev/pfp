import React from 'react';

const RiskDisclosure = () => {
    return (
        <div className="min-h-screen bg-dark pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Risk Disclosure</h1>
                    <p className="text-brand-muted">Last Updated: March 2026</p>
                </div>

                <div className="prose prose-invert max-w-none space-y-8 text-gray-300">

                    <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">warning</span>
                            High Risk Investment Warning
                        </h2>
                        <p className="leading-relaxed text-red-200/90 font-medium">
                            Trading foreign exchange (Forex), contracts for differences (CFDs), crypto assets, and other financial instruments on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage offered by proprietary trading firms can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
                        </p>
                    </div>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Not Financial Advice</h2>
                        <p className="leading-relaxed">
                            PropFirms Plaza is a directory, comparison, and educational platform. We are <strong>not</strong> a registered broker, financial advisor, or investment portal. Any information provided on this website—including firm reviews, passing statistics, payout data, or platform comparisons—is for informational purposes only. It should not be construed as investment, financial, legal, or other advice.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Proprietary Trading Risks</h2>
                        <p className="leading-relaxed mb-4">
                            Purchasing evaluation challenges from proprietary trading firms involves significant risk. You must be aware that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-brand-muted">
                            <li>The failure rate for evaluation challenges is statistically very high. You may lose the entire evaluation fee you paid to the firm.</li>
                            <li>"Funded accounts" provided by these firms are typically simulated/demo environments where trades are copied to a master account at the firm's discretion, or virtual accounts tied to a profit-sharing agreement. You do not own the capital.</li>
                            <li>Firms reserve the right to terminate accounts that violate their specific (and sometimes complex) trading rules, such as maximum drawdown, daily loss limits, or news trading restrictions.</li>
                        </ul>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Platform Independence & Affiliation</h2>
                        <p className="leading-relaxed">
                            While PropFirms Plaza attempts to vet and review the firms listed on our platform, we cannot guarantee their solvency, business practices, or payout reliability. The proprietary trading industry is largely unregulated. We may receive affiliate compensation when you click on links or use promo codes found on our site. However, our reviews and ratings aim to remain objective based on community feedback.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Loss of Capital</h2>
                        <p className="leading-relaxed">
                            You should not spend money on evaluation challenges that you cannot afford to lose. Past performance of any trading system, methodology, or firm is not necessarily indicative of future results. By using PropFirms Plaza, you acknowledge and accept that you are wholly responsible for your own trading decisions and any capital you spend.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default RiskDisclosure;
