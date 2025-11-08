import React, { useCallback } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function MagneticCTA({ children, onClick, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.1);
    y.set(relY * 0.1);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow backdrop-blur transition hover:bg-white ${className}`}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-white/40"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 0.18, scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </motion.button>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();

  const scrollToOnboarding = useCallback(() => {
    const el = document.getElementById('onboarding');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="relative h-[92vh] w-full overflow-hidden">
      {/* Spline scene (interactive). Do not block with overlays. */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/0UnIIJngGgvQNHiD/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient halos and vignette overlays (non-interactive) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(236,72,153,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-semibold tracking-tight text-white md:text-6xl"
        >
          AURA — Cinematic AI Astrology
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="mt-4 max-w-2xl text-balance text-white/80 md:text-lg"
        >
          Ultra‑vivid insights, voice guidance, and living charts. Step into your cosmic storyline.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={reduce ? {} : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 flex items-center gap-3"
        >
          <MagneticCTA onClick={scrollToOnboarding}>Begin Onboarding</MagneticCTA>
          <MagneticCTA className="bg-black/60 text-white hover:bg-black/70">Watch Preview</MagneticCTA>
        </motion.div>
      </div>
    </section>
  );
}
