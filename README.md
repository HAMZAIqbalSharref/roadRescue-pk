# 🏁 RoadRescue PK - Street Racing HUD Roadside Emergency Portal

[![React](https://img.shields.io/badge/React-19.0-cyan?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-blueviolet?logo=vite)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?logo=leaflet)](https://leafletjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--v4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"Speed is optional. Survival is mandatory."**
> An immersive, high-performance roadside assistance emergency portal serving Pakistan, stylized with a dark, high-octane Heads-Up Display (HUD) theme heavily inspired by legendary street racing classics like *Need for Speed: Most Wanted*.

---

## 📸 Overview Video & Interface

**RoadRescue PK** bridges the gap between classic rapid-dispatch utility and cinematic console-racing visuals. This application is optimized for drivers experiencing sudden breakdowns, punctures, empty batteries, or towing needs across major Pakistani corridors (Shahrah-e-Faisal Karachi, Mall Road Lahore, Blue Area Islamabad).

---

## ⚡ Features & Capabilities

### 1. 🛰️ Real-Time Browser Geolocation
- Automatically requests user geolocation permissions.
- Smoothly pans and flies the vector camera to the user's exact coordinates.
- Displays high-accuracy radius sweeps (Lock active diagnostic tag) with fallback coordinates mapped custom to major hubs if permission is denied.

### 2. 🗺️ Functional Roadside Roster Map
- Powered by a fully customized **Leaflet Map** set with high-contrast CartoDB Dark asphalt style tiles.
- Dynamically rendered live interactive pin markers indicating verified local Pakistani workshop cabins.
- Visual vector track dashed lines highlighting routing paths between the stranded driver and the active mechanic unit.

### 3. 🏁 High-Performance Diagnostic Roster
- Features 12 realistic mechanical shops with active physical coordinates spanning Karachi, Lahore, and Islamabad.
- Computes real-time **Haversine Distance (KM)** and estimated minutes of arrival (**ETA**) based on individual user offsets.
- Automatically sorts dispatch units by nearest-first.

### 4. 🎛️ Tactical Filters & Real-Time Search
- Supports real-time text searches across sector spots, mechanic names, custom specialties, or areas.
- Dynamic tactile category filters: **Bike**, **Car**, **Puncture**, **Electrician**, **Battery**, and **Towing**.

### 5. 🔊 Interactive Acoustic Telemetry Beam
- Integrates a browser-synthesized audio hum oscillator.
- Emits real-time sine/sawtooth sound warnings on action clicks simulating cinematic emergency diagnostic telemetry frequencies.

### 6. 🚨 Cinematic RAPID SOS DESPATCH
- Emits an emergency broadcast sequence with real-time terminal diagnostics output logs tracking coordinates, signal telemetry, and closest station locks.
- Automatically pairs the stranded driver with the fastest dispatcher and triggers physical HUD map focus.

### 7. 🗣️ Bilingual EN/UR Integration
- Full application localized in English and Urdu to maximize emergency reliability across diverse road conditions.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core:** React 19, TypeScript, Vite
- **Mapping Engine:** Leaflet (React Wrapper Layer optimized for map performance with zero lag)
- **Styling Architecture:** Tailwind CSS v4.0 (for sleek, high-contrast, amber-accented styling)
- **Fluid Animation Framework:** Motion (from `motion/react`)
- **Iconography System:** Lucide React

---

## 🚀 Step-by-Step Installation & Local Run

Follow these guidelines to run the project locally on your machine:

### Prerequisites:
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

1. **Clone the project / Download ZIP:**
   Extract the exported project ZIP into an empty directory on your machine.

2. **Navigate to the workspace:**
   ```bash
   cd roadrescue-pk
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Boot Up Development Server:**
   ```bash
   npm run dev
   ```
   *Your terminal will expose the local URL (usually `http://localhost:3000`). Open it in your browser to experience the dashboard.*

5. **Generate Production Bundles:**
   ```bash
   npm run build
   ```

---

## 📁 Repository Directory Structure

```text
├── src/
│   ├── components/
│   │   ├── NfsMapDashboard.tsx    <-- Core Immersive HUD Interactive Map
│   │   ├── Navbar.tsx             <-- Header with Urdu/English toggler & launch buttons
│   │   ├── Hero.tsx               <-- Main introductory visual segment
│   │   ├── Services.tsx           <-- Catalog of categories (Puncture, Battery, Towing...)
│   │   ├── HelpWizardModal.tsx    <-- Static step breakdown support dispatcher request
│   │   ├── BecomePartnerModal.tsx <-- Technician registration form
│   │   └── ...
│   ├── App.tsx                    <-- Primary main container
│   ├── main.tsx                   <-- SPA entry point
│   └── index.css                  <-- Global custom styling, animations & fonts
├── package.json                   <-- Action scripts and dependencies configurations
└── README.md                      <-- This file
```

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🏁 Credits

Created as a high-fidelity front-end prototype. Enjoy the adrenaline and keep your headlights bright!
