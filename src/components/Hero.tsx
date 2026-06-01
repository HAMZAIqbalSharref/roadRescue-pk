import React, { useState } from 'react';
import { Shield, Sparkles, Navigation, Phone, HeartHandshake, Play, MapPin, Compass } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

interface HeroProps {
  onFindHelpClick: () => void;
  onBecomePartnerClick: () => void;
  onLaunchHUDMap: () => void;
  currentLang: 'EN' | 'UR';
}

export default function Hero({ onFindHelpClick, onBecomePartnerClick, onLaunchHUDMap, currentLang }: HeroProps) {
  const [demoVehicle, setDemoVehicle] = useState<'car' | 'bike'>('car');

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-8 pb-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading text content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left animate-in fade-in slide-in-from-left duration-500">
            
            {/* Live operational status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-3xs md:text-2xs font-bold font-sans text-slate-350 tracking-wider">
                {currentLang === 'EN' 
                  ? 'ON-DEMAND COVERAGE LIVE: LAHORE, KARACHI, ISLAMABAD' 
                  : 'لائیو کوریج: لاہور، کراچی، اسلام آباد'}
              </span>
            </div>

            {/* Headline and Supporting text */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold font-display leading-[1.15] text-white tracking-tight">
                {currentLang === 'EN' ? (
                  <>
                    Stranded on the Road? <br />
                    <span className="text-red-500 underline decoration-red-650 decoration-wavy decoration-1 underline-offset-6">
                      Find Nearby Mechanics
                    </span> Instantly.
                  </>
                ) : (
                  <>
                    سڑک پر پھنس گئے ہیں؟ <br />
                    <span className="text-red-500">قریبی مکینک</span> ابھی تلاش کریں۔
                  </>
                )}
              </h1>
              
              <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed max-w-2xl">
                {currentLang === 'EN' 
                  ? "Pakistan's premium on-demand roadside assistance. Whether your bike has a tire puncture, your car battery is dead, or you need towing, match with certified local mechanics on live GPS network within minutes."
                  : "پاکستان کا بہترین سڑک کے کنارے گاڑیوں کی مدد کا پلیٹ فارم۔ چاہے موٹر سائیکل کا پنکچر ہو، کار کی بیٹری ڈیڈ ہو یا ٹوونگ کی ضرورت، منٹوں میں قریبی مصدقہ مکینک سے رابطہ کریں۔"}
              </p>
            </div>

            {/* Micro details counter cards */}
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-3 md:p-4 hover:border-slate-850 hover:bg-slate-950/70 transition-all">
                <span className="block text-xl md:text-2xl font-black text-white font-display">11<span className="text-red-500 text-sm">min</span></span>
                <span className="block text-3xs text-gray-400 font-sans uppercase font-medium mt-0.5 tracking-wider">Avg Response</span>
              </div>
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-3 md:p-4 hover:border-slate-850 hover:bg-slate-950/70 transition-all">
                <span className="block text-xl md:text-2xl font-black text-white font-display">1,200<span className="text-red-500 text-xs">+</span></span>
                <span className="block text-3xs text-gray-400 font-sans uppercase font-medium mt-0.5 tracking-wider">Verified Units</span>
              </div>
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-3 md:p-4 hover:border-slate-850 hover:bg-slate-950/70 transition-all">
                <span className="block text-xl md:text-2xl font-black text-emerald-400 font-display">₨ 299<span className="text-gray-400 text-3xs font-medium">/base</span></span>
                <span className="block text-3xs text-gray-400 font-sans uppercase font-medium mt-0.5 tracking-wider">Fixed Pricing</span>
              </div>
            </div>

            {/* Main CTAs row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onFindHelpClick}
                className="bg-red-650 hover:bg-red-700 active:scale-98 text-white font-extrabold py-4 px-6 rounded-2xl transition-all shadow-xl shadow-red-950/30 font-display text-sm tracking-wide flex items-center justify-center gap-2 duration-150 cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                {currentLang === 'EN' ? 'Rapid Dispatch' : 'ابھی مدد تلاش کریں'}
              </button>

              <button
                onClick={onLaunchHUDMap}
                className="bg-[#F5C542] hover:bg-[#ffd147] text-black font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-amber-950/20 font-display text-sm tracking-wide flex items-center justify-center gap-2 duration-150 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-black animate-spin-slow" />
                {currentLang === 'EN' ? 'Launch HUD GPS Map' : 'لائیو جی پی ایس میپ'}
              </button>

              <button
                onClick={onBecomePartnerClick}
                className="bg-slate-950 hover:bg-slate-900 active:scale-98 border border-slate-800 hover:border-slate-750 text-gray-300 hover:text-white font-bold py-4 px-5 rounded-2xl transition-all font-display text-sm flex items-center justify-center gap-1.5 duration-150 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-red-500" />
                {currentLang === 'EN' ? 'Become Partner' : 'میکینک بنیں (رجسٹریشن)'}
              </button>
            </div>

            {/* Trust badge with security accreditation */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-900 max-w-xl">
              <div className="p-1 px-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-3xs font-black rounded uppercase">
                CNIC Verified
              </div>
              <p className="text-3xs text-slate-400 font-sans leading-relaxed">
                {currentLang === 'EN'
                  ? 'All RoadRescue mechanics must upload biometric CNIC registration and undergo police verification tests.'
                  : 'تمام روڈ ریسکیو میکینکس کے لئے بائیو میٹرک شناختی کارڈ اور پولیس کلیئرنس لازمی ہے۔'}
              </p>
            </div>

          </div>

          {/* Right Column: Immersive Interactive Smartphone Live-Tracking Display Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center animate-in fade-in slide-in-from-right duration-500 delay-150">
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-slate-900/40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-slate-900/80 pointer-events-none" />

            {/* SmartPhone frame wrapper */}
            <div className="w-full max-w-[380px] bg-slate-950 border-[5px] border-slate-900 rounded-[35px] shadow-2xl overflow-hidden aspect-[9/16] relative flex flex-col p-2 select-none">
              
              {/* Speaker capsule / camera notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 border border-slate-900 shadow rounded-full z-30 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-900 rounded-full" />
                <div className="w-2.5 h-2.5 ml-2 rounded-full bg-slate-900 border border-slate-950" />
              </div>

              {/* Status bar inside screen */}
              <div className="h-7 px-5 flex justify-between items-center text-gray-500 font-mono text-[9px] mt-1.5 z-20">
                <span>04:22 PKT</span>
                <div className="flex items-center gap-1">
                  <span>LTE</span>
                  <div className="w-3.5 h-2 border border-gray-650 rounded-xs bg-gray-600" />
                </div>
              </div>

              {/* Map Container selector controls */}
              <div className="px-3 pb-2 pt-1 flex justify-between items-center z-20">
                <span className="text-3xs font-bold font-display text-white">Live Matching Simulator</span>
                <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setDemoVehicle('car')}
                    className={`px-2 py-0.5 text-4xs font-bold rounded cursor-pointer transition-all ${demoVehicle === 'car' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Car Setup
                  </button>
                  <button
                    onClick={() => setDemoVehicle('bike')}
                    className={`px-2 py-0.5 text-4xs font-bold rounded cursor-pointer transition-all ${demoVehicle === 'bike' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Bike Setup
                  </button>
                </div>
              </div>

              {/* Nested Map module */}
              <div className="flex-1 rounded-[25px] overflow-hidden relative">
                <InteractiveMap
                  city="Lahore"
                  vehicleType={demoVehicle}
                  serviceType="Flat Tire"
                  isSimulating={false} // Offline stand-by preview state
                />
              </div>

            </div>

            {/* Floating Info card (nearby mechanical dispatcher) */}
            <div className="absolute -left-6 bottom-16 bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 max-w-[190px] animate-bounce duration-5000">
              <div className="p-2 bg-red-600/10 text-red-500 rounded-xl border border-red-500/20">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-4xs uppercase tracking-wider text-gray-400 font-sans font-semibold">Lahore Cantonment</span>
                <span className="block text-2xs font-extrabold text-white font-display mt-0.5">8 Available Mechanics</span>
                <span className="block text-3xs text-emerald-400 font-sans font-medium">Average ETA: 9 min</span>
              </div>
            </div>

            {/* Floating emergency SOS card */}
            <div className="absolute -right-4 top-1/3 bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[210px]">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0" />
              <div>
                <span className="block text-4xs uppercase tracking-wider text-red-500 font-sans font-extrabold">🚨 Active Rescue Units</span>
                <span className="block text-2xs text-gray-350 font-sans mt-0.5">14 active rescues in Karachi right now.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
