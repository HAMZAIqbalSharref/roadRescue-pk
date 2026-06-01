import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Bike, Car, Shield, Phone, Star, AlertCircle } from 'lucide-react';

interface InteractiveMapProps {
  city: 'Lahore' | 'Karachi' | 'Islamabad';
  vehicleType: 'car' | 'bike';
  serviceType: string;
  isSimulating: boolean;
  onSimulationComplete?: () => void;
  onStateChange?: (state: string) => void;
}

// Mock active path points on an SVG canvas (500x350)
const pathsByCity = {
  Lahore: [
    { x: 50, y: 120, label: 'Mall Road' },
    { x: 120, y: 120, label: 'Charing Cross' },
    { x: 180, y: 160, label: 'Jail Road Interchange' },
    { x: 260, y: 220, label: 'Main Boulevard Gulberg' },
    { x: 340, y: 220, label: 'Liberty Roundabout' },
    { x: 420, y: 260, label: 'Ferozepur Road' },
  ],
  Karachi: [
    { x: 60, y: 80, label: 'Shahrah-e-Faisal' },
    { x: 150, y: 110, label: 'Karsaz Road' },
    { x: 230, y: 180, label: 'Tariq Road Crossing' },
    { x: 300, y: 240, label: 'Clifton Underpass' },
    { x: 380, y: 270, label: 'Sea View Road' },
    { x: 440, y: 290, label: 'Do Darya' },
  ],
  Islamabad: [
    { x: 70, y: 100, label: 'Kashmir Highway' },
    { x: 160, y: 100, label: 'G-9 Interchange' },
    { x: 230, y: 150, label: 'Faisal Mosque Road' },
    { x: 300, y: 200, label: 'Blue Area Corridor' },
    { x: 380, y: 200, label: 'Jinnah Avenue' },
    { x: 430, y: 250, label: 'F-6 Supermarket' },
  ]
};

const nearbyMechanicsData = {
  Lahore: [
    { id: 'm1', name: 'Zahid Autos', rating: 4.8, distance: '0.8 km', vehicle: 'bike', markerX: 180, markerY: 90 },
    { id: 'm2', name: 'Asif Car Care', rating: 4.9, distance: '1.4 km', vehicle: 'car', markerX: 290, markerY: 170 },
    { id: 'm3', name: 'Punjab Tire Masters', rating: 4.6, distance: '2.1 km', vehicle: 'both', markerX: 100, markerY: 260 },
  ],
  Karachi: [
    { id: 'm4', name: 'Karachi Speed Mechanics', rating: 4.9, distance: '0.5 km', vehicle: 'bike', markerX: 200, markerY: 70 },
    { id: 'm5', name: 'Defence Elite Motors', rating: 4.7, distance: '1.2 km', vehicle: 'car', markerX: 340, markerY: 190 },
    { id: 'm6', name: 'Saddar Puncture Point', rating: 4.5, distance: '1.9 km', vehicle: 'both', markerX: 140, markerY: 230 },
  ],
  Islamabad: [
    { id: 'm7', name: 'Margalla Auto tech', rating: 4.8, distance: '0.7 km', vehicle: 'car', markerX: 240, markerY: 80 },
    { id: 'm8', name: 'F-8 Rapid Bikers', rating: 4.9, distance: '1.1 km', vehicle: 'bike', markerX: 350, markerY: 140 },
    { id: 'm9', name: 'Blue Area Battery Zone', rating: 4.6, distance: '1.8 km', vehicle: 'both', markerX: 110, markerY: 210 },
  ]
};

export default function InteractiveMap({
  city,
  vehicleType,
  serviceType,
  isSimulating,
  onSimulationComplete,
  onStateChange
}: InteractiveMapProps) {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [eta, setEta] = useState(12); // Mock minutes left
  const [distanceLeft, setDistanceLeft] = useState(2.8); // KM left
  const [subState, setSubState] = useState<'idle' | 'searching' | 'matched' | 'heading' | 'arrived'>('idle');
  const [activeMechanic, setActiveMechanic] = useState<any>(null);
  
  const simulationRef = useRef<number | null>(null);

  // Restart or stop simulation based on props
  useEffect(() => {
    if (isSimulating) {
      setSubState('searching');
      if (onStateChange) onStateChange('Finding nearest available verified mechanic...');
      setProgress(0);
      setEta(12);
      setDistanceLeft(3.2);
      
      const selectMechanicList = nearbyMechanicsData[city];
      const selected = selectMechanicList.find(m => m.vehicle === vehicleType || m.vehicle === 'both') || selectMechanicList[0];
      setActiveMechanic(selected);

      // Animation Step 1: Searching for mechanics (2 seconds)
      const t1 = window.setTimeout(() => {
        setSubState('matched');
        if (onStateChange) onStateChange(`Verified Mechanic Found: ${selected.name} (${selected.rating} ★)`);
        
        // Animation Step 2: Mechanic heading to location (8 seconds)
        const startTime = Date.now();
        const duration = 8000; // 8 seconds tracking travel

        const animateTracking = () => {
          const now = Date.now();
          const elapsed = now - startTime;
          const pct = Math.min((elapsed / duration) * 100, 100);
          setProgress(pct);
          setSubState('heading');

          const remainingEta = Math.max(Math.round(12 * (1 - pct / 100)), 1);
          const remainingDist = Math.max(parseFloat((3.2 * (1 - pct / 100)).toFixed(1)), 0.1);
          setEta(remainingEta);
          setDistanceLeft(remainingDist);

          if (pct < 100) {
            simulationRef.current = window.requestAnimationFrame(animateTracking);
          } else {
            setSubState('arrived');
            setEta(0);
            setDistanceLeft(0);
            if (onStateChange) onStateChange('Mechanic arrived at your location!');
            if (onSimulationComplete) onSimulationComplete();
          }
        };

        simulationRef.current = window.requestAnimationFrame(animateTracking);

      }, 2000);

      return () => {
        window.clearTimeout(t1);
        if (simulationRef.current) {
          window.cancelAnimationFrame(simulationRef.current);
        }
      };
    } else {
      setSubState('idle');
      setProgress(0);
      setActiveMechanic(null);
    }
  }, [isSimulating, city, vehicleType, serviceType]);

  // Current street points
  const points = pathsByCity[city];
  // Target coordinates (User is fixed at the end of the path)
  const userPoint = points[points.length - 1];
  // Starting coordinates for the dispatched mechanic
  const startPoint = points[0];

  // Calculate moving mechanic position on the line
  const getMechanicPos = () => {
    if (progress <= 0) return startPoint;
    if (progress >= 100) return userPoint;

    // Estimate index based on percent
    const numSegments = points.length - 1;
    const scaledProgress = progress / 100;
    const segmentIndex = Math.min(Math.floor(scaledProgress * numSegments), numSegments - 1);
    const segmentPct = (scaledProgress * numSegments) - segmentIndex;

    const pA = points[segmentIndex];
    const pB = points[segmentIndex + 1];

    return {
      x: pA.x + (pB.x - pA.x) * segmentPct,
      y: pA.y + (pB.y - pA.y) * segmentPct,
    };
  };

  const currentMechanicPos = getMechanicPos();

  return (
    <div id="interactive-map-wrapper" className="w-full h-full flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden p-4 md:p-6 shadow-2xl relative">
      <div className="absolute top-0 right-0 left-0 h-64 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

      {/* Top Map Action Bar */}
      <div className="flex justify-between items-center gap-2 mb-3 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-sans text-xs text-slate-300 font-semibold tracking-wide capitalize">
            {city} Live Radar Area
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full font-mono text-2xs text-gray-400">
          3000ms ping • {nearbyMechanicsData[city].length} online
        </div>
      </div>

      {/* Map Interactive Grid & Vector Trails */}
      <div className="relative flex-1 min-h-[220px] bg-slate-950/90 border border-slate-900 rounded-2xl overflow-hidden">
        {/* Abstract city mapping lines */}
        <div className="absolute inset-0 opacity-10 grid grid-cols-12 gap-1 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-slate-300 h-full" />
          ))}
        </div>
        <div className="absolute inset-0 opacity-10 grid grid-rows-8 gap-1 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-slate-300 w-full" />
          ))}
        </div>

        {/* Vector SVG Render */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" preserveAspectRatio="none">
          {/* Main street tracking tube lines */}
          <path
            d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none"
            stroke={subState === 'heading' || subState === 'arrived' ? '#ef4444' : '#334155'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500"
            strokeDasharray={subState === 'heading' ? '6 4' : undefined}
          />

          {/* Sub roads and secondary abstract routes */}
          <path
            d="M 50 200 L 150 200 L 230 180"
            fill="none"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 300 100 L 300 240 L 400 320"
            fill="none"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Static Offline Mechanics (only if not actively tracking) */}
          {subState === 'idle' && nearbyMechanicsData[city].map((mech) => (
            <g key={mech.id} className="opacity-60 hover:opacity-100 transition-opacity">
              <circle cx={mech.markerX} cy={mech.markerY} r="7" fill="#dc2626" className="animate-pulse" />
              <circle cx={mech.markerX} cy={mech.markerY} r="3" fill="#ffffff" />
              <text x={mech.markerX + 10} y={mech.markerY + 4} fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">
                {mech.name}
              </text>
            </g>
          ))}
        </svg>

        {/* 1. Status Overlay when Searching */}
        {subState === 'searching' && (
          <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center p-4 text-center z-10 transition-all">
            <div className="relative mb-4 w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-red-500/20 border-t-red-600 animate-spin" />
              <Navigation className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
            <h4 className="text-sm font-semibold text-white font-display mb-1">
              Pinging Nearby Assistance Units
            </h4>
            <p className="text-2xs text-gray-400 font-sans max-w-[200px]">
              Retrieving live coordinates on GPS network for active {vehicleType === 'bike' ? 'Rider-Mechanics' : 'Recovery Patrol Cars'}.
            </p>
          </div>
        )}

        {/* 2. Stranded User Pin (Destination point) */}
        <div
          style={{ left: `${userPoint.x / 5}%`, top: `${userPoint.y / 3.5}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing halo */}
            <div className="absolute w-8 h-8 rounded-full bg-red-600/30 animate-ping opacity-75" />
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center border-2 border-slate-950 ring-2 ring-red-500/50">
              <AlertCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <span className="bg-red-600 text-white font-semibold font-mono text-3xs px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap uppercase tracking-wider">
            My {vehicleType === 'bike' ? 'Rider' : 'Car'} Stranded
          </span>
        </div>

        {/* 3. Dispatched Tracking Mechanic (Moving dot) */}
        {(subState === 'heading' || subState === 'arrived') && activeMechanic && (
          <div
            style={{
              left: `${currentMechanicPos.x / 5}%`,
              top: `${currentMechanicPos.y / 3.5}%`,
              transition: progress === 0 || progress === 100 ? 'all 0.5s ease-out' : 'none'
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 h-10 rounded-full bg-emerald-500/20 animate-pulse" />
              <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center border-2 border-slate-950 shadow-lg">
                {vehicleType === 'bike' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 text-white px-2 py-0.5 rounded-lg shadow-xl mt-1 whitespace-nowrap text-3xs flex items-center gap-1 font-sans">
              <span className="font-semibold text-emerald-400">{activeMechanic.name}</span>
              <span className="text-gray-400">({activeMechanic.rating} ★)</span>
            </div>
          </div>
        )}

        {/* Instructions Overlay if Idle */}
        {subState === 'idle' && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2.5 backdrop-blur-md">
            <span className="flex-1 text-2xs text-slate-300 font-sans">
              💡 Select vehicle type and press <strong className="text-red-400">“Find Help Now”</strong> to test the real-time matching system on Malik Road.
            </span>
          </div>
        )}
      </div>

      {/* Ride-Hailing Live Tracking Dashboard (Bottom widget) */}
      <div className="mt-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 z-10 backdrop-blur-md">
        {subState === 'idle' || subState === 'searching' ? (
          <div className="flex items-center gap-3 w-full">
            <div className="p-3 bg-red-600/10 text-red-500 rounded-xl border border-red-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-display">RoadRescue Live Dispatch</h5>
              <p className="text-2xs text-gray-400 font-sans">
                Connecting Pakistan's drivers with certified, biometric-verified mechanics and recovery vehicles.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl border transition-all ${subState === 'arrived' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25' : 'bg-red-500/10 text-red-500 border-red-500/25'}`}>
                {vehicleType === 'bike' ? <Bike className="w-5 h-5 stroke-[2.5]" /> : <Car className="w-5 h-5 stroke-[2.5]" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-bold text-white font-display">
                    {subState === 'arrived' ? 'Your Rescue Has Arrived!' : 'Assistance En Route'}
                  </h5>
                  <span className={`px-2 py-0.5 text-3xs font-semibold rounded ${subState === 'arrived' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400 animate-pulse'}`}>
                    {subState === 'arrived' ? 'Arrived' : 'Live Trax'}
                  </span>
                </div>
                <p className="text-2xs text-gray-400 font-sans mt-0.5">
                  Assigned Unit • <span className="text-white font-medium">{activeMechanic?.name}</span> &gt; Specialist: {serviceType || 'Tire Patch'}
                </p>
              </div>
            </div>

            {/* Simulated Specs Column */}
            <div className="flex items-center gap-6 mt-1 md:mt-0 border-t md:border-t-0 border-slate-800 pt-2.5 md:pt-0">
              <div className="text-left">
                <p className="text-3xs uppercase tracking-wider text-gray-400 font-sans font-semibold">Estimated Arrival</p>
                <p className="text-sm font-black font-mono text-white">
                  {subState === 'arrived' ? '0 min' : `${eta} mins`}
                </p>
              </div>
              <div className="text-left">
                <p className="text-3xs uppercase tracking-wider text-gray-400 font-sans font-semibold">Live Distance</p>
                <p className="text-sm font-black font-mono text-red-500">
                  {subState === 'arrived' ? '0.0 km' : `${distanceLeft} km`}
                </p>
              </div>
              {subState !== 'arrived' ? (
                <div className="w-16 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ) : (
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
