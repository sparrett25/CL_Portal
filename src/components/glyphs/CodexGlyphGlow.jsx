import React from "react";
import Lottie from "lottie-react";
import codexGlow from "@/assets/lottie/codex-glyph-glow.json"; // Optional: fallback to static if not using Lottie

export default function CodexGlyphGlow({ size = 128 }) {
  return (
    <div className="flex items-center justify-center relative z-10">
      <div className="rounded-full border-2 border-indigo-500 p-2 shadow-2xl">
        <Lottie
          animationData={codexGlow}
          loop
          style={{ width: size, height: size }}
          className="opacity-80"
        />
      </div>
    </div>
  );
}
