// src/onboarding/ProfileReveal.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileReveal() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Retrieve stored values from onboarding session
    const tone = sessionStorage.getItem("initialEnergyTone");
    const lens = sessionStorage.getItem("selectedLens");

    // Simulate archetype mapping (you can replace with real logic)
    const generatedProfile = {
      archetype: tone === "Dark" ? "The Shadow Weaver" :
                  tone === "Light" ? "The Visionary" :
                  tone === "Neutral" ? "The Bridgewalker" : "The Seeker",
      energy: tone || "Unknown",
      lens: lens || "Unknown",
      phase: "Awakening",
      glyph: "✨",
      description: "You carry the spark of what is becoming. This path reflects your inner essence."
    };

    setProfile(generatedProfile);
  }, []);

  const handleContinue = () => {
    navigate("/home");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <img
        src="/assets/glyphs/codex-sigil.svg"
        alt="Profile Glyph"
        className="w-24 h-24 mb-6 animate-pulse drop-shadow-xl opacity-90"
      />

      <h2 className="text-2xl font-semibold text-indigo-300 mb-2">Your Signature Profile</h2>
      <p className="text-sm text-gray-400 mb-6 italic">This is your current resonance in the Codex.</p>

      <div className="bg-black/30 border border-indigo-600 rounded-xl px-6 py-6 max-w-md text-indigo-100 text-left space-y-2 mb-6 shadow-lg">
        <p><strong>Archetype:</strong> {profile.archetype}</p>
        <p><strong>Energy Alignment:</strong> {profile.energy}</p>
        <p><strong>Belief Lens:</strong> {profile.lens}</p>
        <p><strong>Phase:</strong> {profile.phase}</p>
        <p className="mt-4 text-sm text-indigo-200 italic">"{profile.description}"</p>
      </div>

      <button
        onClick={handleContinue}
        className="mt-4 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
      >
        Enter the Codex
      </button>
    </div>
  );
}
