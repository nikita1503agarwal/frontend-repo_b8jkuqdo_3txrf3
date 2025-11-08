import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { key: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g., Aria' },
  { key: 'birthdate', label: 'Birth Date', type: 'date', placeholder: '' },
  { key: 'birthtime', label: 'Birth Time', type: 'time', placeholder: '' },
  { key: 'birthplace', label: 'Birth Place', type: 'text', placeholder: 'City, Country' },
];

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState({});

  const current = steps[index];
  const isLast = index === steps.length - 1;

  const onNext = () => {
    if (!isLast) setIndex((i) => i + 1);
  };

  const onPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Demo: Print collected data. In full app, send to backend with encryption.
    console.log('Onboarding data', data);
    const el = document.getElementById('dashboard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="onboarding" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-xl px-6">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">Begin your chart</h2>
        <p className="mt-2 text-center text-white/70">Cinematic form flow with gentle motion and accessible fallbacks.</p>

        <form onSubmit={onSubmit} className="mx-auto mt-10 w-full">
          <div className="relative min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <label className="block text-sm text-white/80">{current.label}</label>
                <input
                  type={current.type}
                  placeholder={current.placeholder}
                  value={data[current.key] || ''}
                  onChange={(e) => setData((d) => ({ ...d, [current.key]: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none backdrop-blur-md focus:border-white/30"
                  required
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/80 hover:border-white/30 disabled:opacity-40"
              disabled={index === 0}
            >
              Back
            </button>
            {isLast ? (
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Next
              </button>
            )}
          </div>

          <div className="mt-6 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-white"
              style={{ width: `${((index + 1) / steps.length) * 100}%` }}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Onboarding;
