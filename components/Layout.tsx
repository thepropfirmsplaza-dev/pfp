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
              <img src="/logo.png" alt="Capital Match Logo" className="h-[4.5rem] w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all -ml-1" />
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
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6 h-8 cursor-pointer" onClick={() => navigate('/')}>
                <img src="/logo.png" alt="Capital Match Logo" className="h-[4rem] w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] -ml-2" />
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                The premier ecosystem for proprietary trading firms. Discovery, analytics, and verification powered by AI.
              </p>
              <div className="flex space-x-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer text-text-muted hover:text-white border border-white/5">X</div>
                <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer text-text-muted hover:text-white border border-white/5">In</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">Platform</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Discovery Engine</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Compare Matrix</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Verified Reviews</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Pricing Intelligence</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">Resources</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Prop Trading Academy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Risk Calculator</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Support Center</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">Legal</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Risk Disclosure</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-text-muted flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Capital Match. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Built for the future of funding.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
