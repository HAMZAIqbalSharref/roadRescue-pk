import React from 'react';
import { ShieldAlert, ChevronRight, Briefcase } from 'lucide-react';

interface CTASectionProps {
  onFindHelpClick: () => void;
  onBecomePartnerClick: () => void;
  currentLang: 'EN' | 'UR';
}

export default function CTASection({ onFindHelpClick, onBecomePartnerClick, currentLang }: CTASectionProps) {
  return (
    <section id="cta" className="relative w-full overflow-hidden py-16 md:py-20 bg-gradient-to-r from-red-950/60 via-slate-950 to-slate-900 border-b border-slate-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-10 w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Core title badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/95 text-3xs font-extrabold uppercase tracking-widest mx-auto">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          {currentLang === 'EN' ? '24/7 ACTIVE DISPATCH PK' : 'چوبیس گھنٹے ہنگامی امداد لائیو'}
        </div>

        {/* Headlines */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight leading-none">
            {currentLang === 'EN' ? (
              <>Don’t Let a Flat Tire <br />Stop Your Journey.</>
            ) : (
              <>سفر کو منقطع نہ ہونے دیں</>
            )}
          </h2>
          
          <p className="text-sm md:text-base text-gray-300 font-sans leading-relaxed">
            {currentLang === 'EN'
              ? 'Request a fast-responder mechanical scout in Karachi, Lahore, and Islamabad now. Zero upfront bookings, pay on-site standard rates only.'
              : 'ابھی لاہور، کراچی اور اسلام آباد میں اپنے موبائل اسکرین سے لائیو میکینک منگوائیں۔ کوئی رجسٹریشن فیس نہیں، کام مکمل ہونے پر ادائیگی کریں۔'}
          </p>
        </div>

        {/* Action button options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          
          <button
            onClick={onFindHelpClick}
            className="w-full sm:w-auto bg-red-650 hover:bg-red-700 active:scale-98 text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-red-950/30 font-display text-sm tracking-wide flex items-center justify-center gap-2 duration-150 cursor-pointer"
          >
            Find Nearby Mechanic
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={onBecomePartnerClick}
            className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-gray-300 hover:text-white font-bold py-4 px-6 rounded-2xl transition-all font-display text-xs flex items-center justify-center gap-2 duration-150 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-red-550" />
            Join as Partner Mechanic
          </button>

        </div>

        {/* Direct emergency numbers text support */}
        <p className="text-3xs text-gray-400 font-mono tracking-wide pt-4">
          Prefer classical dialing? Operational telephone helpline: <strong className="text-red-400">03-111-737283</strong>
        </p>

      </div>
    </section>
  );
}
