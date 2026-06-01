import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

interface TestimonialsProps {
  currentLang: 'EN' | 'UR';
}

const testimonialsData = [
  {
    id: 't1',
    name: 'Asim Raza',
    location: 'Gulberg, Lahore',
    vehicle: 'Toyota Corolla Owner',
    content: "My radiator cooling fan suddenly stopped on Mall Road around midnight in intense heat. I was afraid mechanics would overcharge me. Found RoadRescue, requested repair, and Zahid Autos arrived in under 12 minutes! Replaced assembly fuse and saved my night. Honest, fixed rate of ₨ 499.",
    rating: 5,
    tag: 'Engine Overheat'
  },
  {
    id: 't2',
    name: 'Kiran Fatima',
    location: 'Clifton, Karachi',
    vehicle: 'Honda CD 70 Rider',
    content: "Got a flat tire on my way back from tuition near Sea View Karachi. Being a female commuter, safety was my biggest concern. Using the RoadRescue SOS channel, Asif arrived with biometric proof, fixed the tube patch, and waited until my bike safely started. Extremely secure and reliable!",
    rating: 5,
    tag: 'Quick Puncture Patch'
  },
  {
    id: 't3',
    name: 'Muhammad Bilal',
    location: 'Blue Area, Islamabad',
    vehicle: 'Suzuki Swift Owner',
    content: "My hatchback battery died during rainy weather in Islamabad. Local crane towing requested 3,000 rupees. A certified RoadRescue electrician arrived on a bike with heavy jumpstart cables and kickstarted the engine in seconds. Charges were only 350 rupees as predefined. Excellent platform!",
    rating: 5,
    tag: 'Jumpstart Support'
  }
];

export default function Testimonials({ currentLang }: TestimonialsProps) {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 bg-slate-950/20 border-b border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header line */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 text-3xs font-extrabold rounded-full border border-amber-500/20 uppercase tracking-widest">
            ⭐ COMMUTER FEEDBACK
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            {currentLang === 'EN' ? 'Saved by RoadRescue PK' : 'مسافروں کی سچی کہانیاں'}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-sans max-w-md mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'Real reviews from bike and car drivers rescued across Lahore, Karachi and Islamabad.'
              : 'لاہور، کراچی اور اسلام آباد میں پھنسے ہوئے شہریوں کے سچے تاثرات۔'}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-6 md:p-8 bg-slate-900/40 border border-slate-900 rounded-3xl hover:border-slate-800 hover:bg-slate-900/80 transition-all duration-300 relative"
              id={`testimonial-card-${t.id}`}
            >
              {/* Star Rating & Category Tag */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                
                <span className="px-2.5 py-0.5 rounded-full bg-red-650/10 border border-red-500/20 text-red-400 text-4xs font-mono font-bold uppercase">
                  {t.tag}
                </span>
              </div>

              {/* Main Content Paragraph */}
              <p className="text-3xs md:text-2xs text-gray-300 font-sans leading-relaxed italic mb-6">
                "{t.content}"
              </p>

              {/* Commuter Bio Footer */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-900/80">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center font-display font-black text-xs text-white uppercase shadow-inner">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white font-display leading-tight">{t.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/10" title="Verified Rescued User" />
                  </div>
                  <p className="text-3xs text-gray-400 font-sans">{t.vehicle} • {t.location}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
