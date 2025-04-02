import React from 'react';
import { useTone } from '../../context/ToneContext';

const toneColors = {
  hopeful: 'bg-green-400',
  sad: 'bg-blue-500',
  confused: 'bg-yellow-400',
  joyful: 'bg-pink-500',
  neutral: 'bg-gray-400'
};

export default function ToneVisualizer() {
  const { tone } = useTone();
  const color = toneColors[tone] || 'bg-white';

  return (
    <div className="flex flex-col items-center mt-6">
      <div className={`w-24 h-24 rounded-full shadow-xl transition-all duration-500 ${color}`}></div>
      <p className="mt-3 text-white/80 text-sm">
        Current tone: <span className="text-white font-medium">{tone}</span>
      </p>
    </div>
  );
}
