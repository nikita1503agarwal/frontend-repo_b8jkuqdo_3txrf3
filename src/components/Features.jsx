import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Star, Mic, FileText } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Cinematic Launch',
    desc: 'Immersive, parallax-driven reveals that make every session feel like a premiere.',
  },
  {
    icon: Star,
    title: 'Living Charts',
    desc: 'Dynamic, animated natal and transit visuals with smooth, accessible motion.',
  },
  { icon: Mic, title: 'Voice Guidance', desc: 'Hands-free readings with realtime voice capture and feedback.' },
  { icon: FileText, title: 'Astro Reports', desc: 'Beautiful, shareable insights that evolve with your sky.' },
];

export default function Features() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-semibold text-white md:text-4xl"
      >
        Core Pillars
      </motion.h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/10 p-2 text-white">
                {React.createElement(f.icon, { size: 22 })}
              </div>
              <div>
                <h3 className="text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
              </div>
            </div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
