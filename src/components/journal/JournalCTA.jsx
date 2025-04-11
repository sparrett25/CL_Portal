import React from "react";
import { useNavigate } from "react-router-dom";

export default function JournalCTA() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-8">
      <div className="inline-block bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-lime-300">🖋 Begin Your Reflection</h2>
        <p className="text-zinc-400 text-sm mt-1">Honor what is rising. Let your soul speak.</p>
        <button
          onClick={() => navigate("/journal")}
          className="mt-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          Go to Journal
        </button>
      </div>
    </div>
  );
}
