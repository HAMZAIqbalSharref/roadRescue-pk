export interface ServiceCategory {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  iconName: string; // lucide icon identifier
  basePrice: string;
}

export interface Mechanic {
  id: string;
  name: string;
  phone: string;
  rating: number;
  trips: number;
  specialty: string;
  vehicle: 'bike' | 'car' | 'both';
  status: 'available' | 'busy' | 'offline';
  latOffset: number; // For SVG relative mapping
  lngOffset: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  vehicle: string;
  content: string;
  rating: number;
  date: string;
  tag: string;
}

export interface Feature {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  iconName: string;
  color: string;
}

export type HelpStep = 'vehicle-select' | 'issue-select' | 'location-pin' | 'match' | 'tracking';
