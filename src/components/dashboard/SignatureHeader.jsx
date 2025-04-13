import React from "react";

// Optional props:
// - archetype: The name of the archetype (e.g., "The Visionary")
// - phase: The current evolutionary phase (e.g., "Awakening")
// - energy: Light / Neutral / Dark
// - glyph: Symbol or sigil associated with archetype (e.g., ✨)

export default function SignatureHeader({
  archetype = "The Visionary",
  phase = "Awakening",
  energy = "Light",
  glyph = "✨",
  className = "",
}) {
  const energyColor = {
    Light: "text-yellow-300",
    Neutral: "text-purple-300",
    Dark: "text-red-400",
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 border border-white/10 bg-white/5 backdrop-blur-md shadow-inner ${className}`}
    >
      {/* 🔮 Glyph */}
      <div className="text-2xl">{glyph}</div>

      {/* 🧬 Identity Text */}
      <div className="text-sm leading-tight">
        <div className="font-semibold text-white">{archetype}</div>
        <div className={`text-xs ${energyColor[energy] || "text-white/60"}`}>
          {energy} • {phase}
        </div>
      </div>
    </div>
  );
}
