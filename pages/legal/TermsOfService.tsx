import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-dark pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-brand-muted">Effective Date: March 2026</p>
                </div>

                <div className="prose prose-invert prose-brand max-w-none space-y-8 text-gray-300">

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing, viewing, or using PropFirms Plaza (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service. These terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                        <p className="leading-relaxed mb-4">
                            PropFirms Plaza is a centralized discovery platform and analytics hub providing:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-brand-muted">
                            <li>Aggregation of proprietary trading firm data, rules, and passing conditions.</li>
                            <li>Community-driven reviews, ratings, and payout verification statistics.</li>
                            <li>Search tools, filtering, and comparison matrices for trading challenges.</li>
                            <li>Discount codes and affiliate links to third-party services.</li>
                        </ul>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Accuracy of Information</h2>
                        <p className="leading-relaxed">
                            While we strive to keep the information on PropFirms Plaza strictly up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. The rules, prices, and payout metrics of proprietary trading firms change rapidly; you must verify all information directly on the firm's official website before making a purchase.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Affiliate Disclaimer</h2>
                        <p className="leading-relaxed">
                            PropFirms Plaza acts as an affiliate for many of the proprietary trading firms listed on this site. We may receive financial compensation when you click on links pointing to these firms and subsequently purchase their products or services. This compensation helps maintain our platform and does not influence the objectivity of our data.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">5. User Accounts & Reviews</h2>
                        <p className="leading-relaxed mb-4">
                            When creating an account to leave a review or track your challenges, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Regarding reviews:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-brand-muted">
                            <li>You must only review firms you have personally interacted with.</li>
                            <li>Foul language, hate speech, or targeted harassment of firms/staff will result in immediate ban without notice.</li>
                            <li>We reserve the right to remove unverified reviews or reviews suspected of malicious intent/astroturfing.</li>
                        </ul>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            In no event shall PropFirms Plaza, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
