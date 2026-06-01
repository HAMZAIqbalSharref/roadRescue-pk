import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Navigation, Bike, Car, Phone, Star, AlertTriangle, 
  Search, Crosshair, Wrench, Shield, Compass, Sliders, ChevronRight, 
  ChevronLeft, Users, ShieldAlert, Cpu, Radio, Sparkles, X, Check, Volume2, VolumeX, Activity
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface NfsMapDashboardProps {
  onClose?: () => void;
  currentLang?: 'EN' | 'UR';
}

// 12 Realistic Pakistani Mechanic Shops with physical latitudes and longitudes
const MECHANICS_DEMO_DATA = [
  {
    id: 'nfs-1',
    name: 'Zahid Turbo Tune & Towing',
    city: 'Lahore',
    category: 'Towing',
    phone: '0300-8884920',
    rating: 4.9,
    reviews: 142,
    address: 'Near Liberty Roundabout, Gulberg III, Lahore',
    availability: 'Available',
    phoneRaw: '03008884920',
    vehicleSpec: 'both',
    lat: 31.5181,
    lng: 74.3531,
    specialty: 'Flatbed Recovery & ECU Remapping',
    avatar: '🔧'
  },
  {
    id: 'nfs-2',
    name: 'Model Town Bikers Hub (Shera)',
    city: 'Lahore',
    category: 'Bike',
    phone: '0321-4567891',
    rating: 4.8,
    reviews: 98,
    address: 'Block-D Market, Model Town, Lahore',
    availability: 'Available',
    phoneRaw: '03214567891',
    vehicleSpec: 'bike',
    lat: 31.4791,
    lng: 74.3211,
    specialty: 'High-Performance Engine Tuning & Chains',
    avatar: '🏍️'
  },
  {
    id: 'nfs-3',
    name: 'Dharampura Puncture Spot',
    city: 'Lahore',
    category: 'Puncture',
    phone: '0303-7771212',
    rating: 4.6,
    reviews: 215,
    address: 'Dharampura Chawk, Canal Road, Lahore',
    availability: 'Available',
    phoneRaw: '03037771212',
    vehicleSpec: 'both',
    lat: 31.5641,
    lng: 74.3681,
    specialty: 'Tubeless Vulcanization & Nitrogen Fills',
    avatar: '🛞'
  },
  {
    id: 'nfs-4',
    name: 'Gulberg Circuit Voltage (Nomi)',
    city: 'Lahore',
    category: 'Electrician',
    phone: '0312-9993333',
    rating: 4.7,
    reviews: 73,
    address: 'Main Boulevard Gulberg, Lahore',
    availability: 'Busy',
    phoneRaw: '03129993333',
    vehicleSpec: 'car',
    lat: 31.5261,
    lng: 74.3411,
    specialty: 'Alternator, Battery Drainage & Fuse Box Repairs',
    avatar: '⚡'
  },
  {
    id: 'nfs-5',
    name: 'DHA Hyper Car Clinic',
    city: 'Lahore',
    category: 'Battery',
    phone: '0333-1234567',
    rating: 4.9,
    reviews: 189,
    address: 'Phase 5 CCA, DHA, Lahore',
    availability: 'Available',
    phoneRaw: '03331234567',
    vehicleSpec: 'car',
    lat: 31.4691,
    lng: 74.4511,
    specialty: 'Hybrid battery rejuvenator & jump-starts',
    avatar: '🔋'
  },
  {
    id: 'nfs-6',
    name: 'Karachi Nitro Speed Specialists',
    city: 'Karachi',
    category: 'Car',
    phone: '0315-1112222',
    rating: 4.9,
    reviews: 310,
    address: 'Shahrah-e-Faisal Road, Near Karsaz, Karachi',
    availability: 'Available',
    phoneRaw: '03151112222',
    vehicleSpec: 'car',
    lat: 24.8721,
    lng: 67.0781,
    specialty: 'Brake booster upgrades & quick emergency mechanic',
    avatar: '🏎️'
  },
  {
    id: 'nfs-7',
    name: 'Clifton Beach Road Rescue',
    city: 'Karachi',
    category: 'Towing',
    phone: '0301-2334455',
    rating: 4.8,
    reviews: 165,
    address: 'Marine Drive Clifton, Block 4, Karachi',
    availability: 'Available',
    phoneRaw: '03012334455',
    vehicleSpec: 'both',
    lat: 24.8021,
    lng: 67.0321,
    specialty: 'Underpass heavy-duty extraction & winch patrols',
    avatar: '🪝'
  },
  {
    id: 'nfs-8',
    name: 'Saddar Extreme Ignition Sparks',
    city: 'Karachi',
    category: 'Electrician',
    phone: '0345-8765432',
    rating: 4.5,
    reviews: 320,
    address: 'Preedy Street, Saddar, Karachi',
    availability: 'Busy',
    phoneRaw: '03458765432',
    vehicleSpec: 'bike',
    lat: 24.8611,
    lng: 67.0241,
    specialty: 'Spark Plugs, CD70 Engine Repairs & Wiring harness',
    avatar: '⚡'
  },
  {
    id: 'nfs-9',
    name: 'Gulshan High Altitude Tires',
    city: 'Karachi',
    category: 'Puncture',
    phone: '0322-9876543',
    rating: 4.7,
    reviews: 89,
    address: 'Main University Road, Gulshan-e-Iqbal, Karachi',
    availability: 'Available',
    phoneRaw: '03229876543',
    vehicleSpec: 'both',
    lat: 24.9181,
    lng: 67.0971,
    specialty: 'Alloy rim straightener & tubeless repairs',
    avatar: '🛞'
  },
  {
    id: 'nfs-10',
    name: 'Margalla Ridge Drift & Recovery',
    city: 'Islamabad',
    category: 'Car',
    phone: '0300-5551111',
    rating: 4.9,
    reviews: 112,
    address: 'Blue Area Sector F-7, Jinnah Avenue, Islamabad',
    availability: 'Available',
    phoneRaw: '03005551111',
    vehicleSpec: 'car',
    lat: 33.7121,
    lng: 73.0591,
    specialty: 'Performance tuning, brakes overhauling & coolant emergency',
    avatar: '🔧'
  },
  {
    id: 'nfs-11',
    name: 'F-8 Rapid Speed Throttle',
    city: 'Islamabad',
    category: 'Bike',
    phone: '0310-2345678',
    rating: 4.7,
    reviews: 64,
    address: 'Kaghan Road, F-8 Sector, Islamabad',
    availability: 'Available',
    phoneRaw: '03102345678',
    vehicleSpec: 'bike',
    lat: 33.7141,
    lng: 73.0281,
    specialty: 'Sportbike diagnostics & fast roadside assistance',
    avatar: '🏍️'
  },
  {
    id: 'nfs-12',
    name: 'E-11 Black-Edge Voltage Line',
    city: 'Islamabad',
    category: 'Battery',
    phone: '0334-5554321',
    rating: 4.8,
    reviews: 94,
    address: 'Main Double Road, Sector E-11, Islamabad',
    availability: 'Busy',
    phoneRaw: '03345554321',
    vehicleSpec: 'both',
    lat: 33.6981,
    lng: 72.9831,
    specialty: 'AC compressor fuse fixes & AGM Battery replacement',
    avatar: '🔋'
  }
];

// Cities list default coordinates
const defaultUserPosByCity = {
  Lahore: { lat: 31.5204, lng: 74.3587, address: 'The Mall Crossroad, Lahore PK' },
  Karachi: { lat: 24.8607, lng: 67.0011, address: 'Shahrah-e-Faisal Flyover, Karachi PK' },
  Islamabad: { lat: 33.6844, lng: 73.0479, address: 'Blue Area Corridor F-6, Islamabad PK' }
};

const CITIES_LIST = ['Lahore', 'Karachi', 'Islamabad'] as const;

const HEAT_LEVELS = [
  { level: 1, label: 'LITE DISPATCH', status: 'Optimal response, no traffic jams.' },
  { level: 2, label: 'STEEL SECTOR', status: 'Moderate city congestion. Dispatchers active.' },
  { level: 3, label: 'ASPHALT BURNERS', status: 'High density. High-velocity emergency mechanics deployed.' },
  { level: 4, label: 'MOST WANTED STANDBY', status: 'Extreme hazard conditions. Gridlocks. Backups engaged!' },
];

// Haversine formula helper
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return parseFloat((R * c).toFixed(1));
}

export default function NfsMapDashboard({ onClose, currentLang = 'EN' }: NfsMapDashboardProps) {
  // Navigation State
  const [selectedCity, setSelectedCity] = useState<'Lahore' | 'Karachi' | 'Islamabad'>('Lahore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMechanic, setActiveMechanic] = useState<any | null>(null);
  
  // Real Leaflet Map Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  // User Location (Center point in latitude/longitude)
  const [userPos, setUserPos] = useState(defaultUserPosByCity['Lahore']);
  
  // Geolocation Permission & Setup States
  const [geoState, setGeoState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geoAccuracy, setGeoAccuracy] = useState<number | null>(null);
  const [mapLoading, setMapLoading] = useState(true);

  // Telemetry sound simulation toggle (auditory hum)
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // SOS Simulation Panel overlay
  const [sosInProgress, setSosInProgress] = useState(false);
  const [sosStep, setSosStep] = useState<number>(0);
  const [sosLogs, setSosLogs] = useState<string[]>([]);
  const [sosMatchedMechanic, setSosMatchedMechanic] = useState<any | null>(null);

  // Left side panel collapsible
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Simulated tracking line animation step
  const [simulatedPulseOffset, setSimulatedPulseOffset] = useState(0);

  // Triggering visual radar scan sweeps
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPulseOffset((prev) => (prev + 1) % 360);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Update center when city changes
  useEffect(() => {
    const defaultCenter = defaultUserPosByCity[selectedCity];
    setUserPos(defaultCenter);
    setActiveMechanic(null);
    setGeoState('idle');

    if (mapRef.current) {
      mapRef.current.setView([defaultCenter.lat, defaultCenter.lng], 13);
    }
  }, [selectedCity]);

  // Geolocation Auto Trigger on mount
  useEffect(() => {
    requestUserLocation(true);
  }, []);

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    setMapLoading(true);

    const initialCenter = defaultUserPosByCity[selectedCity];
    const map = L.map(mapContainerRef.current, {
      center: [initialCenter.lat, initialCenter.lng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark cartodb asphalt theme matching NFS nicely
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      minZoom: 1
    }).addTo(map);

    mapRef.current = map;
    setMapLoading(false);

    // Initial scale animation delay
    setTimeout(() => {
      map.invalidateSize();
    }, 400);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Function to lock/prompt user browser geolocation
  const requestUserLocation = (isSilent = false) => {
    if (!navigator.geolocation) {
      setGeoState('error');
      return;
    }

    setGeoState('loading');
    if (!isSilent) {
      triggerBeep(480, 0.1, 'sine');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setGeoState('success');
        setGeoAccuracy(Math.round(accuracy));
        
        const lockPos = {
          lat: latitude,
          lng: longitude,
          address: 'ACQUIRED GPS REAL-TIME BEACON'
        };
        setUserPos(lockPos);

        // Fly smoothly to real location
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 14, { animate: true, duration: 1.5 });
        }
        if (!isSilent) {
          triggerBeep(640, 0.2, 'sine');
        }
      },
      (error) => {
        setGeoState('error');
        if (!isSilent) {
          triggerBeep(300, 0.3, 'sawtooth');
        }
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
    );
  };

  // Sound generator
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(45, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.012, ctx.currentTime);

        const biquadFilter = ctx.createBiquadFilter();
        biquadFilter.type = 'lowpass';
        biquadFilter.frequency.setValueAtTime(120, ctx.currentTime);

        osc.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        oscillatorRef.current = osc;
        setSoundEnabled(true);
        triggerBeep(330, 0.08, 'triangle');
      } catch (e) {
        console.warn("Audio Context not supported in this iframe setup.", e);
      }
    } else {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setSoundEnabled(false);
    }
  };

  const triggerBeep = (freq = 440, duration = 0.1, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Compute live distance and estimated ETA for mechanics based on active userPos
  const mappedMechanics = MECHANICS_DEMO_DATA.map(mech => {
    const dist = getDistanceKm(userPos.lat, userPos.lng, mech.lat, mech.lng);
    const calculatedEta = Math.max(Math.round(dist * 2.2), 3); // Approx 2.2 minutes per KM
    return {
      ...mech,
      distance: dist,
      eta: calculatedEta
    };
  });

  // Sort by nearest mechanics
  const sortedMechanics = [...mappedMechanics].sort((a, b) => a.distance - b.distance);

  // Filter mechanics based on City, Category, and Search query
  const filteredMechanics = sortedMechanics.filter((mech) => {
    const matchesCity = mech.city === selectedCity;
    const matchesCategory = selectedCategory === 'All' || mech.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      mech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mech.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mech.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCategory && matchesSearch;
  });

  // Render markers and active route line on map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!markersGroupRef.current) {
      markersGroupRef.current = L.layerGroup().addTo(map);
    } else {
      markersGroupRef.current.clearLayers();
    }

    const group = markersGroupRef.current;

    // 1. Stranded User Node Marker
    const userHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-[50px] h-[50px] rounded-full bg-cyan-500/15 animate-ping opacity-50"></div>
        <div class="absolute w-[24px] h-[24px] rounded-full bg-cyan-500/25 animate-pulse"></div>
        <div class="w-7 h-7 rounded-full bg-neutral-900 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.75)]">
          <svg class="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 2M7.8 16.2l2-2M16.2 16.2l-2-2M7.8 7.8l2 2"/></svg>
        </div>
      </div>
    `;

    const userIcon = L.divIcon({
      html: userHtml,
      className: 'custom-user-marker',
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });

    L.marker([userPos.lat, userPos.lng], { icon: userIcon }).addTo(group);

    // 2. Mechanics Nodes Markers
    filteredMechanics.forEach((mech) => {
      const isSelected = activeMechanic?.id === mech.id;
      const isAvailable = mech.availability === 'Available';

      const mechHtml = `
        <div class="relative flex flex-col items-center">
          <div class="absolute -inset-2 rounded-full transition-all duration-300 opacity-20 ${
            isAvailable ? 'bg-[#F5C542]' : 'bg-red-500'
          }"></div>
          <div class="w-7.5 h-7.5 rounded-lg flex items-center justify-center border-2 shadow-xl transition-all font-bold ${
            isSelected 
              ? 'bg-[#F5C542] border-[#F5C542] text-black scale-110 shadow-[0_0_12px_rgba(245,197,66,0.6)]' 
              : isAvailable
                ? 'bg-neutral-950 border-[#F5C542] text-[#F5C542]'
                : 'bg-neutral-950 border-red-500 text-red-500'
          }">
            <span class="text-xs shrink-0">${mech.avatar}</span>
          </div>
          <div class="mt-1 font-mono text-[8px] uppercase font-black px-1.5 py-0.5 rounded shadow whitespace-nowrap ${
            isSelected
              ? 'bg-[#F5C542] text-black'
              : 'bg-black/90 border border-slate-800 text-white'
          }">
            ${mech.distance} KM
          </div>
        </div>
      `;

      const mechIcon = L.divIcon({
        html: mechHtml,
        className: 'custom-mech-marker',
        iconSize: [60, 50],
        iconAnchor: [30, 25]
      });

      const marker = L.marker([mech.lat, mech.lng], { icon: mechIcon }).addTo(group);
      marker.on('click', () => {
        handleSelectMechanic(mech);
        map.setView([mech.lat, mech.lng], 14, { animate: true });
      });
    });

    // 3. Vector Trace Dashed Route plan polyline
    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }

    if (activeMechanic) {
      const routeLine = L.polyline(
        [
          [userPos.lat, userPos.lng],
          [activeMechanic.lat, activeMechanic.lng]
        ],
        {
          color: '#F5C542',
          weight: 3.5,
          dashArray: '10, 8',
          className: 'animate-pulse'
        }
      ).addTo(map);
      routeLineRef.current = routeLine;
    }

  }, [filteredMechanics, userPos, activeMechanic]);

  const resetMapPosition = () => {
    if (mapRef.current) {
      mapRef.current.setView([userPos.lat, userPos.lng], 13, { animate: true });
    }
    triggerBeep(380, 0.15, 'sine');
  };

  // SOS Simulation Countdown script
  const triggerSosLaunch = () => {
    setSosInProgress(true);
    setSosStep(1);
    setSosLogs([
      '⚡ [SYS_BOOT]: INITIALIZING CRYPTO-BEACON FREQUENCY',
      `📡 [GPS]: ACQUIRING HIGH-VELOCITY COORDINATES AT ${selectedCity.toUpperCase()}`,
      '⚠️ [SOS]: DISTRESS WARNING EMITTED ON EMERGENCY STANDBY FREQUENCY (399.1 MHz)'
    ]);
    triggerBeep(580, 0.25, 'sawtooth');

    // Interval timers to simulate telemetry connection
    setTimeout(() => {
      setSosStep(2);
      setSosLogs(prev => [
        ...prev,
        '🛡️ [CIVIL_DEFENSE]: REGISTERED UNIQUE TRIP ID PK-930219',
        `🔋 [RADAR]: SWEEPING CAR & BIKE PATROLS WITHIN 5.0 KM`,
        `🔄 [PING]: ${filteredMechanics.length} EMERGENCY ASSISTANCE UNITS ONLINE`
      ]);
      triggerBeep(640, 0.2, 'square');
    }, 1500);

    setTimeout(() => {
      setSosStep(3);
      // Pick closest available mechanic
      const chosen: any = filteredMechanics[0] || sortedMechanics[0];
      setSosMatchedMechanic(chosen);
      setSosLogs(prev => [
        ...prev,
        '✅ [MATCH]: EMERGENCY DISPATCHER LOCATED!',
        `🏁 [UNIT]: ASSIGNED UNIT >> ${chosen.name.toUpperCase()}`,
        `⏱️ [ETA]: SPECTACULAR DEPLOYMENT IN ${chosen.eta} MINUTES (${chosen.distance} KM)`
      ]);
      triggerBeep(880, 0.4, 'triangle');

      // Autofocus on map
      setActiveMechanic(chosen);
      if (mapRef.current) {
        mapRef.current.setView([chosen.lat, chosen.lng], 14, { animate: true });
      }
    }, 3200);
  };

  const closeSosSimulation = () => {
    setSosInProgress(false);
    setSosStep(0);
    setSosLogs([]);
    setSosMatchedMechanic(null);
  };

  const handleSelectMechanic = (mech: any) => {
    setActiveMechanic(mech);
    triggerBeep(520, 0.08, 'sine');
  };

  return (
    <div 
      id="nfs-hud-dashboard" 
      className="fixed inset-0 z-50 overflow-hidden bg-[#0A0A0A] text-white flex flex-col font-sans select-none animate-in fade-in duration-300"
    >
      
      {/* 1. TOP CINEMATIC RACING DASHBOARD NAVIGATION HEADER */}
      <header className="relative shrink-0 bg-gradient-to-b from-black to-[#131313] border-b-2 border-[#F5C542] px-4 py-2.5 flex items-center justify-between shadow-[0_4px_20px_rgba(245,197,66,0.15)] z-20">
        <div className="flex items-center gap-3">
          <div className="bg-[#F5C542] text-black px-3 py-1 font-black text-xs md:text-sm skew-x-12 tracking-tighter flex items-center gap-1.5 uppercase shadow-[0_0_10px_rgba(245,197,66,0.5)]">
            <Radio className="w-4 h-4 text-black animate-pulse" />
            <span>ROADRESCUE.PK</span>
            <span className="bg-black text-[#F5C542] text-[9px] font-mono rounded">HUD v1.9</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono tracking-widest text-[#AAAAAA] pl-4 uppercase">
            <Activity className="w-3.5 h-3.5 text-red-500" />
            <span>Telemetry feed active &bull; Local host PK:3000 online</span>
          </div>
        </div>

        {/* Dynamic active City selection Tabs with NFS game styling */}
        <div className="flex bg-[#191919] border border-[#2A2A2A]/80 p-0.5 rounded-lg overflow-hidden shrink-0">
          {CITIES_LIST.map((cityName) => (
            <button
              key={cityName}
              onClick={() => {
                setSelectedCity(cityName);
                triggerBeep(420, 0.05, 'sine');
              }}
              className={`text-2xs font-extrabold uppercase font-sans tracking-wider px-3 md:px-5 py-1.5 rounded transition-all cursor-pointer ${
                selectedCity === cityName
                  ? 'bg-[#F5C542] text-black font-black drop-shadow-[0_2px_5px_rgba(245,197,66,0.5)]'
                  : 'text-gray-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {cityName}
            </button>
          ))}
        </div>

        {/* Top Control Buttons: Sound, Close */}
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,197,66,0.2)]' 
                : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Engine Atmospheric sound hum"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button 
            type="button"
            onClick={onClose}
            className="p-2 bg-red-650 text-white rounded-lg border border-red-500 hover:bg-red-650/80 transition-all font-sans font-black tracking-widest text-xs flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4 mr-1 stroke-[3]" />
            <span className="hidden sm:inline">EXIT HUD</span>
          </button>
        </div>
      </header>

      {/* 2. DANGER ZONE STRIPE OVERLAY FOR REAL DRIFT FEELING */}
      <div className="h-1 w-full bg-grid-pattern overflow-hidden relative" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F5C542, #F5C542 10px, #111111 10px, #111111 20px)' }} />

      {/* MAIN CONTAINER CONTENT - HUD SPLIT COLUMN */}
      <div className="flex-1 w-full flex flex-col md:flex-row min-h-0 relative">

        {/* A. LEFT SIDEBAR: COLLAPSIBLE ROSTER, SEARCH & CATEGORY FILTERS */}
        <aside 
          id="nfs-roster-sidebar" 
          className={`shrink-0 border-r border-[#262626] bg-[#111111] transition-all duration-300 flex flex-col min-h-0 ${
            sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-full md:w-85 lg:w-96'
          }`}
        >
          <div className="p-4 flex flex-col flex-grow items-stretch gap-4 min-h-0">
            
            {/* GPS Racing Styled Navigation Search input */}
            <div className="relative">
              <span className="absolute left-3 top-3.5 flex items-center justify-center">
                <Search className="w-4 h-4 text-[#F5C542]" />
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search GPS sector, shop or mechanic..."
                className="w-full bg-[#1A1A1A] border-l-4 border-l-[#F5C542] border-y border-r border-[#333] text-xs text-white placeholder-gray-500 rounded px-9 py-3 focus:outline-none focus:border-[#F5C542] transition-colors focus:shadow-[0_0_12px_rgba(245,197,66,0.15)] font-mono"
              />
              <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-black text-[#F5C542] text-[9px] font-mono border border-slate-800">
                GPS
              </span>
            </div>

            {/* CATEGORY FILTERS - Racing style pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#F5C542] tracking-wider uppercase font-mono flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-[#F5C542]" />
                  HUD FILTER SPECIALTIES
                </span>
                <span className="text-[9px] font-mono text-[#777]">
                  {selectedCategory}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Bike', 'Car', 'Puncture', 'Electrician', 'Battery', 'Towing'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      triggerBeep(390, 0.05, 'triangle');
                    }}
                    className={`text-[10px] uppercase font-black px-2.5 py-1.5 border transition-all rounded font-mono cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[#F5C542] border-[#F5C542] text-black shadow-[0_2px_8px_rgba(245,197,66,0.4)]'
                        : 'bg-black/60 border-slate-800 hover:border-slate-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#262626] my-1" />

            {/* ROSTER LIST HEADER */}
            <div className="flex justify-between items-center text-[10px] font-extrabold text-[#777777] font-mono tracking-widest uppercase">
              <span>NEAREST SECTOR UNITS ({filteredMechanics.length})</span>
              <span>AVAILABILITY</span>
            </div>

            {/* MECH ROSTER ITEMS LIST */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 select-none custom-scrollbar">
              {filteredMechanics.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center p-4 bg-black/40 border border-slate-900 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-[#F5C542] mb-2 animate-pulse" />
                  <p className="text-xs text-[#AAA] font-mono uppercase">Sector scan clear</p>
                  <p className="text-[10px] text-[#666] mt-1 text-center">No dispatchers matching &quot;{searchQuery}&quot; found in {selectedCity} radar range.</p>
                </div>
              ) : (
                filteredMechanics.map((mech) => {
                  const isActive = activeMechanic?.id === mech.id;
                  return (
                     <div
                      key={mech.id}
                      onClick={() => {
                        handleSelectMechanic(mech);
                        if (mapRef.current) {
                          mapRef.current.setView([mech.lat, mech.lng], 14, { animate: true });
                        }
                      }}
                      className={`group relative flex items-start gap-3 p-3 transition-all border rounded-xl cursor-pointer ${
                        isActive
                          ? 'bg-black border-2 border-[#F5C542] shadow-[0_0_15px_rgba(245,197,66,0.25)]'
                          : 'bg-[#181818]/90 border-[#262626] hover:border-[#444] hover:bg-[#202020]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F5C542] rounded-l" />
                      )}

                      <div className="text-2xl mt-0.5">{mech.avatar}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-xs font-black truncate text-white uppercase group-hover:text-[#F5C542] transition-colors font-sans">
                            {mech.name}
                          </h4>
                          <span className={`text-[9px] font-mono uppercase font-black px-1.5 py-0.5 rounded shrink-0 ${
                            mech.availability === 'Available'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {mech.availability}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 font-mono text-[10px] text-[#A0A0A0]">
                          <span className="text-[#F5C542] font-black">{mech.category.toUpperCase()}</span>
                          <span>&bull;</span>
                          <span className="flex items-center text-white"><Star className="w-3 h-3 fill-[#F5C542] stroke-none inline mr-0.5" />{mech.rating}</span>
                          <span>&bull;</span>
                          <span className="text-red-500 font-extrabold">{mech.distance} KM</span>
                        </div>

                        <p className="text-[10px] text-gray-400 truncate mt-1">
                          {mech.address}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* SECTOR INTENSITY HUD INDICATOR */}
            <div className="bg-[#181818] border border-slate-900 rounded-lg p-3 shrink-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-gray-400 font-mono tracking-wider">HUD TRAFFIC HEAT SENSOR</span>
                <span className="text-[10px] font-black font-mono text-[#F5C542]">HEAT LEVEL: 3 / 4</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((indicator) => (
                  <div 
                    key={indicator} 
                    className={`h-2 rounded-sm transition-colors ${
                      indicator <= 3 ? 'bg-[#F5C542]' : 'bg-[#333]'
                    }`} 
                  />
                ))}
              </div>
              <p className="text-[9.5px] leading-relaxed text-red-500 font-mono mt-1 w-full uppercase">
                {HEAT_LEVELS[2].label}: {HEAT_LEVELS[2].status}
              </p>
            </div>

          </div>
        </aside>

        {/* B. FULLSCREEN INTERACTIVE MAP VIEW WITH HUD OVERLAYS */}
        <div className="flex-1 min-h-0 relative flex flex-col bg-[#141414]">

          {/* Interactive Toggle button on desktop to expand sidebar */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-8 h-10 bg-[#111111]/90 border border-[#333] hover:border-[#F5C542] hover:text-[#F5C542] rounded-r-xl transition-all select-none cursor-pointer text-white"
            title={sidebarCollapsed ? "Expand roster list" : "Collapse roster list"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 stroke-[2.5]" /> : <ChevronLeft className="w-5 h-5 stroke-[2.5]" />}
          </button>

          {/* DRAGGABLE REAL MAP WRAPPER WITH CANVAS OVERLAYS */}
          <div className="relative flex-grow h-full overflow-hidden bg-[#111111]">
            
            {/* REAL LEAFLET MAP */}
            <div 
              ref={mapContainerRef} 
              className="absolute inset-0 w-full h-full" 
              style={{ zIndex: 0 }}
            />

            {/* SATELLITE/GPS ACQUISITION LOADING SPINNER OVERLAY */}
            {mapLoading && (
              <div className="absolute inset-0 bg-black/95 z-30 flex flex-col items-center justify-center text-center p-4">
                <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                  <div className="absolute inset-0 rounded-full border-4 border-red-500/20 border-t-red-600 animate-spin" />
                  <Compass className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
                <h4 className="text-sm font-semibold text-white font-display uppercase tracking-widest animate-pulse">
                  Acquiring GPS Satellite Grid...
                </h4>
              </div>
            )}

            {/* FLOATING ACTION HUD WIDGETS (Racing Console styling) */}

            {/* A. FLOATING MAP INSTRUMENTS OVERLAYS */}
            <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row md:items-start justify-between gap-3 pointer-events-none z-10">
              
              {/* Tactical sector radar sweeping simulator status tag & GPS Calibration Info */}
              <div className="flex flex-col gap-2 pointer-events-auto shrink-0">
                {/* Radar sweep */}
                <div className="p-3 bg-black/95 border border-[#2B2B2B] rounded-xl flex items-center gap-3 w-56 md:w-64 shadow-2xl backdrop-blur-md">
                  <div className="relative w-8 h-8 rounded-full border border-emerald-500/20 bg-black overflow-hidden flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#F5C542]/10" />
                    <div 
                      style={{ transform: `rotate(${simulatedPulseOffset}deg)` }} 
                      className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#F5C542]/80 origin-center" 
                    />
                    <Shield className="w-4 h-4 text-[#F5C542]" />
                  </div>
                  <div className="truncate leading-tight">
                    <div className="text-[10px] font-black text-[#F5C542] tracking-wider font-mono">RADAR SECTOR SCANNER</div>
                    <div className="text-[9px] font-mono text-gray-400 truncate uppercase mt-0.5">
                      {selectedCity.toUpperCase()} DISPATCH STANDBY
                    </div>
                  </div>
                </div>

                {/* GPS Telemetry Feed Info Bar */}
                <div className="p-3 bg-black/95 border border-[#2B2B2B] rounded-xl flex flex-col gap-1 w-56 md:w-64 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="text-[9px] font-black text-gray-400 font-mono">GPS TELEMETRY FEED</span>
                    <span className={`w-2 h-2 rounded-full ${
                      geoState === 'success' ? 'bg-cyan-400 animate-pulse' :
                      geoState === 'loading' ? 'bg-[#F5C542] animate-ping' :
                      geoState === 'error' ? 'bg-red-500' : 'bg-gray-600'
                    }`} />
                  </div>
                  <div className="text-[10px] font-mono font-bold leading-tight uppercase">
                    {geoState === 'idle' && 'STANDBY - CALIBRATE GPS'}
                    {geoState === 'loading' && '📡 ACQUIRING GPS LOCK...'}
                    {geoState === 'success' && '🛰️ LOCK ACTIVE (Accuracy: ' + (geoAccuracy ? `${geoAccuracy}m` : '15m') + ')'}
                    {geoState === 'error' && '⚠️ OFFLINE - COORD MAPPED'}
                  </div>
                  {geoState === 'error' && (
                    <div className="text-[8px] font-mono text-gray-500 select-none">
                      Fallback City Grid center active.
                    </div>
                  )}
                </div>
              </div>

              {/* Locate Me button & Map Zoom Tools */}
              <div className="flex items-center gap-1.5 pointer-events-auto self-start mt-2 md:mt-0">
                <button
                  onClick={() => requestUserLocation(false)}
                  className={`p-3 bg-black/95 border hover:border-[#F5C542] hover:text-[#F5C542] text-white rounded-xl shadow-2xl transition-all cursor-pointer flex items-center gap-2 text-[10px] font-black tracking-widest uppercase font-mono ${
                    geoState === 'loading' ? 'border-[#F5C542] animate-pulse text-[#F5C542]' : 'border-[#2B2B2B]'
                  }`}
                  title="Calibrate GPS via Geolocation API"
                >
                  <Crosshair className="w-3.5 h-3.5 text-[#F5C542]" />
                  <span>{geoState === 'loading' ? 'LOCATING...' : 'LOCATE ME'}</span>
                </button>

                <button
                  onClick={resetMapPosition}
                  className="p-3 bg-black/95 border border-[#2B2B2B] hover:border-[#F5C542] text-xs text-white rounded-xl shadow-2xl transition-all cursor-pointer"
                  title="Recenter Map Focus"
                >
                  <Compass className="w-4 h-4 text-[#F5C542]" />
                </button>

                <div className="bg-black/95 border border-[#2B2B2B] rounded-xl p-0.5 flex items-center overflow-hidden">
                  <button 
                    onClick={() => { mapRef.current?.zoomOut(); triggerBeep(320, 0.05, 'triangle'); }}
                    className="w-8 h-8 flex items-center justify-center text-xs font-black text-gray-400 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-[9px] font-mono px-2 text-[#F5C542] font-semibold">ZOOM</span>
                  <button 
                    onClick={() => { mapRef.current?.zoomIn(); triggerBeep(450, 0.05, 'triangle'); }}
                    className="w-8 h-8 flex items-center justify-center text-xs font-black text-gray-400 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* B. LARGE FLOATING RED EMERGENCY SOS BUTTON (BOTTOM RIGHT) */}
            <div className="absolute bottom-4 right-4 z-10 pointer-events-auto">
              <button 
                type="button"
                onClick={triggerSosLaunch}
                className="group relative flex items-center justify-center px-6 py-4 rounded-xl bg-red-650 hover:bg-red-700 text-white font-sans font-black tracking-widest text-xs uppercase shadow-[0_4px_25px_rgba(239,68,68,0.5)] border-2 border-red-500 hover:scale-105 transition-all select-none cursor-pointer"
              >
                <span className="absolute -inset-1 rounded-xl bg-red-500/20 blur animate-ping group-hover:opacity-100 transition-opacity" />
                <ShieldAlert className="w-5 h-5 mr-2 animate-bounce stroke-[2.5]" />
                <span>RAPID SOS DEPLOY</span>
              </button>
            </div>

            {/* C. ACTIVE MECHANIC DETAILED INFO HUD POPUP CARD */}
            {activeMechanic && (
              <div
                id="nfs-active-mechanic-popup"
                className="absolute bottom-4 left-4 max-w-sm w-[92%] sm:w-[350px] bg-black/95 border-l-8 border-l-[#F5C542] border-y border-r border-[#2d2d2d] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in slide-in-from-bottom duration-300 backdrop-blur-md"
              >
                <div className="h-2 bg-grid-pattern" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F5C542, #F5C542 5px, #111111 5px, #111111 10px)' }} />
                
                <div className="p-4 space-y-3.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex gap-2.5 items-center">
                      <span className="text-3xl">{activeMechanic.avatar}</span>
                      <div>
                        <div className="text-[10px] font-bold text-[#F5C542] font-mono tracking-wider uppercase">VERIFIED RESPONSE UNIT</div>
                        <h3 className="text-sm font-black text-white font-sans uppercase tracking-tight mt-0.5">
                          {activeMechanic.name}
                        </h3>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setActiveMechanic(null); triggerBeep(350, 0.06, 'sine'); }}
                      className="p-1 rounded text-gray-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rating Stars, Specialty and distance details */}
                  <div className="grid grid-cols-3 gap-2 bg-[#171717] border border-slate-900 rounded-lg p-2.5 text-center font-mono">
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase font-semibold">ETA LIMIT</span>
                      <span className="text-xs font-black text-[#F5C542]">{activeMechanic.eta} MIN</span>
                    </div>
                    <div className="border-x border-slate-800">
                      <span className="block text-[8px] text-gray-400 uppercase font-semibold">DISTANCE</span>
                      <span className="text-xs font-black text-white">{activeMechanic.distance} KM</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase font-semibold">FEEDBACK</span>
                      <span className="text-xs font-black text-[#F5C542] flex items-center justify-center">
                        <Star className="w-3 h-3 fill-[#F5C542] stroke-none inline mr-0.5" />
                        {activeMechanic.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#F5C542] font-mono tracking-wider block uppercase">SPECIALIST PROFILE</span>
                    <p className="text-[10.5px] text-gray-200 leading-normal bg-neutral-900/40 p-2 border border-slate-900 rounded">
                      🛠️ {activeMechanic.specialty}
                    </p>
                  </div>

                  <div className="text-[10px] text-gray-400 flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{activeMechanic.address}</span>
                  </div>

                  <div className="flex gap-2 font-mono">
                    <a 
                      href={`tel:${activeMechanic.phoneRaw}`}
                      className="flex-1 flex items-center justify-center p-2.5 bg-[#F5C542] hover:bg-[#ffda66] text-black font-black text-[10.5px] uppercase tracking-wider rounded-lg transition-transform active:scale-95 text-center shadow-[0_2px_10px_rgba(245,197,66,0.3)] cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      CALL NOW
                    </a>
                    
                    <button
                      type="button"
                      onClick={() => {
                        triggerBeep(440, 0.15, 'triangle');
                        alert(`Tracing routing vectors from diagnostic user coordinates to ${activeMechanic.name}. Route vector highlighted on visualizer grid.`);
                      }}
                      className="flex-1 p-2.5 bg-[#1C1C1C] border border-slate-800 text-white font-extrabold text-[10.5px] uppercase tracking-wider rounded-lg hover:border-white transition-colors cursor-pointer"
                    >
                      ROUTE PLAN
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 3. DOCK TELEMETRY FOOT PANEL (DIAGNOSTIC TELEMETRY GRAPHICS) */}
      <footer className="relative shrink-0 bg-black border-t border-[#262626] p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-left z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#1A1A1A] p-2 border border-slate-800 rounded font-mono text-[10px] text-[#F5C542] flex items-center gap-1.5 uppercase font-bold shrink-0">
            <Cpu className="w-3.5 h-3.5 text-[#F5C542] animate-spin-slow" />
            <span>PK-GRID: STABLE</span>
          </div>

          <div className="text-[10.5px] leading-tight text-gray-400 max-w-xl">
            📍 <strong className="text-white">COORDINATES:</strong> {userPos.lat.toFixed(4)}°N, {userPos.lng.toFixed(4)}°E &bull; Selected Hub: <strong className="text-white">{selectedCity} Standard Zone</strong>. Emergency mechanics are monitored via biometric GPS telemetry for optimal roadside safety.
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
          <div>LATENCY: 42ms</div>
          <div>&bull;</div>
          <div>SATELLITES IN RANGE: 8</div>
        </div>
      </footer>

      {/* 4. EXTREME SOS COUNTDOWN MATCHING OVERLAY MODAL */}
      {sosInProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          
          <div className="relative w-full max-w-lg bg-[#111111] border-2 border-red-500 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.4)] flex flex-col p-6 items-stretch gap-6">
            
            <div className="absolute top-0 left-0 right-0 h-3 bg-grid-pattern" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EF4444, #EF4444 10px, #111111 10px, #111111 20px)' }} />

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-red-500 animate-bounce" />
                <h3 className="text-lg font-black text-white font-sans uppercase tracking-wider">ROADRESCUE SOS DEPLOYING</h3>
              </div>
              <button 
                onClick={closeSosSimulation}
                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center py-4 bg-black/50 border border-slate-900 rounded-2xl relative">
              
              {sosStep < 3 ? (
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-red-500/25 border-t-red-500 animate-spin" />
                  <Radio className="w-10 h-10 text-red-500 animate-pulse" />
                </div>
              ) : (
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 bg-emerald-500/10 animate-ping" />
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>
              )}

              <div className="text-center mt-4">
                <span className="text-[10px] font-black text-red-500 font-mono tracking-widest uppercase">
                  ACTIVE CRITICAL STANDBY
                </span>
                <h4 className="text-md font-extrabold text-[#F5C542] uppercase tracking-tight mt-1">
                  {sosStep === 1 && "Booting Crypto-Beacon..."}
                  {sosStep === 2 && "Sweeping Local Mechanics..."}
                  {sosStep === 3 && "Verified Dispatch Locked!"}
                </h4>
              </div>

            </div>

            <div className="bg-black border border-slate-900 p-3.5 rounded-xl font-mono text-[10px] space-y-1.5 leading-relaxed max-h-40 overflow-y-auto">
              {sosLogs.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log.startsWith('✅') ? (
                    <span className="text-emerald-400 font-semibold">{log}</span>
                  ) : log.startsWith('⚠️') ? (
                    <span className="text-red-500 font-bold animate-pulse">{log}</span>
                  ) : (
                    <span>{log}</span>
                  )}
                </div>
              ))}
            </div>

            {sosStep === 3 && sosMatchedMechanic && (
              <div className="bg-[#1A1A1A] border-l-4 border-l-emerald-500 rounded-xl p-4 flex gap-3.5 items-center">
                <span className="text-3xl">{sosMatchedMechanic.avatar}</span>
                <div className="flex-grow min-w-0">
                  <div className="text-[8px] font-black text-emerald-400 font-mono">NEAREST EMERGENCY RESPONDER</div>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight mt-0.5">{sosMatchedMechanic.name}</h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{sosMatchedMechanic.address}</p>
                  
                  <div className="flex items-center gap-3 mt-1.5 font-mono text-[9px]">
                    <span className="text-red-500 font-bold">DISTANCE: {sosMatchedMechanic.distance} KM</span>
                    <span className="text-[#F5C542] font-bold">ETA: {sosMatchedMechanic.eta} MIN</span>
                  </div>
                </div>

                <a 
                  href={`tel:${sosMatchedMechanic.phoneRaw}`}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] rounded-lg tracking-widest font-mono shrink-0 cursor-pointer shadow-lg"
                >
                  CALL NOW
                </a>
              </div>
            )}

            <div className="text-[9.5px] text-gray-500 leading-normal text-center">
              Our automated system uses real-time dispatch signals matching the highest rated mechanic closest to your breakdown point. No credit card or registration required.
            </div>

            <div className="flex gap-2">
              {sosStep === 3 ? (
                <button
                  onClick={closeSosSimulation}
                  className="flex-grow py-3 bg-red-650 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer font-mono"
                >
                  DISMISS BEACON & TRACK
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeSosSimulation}
                  className="flex-grow py-3 bg-[#1F1F1F] border border-slate-800 text-gray-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:text-white transition-colors cursor-pointer font-mono"
                >
                  CANCEL EMERGENCY
                </button>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
