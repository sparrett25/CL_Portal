import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhisperReflectionBlock from '@/components/Liora/WhisperReflectionBlock';
import { useJournalContext } from '@/context/JournalContext';

const auraMap = {
  light: 'bg-gradient-to-b from-yellow-50 to-white',
  neutral: 'bg-gradient-to-b from-blue-50 to-white',
  dark: 'bg-gradient-to-b from-purple-100 to-zinc-100',
};

const breathPrompt = {
  light: 'Inhale light… exhale peace.',
  neutral: 'Breathe into balance… exhale into presence.',
  dark: 'Inhale depth… exhale stillness.',
};

const ambientMap = {
  light: '/audio/ambient/soft-glow.mp3',
  neutral: '/audio/ambient/veil-wind.mp3',
  dark: '/audio/ambient/deep-void.mp3',
};

const FullscreenWhisperModal = ({ isOpen, onClose, entry }) => {
  const auraClass = auraMap[entry?.energy] || 'bg-white';
  const ambientRef = useRef(null);
  const { addJournalEntry } = useJournalContext();

  // Play ambient sound
  useEffect(() => {
    if (isOpen && entry?.energy && ambientRef.current) {
      ambientRef.current.volume = 0.25;
      ambientRef.current.loop = true;
      ambientRef.current.play().catch(() => {});
    }
    return () => {
      if (ambientRef.current) ambientRef.current.pause();
    };
  }, [isOpen, entry?.energy]);

  // Auto-save as deep reflection
  useEffect(() => {
    if (isOpen && entry) {
      const deepEntry = {
        ...entry,
        type: 'deep_reflection',
        timestamp: new Date().toISOString(),
      };
      try {
        addJournalEntry(deepEntry);
      } catch (e) {
        console.warn('Failed to auto-save deep reflection:', e);
      }
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${auraClass} bg-opacity-90 backdrop-blur`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Ambient Audio */}
          <audio ref={ambientRef} src={ambientMap[entry?.energy]} />

          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-zinc-600 hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-white text-2xl"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Whisper + Breath Prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl px-6"
          >
            <WhisperReflectionBlock
              text={entry.text}
              lens={entry.lens}
              speed="slow"
              sound={
                entry.energy === 'light'
                  ? 'light-glow'
                  : entry.energy === 'dark'
                  ? 'depth-breath'
                  : 'veil-breath'
              }
            />

            <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-300 italic">
              {breathPrompt[entry.energy]}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenWhisperModal;
