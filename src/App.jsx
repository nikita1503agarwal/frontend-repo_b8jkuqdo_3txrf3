import React from 'react';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Onboarding from './components/Onboarding';
import DashboardPreview from './components/DashboardPreview';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <HeroSection />
      <Features />
      <Onboarding />
      <DashboardPreview />
      <footer className="border-t border-white/10 bg-black/80 py-10 text-center text-white/60">
        <p className="text-sm">AURA — Ultra‑Cinematic AI Astrology. Graceful degradation and accessibility by default.</p>
      </footer>
    </div>
  );
}

export default App;
