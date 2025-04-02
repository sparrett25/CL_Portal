// /src/components/Modals/ResetRitualModal.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const ResetRitualModal = ({ onClose }) => {
  const { resetUserJourney } = useUserContext();
  const navigate = useNavigate();

  const handleReset = async (deleteData = false) => {
    await resetUserJourney({ deleteData });
    onClose();
    navigate('/onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 p-6 rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="flex items-center mb-4 space-x-3">
          <Sparkles className="text-indigo-500 animate-pulse" size={24} />
          <h2 className="text-xl font-bold">Re-enter the Codex</h2>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
          You are about to begin a new journey through Codex Lumina.
          You may preserve your past insights, or release them entirely.
          This choice is sacred — take it with presence.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleReset(false)}
            className="w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700 transition"
          >
            Reset – Preserve My Data
          </button>

          <button
            onClick={() => handleReset(true)}
            className="w-full bg-red-600 text-white rounded-lg py-2 font-medium hover:bg-red-700 transition"
          >
            Reset – Delete All Personal Data
          </button>

          <button
            onClick={onClose}
            className="w-full text-zinc-500 text-sm underline mt-2 hover:text-zinc-700"
          >
            Cancel Ritual
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetRitualModal;
