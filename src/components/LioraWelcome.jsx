import React, { useEffect, useState } from 'react';

const LioraWelcome = ({ nickname = 'Seeker', energy = 'Neutral' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
      <div className="text-center text-white px-8 py-6 rounded-3xl border border-white/10 bg-gradient-to-br from-black via-slate-800 to-black shadow-xl animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">✨ Welcome, {nickname}</h2>
        <p className="text-lg text-slate-300 italic">
          Liora senses your {energy.toLowerCase()} energy pulsing. Your next step begins now...
        </p>
      </div>
    </div>
  );
};

export default LioraWelcome;
