import React from 'react';
import { Navigation, PhoneCall, UserCheck, ShieldAlert, Zap, Languages } from 'lucide-react';

interface FeaturesProps {
  currentLang: 'EN' | 'UR';
}

const featureList = [
  {
    id: 'gps',
    title: 'Live GPS Tracking',
    urduTitle: 'لائیو جی پی ایس ٹریکنگ',
    description: 'No blind waiting. Watch your dispatched mechanic traveling to your location in real-time on our interactive vector vector maps.',
    icon: Navigation,
    color: 'text-red-500 bg-red-400/5 border-red-500/10'
  },
  {
    id: 'call',
    title: 'One-Tap Calling',
    urduTitle: 'ون ٹچ ہنگامی کال',
    description: 'Connect directly with your matched mechanic or our central 24/7 RoadRescue operators in just one tap without saving phone numbers.',
    icon: PhoneCall,
    color: 'text-amber-500 bg-amber-400/5 border-amber-500/10'
  },
  {
    id: 'verified',
    title: 'Verified Mechanics',
    urduTitle: 'مصدقہ اور رجسٹرڈ میکینکس',
    description: 'Breathe easy. Every partner mechanic holds checked police clearance certificates and matches our rigid skill quality protocols.',
    icon: UserCheck,
    color: 'text-emerald-500 bg-emerald-400/5 border-emerald-500/10'
  },
  {
    id: 'sos',
    title: 'Emergency SOS Channels',
    urduTitle: 'فوری اور ہنگامی مدد',
    description: 'Dangerous highway situation or late night breakdown? Flag as a High Priority Emergency and get immediately bumped up the queue.',
    icon: ShieldAlert,
    color: 'text-rose-500 bg-rose-450/5 border-rose-500/10'
  },
  {
    id: 'response',
    title: 'Rapid Response Times',
    urduTitle: 'تیز ترین رسپانس',
    description: 'With mechanical rescue scouts stationed near critical commuter avenues in Karachi & Lahore, our response averages under 11 minutes.',
    icon: Zap,
    color: 'text-blue-500 bg-blue-400/5 border-blue-500/10'
  },
  {
    id: 'languages',
    title: 'English + Urdu Support',
    urduTitle: 'اردو اور انگریزی سپورٹ',
    description: 'We believe in full accessibility. Swap instantly between English and Urdu options inside the helper dialogues for absolute comfort.',
    icon: Languages,
    color: 'text-indigo-400 bg-indigo-400/5 border-indigo-400/10'
  }
];

export default function Features({ currentLang }: FeaturesProps) {
  return (
    <section id="features" className="w-full py-16 md:py-24 bg-slate-950/40 border-b border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-400 text-3xs font-extrabold rounded-full border border-blue-500/20 uppercase tracking-widest">
            🛡️ ARCHITECTURE FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            {currentLang === 'EN' ? 'Safety Built-In, From Key to Tire' : 'حفاظت اور بہترین سروس کی کوالٹی'}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-sans max-w-lg mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'Our platform is engineered for speed, affordability, and physical security on Pakistan roads.'
              : 'ہمارا پلیٹ فارم پاکستان کی سڑکوں پر رفتار، معقول قیمت اور تحفظ کے لئے خصوصی طور پر تیار کیا گیا ہے۔'}
          </p>
        </div>

        {/* Features 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featureList.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative flex gap-4 p-5 md:p-6 bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl hover:bg-slate-900/80 transition-all duration-300"
                id={`feature-card-${feature.id}`}
              >
                {/* Left side Icon bubble */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-center shrink-0 self-start transition-transform group-hover:scale-105 duration-300 ${feature.color}`}>
                  <IconComponent className="w-5.5 h-5.5 stroke-[2]" />
                </div>

                {/* Right side contents */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-red-500 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <span className="block text-4xs font-bold text-slate-450 font-mono">
                    {feature.urduTitle}
                  </span>
                  
                  <p className="text-3xs text-gray-400 font-sans leading-relaxed pt-1 select-none">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
