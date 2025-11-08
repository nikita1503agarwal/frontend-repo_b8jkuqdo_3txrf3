import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function ParallaxSection({ children, offset = 60, className = '' }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.8, 1]);

  return (
    <motion.div style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
