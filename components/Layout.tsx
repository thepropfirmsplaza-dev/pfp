import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { ViewState } from '../types';
import { Hexagon, User, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView?: string;
  onViewChange?: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col font-sans selection:bg-primary/30">
      {/* Header - Floating & Rounded */}
      <header className="fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-0 lg:right-0 lg:max-w-7xl lg:mx-auto z-50 rounded-2xl border border-white/10 bg-dark/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative mr-3 flex items-center h-10">
              <img src="/logo.png" alt="Platform Logo" className="h-[4.5rem] w-auto object-contain transition-all -ml-1" />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden ${location.pathname.startsWith(item.path)
                  ? 'text-white'
                  : 'text-text-muted hover:text-white'
                  }`}
              >
                {location.pathname.startsWith(item.path) && (
                  <span className="absolute inset-0 bg-white/5 border border-white/5 rounded-full" />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <item.icon className={`w-4 h-4 transition-colors ${location.pathname.startsWith(item.path) ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
                  <span>{item.label}</span>
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/login')} className="hidden sm:block text-sm font-medium text-text-muted hover:text-white transition-colors">Log In</button>
            <button onClick={() => navigate('/firms')} className="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(10,193,201,)] hover:shadow-[0_0_25px_rgba(10,193,201,)] transition-all border border-white/10 transform hover:scale-105">
              Get Funded
            </button>
            <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Floating Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-fade-in shadow-2xl mx-1">
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
                  className={`flex items-center space-x-3 text-sm font-medium p-3 rounded-xl transition-colors ${location.pathname.startsWith(item.path) ? 'bg-primary/10 text-white' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon className={`w-5 h-5 ${location.pathname.startsWith(item.path) ? 'text-primary' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="flex items-center space-x-3 text-sm font-medium text-text-muted hover:text-white p-3 rounded-xl hover:bg-white/5">
                <User className="w-5 h-5" />
                <span>Log In</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow relative overflow-x-hidden">
        {/* Premium Background Effects */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0 animate-blob" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[150px] pointer-events-none z-0 animate-blob" style={{ animationDelay: '2s' }} />

        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark-mid/50 border-t border-white/5 py-16 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Column 1: Brand & Socials */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6 h-8 cursor-pointer" onClick={() => navigate('/')}>
                <img src="/logo.png" alt="Platform Logo" className="h-[4rem] w-auto object-contain -ml-2" />
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                The premier ecosystem for proprietary trading firms. Discovery, analytics, and verification powered by AI.
              </p>
              <div className="flex space-x-4">
                <a href="https://x.com/propfirmsplaza" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors text-text-muted hover:text-white border border-white/5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://www.instagram.com/propfirmsplaza/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors text-text-muted hover:text-white border border-white/5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://discord.com/invite/propfirmsplaza" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors text-text-muted hover:text-white border border-white/5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">Platform</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/firms')}>Browse Firms</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/compare')}>Compare Matrix</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/offers')}>Exclusive Offers</li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">Support</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/about')}>About Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/contact')}>Contact Us</li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">Legal</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/terms')}>Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/privacy')}>Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/risk')}>Risk Disclosure</li>
              </ul>
            </div>

          </div> {/* End Grid */}

          <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-text-muted flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 PropFirms Plaza. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Built for the future of funding.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
