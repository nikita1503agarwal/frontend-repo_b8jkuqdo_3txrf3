import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ParticleBurst({ x = 0, y = 0, trigger = 0, color = '255,255,255' }) {
  const reduce = useReducedMotion();
  const count = reduce ? 0 : 12;
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  if (count === 0 || trigger === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {particles.map((i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = 28 + (i % 3) * 10;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        return (
          <motion.span
            key={`${trigger}-${i}`}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ left: x, top: y, backgroundColor: `rgba(${color},1)` }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
            animate={{ x: dx, y: dy, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}
