import React from 'react';
import { Hammer, Clock, Zap } from 'lucide-react';
import { usePlatformSettings } from '../lib/usePlatformSettings';

const MaintenanceMode: React.FC = () => {
    const { settings } = usePlatformSettings();
    const platformName = settings?.platform_name || 'Capital Match';
    const supportEmail = settings?.support_email || 'support@thecapitalmatch.com';

    return (
        <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/2"></div>

            <div className="absolute inset-0 bg-[url('https://www.protex.ai/images/Grid.svg')] bg-center opacity-10 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto w-full">
                {/* Icon Container */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,230,160,0.15)] animate-pulse">
                    <Hammer className="w-10 h-10 text-secondary" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-cyan-400" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-400">Upgrading</span> {platformName}
                </h1>

                <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                    We're currently performing scheduled maintenance to bring you an even better prop trading discovery experience. We'll be back online shortly.
                </p>

                {/* Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full mb-12">
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 flex items-center gap-4 text-left backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-white font-bold">Estimated Time</p>
                            <p className="text-sm text-gray-500">Less than 2 hours</p>
                        </div>
                    </div>
                    <a href={`mailto:${supportEmail}`} className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 flex items-center gap-4 text-left backdrop-blur-sm hover:bg-white/[0.05] transition-colors group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-white font-bold hover:text-secondary transition-colors">Contact Support</p>
                            <p className="text-sm text-gray-500 truncate w-32">{supportEmail}</p>
                        </div>
                    </a>
                </div>

                {/* Admin Login Bypass Link (Hidden unless hovered/focused below the main text) */}
                <div className="mt-8 pt-8 border-t border-white/5 opacity-30 hover:opacity-100 transition-opacity">
                    <a href="/#/login" className="text-sm font-medium text-gray-500 hover:text-white flex items-center justify-center gap-2">
                        Admin Access <span className="text-xs">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceMode;
