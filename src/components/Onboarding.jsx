import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const steps = [
  { key: 'name', label: 'Your Name', placeholder: 'e.g., Aster' },
  { key: 'birthDate', label: 'Birth Date', placeholder: 'YYYY-MM-DD' },
  { key: 'focus', label: 'Focus Area', placeholder: 'Career, Love, Wellness…' },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState({ name: '', birthDate: '', focus: '' });
  const reduce = useReducedMotion();

  const progress = useMemo(() => (index + 1) / steps.length, [index]);

  const next = () => setIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', form);
  };

  const current = steps[index];

  return (
    <section id="onboarding" className="mx-auto max-w-xl px-6 py-20">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Quick Onboarding</h3>
          <div className="relative h-8 w-8">
            <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
              <path
                d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <motion.path
                d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength: progress }}
                transition={{ duration: reduce ? 0 : 0.6 }}
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-[10px] text-white/70">
              {Math.round(progress * 100)}%
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <label className="block text-sm text-white/80">{current.label}</label>
              <input
                autoFocus
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                placeholder={current.placeholder}
                value={form[current.key]}
                onChange={(e) => setForm({ ...form, [current.key]: e.target.value })}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={index === 0}
              className="rounded-full px-4 py-2 text-sm text-white/70 hover:text-white disabled:opacity-40"
            >
              Back
            </button>
            {index < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Generate Preview
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
