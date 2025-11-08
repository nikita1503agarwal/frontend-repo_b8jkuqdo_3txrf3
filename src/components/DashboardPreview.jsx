import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  { title: 'Daily Transit Pulse', body: 'Mars trines your Sun — momentum favors bold moves.' },
  { title: 'Focus Insight', body: 'Career: apply pressure in short bursts, then regroup.' },
  { title: 'Voice Note', body: 'Tap to record a quick question for AURA.' },
];

export default function DashboardPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-semibold text-white md:text-4xl"
      >
        Glimpse the Dashboard
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08 * i }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 text-white shadow backdrop-blur"
          >
            <h4 className="text-lg font-semibold">{c.title}</h4>
            <p className="mt-2 text-sm text-white/80">{c.body}</p>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_60%)]" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
