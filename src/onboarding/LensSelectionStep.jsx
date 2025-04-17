import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Optional: import Lottie from 'lottie-react'; import glyphAnimation from '@/assets/lottie/lens-glyph.json';

const beliefLenses = [
  {
    key: "spiritual",
    label: "Spiritual Lens",
    description: "You resonate with universal energy, divine presence, and unseen truths.",
    whisper: "You walk between the seen and the unseen — a bridge of energy and intent.",
  },
  {
    key: "scientific",
    label: "Scientific Lens",
    description: "You seek understanding through logic, patterns, and natural laws.",
    whisper: "Within structure and reason, you glimpse the elegant design of the cosmos.",
  },
  {
    key: "mystical",
    label: "Mystical Lens",
    description: "You trust intuition, symbols, and the hidden language of the soul.",
    whisper: "You hear the echo of truth in symbols others pass by.",
  },
  {
    key: "religious",
    label: "Religious Lens",
    description: "You honor traditions, sacred texts, and devotion to divine principles.",
    whisper: "Sacred tradition weaves your path in timeless reverence.",
  },
  {
    key: "philosophical",
    label: "Philosophical Lens",
    description: "You reflect through reason, ethics, and the pursuit of truth through thought.",
    whisper: "Your thoughts shape the nature of your being and the questions that define you.",
  },
];

export default function LensSelectionStep() {
  const [selectedLens, setSelectedLens] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedLens) return;
    const lensData = beliefLenses.find((l) => l.key === selectedLens);
    sessionStorage.setItem("selectedLens", selectedLens);
    sessionStorage.setItem("selectedWhisper", lensData?.whisper || "");
    navigate("/onboarding/lens-reflection");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 animate-fadeIn">

      {/* Optional Lottie Animation */}
      {/* <div className="absolute top-10 z-0 w-72 h-72 opacity-30">
        <Lottie animationData={glyphAnimation} loop autoplay />
      </div> */}

      <div className="z-10 text-center">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Select Your Belief Lens</h2>
        <p className="text-sm text-gray-400 mb-8 max-w-xl">
          Choose the lens through which you most naturally interpret life. This does not limit your journey — it simply allows Codex Lumina to speak to you in your own sacred language.
        </p>

        <div className="grid gap-4 w-full max-w-xl">
          {beliefLenses.map((lens) => (
            <button
              key={lens.key}
              onClick={() => setSelectedLens(lens.key)}
              className={`text-left p-4 border rounded-xl transition-all duration-300 ease-out focus:outline-none ${
                selectedLens === lens.key
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-md"
                  : "bg-black/40 border-indigo-800 hover:bg-indigo-700/30"
              }`}
            >
              <strong className="block text-lg mb-1 text-indigo-200">{lens.label}</strong>
              <span className="text-sm text-indigo-100">{lens.description}</span>
            </button>
          ))}
        </div>

        {/* Liora Whisper Preview */}
        {selectedLens && (
          <p className="mt-6 italic text-indigo-300 text-sm max-w-md mx-auto animate-fadeInSlow">
            “{beliefLenses.find((l) => l.key === selectedLens)?.whisper}”
          </p>
        )}

        <button
          onClick={handleContinue}
          disabled={!selectedLens}
          className={`mt-10 px-6 py-3 rounded-full font-bold transition-all ${
            selectedLens
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-indigo-900 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
