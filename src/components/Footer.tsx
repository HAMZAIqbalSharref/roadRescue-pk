import React from 'react';
import { ShieldAlert, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  currentLang: 'EN' | 'UR';
}

export default function Footer({ currentLang }: FooterProps) {
  return (
    <footer id="main-footer" className="w-full bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900 select-none">
          
          {/* Column 1: Logo and brand pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center border border-red-500 shadow-md">
                <ShieldAlert className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                RoadRescue <span className="text-red-500">PK</span>
              </span>
            </div>
            
            <p className="text-3xs text-gray-400 font-sans leading-relaxed">
              Pakistan's premium on-demand roadside vehicle assistance network. Bridging fast-responder mechanics and stranded bike & car owners safely with full live coordinates mapping.
            </p>

            <div className="flex gap-2.5 pt-2">
              <a href="#" className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-gray-400 hover:text-white hover:border-red-550 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-gray-400 hover:text-white hover:border-red-550 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-gray-400 hover:text-white hover:border-red-550 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Emergency Service options */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#cfd4e2] font-display">Services Offered</h4>
            <ul className="space-y-2 text-3xs text-gray-400 font-sans">
              <li><a href="#services" className="hover:text-red-400 transition-colors">Bike General Tuning</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Car Emergency Engine Assist</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Flat Tire Puncture Repairs</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">High-Volt Battery Jumpstart</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Auto Electrical Fuse Diagnostics</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Flatbed Crane Towing Rescue</a></li>
            </ul>
          </div>

          {/* Column 3: Regional Hubs / Neighborhood coverage list */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#cfd4e2] font-display">Regional Divisions</h4>
            <ul className="space-y-2 text-3xs text-gray-400 font-sans">
              <li><span className="text-gray-250 font-medium">Lahore HQ:</span> Gulberg, DHA, Mall Road, Johar Town</li>
              <li><span className="text-gray-250 font-medium">Karachi Hub:</span> Clifton, Defence, Tariq Road, Gulshan</li>
              <li><span className="text-gray-250 font-medium">Islamabad Hub:</span> Blue Area, G-9 Markaz, F-6 Super</li>
              <li><span className="text-gray-250 font-medium">Rawalpindi Hub:</span> Saddar, Bahria Town, Rehmanabad</li>
            </ul>
          </div>

          {/* Column 4: Central Support info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#cfd4e2] font-display">Head Office Support</h4>
            <ul className="space-y-3 text-3xs text-gray-400 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>RoadRescue operations level 4, Centaurus Towers, F-8, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="tel:03111737283" className="hover:text-white transition-colors">03-111-RESCUE (737283)</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:support@roadrescue.pk" className="hover:text-white transition-colors">support@roadrescue.pk</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Direct Subfooter copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-4xs text-gray-500 font-mono select-none">
          <p>© {new Date().getFullYear()} RoadRescue PK - Pakistan's On-Demand Vehicle Assistance. All rights reserved.</p>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-350 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-350 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-350 transition-colors">CNIC Security Guarantee</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
