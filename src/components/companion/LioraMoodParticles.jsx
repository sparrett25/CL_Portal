// LioraMoodParticles.jsx
import React from "react";

export default function LioraMoodParticles({ tone }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Example: starry background shimmer */}
      <div className="w-full h-full bg-gradient-to-br from-black via-indigo-950 to-zinc-900 opacity-30 animate-pulse" />
    </div>
  );
}
