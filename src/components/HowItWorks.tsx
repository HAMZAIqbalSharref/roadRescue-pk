import React from 'react';
import { MapPin, Navigation, HeartHandshake, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  currentLang: 'EN' | 'UR';
}

const steps = [
  {
    number: '01',
    title: 'Share Your Pin Location',
    urduTitle: 'لوکیشن شیئر کریں',
    description: 'Select your vehicle type, pick your breakdown issue on the emergency portal, and let our GPS scanner locate your stationary coordinates automatically.',
    icon: MapPin,
    accentColor: 'text-red-500 bg-red-500/10 border-red-500/20'
  },
  {
    number: '02',
    title: 'Match With Nearest Mechanic',
    urduTitle: 'میکینک سے رابطہ کریں',
    description: 'Our cellular dispatcher instantly alerts verified mechanics within a 3KM radial zone. You get to review their live profile ratings, CNIC validation, and vehicle list.',
    icon: Navigation,
    accentColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    number: '03',
    title: 'Get Fast Roadside Help',
    urduTitle: 'مسئلہ حل کروائیں',
    description: 'Track your assigned mechanic moving down the street in real-time. He arrives, fixes the fault, registers the diagnostic log, and you pay a standard predefined fare.',
    icon: HeartHandshake,
    accentColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
  }
];

export default function HowItWorks({ currentLang }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-slate-950/20 border-b border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-3xs font-extrabold rounded-full border border-emerald-500/20 uppercase tracking-widest">
            ⚙️ RESPONSE PROTOCOL
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            {currentLang === 'EN' ? 'How RoadRescue Works' : 'روڈ ریسکیو کس طرح کام کرتا ہے؟'}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-sans max-w-lg mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'Three simple stages to get you back on route safely. No app downloads required.'
              : 'گاڑی دوبارہ چالو کرنے کے تین آسان مراحل۔ پلے اسٹور سے بھاری ایپس ڈاؤن لوڈ کرنے کی ضرورت نہیں ہے۔'}
          </p>
        </div>

        {/* Timeline Steps Layout */}
        <div className="relative">
          {/* Horizontal dotted connector line (Desktop only) */}
          <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-0.5 border-t border-dashed border-slate-800 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.number}
                  className="group flex flex-col items-center text-center p-6 bg-slate-900/40 border border-slate-900 rounded-2xl hover:border-slate-800 hover:bg-slate-900/80 transition-all duration-300"
                >
                  {/* Step Icon and visual Number Indicator bubble */}
                  <div className="relative mb-6">
                    <div className={`w-18 h-18 rounded-2xl flex items-center justify-center border text-slate-400 shadow-xl transition-transform group-hover:scale-105 duration-300 ${step.accentColor}`}>
                      <IconComp className="w-8 h-8 stroke-[1.8]" />
                    </div>
                    
                    {/* Number label overlay */}
                    <span className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex items-center justify-center font-mono font-black text-xs shadow">
                      {step.number}
                    </span>
                  </div>

                  {/* Step description headers */}
                  <div className="space-y-2 max-w-xs">
                    <h3 className="text-base font-bold text-white font-display group-hover:text-red-500 transition-colors">
                      {step.title}
                    </h3>
                    <span className="block text-4xs font-bold text-slate-500 font-mono">
                      {step.urduTitle}
                    </span>
                    <p className="text-3xs text-gray-400 font-sans leading-relaxed pt-1.5">
                      {step.description}
                    </p>
                  </div>

                  {/* Direction symbol for connectivity (Except last) */}
                  {idx < 2 && (
                    <div className="hidden lg:flex absolute top-[58px] right-[-20px] z-10 w-10 h-10 items-center justify-center rounded-full bg-slate-950 border border-slate-900 text-gray-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
