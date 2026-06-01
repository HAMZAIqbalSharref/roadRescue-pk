import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Phone, Languages, Compass } from 'lucide-react';

interface NavbarProps {
  onFindHelpClick: () => void;
  onBecomePartnerClick: () => void;
  onLaunchHUDMap: () => void;
  currentLang: 'EN' | 'UR';
  onLangToggle: () => void;
}

export default function Navbar({ onFindHelpClick, onBecomePartnerClick, onLaunchHUDMap, currentLang, onLangToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLang = () => {
    onLangToggle();
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo element */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center border border-red-500 shadow-lg shadow-red-950/40 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5.5 h-5.5 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display font-black text-lg md:text-xl tracking-wider text-white">
                  RoadRescue <span className="text-red-500 font-bold">PK</span>
                </span>
                <span className="block text-4xs uppercase tracking-widest text-emerald-400 font-sans font-bold leading-none">
                  Assistance • 24/7
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav-menu">
            <a href="#" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-all">
              Home
            </a>
            <a href="#services" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-all">
              Services
            </a>
            <a href="#how-it-works" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-all">
              How It Works
            </a>
            <a href="#features" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-all">
              Features
            </a>
          </nav>

          {/* Action buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 hover:bg-slate-900 transition-all text-xs font-display text-gray-300 hover:text-white"
              title="Toggle Language"
            >
              <Languages className="w-4 h-4 text-red-500" />
              <span>{currentLang === 'EN' ? 'اردو' : 'English'}</span>
            </button>

            <button
              onClick={onBecomePartnerClick}
              className="text-xs font-black font-display text-gray-300 hover:text-white bg-slate-900/40 border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl transition-all"
            >
              Become a Mechanic
            </button>

            <button
              onClick={onLaunchHUDMap}
              className="text-xs font-black font-display bg-[#F5C542] hover:bg-[#ffd147] text-black px-4.5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(245,197,66,0.45)] duration-200 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-black animate-spin-slow shrink-0" />
              <span>HUD GEAR MAP</span>
            </button>

            <button
              onClick={onFindHelpClick}
              className="text-xs font-black font-display bg-red-650 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-950/20 duration-200"
            >
              Find Help Now
            </button>
          </div>

          {/* Hamburger menu trigger (Mobile) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="p-2 border border-gray-850 rounded-xl bg-slate-950 text-gray-300"
            >
              <span className="text-xs font-bold font-mono">{currentLang === 'EN' ? 'اردو' : 'EN'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-gray-850 rounded-xl bg-slate-950 text-gray-300 hover:text-white transition-colors"
              aria-expanded={isOpen}
              id="hamburger-btn"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            <a 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 bg-slate-950/40 border border-gray-900 rounded-xl"
            >
              Home
            </a>
            <a 
              href="#services" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 bg-slate-950/40 border border-gray-900 rounded-xl"
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 bg-slate-950/40 border border-gray-900 rounded-xl"
            >
              How It Works
            </a>
            <a 
              href="#features" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 bg-slate-950/40 border border-gray-900 rounded-xl"
            >
              Features
            </a>
          </nav>

          <div className="h-px bg-gray-850 my-4" />

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onBecomePartnerClick();
              }}
              className="w-full text-center text-xs font-bold font-display hover:text-white text-gray-300 border border-gray-800 bg-slate-950/80 py-3 rounded-xl transition-all"
            >
              Become a Mechanic (میکینک بنیں)
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onLaunchHUDMap();
              }}
              className="w-full text-center text-xs font-black font-display bg-[#F5C542] text-black hover:bg-[#ffda66] py-3.5 rounded-xl transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-black animate-spin-slow" />
              <span>LAUNCH HUD MAP (لائیو میپ)</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onFindHelpClick();
              }}
              className="w-full text-center text-xs font-black font-display bg-red-650 hover:bg-red-700 text-white py-3.5 rounded-xl transition-all shadow-lg shadow-red-950/30"
            >
              Find Help Now (مدد حاصل کریں)
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 text-3xs text-gray-400 font-mono text-center mt-4">
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>Emergency operations hotline active: 03-111-737283</span>
          </div>
        </div>
      )}
    </header>
  );
}
