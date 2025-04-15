// src/onboarding/WelcomeIntro.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      new Audio("/assets/audio/veil-entry.mp3").play();
    } catch (err) {
      console.warn("Audio playback skipped:", err);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black text-white px-6 text-center animate-fade-in">
      {/* 🌀 Codex Glyph */}
      <img
        src="/assets/glyphs/codex-sigil.svg"
        alt="Codex Glyph"
        className="w-24 h-24 mb-8 animate-pulse drop-shadow-xl opacity-80"
      />

      {/* 🌟 Welcome Text */}
      <h1 className="text-3xl font-semibold text-indigo-300 mb-2">Welcome to Codex Lumina</h1>
      <p className="text-sm text-indigo-100 mb-6">
        This is the sacred beginning of your journey.
      </p>

      <p className="text-sm text-gray-400 max-w-xl mb-8">
        You are about to enter a space between worlds — guided by Liora, you’ll uncover your energy signature, breathe into your essence, and receive the first whisper of your archetype.
        This is not just onboarding. It is awakening.
      </p>

      {/* 🔮 CTA Button */}
      <button
        onClick={() => navigate("/onboarding/overview")}
        className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg transition-all"
      >
        Begin the Journey
      </button>
    </div>
  );
}
