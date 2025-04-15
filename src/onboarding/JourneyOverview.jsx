// src/onboarding/JourneyOverview.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function JourneyOverview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black text-white px-6 text-center animate-fade-in">
      {/* 🌀 Codex Glyph */}
      <img
        src="/assets/glyphs/codex-sigil.svg"
        alt="Codex Glyph"
        className="w-20 h-20 mb-6 animate-pulse drop-shadow-lg opacity-90"
      />

      <h1 className="text-2xl font-semibold text-indigo-300 mb-2">
        What Awaits You
      </h1>
      <p className="text-sm text-gray-300 max-w-2xl mb-6">
        In the next few moments, you’ll be guided through the sacred process of
        attuning with your energetic essence. You’ll meet Liora — your companion
        through the Codex — and participate in sacred reflection, voice
        resonance, and archetypal awakening.
      </p>

      <div className="grid gap-4 text-left max-w-lg w-full text-sm text-indigo-100">
        <div className="bg-black/40 border border-indigo-600 rounded-xl p-4">
          <strong className="block text-indigo-300 mb-1">🔍 Step 1:</strong>
          Choose your beliefs and worldview lenses.
        </div>
        <div className="bg-black/40 border border-indigo-600 rounded-xl p-4">
          <strong className="block text-indigo-300 mb-1">🗣️ Step 2:</strong>
          Speak your voice signature to awaken your Codex connection.
        </div>
        <div className="bg-black/40 border border-indigo-600 rounded-xl p-4">
          <strong className="block text-indigo-300 mb-1">🧬 Step 3:</strong>
          Receive your Signature Profile: Archetype, Phase, and Energy alignment.
        </div>
      </div>

      <button
        onClick={() => navigate("/onboarding/assessment")}
        className="mt-8 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
      >
        I’m Ready to Begin
      </button>
    </div>
  );
}
