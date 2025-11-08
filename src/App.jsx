import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Onboarding from './components/Onboarding';
import DashboardPreview from './components/DashboardPreview';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0B10] text-white">
      <Suspense fallback={<div className="grid h-[60vh] place-items-center text-white/70">Loading…</div>}>
        <HeroSection />
      </Suspense>
      <Features />
      <Onboarding />
      <DashboardPreview />

      <footer className="border-t border-white/10 py-10 text-center text-white/60">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          © {new Date().getFullYear()} AURA — Crafted for cinematic astrology.
        </motion.p>
      </footer>
    </div>
  );
}
