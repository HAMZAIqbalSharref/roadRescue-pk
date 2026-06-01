import React, { useState } from 'react';
import { X, Bike, Car, ArrowRight, ArrowLeft, MapPin, Compass, Phone, Loader2, CheckCircle, ShieldAlert, Zap, Hammer } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

interface HelpWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle?: 'car' | 'bike';
}

const breakdownIssues = [
  { id: 'puncture', label: 'Tire Puncture / Flat', description: 'Tire patch, tube replacement or spare swap', icon: Hammer },
  { id: 'battery', label: 'Dead Battery / Jumpstart', description: 'Battery jumpstart or replacement on-site', icon: Zap },
  { id: 'engine', label: 'Engine Overheating / Mechanical', description: 'Engine inspection, radiator water, belt repair', icon: Car },
  { id: 'fuel', label: 'Fuel Delivery', description: 'Emergency petrol or diesel delivery', icon: Compass },
  { id: 'towing', label: 'Towing Service Required', description: 'Safe flatbed or towing vehicle dispatch', icon: ShieldAlert },
];

const pakistaniLandmarks = {
  Lahore: [
    'DHA Phase 5 Block CCA, Lahore',
    'Main Boulevard Gulberg (near Kalma Chowk), Lahore',
    'Mall Road (opposite Lahore High Court), Lahore',
    'Y-Block DHA Commercial Area, Lahore',
    'Johar Town (near Emporium Mall), Lahore',
  ],
  Karachi: [
    'Shahrah-e-Faisal (near Karsaz), Karachi',
    'Clifton Block 4 (near Do Darya Road), Karachi',
    'Tariq Road (opposite McDonald\'s), Karachi',
    'Defence DHA Phase 6 Khayaban-e-Bukhari, Karachi',
    'Gulshan-e-Iqbal Block 13, Karachi',
  ],
  Islamabad: [
    'F-6 Supermarket Commercial, Islamabad',
    'Blue Area Jinnah Avenue, Islamabad',
    'G-9 Markaz (Karachi Company), Islamabad',
    'Faisal Avenue (near Faisal Mosque), Islamabad',
    'DHA Phase 2 Main Boulevard, Islamabad',
  ]
};

export default function HelpWizardModal({ isOpen, onClose, initialVehicle = 'car' }: HelpWizardModalProps) {
  const [step, setStep] = useState<number>(1);
  const [vehicle, setVehicle] = useState<'car' | 'bike'>(initialVehicle);
  const [issue, setIssue] = useState<string>('puncture');
  const [city, setCity] = useState<'Lahore' | 'Karachi' | 'Islamabad'>('Lahore');
  const [customAddress, setCustomAddress] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [isSimulatingTrack, setIsSimulatingTrack] = useState(false);
  
  const [statusLog, setStatusLog] = useState('Finding nearest available verified mechanic...');

  if (!isOpen) return null;

  const currentLandmarks = pakistaniLandmarks[city];

  const handleNext = () => {
    if (step === 3) {
      setIsMatching(true);
      setTimeout(() => {
        setIsMatching(false);
        setIsSimulatingTrack(true);
        setStep(4);
      }, 2000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSelectLandmark = (landmark: string) => {
    setCustomAddress(landmark);
  };

  const handleSimReset = () => {
    setStep(1);
    setVehicle('car');
    setIssue('puncture');
    setCity('Lahore');
    setCustomAddress('');
    setIsSimulatingTrack(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300">
      <div 
        id="help-wizard-content"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh] md:max-h-[85vh]"
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-slate-950/40">
          <div>
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              Emergency Roadside Portal
            </h3>
            <p className="text-gray-400 text-3xs font-sans mt-0.5">
              Secure real-time match engine • No login required for dispatch
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-slate-900 border border-slate-800 p-2 rounded-xl transition-colors"
            id="close-wizard-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Main Grid Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col md:flex-row gap-6">
          
          {/* STEP 1, 2, 3 FORM BLOCK */}
          {step <= 3 && (
            <div className="flex-1 flex flex-col justify-between space-y-6" id="wizard-form-container">
              <div>
                {/* Visual Step Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex-1 flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-3xs font-bold font-mono ${
                        step === num 
                          ? 'bg-red-600 text-white' 
                          : step > num ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/25' : 'bg-gray-800 text-gray-500'
                      }`}>
                        {num}
                      </div>
                      <span className={`text-4xs uppercase tracking-wider font-semibold ${step === num ? 'text-white' : 'text-gray-500'}`}>
                        {num === 1 ? 'Vehicle' : num === 2 ? 'Fault' : 'Pinpoint'}
                      </span>
                      {num < 3 && <div className="h-px bg-gray-800 flex-1 ml-1" />}
                    </div>
                  ))}
                </div>

                {/* STEP 1: VEHICLE CLASSIFICATION */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
                    <h4 className="text-lg font-bold font-display text-white">
                      Which vehicle needs emergency assistance?
                    </h4>
                    <p className="text-gray-400 text-xs">
                      We match specialized mechanics depending on vehicle category. Fast dispatchers active citywide.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setVehicle('car')}
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                          vehicle === 'car'
                            ? 'bg-red-500/10 border-red-500 text-red-500 shadow-md shadow-red-950/20'
                            : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:bg-slate-950 hover:text-white'
                        }`}
                      >
                        <Car className="w-12 h-12 mb-3 stroke-[1.5]" />
                        <span className="font-bold text-sm font-display block">Four Wheeler / Car</span>
                        <span className="text-4xs text-gray-400 mt-1 block">Sedans, SUVs, Mehran, Cultus, Hatchbacks</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setVehicle('bike')}
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                          vehicle === 'bike'
                            ? 'bg-red-500/10 border-red-500 text-red-500 shadow-md shadow-red-950/20'
                            : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:bg-slate-950 hover:text-white'
                        }`}
                      >
                        <Bike className="w-12 h-12 mb-3 stroke-[1.5]" />
                        <span className="font-bold text-sm font-display block">Two Wheeler / Bike</span>
                        <span className="text-4xs text-gray-400 mt-1 block">70cc, 125, heavy bikes, scooters</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: FAULT CLASSIFICATION */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
                    <h4 className="text-lg font-bold font-display text-white">
                      What is the roadside fault or emergency?
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Select the primary issue to match a mechanic equipped with exact repair tools and spares.
                    </p>

                    <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                      {breakdownIssues.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setIssue(item.id)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              issue === item.id
                                ? 'bg-red-500/10 border-red-500 text-red-500'
                                : 'bg-slate-950/60 border-slate-800/80 text-gray-400 hover:bg-slate-950 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-900 rounded-lg border border-slate-850">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white font-display">{item.label}</h5>
                                <p className="text-3xs text-gray-400 mt-0.5">{item.description}</p>
                              </div>
                            </div>
                            <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${issue === item.id ? 'border-red-500 bg-red-600 text-white' : 'border-gray-700'}`}>
                              {issue === item.id && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-50" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: CITY & LANDMARK LOOKUP */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
                    <h4 className="text-lg font-bold font-display text-white">
                      Pinpoint your standby location
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Choose city and specify location. This connects to active regional cellular navigation towers.
                    </p>

                    <div className="grid grid-cols-3 gap-2.5">
                      {['Lahore', 'Karachi', 'Islamabad'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCity(c as any);
                            setCustomAddress('');
                          }}
                          className={`py-2 px-1 border rounded-lg text-xs font-semibold text-center uppercase tracking-wide transition-all cursor-pointer ${
                            city === c
                              ? 'bg-red-500/10 border-red-500 text-red-500'
                              : 'bg-slate-950/40 border-slate-800 text-gray-400 hover:bg-slate-950 hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      <label className="block text-4xs uppercase tracking-wider text-gray-400 font-sans font-semibold">
                        Enter current address / street boundary
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 z-10 text-red-500" />
                        <input
                          type="text"
                          value={customAddress}
                          onChange={(e) => setCustomAddress(e.target.value)}
                          placeholder="e.g. KFC signal DHA Phase 5 block CCA, Lahore"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/80 transition-all font-sans"
                        />
                      </div>

                      {/* Landmarks fast clickers */}
                      <div>
                        <span className="text-4xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                          Popular quick landmarks inside {city}:
                        </span>
                        <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto">
                          {currentLandmarks.map((landmark) => (
                            <button
                              key={landmark}
                              type="button"
                              onClick={() => handleSelectLandmark(landmark)}
                              className="text-4xs bg-slate-950/85 border border-slate-800/80 rounded-full px-2.5 py-1 text-gray-300 hover:border-red-500 hover:text-red-400 cursor-pointer transition-all whitespace-nowrap"
                            >
                              📍 {landmark.split('(')[0].trim()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION ROW BAR */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-800/60 mt-4">
                <button
                  onClick={handleBack}
                  disabled={step === 1 || isMatching}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-bold text-xs font-display hover:text-white transition-all ${
                    step === 1 ? 'opacity-35 cursor-not-allowed text-gray-500 border-gray-900' : 'text-gray-300 border-gray-800 hover:bg-slate-900 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={isMatching}
                  className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-red-950/20 font-display text-xs tracking-wide flex items-center justify-center gap-2 group cursor-pointer`}
                >
                  {isMatching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Contacting Local GPS Radios...
                    </>
                  ) : (
                    <>
                      {step === 3 ? 'Request Dispatch' : 'Continue'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ACTIVE TRACKING SIMULATION SPLIT */}
          {step === 4 && (
            <div className="w-full flex flex-col md:flex-row gap-6 animate-in fade-in duration-300">
              
              {/* Left Column: Live matching diagnostics console logs */}
              <div className="w-full md:w-80 flex flex-col justify-between space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                  <div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-4xs font-mono font-bold rounded border border-emerald-500/25 uppercase">
                      Active Live Connection
                    </span>
                    <h4 className="text-md font-bold text-white font-display mt-2">
                      Dispatch Coordinates
                    </h4>
                    <p className="text-gray-400 text-3xs font-sans mt-0.5">
                      Target location: <strong className="text-gray-200">{customAddress || `${city} Main Highway`}</strong>
                    </p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  {/* Simulated telemetry diagnostic checkmarks */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-3xs">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        ✓
                      </div>
                      <span className="text-gray-300 font-sans">Diagnostic network check passed</span>
                    </div>
                    <div className="flex items-center gap-2 text-3xs">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        ✓
                      </div>
                      <span className="text-gray-300 font-sans">Urdu emergency response channel selected</span>
                    </div>
                    <div className="flex items-center gap-2 text-3xs">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        ✓
                      </div>
                      <span className="text-gray-300 font-sans">CNIC of assigned mechanic verified</span>
                    </div>
                  </div>

                  {/* Dynamic Status Log Tick lines */}
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                    <p className="text-4xs uppercase font-semibold text-red-500 font-mono tracking-wider">
                      Console Diagnostics
                    </p>
                    <p className="text-3xs text-gray-300 font-mono mt-1 leading-normal">
                      {statusLog}
                    </p>
                  </div>
                </div>

                {/* Simulated Emergency Call Block */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <span className="text-4xs text-gray-400 font-sans uppercase font-bold tracking-wider">
                    Need Direct Coordinator?
                  </span>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <h5 className="text-xs font-bold text-white font-display">RoadRescue 24/7 Hotline</h5>
                      <p className="text-3xs text-gray-400 font-mono">03-111-RESCUE (737283)</p>
                    </div>
                    <a
                      href="tel:03111737283"
                      className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow shadow-red-950/20"
                    >
                      <Phone className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  </div>
                </div>

                {/* Reset button to test again */}
                <button
                  onClick={handleSimReset}
                  className="w-full border border-gray-800 hover:bg-red-950/20 hover:border-red-500/40 text-gray-300 hover:text-white font-semibold py-3 rounded-xl transition-all text-xs font-display flex items-center justify-center gap-1 cursor-pointer"
                >
                  Return to Home
                </button>
              </div>

              {/* Right Column: Dynamic interactive tracking map canvas */}
              <div className="flex-1 min-h-[300px] md:min-h-0 flex flex-col justify-between">
                <InteractiveMap
                  city={city}
                  vehicleType={vehicle}
                  serviceType={issue}
                  isSimulating={isSimulatingTrack}
                  onStateChange={(stateText) => setStatusLog(stateText)}
                />
              </div>

            </div>
          )}

          {/* STEP SIDESHOW BANNER (TIPS & ACCREDITATION) - hidden in step 4 for layout spacing */}
          {step <= 3 && (
            <div className="w-full md:w-80 bg-slate-950/50 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold font-display text-white mb-2">
                  Emergency Guidelines
                </h4>
                <ul className="space-y-4 text-3xs text-gray-400 font-sans">
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold shrink-0">1.</span>
                    <span>Pull your vehicle to the extreme left shoulder layer safely away from rapid traffic lines.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold shrink-0">2.</span>
                    <span>Switch on your double indicator hazards immediately to warn incoming commuters.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 font-bold shrink-0">3.</span>
                    <span>Upon matching, check the mechanic's digital CNIC profile card in the interface to confirm identity.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 mt-6">
                <h5 className="text-2xs font-bold text-white font-display mb-1">🛡️ Safe Guarantee PK</h5>
                <p className="text-4xs text-gray-450 leading-relaxed">
                  All associated service provider mechanics hold verified background clearance from police registration forces, with fixed, standardized prices shown directly inside the portal. No overcharging guarantees.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
