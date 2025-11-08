import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();

  const [onboarding, setOnboarding] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    interests: [],
    completed: false,
  });

  const updateOnboarding = useCallback((patch) => {
    setOnboarding((prev) => ({ ...prev, ...patch }));
  }, []);

  const value = useMemo(
    () => ({ prefersReducedMotion, onboarding, updateOnboarding }),
    [prefersReducedMotion, onboarding, updateOnboarding]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
