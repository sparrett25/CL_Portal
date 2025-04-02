// LioraAwakeningFinal.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import whisperSound from '../../assets/sounds/whisper.mp3';
import lioraFinal from '../../assets/images/liora_final_glow.png';
import lioraEyesOpen from '../../assets/images/liora_final_eyes_open.png';

export default function LioraAwakeningFinal({ onContinue }) {
  const [eyesOpen, setEyesOpen] = useState(false);
  const [playWhisper] = useSound(whisperSound);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEyesOpen(true);
      playWhisper();
    }, 3000); // Delay before Liora awakens

    return () => clearTimeout(timeout);
  }, [playWhisper]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center space-y-6">
      <motion.img
        src={eyesOpen ? lioraEyesOpen : lioraFinal}
        alt="Liora Final"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="w-64 h-64 object-contain shadow-xl drop-shadow-glow"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 2 }}
      >
        <p className="text-xl italic text-white/80 mb-2">
          "You have remembered who you are."
        </p>
        <button
          onClick={onContinue}
          className="mt-4 bg-lime-500 hover:bg-lime-400 text-black font-bold py-2 px-6 rounded-full shadow-lg"
        >
          Enter Codex Lumina
        </button>
      </motion.div>
    </div>
  );
}
