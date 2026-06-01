import React from 'react';
import { Bike, Car, Wrench, Zap, Cpu, Truck, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
  currentLang: 'EN' | 'UR';
}

const serviceList = [
  {
    id: 'bike',
    title: 'Bike Repair & Tuning',
    urduTitle: 'موٹر سائیکل کی مرمت',
    description: 'Specialized 2-wheeler mechanics for clutch wire snap, engine heat, tuning, chains and carburettor diagnostics.',
    icon: Bike,
    basePrice: '₨ 299',
    tag: 'Quick Response',
    colorClass: 'group-hover:text-amber-500 group-hover:bg-amber-500/10 border-amber-500/15',
    pillClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  },
  {
    id: 'car',
    title: 'Car General Repair',
    urduTitle: 'گاڑی کی مکینیکل ہنگامی مرمت',
    description: 'Roadside engine inspection, coolant leakage, radiator cooling fan repair, brake pad check, oil top-up.',
    icon: Car,
    basePrice: '₨ 799',
    tag: 'All Hatchback/SUV',
    colorClass: 'group-hover:text-blue-500 group-hover:bg-blue-500/10 border-blue-500/15',
    pillClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    id: 'puncture',
    title: 'Puncture & Tire swaps',
    urduTitle: 'ٹائر پنکچر اور تبدیلی',
    description: 'On-site tire puncture repair, tubeless tire patch insertion, or spare tire wheel (stepney) swapping service.',
    icon: Wrench,
    basePrice: '₨ 249',
    tag: 'Most Requested',
    colorClass: 'group-hover:text-emerald-500 group-hover:bg-emerald-500/10 border-emerald-500/15',
    pillClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'battery',
    title: 'Battery Jumpstart & diagnostics',
    urduTitle: 'بیٹری جمپ اسٹارٹ',
    description: 'Dead battery high-amp cable jumpstarting. Voltage testing, acid levels top-up or new battery swap assistance.',
    icon: Zap,
    basePrice: '₨ 349',
    tag: 'Instant Start',
    colorClass: 'group-hover:text-red-500 group-hover:bg-red-500/10 border-red-500/15',
    pillClass: 'bg-red-500/10 text-red-400 border-red-500/20'
  },
  {
    id: 'electrician',
    title: 'Auto Electrician Works',
    urduTitle: 'آٹو الیکٹریشن',
    description: 'Blown fuses replacement, wiring short-circuit fix, alternator recharge diagnostic, headlights & engine ECU wiring.',
    icon: Cpu,
    basePrice: '₨ 499',
    tag: 'Wiring Specialist',
    colorClass: 'group-hover:text-violet-500 group-hover:bg-violet-500/10 border-violet-500/15',
    pillClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  },
  {
    id: 'towing',
    title: 'Towing & Flatbed Recoveries',
    urduTitle: 'ٹوونگ اور فلیٹ بیڈ',
    description: 'Safe flatbed loader trucks or simple tow-bars to recover totally paralyzed vehicles to workshops across town.',
    icon: Truck,
    basePrice: '₨ 1,499',
    tag: 'Heavy Duty Rescue',
    colorClass: 'group-hover:text-rose-500 group-hover:bg-rose-500/10 border-rose-500/15',
    pillClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }
];

export default function Services({ onSelectService, currentLang }: ServicesProps) {
  return (
    <section id="services" className="w-full py-16 md:py-24 border-y border-slate-900 bg-slate-950/40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-900/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-500 text-3xs font-extrabold rounded-full border border-red-500/20 uppercase tracking-widest">
            🛡️ EMERGENCY SERVICES LIST
          </span>
          
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            {currentLang === 'EN' 
              ? 'Our Instant Roadside Repair Units' 
              : 'ہماری فوری سڑک کے کنارے ہنگامی خدمات'}
          </h2>
          
          <p className="text-xs md:text-sm text-gray-400 font-sans max-w-xl mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'All services are backed by our zero-overcharge policy, licensed tracking GPS networks, and standardized diagnostic reports.'
              : 'تمام خدمات ہمارے فکسڈ بلنگ قوانین اور پولیس سے منظور شدہ بائیو میٹرک مکینکس کے زیر تحفظ سرانجام پاتی ہیں۔'}
          </p>
        </div>

        {/* Services Bento-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 hover:bg-slate-900/95 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                {/* Background glow circle */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/2 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Badge and Icon line */}
                  <div className="flex justify-between items-start mb-5">
                    <div className={`p-3 bg-slate-900/90 rounded-2xl border border-slate-850/80 text-gray-400 shadow-md transition-all ${service.colorClass}`}>
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    
                    <span className={`px-2.5 py-0.5 rounded text-4xs font-bold uppercase tracking-wide border ${service.pillClass}`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Service naming info */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white font-display group-hover:text-red-500 transition-colors flex items-center gap-1">
                      {service.title}
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    
                    <span className="block text-4xs font-bold text-slate-450 font-mono">
                      {service.urduTitle}
                    </span>
                    
                    <p className="text-3xs text-gray-400 font-sans leading-relaxed pt-1 select-none">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Pricing indicators footer */}
                <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between">
                  <div className="text-left select-none">
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">Estimated Base Fare</span>
                    <p className="text-sm font-black font-mono text-emerald-400 mt-0.5">
                      {service.basePrice} <span className="text-[10px] text-gray-400 font-normal">onwards</span>
                    </p>
                  </div>
                  
                  <span className="text-xs font-bold font-display px-3 py-1.5 bg-slate-900 border border-slate-850 text-white rounded-lg group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all select-none">
                    Select
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
