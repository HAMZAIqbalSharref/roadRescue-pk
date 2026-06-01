import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import HelpWizardModal from './components/HelpWizardModal';
import BecomePartnerModal from './components/BecomePartnerModal';
import NfsMapDashboard from './components/NfsMapDashboard';

export default function App() {
  const [lang, setLang] = useState<'EN' | 'UR'>('EN');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isHUDOpen, setIsHUDOpen] = useState(false);
  const [preSelectedVehicleType, setPreSelectedVehicleType] = useState<'car' | 'bike'>('car');

  const triggerHelpWizard = (vehicleType: 'car' | 'bike' = 'car') => {
    setPreSelectedVehicleType(vehicleType);
    setIsHelpOpen(true);
  };

  const selectServiceAndOpen = (serviceId: string) => {
    const defaultVehicle = serviceId === 'bike' ? 'bike' : 'car';
    setPreSelectedVehicleType(defaultVehicle);
    setIsHelpOpen(true);
  };

  const handleLangToggle = () => {
    setLang(prev => prev === 'EN' ? 'UR' : 'EN');
  };

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-gray-100 flex flex-col justify-between selection:bg-red-650 selection:text-white antialiased">
      {/* Dynamic top notifications marquee banner */}
      <div className="bg-red-650 text-white py-1.5 px-4 font-display font-semibold text-4xs uppercase tracking-widest text-center shadow-sm flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0" />
        <span>
          {lang === 'EN' 
            ? 'Monsoon rain emergency standby patrols deployed across Shahrah-e-Faisal Karachi & Mall Road Lahore' 
            : 'لاہور، کراچی اور اسلام آباد میں مون سون ایمرجنسی پٹرول فعال کر دیا گیا ہے'}
        </span>
      </div>

      {/* Styled Responsive Navigation */}
      <Navbar 
        onFindHelpClick={() => triggerHelpWizard('car')}
        onBecomePartnerClick={() => setIsPartnerOpen(true)}
        onLaunchHUDMap={() => setIsHUDOpen(true)}
        currentLang={lang}
        onLangToggle={handleLangToggle}
      />

      {/* Main Structural Body */}
      <main className="flex-grow">
        
        {/* Hero Segment */}
        <Hero 
          onFindHelpClick={() => triggerHelpWizard('car')}
          onBecomePartnerClick={() => setIsPartnerOpen(true)}
          onLaunchHUDMap={() => setIsHUDOpen(true)}
          currentLang={lang}
        />

        {/* Brand Service Categories Segment */}
        <Services 
          onSelectService={selectServiceAndOpen}
          currentLang={lang}
        />

        {/* Explanatory "How It Works" Timeline Segment */}
        <HowItWorks currentLang={lang} />

        {/* Technical Features & Core Security Offerings */}
        <Features currentLang={lang} />

        {/* Real Rescued User Testimonials */}
        <Testimonials currentLang={lang} />

        {/* Urgent Call-To-Action Area */}
        <CTASection 
          onFindHelpClick={() => triggerHelpWizard('car')}
          onBecomePartnerClick={() => setIsPartnerOpen(true)}
          currentLang={lang}
        />

      </main>

      {/* Footnote Branding Copyright Footer */}
      <Footer currentLang={lang} />

      {/* MODALS CONTROLLERS */}
      
      {/* 1. Interactive Rescue Support Dispatch Portal */}
      <HelpWizardModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        initialVehicle={preSelectedVehicleType}
      />

      {/* 2. Partner Application registration questionnaire */}
      <BecomePartnerModal 
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      {/* 3. Immersive Interactive Street Racing inspired Map Dashboard Screen overlay */}
      {isHUDOpen && (
        <NfsMapDashboard 
          onClose={() => setIsHUDOpen(false)}
          currentLang={lang}
        />
      )}

    </div>
  );
}
