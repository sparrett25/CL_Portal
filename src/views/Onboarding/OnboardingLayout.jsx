import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserSync } from '@/context/UserSyncContext';

const getBackgroundByLens = (lensId) => {
  switch (lensId) {
    case 'christian': return 'bg-gradient-to-br from-rose-100 to-yellow-50 text-black';
    case 'jewish': return 'bg-gradient-to-br from-amber-100 to-zinc-50 text-black';
    case 'buddhist': return 'bg-gradient-to-br from-green-100 to-white text-black';
    case 'muslim': return 'bg-gradient-to-br from-blue-100 to-slate-50 text-black';
    case 'metaphysical': return 'bg-gradient-to-br from-indigo-100 to-purple-200 text-indigo-900';
    case 'nonreligious': return 'bg-gradient-to-br from-gray-100 to-stone-50 text-black';
    case 'interfaith': return 'bg-gradient-to-br from-yellow-100 to-emerald-50 text-black';
    default:
      return 'bg-gradient-to-b from-black via-indigo-950 to-black text-white'; // 🌑 fallback
  }
};

const OnboardingLayout = ({ step, children }) => {
  const { profile } = useUserSync();
  const lens = profile?.belief_lens || null;
  const background = getBackgroundByLens(lens);

  return (
    <div className={`min-h-screen w-full ${background} transition-all duration-700`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 pt-16 pb-24"
        >
          {/* 🌀 Soft inner glow */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-sm p-8 shadow-lg shadow-indigo-900/30 ring-1 ring-white/10">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingLayout;
