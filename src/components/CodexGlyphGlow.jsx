import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

/**
 * CodexGlyphGlow renders a glowing Lottie animation sigil.
 * 
 * @param {string} size - "sm" | "md" | "lg" (default: "md")
 * @param {string} className - Optional Tailwind class overrides
 * @param {boolean} pulse - Whether to animate with Tailwind pulse (default: true)
 */
export default function CodexGlyphGlow({ size = "md", className = "", pulse = true }) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-40 h-40",
  };

  return (
    <div
      className={`flex items-center justify-center ${sizeMap[size] || sizeMap.md} ${
        pulse ? "animate-pulse" : ""
      } ${className}`}
    >
      <Player
        autoplay
        loop
        src="/assets/lottie/tri_glyph_glow_lottie.json"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
