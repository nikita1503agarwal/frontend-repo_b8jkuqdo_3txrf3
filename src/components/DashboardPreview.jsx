import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Your Cosmic Snapshot',
    desc: 'Preview of an AI‑generated report with cinematic PDF export.',
  },
  {
    title: 'Real‑time Chat',
    desc: 'Token‑streaming UI designed for clarity and flow.',
  },
  {
    title: 'Voice Ready',
    desc: 'Upload audio, transcribe, and listen back with TTS.',
  },
];

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold md:text-4xl">Dashboard preview</h2>
          <a href="#" className="text-sm text-white/70 hover:text-white">Sign in</a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
            >
              <h3 className="text-lg font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-white/70">{c.desc}</p>
              <div className="mt-4 h-32 rounded-xl bg-black/50 ring-1 ring-inset ring-white/10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
