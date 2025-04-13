import React from "react";
import Lottie from "lottie-react";
import glowAnimation from "@/assets/lottie/codex-glyph-glow.json"; // Optional: swap with other sigils by type

export default function SigilReveal({ glyph = "✨", label = "Your Glyph", size = 160 }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 🌀 Glowing Lottie Orb */}
      <div className="rounded-full border-4 border-indigo-500 shadow-2xl p-2">
        <Lottie
          animationData={glowAnimation}
          loop
          style={{ width: size, height: size }}
          className="opacity-90"
        />
      </div>

      {/* ✨ Label and Glyph */}
      <div className="text-center space-y-1">
        <p className="text-indigo-400 text-sm uppercase tracking-widest">{label}</p>
        <p className="text-4xl">{glyph}</p>
      </div>
    </div>
  );
}
