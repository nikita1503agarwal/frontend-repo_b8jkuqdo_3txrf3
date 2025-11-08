import React, { Suspense, useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import ParallaxSection from './components/ParallaxSection';
import { AppProvider } from './components/AppContext';
import Features from './components/Features';
import Onboarding from './components/Onboarding';
import DashboardPreview from './components/DashboardPreview';
import ChatPanel from './components/ChatPanel';
import ParticleBurst from './components/ParticleBurst';

function Hero() {
  const [burstT, setBurstT] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);

  const onCTA = useCallback((e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      setBurstPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setBurstT((t) => t + 1);
    }
    const el = document.getElementById('onboarding');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="relative h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(236,72,153,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          AURA — Cinematic AI Astrology
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }} className="mt-4 max-w-2xl text-balance text-white/80 md:text-lg">
          Ultra‑vivid insights, voice guidance, and living charts. Step into your cosmic storyline.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }} className="mt-8 flex items-center gap-3">
          <button ref={btnRef} onClick={onCTA} className="relative overflow-hidden rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow backdrop-blur transition hover:bg-white">
            Begin Onboarding
          </button>
        </motion.div>
      </div>
      <ParticleBurst x={burstPos.x} y={burstPos.y} trigger={burstT} />
    </section>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0B0B10] text-white">
        <Suspense fallback={<div className="grid h-[60vh] place-items-center text-white/70">Loading…</div>}>
          <Hero />
        </Suspense>

        <ParallaxSection className="relative">
          <Features />
        </ParallaxSection>

        <ParallaxSection>
          <Onboarding />
        </ParallaxSection>

        <ParallaxSection>
          <DashboardPreview />
        </ParallaxSection>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <ChatPanel />
        </section>

        <footer className="border-t border-white/10 py-10 text-center text-white/60">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            © {new Date().getFullYear()} AURA — Crafted for cinematic astrology.
          </motion.p>
        </footer>
      </div>
    </AppProvider>
  );
}
