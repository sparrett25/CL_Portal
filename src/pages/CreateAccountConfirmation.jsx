// src/pages/CreateAccountConfirmation.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccountConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding/welcome");
    }, 3500); // ⏳ Optional delay before redirect

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        {/* 🌟 Sigil Glow */}
        <div className="flex justify-center">
          <img
            src="/assets/glyphs/codex-sigil.svg"
            alt="Codex Sigil"
            className="w-24 h-24 animate-pulse-slow drop-shadow-xl opacity-80"
          />
        </div>

        {/* 🕊️ Message */}
        <h2 className="text-2xl font-semibold text-indigo-300">
          Your Identity Has Been Created
        </h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          Welcome, Luminary. The flame has acknowledged your presence.  
          You will now begin your sacred onboarding into the Codex.
        </p>

        {/* 🔄 Optional Button (in case redirect fails) */}
        <button
          onClick={() => navigate("/onboarding/welcome")}
          className="mt-4 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
        >
          Begin Onboarding
        </button>
      </div>
    </div>
  );
}
