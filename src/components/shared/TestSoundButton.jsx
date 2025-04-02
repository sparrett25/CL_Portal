// components/shared/TestSoundButton.jsx
import React from 'react';
import ambientSound from '../../assets/sounds/ambient-waves.mp3';


export default function TestSoundButton() {
  const playSound = () => {
    const audio = new Audio(ambientSound);
    audio.play().catch((error) => {
      console.warn("Audio play failed:", error);
    });
  };

  return (
    <button
      onClick={playSound}
      className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md"
    >
      🔊 Test Sound
    </button>
  );
}
