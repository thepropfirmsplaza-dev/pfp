import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQS = [
    {
        question: "What is a Proprietary Trading Firm (Prop Firm)?",
        answer: "A prop firm provides capital to traders who successfully pass their evaluation process. You trade their money, and you keep a percentage of the profits (usually 80-90%), while the firm absorbs the losses."
    },
    {
        question: "How does the evaluation process work?",
        answer: "Most firms require you to pass a 1-Step or 2-Step challenge. This involves reaching a specific profit target (e.g., 8% or 10%) without hitting the maximum daily loss limit or the overall maximum drawdown limit."
    },
    {
        question: "Do I need to deposit my own money?",
        answer: "No, you do not deposit money for trading. You only pay a one-time, refundable fee to take the evaluation challenge. Once funded, you trade with the firm's capital."
    },
    {
        question: "Are there any hidden fees or monthly subscriptions?",
        answer: "The reputable firms we feature only charge an upfront evaluation fee. There are no monthly data fees, desk fees, or hidden charges. Once you reach your first payout, most firms refund your initial fee."
    },
    {
        question: "Which trading platforms can I use?",
        answer: "Platform availability varies by firm, but the most common options are MetaTrader 4 (MT4), MetaTrader 5 (MT5), cTrader, MatchTrader, and DXtrade."
    },
    {
        question: "Can I trade during news events or hold positions overnight?",
        answer: "This depends entirely on the firm's rules. Some firms allow unrestricted trading (news, weekend holding, EAs), while others prohibit it. Our comparison tool helps you filter firms based on these exact rules."
    },
    {
        question: "How and when do I get paid?",
        answer: "Payout schedules vary. Some firms offer on-demand payouts, bi-weekly, or monthly payouts. Payments are typically processed via bank transfer, Deel, or Cryptocurrency (USDT, BTC, etc.)."
    },
    {
        question: "What happens if I breach a rule on a funded account?",
        answer: "If you violate a hard rule (like the maximum daily loss), your account will be closed. However, any profits you generated before the breach are usually forfeited, and you must purchase a new challenge to get funded again."
    },
    {
        question: "How does PropFirms Plaza's AI Matching tool work?",
        answer: "Our AI algorithm analyzes your trading style, budget, risk tolerance, and preferred instruments to instantly recommend the exact prop firms that mathematically offer you the highest probability of success."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-dark pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
                        <MessageCircleQuestion className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Got Questions?</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">Questions</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                        Everything you need to know about prop trading and finding the right firm.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen
                                    ? 'bg-white/[0.04] border-primary/30 shadow-[0_0_30px_rgba(10,193,201,)]'
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className={`font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-white text-lg' : 'text-gray-300 text-base group-hover:text-gray-200'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen
                                        ? 'bg-primary/20 border-primary/50 text-white rotate-180'
                                        : 'bg-white/[0.05] border-white/10 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
                                        }`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};
