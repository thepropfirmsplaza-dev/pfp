import React from 'react';
import { FEATURE_CARDS } from '../constants';
import { ArrowRight, Star, ShieldCheck, Zap, BarChart3, Users } from 'lucide-react';
import heroBgClean from '../assets/hero-bg-clean.png';

// Import Logos
import logo5ers from '../assets/hero-logos/firm-5ers.png';
import logoAlpha from '../assets/hero-logos/firm-alpha.png';
import logoE8 from '../assets/hero-logos/firm-e8markets.png';
import logoFtmo from '../assets/hero-logos/firm-ftmo.png';
import logoFundedNext from '../assets/hero-logos/firm-fundednext.png';
import logoFundingPips from '../assets/hero-logos/firm-fundingpips.png';

// Import Avatars
import avatar1 from '../assets/avatar-1.jpg';
import avatar2 from '../assets/avatar-2.jpg';
import avatar3 from '../assets/avatar-3.jpg';

interface HeroProps {
  onStartQuiz: () => void;
  onExplore: () => void;
}

interface TileProps {
  src: string;
  alt: string;
  color: string;
  darkColor: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  fullBleed?: boolean;
}

const Floating3DTile: React.FC<TileProps> = ({ src, alt, color, darkColor, className, style, delay = '0s', rotateX = 25, rotateY = -15, rotateZ = 10, fullBleed = false }) => {
  return (
    <div
      className={`absolute perspective-wrapper ${className}`}
      style={{
        ...style,
        animationDelay: delay
      }}
    >
      <div className="cube-container" style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)` }}>
        <div className="cube">
          <div className="face front" style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="gloss-overlay"></div>
            <img
              src={src}
              alt={alt}
              className={`${fullBleed ? 'w-full h-full object-cover rounded-[14px]' : 'w-[80%] h-[80%] object-contain'} relative z-10 drop-shadow-2xl select-none`}
              style={{ pointerEvents: 'none' }}
            />
          </div>
          <div className="face back" style={{ backgroundColor: darkColor, border: '1px solid rgba(255,255,255,0.05)' }}></div>
          <div className="face right" style={{ backgroundColor: darkColor }}></div>
          <div className="face left" style={{ backgroundColor: darkColor }}></div>
          <div className="face top" style={{ backgroundColor: color }}></div>
          <div className="face bottom" style={{ backgroundColor: darkColor }}></div>
          <div className="shadow-cast"></div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onStartQuiz, onExplore }) => {
  return (
    <div className="relative pt-24 pb-32 overflow-hidden min-h-screen flex flex-col justify-center perspective-container">
      <style>{`
        .perspective-container { perspective: 2000px; }
        .perspective-wrapper {
            transform-style: preserve-3d;
            animation: float-3d 6s ease-in-out infinite;
        }
        .cube-container {
            width: 100%; height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
        }
        .cube {
            width: 100%; height: 100%; position: relative;
            transform-style: preserve-3d;
        }
        .face {
            position: absolute; width: 100%; height: 100%;
            border-radius: 16px; display: flex; align-items: center; justify-content: center;
            backface-visibility: visible; box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .gloss-overlay {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
            border-radius: 16px; pointer-events: none;
        }
        .front  { transform: translateZ(10px); }
        .back   { transform: rotateY(180deg) translateZ(10px); }
        .right  { width: 20px; right: -10px; top: 0; transform: rotateY(90deg); border-radius: 2px; }
        .left   { width: 20px; left: -10px; top: 0; transform: rotateY(-90deg); border-radius: 2px; }
        .top    { height: 20px; top: -10px; left: 0; transform: rotateX(90deg); border-radius: 2px; }
        .bottom { height: 20px; bottom: -10px; left: 0; transform: rotateX(-90deg); border-radius: 2px; }
        .shadow-cast {
            position: absolute; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); filter: blur(15px);
            transform: translateZ(-50px) translateY(50px) rotateX(90deg); opacity: 0.6;
            border-radius: 50%; z-index: -1;
        }
        @keyframes float-3d { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .text-gradient-premium {
            background: linear-gradient(to right, #ffffff, #A78BFA, #8B5CF6);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .glass-floating-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px -12px rgba(246, 174, 19, 0.25);
            animation: float-card 8s ease-in-out infinite;
        }
        @keyframes float-card { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(2deg); } }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img src={heroBgClean} alt="Hero Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#030014]/90 backdrop-blur-sm"></div>
        {/* Animated Orbs for Depth */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[150px] animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-10 mt-10 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/[0.03] border border-white/[0.08] rounded-full pl-3 pr-5 py-2 mb-8 animate-[fadeIn_0.5s_ease-out] backdrop-blur-md hover:bg-white/[0.05] transition-colors">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-gray-300">Live AI Matching Engine Active</span>
            </div>

            {/* Premium Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight mb-8 leading-[1.1] animate-[fadeIn_0.5s_ease-out]" style={{ animationFillMode: 'both' }}>
              <span className="text-white block mb-2">Discover Your</span>
              <span className="text-gradient-premium inline-block pb-2">Ultimate Edge</span><br />
              <span className="text-white">In Trading.</span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              We instantly analyze 30+ proprietary firms to match your unique strategy with the perfect capital provider. Stop guessing, start scaling.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-8 animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <button
                onClick={onStartQuiz}
                className="group w-full sm:w-auto overflow-hidden relative bg-white text-dark px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span>Launch Matchmaker</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center space-x-4 w-full sm:w-auto mt-4 sm:mt-0 px-2 sm:px-0">
                <div className="flex -space-x-4 hover:-space-x-2 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-full border-2 border-[#030014] bg-primary flex items-center justify-center overflow-hidden shadow-lg relative z-30 group-hover:z-50 group-hover:-translate-y-1 transition-transform">
                    <img src={avatar1} alt="Trader 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#030014] bg-blue-500 flex items-center justify-center overflow-hidden shadow-lg relative z-20 group-hover:z-50 group-hover:-translate-y-1 transition-transform">
                    <img src={avatar2} alt="Trader 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#030014] bg-purple-500 flex items-center justify-center overflow-hidden shadow-lg relative z-10 group-hover:z-50 group-hover:-translate-y-1 transition-transform">
                    <img src={avatar3} alt="Trader 3" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center space-x-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-warning fill-warning text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <span className="text-gray-400 font-medium tracking-wide">10,000+ funded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visualization (5 cols) */}
          <div className="lg:col-span-5 relative h-[500px] w-full hidden lg:block pointer-events-none mt-20 lg:mt-0">

            {/* Glass metric card 1 */}
            <div className="absolute top-[10%] -left-[25%] z-40 glass-floating-card px-5 py-4 rounded-2xl flex items-center space-x-4" style={{ animationDelay: '0s' }}>
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$100M+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capital Allocated</p>
              </div>
            </div>

            {/* Glass metric card 2 */}
            <div className="absolute bottom-[15%] -right-[5%] z-40 glass-floating-card px-5 py-4 rounded-2xl flex items-center space-x-4" style={{ animationDelay: '1.5s' }}>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">30+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Firms</p>
              </div>
            </div>

            {/* 3D Tile Cluster (Tighter arrangement) */}
            <div className="absolute inset-0 flex items-center justify-center scale-[1.25] translate-x-16">
              {/* Central Hero Tile */}
              <Floating3DTile
                src={logoFtmo} alt="FTMO" color="#121212" darkColor="#000000"
                className="z-30 w-36 h-36 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]" rotateX={15} rotateY={-20} rotateZ={5} delay="0s"
              />
              {/* Orbiting Tiles */}
              <Floating3DTile
                src={logoFundingPips} alt="Funding Pips" color="#121355" darkColor="#0a0b2e"
                className="absolute -top-[15%] right-[10%] z-20 w-28 h-28" rotateX={25} rotateY={30} rotateZ={-10} delay="0.5s" fullBleed
              />
              <Floating3DTile
                src={logo5ers} alt="The 5%ers" color="#F59E0B" darkColor="#ea580c"
                className="absolute top-[30%] -left-[15%] z-20 w-24 h-24 drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]" rotateX={-15} rotateY={40} rotateZ={15} delay="1s"
              />
              <Floating3DTile
                src={logoE8} alt="E8 Markets" color="#000000" darkColor="#111111"
                className="absolute bottom-[0%] -left-[0%] z-20 w-28 h-28" rotateX={40} rotateY={-15} rotateZ={-5} delay="1.5s" fullBleed
              />
              <Floating3DTile
                src={logoFundedNext} alt="FundedNext" color="#6366F1" darkColor="#4338CA"
                className="absolute -bottom-[15%] right-[25%] z-20 w-32 h-32" rotateX={-30} rotateY={-25} rotateZ={20} delay="2s"
              />
              <Floating3DTile
                src={logoAlpha} alt="Alpha Capital" color="#3B82F6" darkColor="#1D4ED8"
                className="absolute top-[40%] -right-[10%] z-10 w-20 h-20" rotateX={10} rotateY={-40} rotateZ={-15} delay="2.5s"
              />
            </div>
          </div>
        </div>

        {/* Premium Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 lg:mt-40 relative z-20">
          {FEATURE_CARDS.map((card, idx) => (
            <div key={idx} className="group relative bg-[#0f0b1e]/80 backdrop-blur-md border border-white/[0.05] rounded-[2rem] p-8 hover:bg-[#161229] hover:border-white/[0.1] hover:-translate-y-2 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-500"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:text-primary transition-all duration-300 relative z-10">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-white mb-3 relative z-10">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
