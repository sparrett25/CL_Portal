import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Assessment() {
  const navigate = useNavigate();

  const [energy, setEnergy] = useState("");
  const [emotion, setEmotion] = useState("");
  const [connected, setConnected] = useState("");
  const [intention, setIntention] = useState("");
  const [phaseStatement, setPhaseStatement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const reflection = {
      energy,
      emotion,
      connected,
      intention,
      phaseStatement,
    };

    sessionStorage.setItem("codexReflection", JSON.stringify(reflection));
    navigate("/onboarding/lens-selection");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10 text-center">
      <img src="/assets/glyphs/energy-orb.svg" alt="Energy Orb" className="w-16 h-16 mb-6" />

      <h2 className="text-2xl font-bold text-indigo-300 mb-2">The First Reflection</h2>
      <p className="text-sm text-gray-400 mb-6 italic">
        Speak honestly to the Codex. Your words shape the journey.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 text-left">
        <div>
          <label className="block mb-1 text-indigo-300">
            What energy feels most present in your life right now?
          </label>
          <textarea
            className="w-full px-4 py-3 bg-zinc-900 text-white placeholder-gray-400 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Light, Dark, or Neutral..."
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-indigo-300">
            How would you describe your emotional landscape recently?
          </label>
          <textarea
            className="w-full px-4 py-3 bg-zinc-900 text-white placeholder-gray-400 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Calm, anxious, hopeful, uncertain..."
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-indigo-300">
            Do you feel connected to something beyond yourself?
          </label>
          <div className="flex gap-4">
            {["Yes", "No", "I'm Not Sure"].map((option) => (
              <button
                key={option}
                type="button"
                className={`px-4 py-2 rounded-lg border ${
                  connected === option
                    ? "bg-indigo-600 border-indigo-700 text-white"
                    : "border-indigo-500 text-indigo-300 hover:bg-indigo-800"
                }`}
                onClick={() => setConnected(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-indigo-300">
            What are you hoping to understand or become through this journey?
          </label>
          <textarea
            className="w-full px-4 py-3 bg-zinc-900 text-white placeholder-gray-400 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Personal growth, spiritual clarity, healing..."
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-indigo-300">
            Which of these statements best reflects your current phase?
          </label>
          <textarea
            className="w-full px-4 py-3 bg-zinc-900 text-white placeholder-gray-400 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="I'm just beginning… I'm in a transition… I’m ready for transformation…"
            value={phaseStatement}
            onChange={(e) => setPhaseStatement(e.target.value)}
            required
          />
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
