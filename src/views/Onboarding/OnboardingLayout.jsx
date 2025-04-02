// OnboardingLayout.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserContext } from '@/context/UserContext';

const getBackgroundByLens = (lensId) => {
  switch (lensId) {
    case 'christian': return 'bg-gradient-to-br from-rose-100 to-yellow-50';
    case 'jewish': return 'bg-gradient-to-br from-amber-100 to-zinc-50';
    case 'buddhist': return 'bg-gradient-to-br from-green-100 to-white';
    case 'muslim': return 'bg-gradient-to-br from-blue-100 to-slate-50';
    case 'metaphysical': return 'bg-gradient-to-br from-indigo-100 to-purple-50';
    case 'nonreligious': return 'bg-gradient-to-br from-gray-100 to-stone-50';
    case 'interfaith': return 'bg-gradient-to-br from-yellow-100 to-emerald-50';
    default: return 'bg-gradient-to-br from-white to-zinc-100';
  }
};

const OnboardingLayout = ({ step, children }) => {
  const { userProfile } = useUserContext();
  const lens = userProfile?.belief_lens;
  const background = getBackgroundByLens(lens);

  return (
    <div className={`min-h-screen w-full ${background} transition-all duration-700`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 pt-12 pb-20"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingLayout;
