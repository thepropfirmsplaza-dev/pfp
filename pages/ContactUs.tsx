import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-dark pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryHover">Us</span>
                    </h1>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        Have questions about our platform, need help finding a prop firm, or want to partner with us? Our team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors group">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Email Support</h3>
                                <p className="text-brand-muted text-sm mb-2">Our team typically responds within 24 hours.</p>
                                <a href="mailto:support@propfirmsplaza.com" className="text-primary hover:text-primaryHover font-medium transition-colors">
                                    support@propfirmsplaza.com
                                </a>
                            </div>
                        </div>

                        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors group">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Live Chat (Discord)</h3>
                                <p className="text-brand-muted text-sm mb-2">Join our community for real-time support.</p>
                                <a href="https://discord.com/invite/propfirmsplaza" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primaryHover font-medium transition-colors">
                                    Join Discord Server
                                </a>
                            </div>
                        </div>

                        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors group">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Business Inquiries</h3>
                                <p className="text-brand-muted text-sm">
                                    PropFirms Plaza<br />
                                    Global Digital Platform
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Our team will get back to you soon.'); }}>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-brand-muted uppercase tracking-wider">First Name</label>
                                    <input type="text" required className="w-full bg-brand-charcoal border border-brand-border rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-brand-muted/50" placeholder="John" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-brand-muted uppercase tracking-wider">Last Name</label>
                                    <input type="text" required className="w-full bg-brand-charcoal border border-brand-border rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-brand-muted/50" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-brand-muted uppercase tracking-wider">Email Address</label>
                                <input type="email" required className="w-full bg-brand-charcoal border border-brand-border rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-brand-muted/50" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-brand-muted uppercase tracking-wider">Subject</label>
                                <select className="w-full bg-brand-charcoal border border-brand-border rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                                    <option>General Inquiry</option>
                                    <option>Firm Submission / Partnership</option>
                                    <option>Report an Issue</option>
                                    <option>Billing Support</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-brand-muted uppercase tracking-wider">Message</label>
                                <textarea required rows={4} className="w-full bg-brand-charcoal border border-brand-border rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-brand-muted/50 resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-brand-black font-bold py-3.5 rounded-xl hover:bg-primaryHover transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40 mt-6">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
