import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-dark pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-brand-muted">Last Updated: March 2026</p>
                </div>

                <div className="prose prose-invert prose-brand max-w-none space-y-8 text-gray-300">

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="leading-relaxed">
                            Welcome to PropFirms Plaza. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect About You</h2>
                        <p className="leading-relaxed mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul className="list-disc pl-6 space-y-2 text-brand-muted">
                            <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong className="text-white">Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                            <li><strong className="text-white">Usage Data:</strong> includes information about how you use our website, products and services (such as tracking which prop firms you view or click on).</li>
                        </ul>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Personal Data</h2>
                        <p className="leading-relaxed mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2 text-brand-muted">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Links</h2>
                        <p className="leading-relaxed">
                            Our website includes links to third-party websites (such as Proprietary Trading Firms). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                        <p className="leading-relaxed">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:thepropfirmsplaza@gmail.com" className="text-primary hover:text-primaryHover">thepropfirmsplaza@gmail.com</a>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
