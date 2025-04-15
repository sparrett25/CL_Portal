// src/onboarding/Assessment.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Assessment() {
  const navigate = useNavigate();

  const [tone, setTone] = useState("");
  const [emotion, setEmotion] = useState("");
  const [spiritualOpenness, setSpiritualOpenness] = useState("");
  const [intention, setIntention] = useState("");
  const [lifePhase, setLifePhase] = useState("");

  const isComplete =
    tone.trim() &&
    emotion.trim() &&
    spiritualOpenness &&
    intention.trim() &&
    lifePhase;

  const handleNext = () => {
    if (!isComplete) return;

    sessionStorage.setItem("initialEnergyTone", tone.trim());
    sessionStorage.setItem("emotionalState", emotion.trim());
    sessionStorage.setItem("spiritualOpenness", spiritualOpenness);
    sessionStorage.setItem("userIntention", intention.trim());
    sessionStorage.setItem("lifePhaseDescriptor", lifePhase);

    navigate("/onboarding/lens-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 text-center animate-fade-in space-y-8">
      <img
        src="/assets/glyphs/energy-orb.svg"
        alt="Energy Orb"
        className="w-20 h-20 animate-pulse drop-shadow-xl opacity-90"
      />

      <h2 className="text-2xl font-semibold text-indigo-300 mb-2">The First Reflection</h2>
      <p className="text-sm italic text-gray-400 max-w-xl mb-4">
        Speak honestly to the Codex. Your words shape the journey.
      </p>

      {/* Energy Tone */}
      <div className="w-full max-w-xl text-left">
        <label className="text-indigo-200 text-md mb-1 block">
          What energy feels most present in your life right now?
        </label>
        <textarea
          rows="2"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="Light, Dark, or Neutral..."
          className="w-full p-3 rounded-xl bg-black/40 text-indigo-100 border border-indigo-500 placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Emotion */}
      <div className="w-full max-w-xl text-left">
        <label className="text-indigo-200 text-md mb-1 block">
          How would you describe your emotional landscape recently?
        </label>
        <textarea
          rows="2"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="Peaceful, chaotic, numb, inspired..."
          className="w-full p-3 rounded-xl bg-black/40 text-indigo-100 border border-indigo-500 placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Spiritual Openness */}
      <div className="w-full max-w-xl text-left">
        <label className="text-indigo-200 text-md mb-2 block">
          Do you feel connected to something beyond yourself?
        </label>
        <div className="flex gap-4">
          {["Yes", "No", "I’m Not Sure"].map((option) => (
            <button
              key={option}
              onClick={() => setSpiritualOpenness(option)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                spiritualOpenness === option
                  ? "bg-indigo-600 border-indigo-300 text-white"
                  : "bg-black/30 border-indigo-700 text-indigo-300 hover:bg-indigo-700/30"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Intention */}
      <div className="w-full max-w-xl text-left">
        <label className="text-indigo-200 text-md mb-1 block">
          What are you hoping to understand or become through this journey?
        </label>
        <textarea
          rows="3"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="Your sacred intention..."
          className="w-full p-3 rounded-xl bg-black/40 text-indigo-100 border border-indigo-500 placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Life Phase */}
      <div className="w-full max-w-xl text-left">
        <label className="text-indigo-200 text-md mb-2 block">
          Which of these statements best reflects your current phase?
        </label>
        <div className="grid gap-2">
          {[
            "I’m awakening to something new",
            "I’m in transition and seeking guidance",
            "I’m healing and rebuilding",
            "I’m clear, but ready to deepen"
          ].map((desc) => (
            <button
              key={desc}
              onClick={() => setLifePhase(desc)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                lifePhase === desc
                  ? "bg-indigo-600 border-indigo-300 text-white"
                  : "bg-black/30 border-indigo-700 text-indigo-300 hover:bg-indigo-700/30"
              }`}
            >
              {desc}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={!isComplete}
        className={`mt-6 px-6 py-3 rounded-full font-bold transition-all ${
          isComplete
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-indigo-900 text-gray-500 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
