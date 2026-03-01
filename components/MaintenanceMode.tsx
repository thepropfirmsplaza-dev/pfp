import React from 'react';
import { Hammer, Clock, Zap } from 'lucide-react';
import { usePlatformSettings } from '../lib/usePlatformSettings';

const MaintenanceMode: React.FC = () => {
    const { settings } = usePlatformSettings();
    const platformName = settings?.platform_name || 'PropFirms Plaza';
    const supportEmail = settings?.support_email || 'support@propfirmsplaza.com';

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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto w-full mb-12">
                    <a href={`mailto:${supportEmail}`} className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 flex items-center justify-center gap-3 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all group cursor-pointer w-full text-center">
                        <Zap className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                        <span className="text-white font-bold group-hover:text-secondary transition-colors">Contact Support</span>
                    </a>
                    <a href="/#/login" className="flex-1 bg-brand-black border border-white/10 rounded-xl p-4 flex items-center justify-center gap-3 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all group cursor-pointer w-full text-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <span className="text-gray-300 font-bold group-hover:text-white transition-colors">Admin Access</span>
                        <span className="text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-200">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceMode;
