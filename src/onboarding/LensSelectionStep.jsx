// src/onboarding/LensSelectionStep.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const beliefLenses = [
  {
    key: "spiritual",
    label: "Spiritual Lens",
    description: "You resonate with universal energy, divine presence, and unseen truths."
  },
  {
    key: "scientific",
    label: "Scientific Lens",
    description: "You seek understanding through logic, patterns, and natural laws."
  },
  {
    key: "mystical",
    label: "Mystical Lens",
    description: "You trust intuition, symbols, and the hidden language of the soul."
  },
  {
    key: "religious",
    label: "Religious Lens",
    description: "You honor traditions, sacred texts, and devotion to divine principles."
  },
  {
    key: "philosophical",
    label: "Philosophical Lens",
    description: "You reflect through reason, ethics, and the pursuit of truth through thought."
  },
];

export default function LensSelectionStep() {
  const [selectedLens, setSelectedLens] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedLens) return;
    sessionStorage.setItem("selectedLens", selectedLens);
    navigate("/onboarding/voice-capture");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Select Your Belief Lens</h2>
      <p className="text-sm text-gray-400 mb-8 text-center max-w-lg">
        Choose the lens through which you most naturally interpret life. This does not limit your journey — it simply allows Codex Lumina to speak to you in your own sacred language.
      </p>

      <div className="grid gap-4 w-full max-w-xl">
        {beliefLenses.map((lens) => (
          <button
            key={lens.key}
            onClick={() => setSelectedLens(lens.key)}
            className={`text-left p-4 border rounded-xl transition-all duration-300 ${
              selectedLens === lens.key
                ? "bg-indigo-600 border-indigo-400 text-white"
                : "bg-black/40 border-indigo-800 hover:bg-indigo-700/20"
            }`}
          >
            <strong className="block text-lg mb-1 text-indigo-200">{lens.label}</strong>
            <span className="text-sm text-indigo-100">{lens.description}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedLens}
        className={`mt-8 px-6 py-3 rounded-full font-bold transition-all ${
          selectedLens
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-indigo-900 text-gray-500 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
