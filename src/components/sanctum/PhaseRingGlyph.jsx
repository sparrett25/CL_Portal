import React from "react";

export default function PhaseRingGlyph() {
  const phases = ["Awakening", "Deepening", "Ascension", "Friction", "Renewal", "Stillness"];

  return (
    <div className="flex flex-wrap justify-center gap-3 text-xs text-indigo-300">
      {phases.map((phase, i) => (
        <div
          key={i}
          className="px-3 py-1 border border-indigo-500 rounded-full bg-white/5 backdrop-blur"
        >
          {phase}
        </div>
      ))}
    </div>
  );
}
