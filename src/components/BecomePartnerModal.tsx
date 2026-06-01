import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Award, Briefcase } from 'lucide-react';

interface BecomePartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BecomePartnerModal({ isOpen, onClose }: BecomePartnerModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [vehicleSpecialty, setVehicleSpecialty] = useState('both');
  const [cnic, setCnic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setFullName('');
    setPhone('');
    setCity('Lahore');
    setVehicleSpecialty('both');
    setCnic('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div 
        id="partner-modal-container"
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-gray-900/60 p-2 rounded-full border border-gray-800 z-10"
          id="close-partner-modal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center" id="partner-success-screen">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 mb-6">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Application Submitted Safely!
            </h3>
            <p className="text-gray-400 font-sans text-sm mb-6 max-w-sm mx-auto">
              Shabaash! Your partner profile has been registered successfully. Our Pakistan operations team will verify your details and contact you within 24 hours.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Security Verification</h4>
                  <p className="text-2xs text-gray-400">Your CNIC ({cnic}) is securely held for police and driving authority verification.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Starter kit & Training</h4>
                  <p className="text-2xs text-gray-400">Approved mechanics get an offline RoadRescue safety vest, starter tools, and smartphone navigation training.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-red-900/30 font-display text-sm tracking-wide"
            >
              Back to Main Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8" id="partner-form">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full border border-red-500/25 mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                Partner Program PK
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Become a RoadRescue Mechanic
              </h3>
              <p className="text-gray-400 text-xs font-sans mt-1">
                Earn up to ₨ 100,000+ monthly in Lahore, Karachi & Islamabad. Set your own hours and get automated roadside repair requests nearby.
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-red-600 text-white' : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'}`}>
                  {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                </div>
                <span className={`text-xs font-medium ${step === 1 ? 'text-white' : 'text-gray-400'}`}>Personal Info</span>
              </div>
              <div className="h-px bg-gray-800 w-8" />
              <div className="flex-1 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  2
                </div>
                <span className={`text-xs font-medium ${step === 2 ? 'text-white' : 'text-gray-400'}`}>Professional Setup</span>
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-4" id="partner-step-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Full Name (As on CNIC/ID Card)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/80 transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 03001234567"
                    pattern="[0-9]{11}"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/80 transition-all font-sans"
                  />
                  <span className="text-3xs text-gray-400 mt-1 block">Please enter an active WhatsApp number of 11 digits format</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    City of Operations
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/80 transition-all font-sans"
                  >
                    <option value="Karachi">Karachi (کراچی)</option>
                    <option value="Lahore">Lahore (لاہور)</option>
                    <option value="Islamabad">Islamabad (اسلام آباد)</option>
                    <option value="Rawalpindi">Rawalpindi (راولپنڈی)</option>
                    <option value="Faisalabad">Faisalabad (فیصل آباد)</option>
                    <option value="Peshawar">Peshawar (پشاور)</option>
                    <option value="Multan">Multan (ملتان)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4" id="partner-step-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    CNIC National Identity Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="e.g. 35201-1234567-9 (13 digits)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/80 transition-all font-sans"
                  />
                  <span className="text-3xs text-gray-400 mt-1 block">Your CNIC data is never shared publicly and is exclusively used for legal verification</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Vehicles You Can Repair
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['bike', 'car', 'both'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVehicleSpecialty(type)}
                        className={`py-3 px-2 border rounded-xl text-xs font-semibold capitalize transition-all ${
                          vehicleSpecialty === type
                            ? 'bg-red-500/10 border-red-500 text-red-500'
                            : 'bg-slate-950/40 border-slate-800 text-gray-400 hover:bg-slate-950 hover:text-white'
                        }`}
                      >
                        {type === 'both' ? 'Both (Car + Bike)' : `${type}s`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3 text-3xs text-gray-400 leading-relaxed">
                  By submitting this registration, you declare all supplied information is accurate, you hold an active Pakistani driving license or mechanic certification, and agree to undergo automated biometric background checks before onboarding.
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3 pt-3 border-t border-gray-800/60">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-gray-800 hover:bg-gray-900 text-gray-300 font-semibold py-3 px-4 rounded-xl transition-all text-xs font-display"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group text-xs font-display tracking-wide ${
                  step === 1 ? 'w-full bg-red-600 hover:bg-red-700 text-white' : 'flex-1 bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing CNIC Verification...
                  </>
                ) : step === 1 ? (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Register & Submit Details
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
