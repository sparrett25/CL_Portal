import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { playWhisperSound } from '@/utils/soundPlayer';

const WhisperReveal = ({ text, delay = 0.2, autoPlay = true, speed = 'default', sound }) => {
  const words = text?.split(' ') || [];

  const speedMultiplier = {
    slow: 0.09,
    default: 0.06,
    fast: 0.04,
  }[speed] || 0.06;

  useEffect(() => {
    if (autoPlay && sound) {
      playWhisperSound(sound);
    }
  }, [text, sound, autoPlay]);

  return (
    <div className="text-lg font-medium leading-relaxed whitespace-pre-wrap">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * speedMultiplier,
            duration: 0.4,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default WhisperReveal;
