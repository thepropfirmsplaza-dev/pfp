import React, { useState, useEffect } from 'react';
import { FEATURE_CARDS } from '../constants';
import { ArrowRight, Star, ShieldCheck, Zap, Cpu, CheckCircle2, ChevronRight, Terminal, TrendingUp } from 'lucide-react';
import heroBgClean from '../assets/hero-bg-clean.png';

// Import Avatars
import avatar1 from '../assets/avatar-1.jpg';
import avatar2 from '../assets/avatar-2.jpg';
import avatar3 from '../assets/avatar-3.jpg';

interface HeroProps {
  onStartQuiz: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz, onExplore }) => {
  const [activeStep, setActiveStep] = useState(0);

  const terminalSteps = [
    { text: "Initializing Plaza AI Core...", status: "done" },
    { text: "Analyzing 35+ Prop Firms...", status: "done" },
    { text: "Cross-referencing trader profile...", status: "loading" },
    { text: "Optimizing for highest payout odds...", status: "pending" },
    { text: "Match Found: Top 3 Providers", status: "pending" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % terminalSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative pt-24 pb-32 overflow-hidden min-h-screen flex flex-col justify-center bg-dark">
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(31, 214, 85, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31, 214, 85, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
        }
        .text-gradient-vibrant {
            background: linear-gradient(135deg, #ffffff 0%, #1fd655 50%, #15a13c 100%);
            -webkit-background-clip: text; 
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .widget-panel {
            background: rgba(15, 26, 18, 0.7);
            backdrop-filter: blur(24px); 
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(31, 214, 85, 0.2);
            box-shadow: 0 40px 80px -20px rgba(10, 99, 33, 0.4), inset 0 0 0 1px rgba(255,255,255,0.05);
            border-radius: 24px;
            overflow: hidden;
        }
        .widget-header {
            background: linear-gradient(180deg, rgba(31,214,85,0.1) 0%, transparent 100%);
            border-bottom: 1px solid rgba(31,214,85,0.15);
        }
        .animate-float-subtle { animation: float-subtle 6s ease-in-out infinite; }
        @keyframes float-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        .scanline {
            width: 100%;
            height: 100px;
            background: linear-gradient(0deg, transparent 0%, rgba(31, 214, 85, 0.1) 50%, transparent 100%);
            position: absolute;
            animation: scanline 8s linear infinite;
            pointer-events: none;
            z-index: 50;
        }
        @keyframes scanline {
            0% { top: -100px; }
            100% { top: 100%; }
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 transform skew-y-12 scale-150 origin-top-left translate-y-24"></div>
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] animate-[pulse-glow_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full mix-blend-screen filter blur-[100px] animate-[pulse-glow_10s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-10 mt-10 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Typography & CTAs (6 cols) */}
          <div className="lg:col-span-6 text-left relative z-30">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-3 bg-dark-card/90 border border-primary/30 rounded-full pl-3 pr-5 py-2 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(31,214,85,0.15)] group cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider group-hover:text-white transition-colors">Plaza Network Live</span>
            </div>

            {/* Premium Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight mb-6 leading-[1.05]">
              <span className="text-white block mb-2 drop-shadow-sm">The Ultimate</span>
              <span className="text-gradient-vibrant inline-block pb-2">Prop Firm</span><br />
              <span className="text-white drop-shadow-sm">Widget.</span>
            </h1>

            <p className="max-w-lg text-lg md:text-xl text-text-muted mb-10 leading-relaxed font-light">
              Stop guessing which firm is right for you. Our live matchmaking widget algorithmically connects your exact trading style to the most verified, reputable funding providers instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-6">
              <button
                onClick={onStartQuiz}
                className="group relative w-full sm:w-auto bg-primary text-dark px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(31,214,85,0.6)] overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span>Start Matching</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplore}
                className="group w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
              >
                Browse Manually
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center space-x-5 pt-8 border-t border-white/10">
              <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full border-2 border-dark bg-secondary flex items-center justify-center overflow-hidden z-30"><img src={avatar1} alt="Trader 1" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-dark bg-primary flex items-center justify-center overflow-hidden z-20"><img src={avatar2} alt="Trader 2" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-dark bg-accent flex items-center justify-center overflow-hidden z-10"><img src={avatar3} alt="Trader 3" className="w-full h-full object-cover" /></div>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />)}
                </div>
                <span className="text-text-muted text-sm font-medium block mt-0.5">Over 15,000 traders matched</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unique Widget Showcase (6 cols) */}
          <div className="lg:col-span-6 relative w-full hidden lg:flex justify-end items-center perspective-1000 h-[600px]">

            {/* The Interactive Widget Main Container */}
            <div className="widget-panel w-[90%] md:w-[85%] animate-float-subtle relative z-20 transform rotate-y-[-10deg] rotate-x-[5deg]">
              <div className="scanline"></div>

              {/* Header Navbar of Widget */}
              <div className="widget-header p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-wide">AI Matchmaker Engine</h3>
                    <p className="text-primary text-[10px] uppercase tracking-widest font-semibold flex items-center">
                      <Zap className="w-3 h-3 mr-1" /> System Active
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(31,214,85,0.8)]"></div>
                </div>
              </div>

              {/* Widget Body */}
              <div className="p-6">
                {/* Terminal Output Simulation */}
                <div className="bg-dark/80 rounded-xl border border-white/5 p-4 mb-6 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-30"><Terminal className="w-6 h-6 text-white" /></div>
                  {terminalSteps.map((step, idx) => (
                    <div key={idx} className={`flex items-start space-x-3 mb-3 ${idx > activeStep ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
                      <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${idx === activeStep ? 'text-primary animate-pulse' : 'text-text-muted'}`} />
                      <div className="flex-1">
                        <p className={`${idx === activeStep ? 'text-primary drop-shadow-[0_0_5px_rgba(31,214,85,0.5)]' : 'text-gray-300'}`}>{step.text}</p>
                        {idx < activeStep && (
                          <div className="flex items-center mt-1 text-[10px] text-primary/70">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Complete
                          </div>
                        )}
                        {idx === activeStep && step.status === 'loading' && (
                          <div className="w-full bg-dark flex h-1.5 rounded-full mt-2 overflow-hidden border border-white/5">
                            <div className="bg-primary h-full w-1/2 animate-[marquee_1s_linear_infinite] rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Metrics Grid inside Widget */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors cursor-default">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted text-xs uppercase tracking-wider font-semibold">Firms Scanned</span>
                      <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                    </div>
                    <div className="text-3xl font-bold text-white tracking-tight">38<span className="text-primary text-lg">/38</span></div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors cursor-default">
                    <span className="text-text-muted text-xs uppercase tracking-wider font-semibold mb-2 block">Top Match Score</span>
                    <div className="flex items-end space-x-2">
                      <div className="text-3xl font-bold text-white tracking-tight">98.4<span className="text-text-muted text-lg">%</span></div>
                      <TrendingUp className="w-5 h-5 text-primary mb-1" />
                    </div>
                  </div>
                </div>

                {/* Widget Action Button */}
                <button className="w-full bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 text-white font-semibold py-4 rounded-xl mt-6 transition-all duration-300 flex items-center justify-center group">
                  <Zap className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                  View Full Match Report
                </button>
              </div>
            </div>

            {/* Background Decoration elements for Widget */}
            <div className="absolute top-[10%] right-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 backdrop-blur-3xl animate-float-medium z-10"></div>
            <div className="absolute bottom-[5%] left-[10%] w-48 h-48 rounded-full bg-gradient-to-tl from-secondary/20 to-transparent border border-secondary/20 backdrop-blur-3xl animate-float-slow z-10" style={{ animationDelay: '2s' }}></div>

          </div>
        </div>

        {/* Premium Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-24 lg:mt-32 relative z-20">
          {FEATURE_CARDS.map((card, idx) => (
            <div key={idx} className="group relative bg-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl p-7 hover:bg-dark-card hover:border-primary/40 transition-all duration-500 overflow-hidden hover:-translate-y-2 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(31,214,85,0.3)]">
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(31,214,85,0.4)] transition-all duration-300">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="relative z-10 font-bold text-xl text-white mb-3 group-hover:text-primary transition-colors duration-300">{card.title}</h3>
              <p className="relative z-10 text-text-muted text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
