import React from 'react';
import { ViewState } from '../types';
import { FEATURE_CARDS } from '../constants';
import { ArrowRight, Play, Star } from 'lucide-react';
import heroBgClean from '../assets/hero-bg-clean.png';

// Import Logos
import logo5ers from '../assets/hero-logos/firm-5ers.png';
import logoAlpha from '../assets/hero-logos/firm-alpha.png';
import logoBerry from '../assets/hero-logos/firm-berry.png';
import logoE8 from '../assets/hero-logos/firm-e8markets.png';
import logoFtmo from '../assets/hero-logos/firm-ftmo.png';
import logoFundedNext from '../assets/hero-logos/firm-fundednext.png';
import logoFundingPips from '../assets/hero-logos/firm-fundingpips.png';
import logoGft from '../assets/hero-logos/firm-gft.png';
import logoThink from '../assets/hero-logos/firm-thinkcapital.png';
import logoTopOne from '../assets/hero-logos/firm-topone.png';

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
          {/* Front Face with Logo */}
          <div className="face front" style={{ backgroundColor: color }}>
            <div className="gloss-overlay"></div>
            <img
              src={src}
              alt={alt}
              className={`${fullBleed ? 'w-full h-full object-cover rounded-[14px]' : 'w-[85%] h-[85%] object-contain'} relative z-10 drop-shadow-md select-none`}
              style={{ pointerEvents: 'none' }}
            />
          </div>
          {/* Back Face */}
          <div className="face back" style={{ backgroundColor: darkColor }}></div>
          {/* Sides ensuring 3D thickness */}
          <div className="face right" style={{ backgroundColor: darkColor }}></div>
          <div className="face left" style={{ backgroundColor: darkColor }}></div>
          <div className="face top" style={{ backgroundColor: color }}></div>
          <div className="face bottom" style={{ backgroundColor: darkColor }}></div>

          {/* Shadow */}
          <div className="shadow-cast"></div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onStartQuiz, onExplore }) => {
  return (
    <div className="relative pt-32 pb-40 overflow-hidden min-h-screen flex flex-col justify-center perspective-container">
      {/* CSS for 3D Animations and Cube Structure */}
      <style>{`
        .perspective-container {
            perspective: 2000px;
        }
        .perspective-wrapper {
            width: 100px;
            height: 100px;
            transform-style: preserve-3d;
            animation: float-3d 6s ease-in-out infinite;
        }
        .cube-container {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
        }
        .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
        }
        .face {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 16px; /* Rounded corners for chiclet look */
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden; /* Hides backfaces for smoother rendering if needed, but we want thickness */
            backface-visibility: visible;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .gloss-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
            border-radius: 16px;
            pointer-events: none;
        }
        
        /* Thickness = 20px */
        .front  { transform: translateZ(10px); }
        .back   { transform: rotateY(180deg) translateZ(10px); }
        
        /* True Box Approach */
        .right  { width: 24px; left: 88px; transform: rotateY(90deg) translateZ(0px); border-radius: 2px; }
        .left   { width: 24px; left: -12px; transform: rotateY(-90deg) translateZ(0px); border-radius: 2px; }
        .top    { height: 24px; top: -12px; transform: rotateX(90deg) translateZ(0px); border-radius: 2px; }
        .bottom { height: 24px; top: 88px; transform: rotateX(-90deg) translateZ(0px); border-radius: 2px; }


        .shadow-cast {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            filter: blur(15px);
            transform: translateZ(-50px) translateY(50px) rotateX(90deg);
            opacity: 0.6;
            border-radius: 50%;
            z-index: -1;
        }

        @keyframes float-3d {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .perspective-wrapper { transform: scale(0.6); }
        }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgClean}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
      </div>

      {/* 3D Floating Logos Container */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-60">

        {/* FTMO - Left Top (Classic Black/Dark Blue) */}
        <Floating3DTile
          src={logoFtmo}
          alt="FTMO"
          color="#121212"
          darkColor="#000000"
          className="left-[5%] top-[15%] w-28 h-28 md:w-36 md:h-36"
          rotateX={20} rotateY={25} rotateZ={-10}
          delay="0s"
        />

        {/* 5%ers - Left Mid (Yellow/Orange) */}
        <Floating3DTile
          src={logo5ers}
          alt="The 5%ers"
          color="#F59E0B"
          darkColor="#ea580c"
          className="left-[15%] top-[40%] w-24 h-24 md:w-32 md:h-32"
          rotateX={30} rotateY={15} rotateZ={-5}
          delay="1s"
        />

        {/* FundedNext - Left Bottom (Purple/Indigo) */}
        <Floating3DTile
          src={logoFundedNext}
          alt="FundedNext"
          color="#6366F1"
          darkColor="#4338CA"
          className="left-[8%] top-[65%] w-20 h-20 md:w-28 md:h-28"
          rotateX={40} rotateY={30} rotateZ={15}
          delay="2s"
        />

        {/* Alpha - Center Left (Blue) */}
        <Floating3DTile
          src={logoAlpha}
          alt="Alpha Capital"
          color="#3B82F6"
          darkColor="#1D4ED8"
          className="left-[25%] top-[25%] w-16 h-16 md:w-24 md:h-24"
          rotateX={10} rotateY={-10} rotateZ={5}
          delay="1.5s"
        />

        {/* Funding Pips - Right Top (Emerald Green) */}
        <Floating3DTile
          src={logoFundingPips}
          alt="Funding Pips"
          color="#121355"
          darkColor="#0a0b2e"
          className="right-[10%] top-[15%] w-28 h-28 md:w-36 md:h-36"
          rotateX={20} rotateY={-25} rotateZ={10}
          delay="0.5s"
          fullBleed
        />

        {/* E8 - Right Mid (Deep Blue) */}
        <Floating3DTile
          src={logoE8}
          alt="E8 Markets"
          color="#000000"
          darkColor="#111111"
          className="right-[15%] top-[45%] w-24 h-24 md:w-32 md:h-32"
          rotateX={30} rotateY={-15} rotateZ={5}
          delay="1.2s"
          fullBleed
        />

        {/* Think Capital - Right Bottom (White/Light Grey) */}
        <Floating3DTile
          src={logoThink}
          alt="Think Capital"
          color="#F3F4F6"
          darkColor="#9CA3AF"
          className="right-[5%] top-[70%] w-20 h-20 md:w-28 md:h-28"
          rotateX={45} rotateY={-20} rotateZ={-15}
          delay="2.5s"
        />

        {/* TopOne - Center Right Scattering (Red) */}
        <Floating3DTile
          src={logoTopOne}
          alt="TopOne"
          color="#EF4444"
          darkColor="#991B1B"
          className="right-[28%] top-[30%] w-16 h-16 md:w-20 md:h-20"
          rotateX={15} rotateY={10} rotateZ={-5}
          delay="3s"
        />

        {/* Berry - Deep Center Left (Purple) */}
        <Floating3DTile
          src={logoBerry}
          alt="Berry"
          color="#A855F7"
          darkColor="#6B21A8"
          className="left-[35%] top-[55%] w-14 h-14 md:w-18 md:h-18"
          rotateX={60} rotateY={40} rotateZ={20}
          delay="3.5s"
        />

        {/* GFT - Center Left (Grey) */}
        <Floating3DTile
          src={logoGft}
          alt="GFT"
          color="#4B5563"
          darkColor="#1F2937"
          className="left-[30%] top-[10%] w-14 h-14 md:w-18 md:h-18"
          rotateX={-10} rotateY={20} rotateZ={-10}
          delay="4s"
        />

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/[0.05] border border-white/10 rounded-full pl-2 pr-4 py-1.5 mb-10 animate-fade-in backdrop-blur-md hover:bg-white/[0.1] transition-colors cursor-default ring-1 ring-white/5 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <div className="bg-primary/20 p-1 rounded-full">
            <Star className="w-3 h-3 text-primary fill-current" />
          </div>
          <span className="text-xs font-semibold text-white tracking-wide uppercase shadow-sm">AI-Powered Verification</span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight drop-shadow-2xl py-4 overflow-visible">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Your Path To </span>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 italic pr-8 pb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Professional Funding.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-light drop-shadow-md">
          Stop guessing. Capital Match analyzes 400+ firms in real-time to find your perfect funding partner based on your unique trading style.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
          <button
            onClick={onStartQuiz}
            className="group w-full sm:w-auto btn-primary px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] transition-all duration-300 transform hover:scale-105"
          >
            Start AI Match <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onExplore}
            className="group w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center backdrop-blur-md hover:scale-105"
          >
            Browse Directory
          </button>
        </div>

        {/* Feature Grid - Premium Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {FEATURE_CARDS.map((card, idx) => (
            <div key={idx} className="relative overflow-hidden p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 group shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.3)] hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/20 transition-all duration-300 relative z-10 shadow-inner">
                <card.icon className="text-white group-hover:text-primary w-7 h-7 transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all relative z-10">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light relative z-10 group-hover:text-gray-300 transition-colors delay-75">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
